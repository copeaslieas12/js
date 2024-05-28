import type { Chain } from "../src/types";
export default {
  "chain": "ETH",
  "chainId": 17001,
  "explorers": [
    {
      "name": "Redstone Holesky Explorer",
      "url": "https://explorer.holesky.redstone.xyz",
      "standard": "EIP3091",
      "icon": {
        "url": "ipfs://QmdwQDr6vmBtXmK2TmknkEuZNoaDqTasFdZdu3DRw8b2wt",
        "width": 1000,
        "height": 1628,
        "format": "png"
      }
    }
  ],
  "faucets": [],
  "infoURL": "https://redstone.xyz/docs/network-info",
  "name": "Redstone Holesky Testnet",
  "nativeCurrency": {
    "name": "Redstone Testnet Ether",
    "symbol": "ETH",
    "decimals": 18
  },
  "networkId": 17001,
  "rpc": [
    "https://17001.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://rpc.holesky.redstone.xyz"
  ],
  "shortName": "redstone-holesky",
  "slip44": 1,
  "slug": "redstone-holesky-testnet",
  "status": "deprecated",
  "testnet": true
} as const satisfies Chain;