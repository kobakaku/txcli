import { z } from "zod";
import type { Hex } from "viem";

export const hexPrefixedSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]+$/, {
    message:
      "Value must be a valid hex string starting with 0x and containing at least one hex character",
  })
  .transform((val) => val as Hex);
