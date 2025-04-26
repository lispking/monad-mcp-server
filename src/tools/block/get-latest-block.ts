/**
 * Tool implementation for getting the latest block on Monad testnet
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { publicClient } from "../../config/server";

/**
 * Register the latest block tool with the MCP server
 */
export function getLatestBlockProvider(server: McpServer) {
    server.tool(
        "get-latest-block",
        "Get the latest block on Monad testnet",
        {},
        async () => {
            try {
                const block = await publicClient.getBlock();
                return {
                    content: [
                        {
                            type: "text",
                            text: `Block Number: ${block.number}
                                Hash: ${block.hash}
                                Timestamp: ${block.timestamp}
                                Transaction Count: ${block.transactions.length}
                                Parent Hash: ${block.parentHash}
                                Gas Used: ${block.gasUsed}
                                Gas Limit: ${block.gasLimit}`,
                        },
                    ],
                };
            } catch (error) {
                return {
                    content: [
                        {
                            type: "text",
                            text: `Failed to retrieve the latest block. Error: ${error instanceof Error ? error.message : String(error)}`,
                        },
                    ],
                };
            }
        }
    );
}