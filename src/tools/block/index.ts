import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { getLatestBlockProvider } from "./get-latest-block";
import { getBlockByNumberProvider } from "./get-block-by-number";

export function blockProvider(server: McpServer) {
    getLatestBlockProvider(server);
    getBlockByNumberProvider(server);
}
