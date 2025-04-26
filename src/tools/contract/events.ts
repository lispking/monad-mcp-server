/**
 * Tool implementation for listening to smart contract events on Monad testnet
 */

import { z } from "zod";
import { parseAbiItem } from "viem";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { publicClient } from "../../config/server";

/**
 * Register the event listener tool with the MCP server
 */
export function contractEventProvider(server: McpServer) {
    server.tool(
        "watch-contract-events",
        "Watch for smart contract events on Monad testnet",
        {
            address: z.string().describe("Contract address to watch"),
            eventName: z.string().describe("Name of the event to watch"),
            abi: z.string().describe("Contract ABI"),
            fromBlock: z.string().optional().describe("Start watching from this block number"),
        },
        async ({ address, eventName, abi, fromBlock }) => {
            try {
                const parsedAbi = JSON.parse(abi);
                const eventAbi = parsedAbi.find(
                    (item: any) => item.type === 'event' && item.name === eventName
                );

                if (!eventAbi) {
                    throw new Error(`Event ${eventName} not found in ABI`);
                }

                // Get past events
                const logs = await publicClient.getLogs({
                    address: address as `0x${string}`,
                    event: parseAbiItem(JSON.stringify(eventAbi)) as any,
                    fromBlock: fromBlock ? BigInt(fromBlock) : undefined,
                });

                return {
                    content: [
                        {
                            type: "text",
                            text: `Found ${logs.length} events for ${eventName} at ${address}:\n${JSON.stringify(logs, null, 2)}`,
                        },
                    ],
                };
            } catch (error) {
                return {
                    content: [
                        {
                            type: "text",
                            text: `Failed to watch events. Error: ${error instanceof Error ? error.message : String(error)}`,
                        },
                    ],
                };
            }
        }
    );
}