import type { Chain } from "../src/types";
export default {
  "chain": "ETH",
  "chainId": 22222,
  "explorers": [
    {
      "name": "Nautscan",
      "url": "https://nautscan.com",
      "standard": "EIP3091"
    }
  ],
  "faucets": [],
  "infoURL": "https://docs.nautchain.xyz",
  "name": "Nautilus Mainnet",
  "nativeCurrency": {
    "name": "Zebec",
    "symbol": "ZBC",
    "decimals": 18
  },
  "networkId": 22222,
  "rpc": [
    "https://22222.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://api.nautilus.nautchain.xyz"
  ],
  "shortName": "NAUTCHAIN",
  "slug": "nautilus",
  "testnet": false
} as const satisfies Chain;