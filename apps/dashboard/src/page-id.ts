// biome-ignore lint/nursery/noEnum: planned to be removed in the future
export enum PageId {
  // none case (for previous page id)
  None = "none",

  // ---------------------------------------------------------------------------
  //  marketing / growth pages
  // ---------------------------------------------------------------------------
  // thirdweb.com/contact-us
  ContactUs = "contact-us-page",

  // thirdweb.com/templates
  Templates = "templates-page",

  // thirdweb.com/template/[templateId]
  Template = "template-page",

  // thirdweb.com
  OSS = "oss-page",

  // thirdweb..com/pricing
  Pricing = "pricing-page",

  // thirdweb..com/privacy
  Privacy = "privacy-page",

  // thirdweb..com/tos
  ToS = "tos-page",

  // thirdweb.com/contract-extensions
  // ContractExtensionsLanding = "contract-extensions-landing",

  // thirdweb.com/web3-sdk
  Web3SDKLanding = "web3-sdk-landing",

  // thirdweb.com/account-abstraction
  SmartWalletLanding = "smart-wallet-landing",

  // thirdweb.com/embedded-wallets
  EmbeddedWalletsLanding = "embedded-wallets-landing",

  // thirdweb.com/connec
  ConnectLanding = "connect-landing",

  // thirdweb.com/interact
  InteractLanding = "interact-landing",

  // thirdweb.com/auth
  AuthLanding = "auth-landing",

  // thirdweb.com/rpc-edge
  RPCEdgeLanding = "rpc-edge-landing",

  // thirdweb.com/cointracts
  ContractsLanding = "contracts-landing",

  // thirdweb.com/grant/superchain
  GrantSuperChain = "grant-superchain",

  // ---------------------------------------------------------------------------
  //  general product pages
  // ---------------------------------------------------------------------------

  // thirdweb.com/dashboard/infrastructure/storage
  DashboardSettingsStorage = "dashboard-storage",

  // thirdweb.com/dashboard/contracts/build
  DashboardContractsBuild = "dashboard-contracts-build",

  // thirdweb.com/dashboard/contracts
  Contracts = "contracts",

  // thirdweb.com/events
  Events = "events",

  // thirdweb..com/mission
  Mission = "mission",

  // thirdweb.com/gas
  GasEstimator = "gas-estimator",

  // thirdweb.com/404
  PageNotFound = "page-not-found",

  // ---------------------------------------------------------------------------
  //  engine pages
  // ---------------------------------------------------------------------------

  // thirdweb.com/dashboard/engine
  EngineManage = "engine-manage",
  EngineCreate = "engine-create",

  // ---------------------------------------------------------------------------
  //  settings pages
  // ---------------------------------------------------------------------------

  // thirdweb.com/dashboard/settings/api-keys
  SettingsApiKeys = "settings-api-keys",

  // thirdweb.com/dashboard/settings/api-keys/:id
  SettingsApiKey = "settings-api-key",

  // thirdweb.com/dashboard/settings/devices
  SettingsDevices = "settings-devices",
  // thirdweb.com/dashboard/settings/usage
  SettingsUsage = "settings-usage",

  // thirdweb.com/dashboard/settings/notifications
  SettingsNotifications = "settings-notifications",

  // ---------------------------------------------------------------------------
  //  solutions pages
  // ---------------------------------------------------------------------------
  SolutionsChains = "solutions-chains",

  // ---------------------------------------------------------------------------
  //  "publish" product pages
  // ---------------------------------------------------------------------------
  // thirdweb.com/contracts/publish
  PublishMultiple = "publish-multiple-contracts",

  // thirdweb.com/:wallet
  // example: thirdweb.com/jns.eth
  Profile = "profile",

  // ---------------------------------------------------------------------------
  //  "deploy" product pages
  // ---------------------------------------------------------------------------
  // thirdweb.com/contracts/deploy
  DeployMultiple = "deploy-multiple-contracts",

  // thirdweb.com/:network/:contractAddress (evm)
  // example: thirdweb.com/goerli/0x2eaDAa60dBB74Ead3E20b23E4C5A0Dd789932846

  // ---------------------------------------------------------------------------
  //  community pages
  // ---------------------------------------------------------------------------
  Ambassadors = "ambassadors",
  Community = "community",
  StartupProgram = "startup-program",
}
