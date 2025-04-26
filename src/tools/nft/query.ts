/**
 * Tool implementation for querying NFT information on Monad testnet
 */

import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { publicClient } from "../../config/server";
import { parseAbi } from "viem";

// ERC721 interface fragments we need
const ERC721_ABI = parseAbi([
    'function ownerOf(uint256 tokenId) external view returns (address)',
    'function tokenURI(uint256 tokenId) external view returns (string)',
]);

/**
 * Register the NFT query tool with the MCP server
 */
export function nftQueryProvider(server: McpServer) {
    server.tool(
        "query-mon-nft",
        "Query NFT information on Monad testnet",
        {
            contractAddress: z.string().describe("NFT contract address"),
            tokenId: z.string().describe("Token ID of the NFT"),
        },
        async ({ contractAddress, tokenId }) => {
            try {
                // Create contract instance
                const contract = {
                    address: contractAddress as `0x${string}`,
                    abi: ERC721_ABI,
                };

                // Get owner and token URI
                const [owner, tokenUri] = await Promise.all([
                    publicClient.readContract({
                        ...contract,
                        functionName: 'ownerOf',
                        args: [BigInt(tokenId)],
                    }),
                    publicClient.readContract({
                        ...contract,
                        functionName: 'tokenURI',
                        args: [BigInt(tokenId)],
                    }),
                ]);

                return {
                    content: [
                        {
                            type: "text",
                            text: `NFT Information:\nContract: ${contractAddress}\nToken ID: ${tokenId}\nOwner: ${owner}\nToken URI: ${tokenUri}`,
                        },
                    ],
                };
            } catch (error) {
                return {
                    content: [
                        {
                            type: "text",
                            text: `Failed to query NFT information. Error: ${error instanceof Error ? error.message : String(error)}`,
                        },
                    ],
                };
            }
        }
    );
}