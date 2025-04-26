/**
 * Monad MCP Server Entry Point
 * 
 * This file serves as the main entry point for the Monad MCP server,
 * orchestrating the initialization of server components and tools.
 */

import { createServer, initializeTransport } from "./config/server";
import { nftProvider } from "./tools/nft";
import { blockProvider } from "./tools/block";
import { walletProvider } from "./tools/wallet";
import { contractProvider } from "./tools/contract";

/**
 * Main function to start the MCP server
 * Initializes server configuration and registers available tools
 */
async function main() {
    try {
        // Create and configure the server
        const server = createServer();

        // Register available tools
        walletProvider(server);
        contractProvider(server);
        nftProvider(server);
        blockProvider(server);

        // Initialize transport layer
        await initializeTransport(server);
    } catch (error) {
        console.error("Fatal error in main():", error);
        process.exit(1);
    }
}

// Start the server
main();
