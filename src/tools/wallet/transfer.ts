/**
 * Tool implementation for sending MON transactions on Monad testnet
 */

import { z } from "zod";
import { parseEther } from "viem";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createWallet } from "../../config/server";

/**
 * Register the transaction tool with the MCP server
 */
export function sendMonProvider(server: McpServer) {
    server.tool(
        "send-mon-transaction",
        "Send MON transaction on Monad testnet",
        {
            to: z.string().describe("Recipient address"),
            amount: z.string().describe("Amount of MON to send"),
        },
        async ({ to, amount }) => {
            try {
                // Create wallet client
                const client = await createWallet();

                // Send transaction
                const hash = await client.sendTransaction({
                    to: to as `0x${string}`,
                    value: parseEther(amount),
                });

                return {
                    content: [
                        {
                            type: "text",
                            text: `Transaction sent successfully! Hash: ${hash}`,
                        },
                    ],
                };
            } catch (error) {
                return {
                    content: [
                        {
                            type: "text",
                            text: `Failed to send transaction. Error: ${error instanceof Error ? error.message : String(error)}`,
                        },
                    ],
                };
            }
        }
    );
}