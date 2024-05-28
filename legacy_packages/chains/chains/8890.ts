import type { Chain } from "../src/types";
export default {
  "chain": "ORE",
  "chainId": 8890,
  "explorers": [
    {
      "name": "ORE Testnet Explorer",
      "url": "https://testnet.oreniumscan.org",
      "standard": "none"
    }
  ],
  "faucets": [
    "https://faucetcoin.orenium.org"
  ],
  "infoURL": "https://orenium.org",
  "name": "Orenium Testnet Protocol",
  "nativeCurrency": {
    "name": "ORENIUM",
    "symbol": "tORE",
    "decimals": 18
  },
  "networkId": 8890,
  "rpc": [
    "https://8890.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://rpc-dev-testnet.orenium.org/",
    "https://rpc-testnet.orenium.org/",
    "https://rpc-orc.oredex.finance",
    "https://testnet-rpc.oredex.finance",
    "https://oredex-node.oredex.finance"
  ],
  "shortName": "tore",
  "slip44": 1,
  "slug": "orenium-testnet-protocol",
  "testnet": true
} as const satisfies Chain;