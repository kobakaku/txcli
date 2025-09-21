import { parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { env } from "@/env";

const argv = await yargs(hideBin(process.argv))
  .option("toAddress", {
    alias: "t",
    type: "string",
    description: "Recipient address",
    demandOption: true,
  })
  .option("etherAmount", {
    alias: "e",
    type: "string",
    description: "Amount of ETH to send",
    demandOption: true,
  })
  .option("nonce", {
    alias: "n",
    type: "number",
    description: "Transaction nonce",
    demandOption: true,
  })
  .parse();

const { toAddress, etherAmount, nonce } = argv;

// Get the account
const account = privateKeyToAccount(env.SENDER_PRIVATE_KEY);

// Sign transaction (no network connection)
const signedTx = await account.signTransaction({
  to: toAddress as `0x${string}`,
  value: parseEther(etherAmount),
  gas: 21000n,
  gasPrice: 1000000000n, // 1 gwei in wei
  nonce,
  chainId: env.CHAIN.id,
});

console.log("Signed transaction:", signedTx);
