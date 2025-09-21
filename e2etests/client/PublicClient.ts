import {
  Chain,
  createPublicClient,
  Hex,
  http,
  TransactionReceipt,
  Account,
} from "viem";

export interface IPublicClient {
  getNonce(): Promise<number>;
  getBalance(): Promise<bigint>;
  broadcast(signedTx: Hex, wait?: boolean): Promise<Hex>;
  waitForTransactionReceipt(hash: Hex): Promise<TransactionReceipt>;
  address: Hex;
}

export class PublicClient implements IPublicClient {
  private readonly account: Account;
  private readonly client: ReturnType<typeof createPublicClient>;

  constructor(account: Account, rpcUrl: string, chain: Chain) {
    this.account = account;
    this.client = createPublicClient({
      transport: http(rpcUrl),
      chain,
    });
  }

  /**
   * Get the latest nonce for the account
   * @returns The latest nonce
   */
  async getNonce(): Promise<number> {
    return await this.client.getTransactionCount({
      address: this.account.address,
      blockTag: "pending",
    });
  }

  /**
   * Get the balance of the account
   * @returns The balance of the account
   */
  async getBalance(): Promise<bigint> {
    return await this.client.getBalance({
      address: this.account.address,
    });
  }

  /**
   * Broadcast a signed transaction
   * @param signedTx - The signed transaction to broadcast
   * @param wait - Whether to wait for the transaction to be mined
   * @returns The hash of the transaction
   */
  async broadcast(signedTx: Hex, wait: boolean = true): Promise<Hex> {
    const hash = await this.client.sendRawTransaction({
      serializedTransaction: signedTx,
    });

    if (wait) {
      await this.waitForTransactionReceipt(hash);
    }

    return hash;
  }

  /**
   * Wait for a transaction receipt
   * @param hash - The hash of the transaction to wait for
   * @returns The transaction receipt
   */
  async waitForTransactionReceipt(hash: Hex): Promise<TransactionReceipt> {
    return await this.client.waitForTransactionReceipt({ hash });
  }

  get address(): Hex {
    return this.account.address;
  }
}
