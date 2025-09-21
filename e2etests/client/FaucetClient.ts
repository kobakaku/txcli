import {
  Chain,
  createWalletClient,
  http,
  Hex,
  WalletClient,
  Account,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { IPublicClient } from "@/e2etests/client/PublicClient";

export interface IFaucetClient {
  sendEther(toAddr: Hex, value: bigint, wait?: boolean): Promise<Hex>;
}

export class FaucetClient implements IFaucetClient {
  private readonly client: WalletClient<any, Chain, Account>;
  private readonly publicClient: IPublicClient;

  constructor(
    faucetPrivateKey: Hex,
    rpcUrl: string,
    chain: Chain,
    publicClient: IPublicClient,
  ) {
    this.client = createWalletClient({
      account: privateKeyToAccount(faucetPrivateKey),
      transport: http(rpcUrl),
      chain,
    });
    this.publicClient = publicClient;
  }

  /**
   * Send ether to an address
   * @param toAddr - the address to send ether to
   * @param value - the amount of ether to send
   * @param wait - whether to wait for the transaction to be mined
   * @returns the hash of the transaction
   */
  async sendEther(
    toAddr: Hex,
    value: bigint,
    wait: boolean = true,
  ): Promise<Hex> {
    const hash = await this.client.sendTransaction({
      to: toAddr,
      value,
    });

    // Wait for transaction to be mined
    if (wait) {
      const receipt = await this.publicClient.waitForTransactionReceipt(hash);
      if (receipt.status === "reverted") {
        throw new Error(`Faucet transaction failed: ${hash}`);
      }
    }

    return hash;
  }
}
