/**
 * Tool implementation for getting a block by number on Monad testnet
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { publicClient } from "../../config/server";
import { z } from "zod";

/**
 * Register the get block by number tool with the MCP server
 */
export function getBlockByNumberProvider(server: McpServer) {
    server.tool(
        "get-block-by-number",
        "Get a block by number on Monad testnet",
        { "number": z.string().describe("The block number to retrieve"), },
        async (args) => {
            try {
                const block = await publicClient.getBlock({ blockNumber: BigInt(args.number) });
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
                            text: `Failed to retrieve the block. Error: ${error instanceof Error ? error.message : String(error)}`,
                        },
                    ],
                };
            }
        }
    );
}