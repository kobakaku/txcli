import { describe, it, expect, beforeAll } from "vitest";
import { Hex, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { FaucetClient, IFaucetClient } from "@/e2etests/client/FaucetClient";
import { IPublicClient, PublicClient } from "@/e2etests/client/PublicClient";
import { FAUCET_PRIVATE_KEY, RPC_URL } from "@/e2etests/const";
import { env } from "@/env";
import { signTx } from "@/e2etests/helpers/signTx";
import { generateAccount } from "@/e2etests/helpers/account";

const SEND_VALUE = parseEther("0.01");

describe("txcli", () => {
  let sender: IPublicClient;
  let receiver: IPublicClient;
  let faucet: IFaucetClient;

  beforeAll(async () => {
    const senderAccount = privateKeyToAccount(env.SENDER_PRIVATE_KEY);
    const receiverAccount = generateAccount();

    sender = new PublicClient(senderAccount, RPC_URL, env.CHAIN);
    receiver = new PublicClient(receiverAccount, RPC_URL, env.CHAIN);
    faucet = new FaucetClient(FAUCET_PRIVATE_KEY, RPC_URL, env.CHAIN, sender);

    // Sender needs some ether to send to receiver
    await faucet.sendEther(sender.address, parseEther("1"));
  }, 20_000);

  it("should send ether from sender to receiver", async () => {
    const beforeBalance = await receiver.getBalance();

    // Create and broadcast the transaction
    const signedTx = await createSignedTx(SEND_VALUE);
    await sender.broadcast(signedTx);

    // Check that the receiver's balance has increased by the amount of ether sent
    const afterBalance = await receiver.getBalance();
    expect(afterBalance).toBe(beforeBalance + SEND_VALUE);
  }, 20_000);

  async function createSignedTx(amount: bigint): Promise<Hex> {
    const nonce = await sender.getNonce();
    return await signTx(receiver.address, amount, nonce);
  }
});
