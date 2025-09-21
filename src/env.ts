import { z } from "zod";
import * as chains from "viem/chains";
import { hexPrefixedSchema } from "@/schema";

const getChainById = (chainId: number): chains.Chain => {
  const chain = Object.values(chains).find((c) => c.id === chainId);
  if (!chain) {
    throw new Error(`ChainId ${chainId} not found`);
  }
  return chain;
};

const envSchema = z.object({
  RPC_URL: z.url(),
  CHAIN_ID: z.string().transform((val) => Number.parseInt(val, 10)),
  SENDER_PRIVATE_KEY: hexPrefixedSchema,
});

const parsedEnv = envSchema.parse(process.env);

export const env = {
  ...parsedEnv,
  CHAIN: getChainById(parsedEnv.CHAIN_ID),
};
