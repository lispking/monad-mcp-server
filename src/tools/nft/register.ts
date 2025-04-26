import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { registerQueryNftTool } from "./query";

export function registerNftTool(server: McpServer) {
    registerQueryNftTool(server);
}
