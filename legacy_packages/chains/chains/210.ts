import type { Chain } from "../src/types";
export default {
  "chain": "BTN",
  "chainId": 210,
  "explorers": [
    {
      "name": "Bitnet Explorer",
      "url": "https://btnscan.com",
      "standard": "EIP3091"
    }
  ],
  "faucets": [],
  "infoURL": "https://bitnet.money",
  "name": "Bitnet",
  "nativeCurrency": {
    "name": "Bitnet",
    "symbol": "BTN",
    "decimals": 18
  },
  "networkId": 210,
  "rpc": [
    "https://210.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://rpc.bitnet.money",
    "https://rpc.btnscan.com"
  ],
  "shortName": "BTN",
  "slug": "bitnet",
  "testnet": false
} as const satisfies Chain;