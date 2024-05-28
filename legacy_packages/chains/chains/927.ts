import type { Chain } from "../src/types";
export default {
  "chain": "Yidark",
  "chainId": 927,
  "explorers": [
    {
      "name": "Yidarkscan",
      "url": "https://yidarkscan.com",
      "standard": "EIP3091"
    }
  ],
  "faucets": [],
  "infoURL": "https://yidarkscan.com",
  "name": "Yidark Chain Mainnet",
  "nativeCurrency": {
    "name": "Yidark",
    "symbol": "YDK",
    "decimals": 18
  },
  "networkId": 927,
  "rpc": [
    "https://927.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://rpc.yidark.io"
  ],
  "shortName": "ydk",
  "slug": "yidark-chain",
  "testnet": false
} as const satisfies Chain;