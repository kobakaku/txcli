import {
  Account,
  generatePrivateKey,
  privateKeyToAccount,
} from "viem/accounts";

/**
 * Generate a new account
 * @returns The account
 */
export const generateAccount = (): Account => {
  const privateKey = generatePrivateKey();
  return privateKeyToAccount(privateKey);
};
