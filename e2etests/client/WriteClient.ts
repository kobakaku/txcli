import {
  Chain,
  createWalletClient,
  http,
  Hex,
  WalletClient,
  Account,
  createPublicClient,
} from "viem";

export interface IWriteClient {
  sendEther(toAddr: Hex, value: bigint, wait?: boolean): Promise<Hex>;
}

export class WriteClient implements IWriteClient {
  private readonly walletClient: WalletClient<any, Chain, Account>;
  private readonly publicClient: ReturnType<typeof createPublicClient>;

  constructor(account: Account, rpcUrl: string, chain: Chain) {
    this.walletClient = createWalletClient({
      account,
      transport: http(rpcUrl),
      chain,
    });
    this.publicClient = createPublicClient({
      chain,
      transport: http(rpcUrl),
    });
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
    const hash = await this.walletClient.sendTransaction({
      to: toAddr,
      value,
    });

    // Wait for transaction to be mined
    if (wait) {
      const receipt = await this.publicClient.waitForTransactionReceipt({
        hash,
      });
      if (receipt.status === "reverted") {
        throw new Error(`Faucet transaction failed: ${hash}`);
      }
    }

    return hash;
  }
}
