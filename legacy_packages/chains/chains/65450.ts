import type { Chain } from "../src/types";
export default {
  "chain": "SCOLWEI",
  "chainId": 65450,
  "explorers": [
    {
      "name": "Scolscan Explorer",
      "url": "https://explorer.scolcoin.com",
      "standard": "EIP3091"
    }
  ],
  "faucets": [],
  "infoURL": "https://scolcoin.com",
  "name": "Scolcoin Mainnet",
  "nativeCurrency": {
    "name": "Scolcoin",
    "symbol": "SCOL",
    "decimals": 18
  },
  "networkId": 65450,
  "rpc": [
    "https://65450.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://mainnet-rpc.scolcoin.com"
  ],
  "shortName": "SRC",
  "slug": "scolcoin",
  "testnet": false
} as const satisfies Chain;