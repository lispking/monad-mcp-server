/**
 * Tool implementation for deploying smart contracts on Monad testnet
 */

import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createWallet } from '../../config/server';

/**
 * Register the contract deployment tool with the MCP server
 */
export function deployContractProvider(server: McpServer) {
    server.tool(
        "deploy-mon-contract",
        "Deploy a smart contract on Monad testnet",
        {
            bytecode: z.string().describe("Contract bytecode"),
            abi: z.string().describe("Contract ABI"),
            constructorArgs: z.array(z.any()).optional().describe("Constructor arguments"),
        },
        async ({ bytecode, abi, constructorArgs }) => {
            try {
                // Create wallet client
                const client = await createWallet();

                // Deploy contract
                const hash = await client.deployContract({
                    abi: JSON.parse(abi),
                    bytecode: bytecode as `0x${string}`,
                    args: constructorArgs || [],
                });

                return {
                    content: [
                        {
                            type: "text",
                            text: `Contract deployment transaction sent! Hash: ${hash}`,
                        },
                    ],
                };
            } catch (error) {
                return {
                    content: [
                        {
                            type: "text",
                            text: `Failed to deploy contract. Error: ${error instanceof Error ? error.message : String(error)}`,
                        },
                    ],
                };
            }
        }
    );
}