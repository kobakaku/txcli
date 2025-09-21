declare namespace NodeJS {
    interface ProcessEnv {
      RPC_URL: string;
      CHAIN_ID: string;
      SENDER_PRIVATE_KEY: string;
  }
}