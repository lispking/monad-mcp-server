/**
 * Tool implementation for getting MON balance on Monad testnet
 */

import { z } from "zod";
import { formatUnits } from "viem";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { publicClient } from "../config/server";

/**
 * Register the balance tool with the MCP server
 */
export function registerBalanceTool(server: McpServer) {
    server.tool(
        "get-mon-balance",
        "Get MON balance for an address on Monad testnet",
        {
            address: z.string().describe("Monad testnet address to check balance for"),
        },
        async ({ address }) => {
            try {
                const balance = await publicClient.getBalance({
                    address: address as `0x${string}`,
                });
                return {
                    content: [
                        {
                            type: "text",
                            text: `Balance for ${address}: ${formatUnits(balance, 18)} MON`,
                        },
                    ],
                };
            } catch (error) {
                return {
                    content: [
                        {
                            type: "text",
                            text: `Failed to retrieve balance for address: ${address}. Error: ${error instanceof Error ? error.message : String(error)}`,
                        },
                    ],
                };
            }
        }
    );
}