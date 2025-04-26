/**
 * Server configuration and initialization
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createPublicClient, createWalletClient, http } from "viem";
import { monadTestnet } from "viem/chains";
import { privateKeyToAccount } from 'viem/accounts';

import dotenv from 'dotenv';
dotenv.config();

// Create a public client to interact with the Monad testnet
export const publicClient = createPublicClient({
  chain: monadTestnet,
  transport: http(),
});

/**
 * Create and configure the MCP server
 */
export function createServer() {
  return new McpServer({
    name: "monad-testnet",
    version: "1.0.0",
    capabilities: [
      "get-mon-balance",
      "send-mon-transaction",
      "deploy-mon-contract",
      "watch-contract-events",
      "query-mon-nft",
      "get-latest-block",
      "get-block-by-number",
    ],
  });
}

/**
 * Initialize the server transport layer
 */
export async function initializeTransport(server: McpServer) {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Monad testnet MCP Server running on stdio");
}

export async function createWallet() {
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    throw new Error('PRIVATE_KEY environment variable is not set');
  }
  const account = privateKeyToAccount(privateKey as `0x${string}`);
  const client = createWalletClient({ account, chain: monadTestnet, transport: http() });
  return client;
}
