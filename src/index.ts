/**
 * Monad MCP Server Entry Point
 * 
 * This file serves as the main entry point for the Monad MCP server,
 * orchestrating the initialization of server components and tools.
 */

import { createServer, initializeTransport } from "./config/server";
import { registerDeployTool } from "./tools/deploy";
import { registerEventTool } from "./tools/events";
import { registerNftTool } from "./tools/nft/register";
import { registerBlockTool } from "./tools/block/register";
import { registerWalletTool } from "./tools/wallet/register";

/**
 * Main function to start the MCP server
 * Initializes server configuration and registers available tools
 */
async function main() {
    try {
        // Create and configure the server
        const server = createServer();

        // Register available tools
        registerWalletTool(server);
        registerDeployTool(server);
        registerEventTool(server);
        registerNftTool(server);
        registerBlockTool(server);

        // Initialize transport layer
        await initializeTransport(server);
    } catch (error) {
        console.error("Fatal error in main():", error);
        process.exit(1);
    }
}

// Start the server
main();
