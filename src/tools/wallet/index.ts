import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { balanceProvider } from "./balance";
import { sendMonProvider } from "./transaction";

export function walletProvider(server: McpServer) {
    balanceProvider(server);
    sendMonProvider(server);
}
