import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { registerLatestBlockTool } from "./get-latest-block";
import { registerGetBlockByNumberTool } from "./get-block-by-number";

export function registerBlockTool(server: McpServer) {
    registerLatestBlockTool(server);
    registerGetBlockByNumberTool(server);
}
