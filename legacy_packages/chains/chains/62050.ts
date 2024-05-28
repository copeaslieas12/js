import type { Chain } from "../src/types";
export default {
  "chain": "ETH",
  "chainId": 62050,
  "explorers": [
    {
      "name": "optopia-scan",
      "url": "https://scan.optopia.ai",
      "standard": "EIP3091"
    }
  ],
  "faucets": [],
  "features": [
    {
      "name": "EIP1559"
    }
  ],
  "infoURL": "https://optopia.ai",
  "name": "Optopia Mainnet",
  "nativeCurrency": {
    "name": "Ether",
    "symbol": "ETH",
    "decimals": 18
  },
  "networkId": 62050,
  "parent": {
    "type": "L2",
    "chain": "eip155-1",
    "bridges": [
      {
        "url": "https://bridge.optopia.ai"
      }
    ]
  },
  "rpc": [
    "https://62050.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://rpc-mainnet.optopia.ai",
    "https://rpc-mainnet-2.optopia.ai"
  ],
  "shortName": "Optopia",
  "slug": "optopia",
  "testnet": false
} as const satisfies Chain;