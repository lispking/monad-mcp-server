import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { nftQueryProvider } from "./query";

export function nftProvider(server: McpServer) {
    nftQueryProvider(server);
}
