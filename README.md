# Monad MCP Server

This MCP server interacts with the Monad testnet and offers a range of capabilities. These include checking MON token balances, sending transactions, deploying smart contracts, and more.

## What is MCP?

The Model Context Protocol (MCP) is a standard that allows AI models to interact with external tools and services. 

## Prerequisites

- Node.js (v16 or later)
- `npm` or `yarn` or `pnpm`
- Claude Desktop

### .env.example Usage

This project uses an `.env.example` file to manage environment variables. To use it, follow these steps:
1. Copy the `.env.example` file and rename it to `.env`.
2. Open the `.env` file and fill in the necessary environment variables according to your needs.
3. Make sure not to commit the `.env` file to the repository to protect your sensitive information.

## Getting Started

1. Clone this repository

```shell
git clone https://github.com/lispking/monad-mcp-server.git
```

2. Install dependencies:

```
pnpm i
```

### Build the project

```shell
pnpm build
```

The server is now ready to use!

### Adding the MCP server Configuration

```json
{
  "mcpServers": {
    ...
    "monad-mcp": {
      "command": "node",
      "args": [
        "/<path-to-project>/build/index.js"
      ]
    }
  }
}
```

## Further Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/introduction)
- [Monad Documentation](https://docs.monad.xyz/)
- [Viem Documentation](https://viem.sh/)

