import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { deployContractProvider } from "./deploy";
import { contractEventProvider } from "./events";

export function contractProvider(server: McpServer) {
    deployContractProvider(server);
    contractEventProvider(server);
}
