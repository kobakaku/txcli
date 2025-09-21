import { formatEther, Hex } from "viem";

/**
 * Sign a transaction using the txcli {@link @/main.ts}
 * @param toAddress - The address to send the transaction to
 * @param etherAmount - The amount of ether to send
 * @param nonce - The nonce to use for the transaction
 * @returns The signed transaction
 */
export const signTx = async (
  toAddress: Hex,
  etherAmount: bigint,
  nonce: number,
): Promise<Hex> => {
  const logs: string[] = [];
  const originalLog = console.log;
  console.log = (...args: any[]) => {
    logs.push(args.join(" "));
  };

  // Run the app
  process.argv = [
    "bun",
    "main.ts",
    "--toAddress",
    toAddress,
    "--etherAmount",
    formatEther(etherAmount),
    "--nonce",
    nonce.toString(),
  ];
  await import("@/main");

  // Restore console.log
  console.log = originalLog;

  // Find the signed transaction in the logs
  const signedTxLog = logs.find((log) => log.includes("Signed transaction:"));
  const signedTx = signedTxLog?.replace("Signed transaction: ", "");

  if (!signedTx) {
    throw new Error("No signed transaction found");
  }

  // Return the signed transaction
  return signedTx as Hex;
};
