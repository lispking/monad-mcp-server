import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { registerBalanceTool } from "./balance";
import { registerTransactionTool } from "./transaction";

export function registerWalletTool(server: McpServer) {
    registerBalanceTool(server);
    registerTransactionTool(server);
}
