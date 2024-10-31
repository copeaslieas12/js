"use client";

import { lazy } from "react";
import type { ThirdwebContract } from "thirdweb";
import type { Account } from "thirdweb/wallets";
import ClaimableModule from "./claimable";
import { ModuleCardUI, type ModuleCardUIProps } from "./module-card";

const MintableModule = lazy(() => import("./Mintable"));
const TransferableModule = lazy(() => import("./Transferable"));
const RoyaltyModule = lazy(() => import("./Royalty"));

export type ModuleInstanceProps = Omit<
  ModuleCardUIProps,
  "children" | "updateButton" | "isOwnerAccount"
> & {
  contract: ThirdwebContract;
  ownerAccount: Account | undefined;
  allModuleContractInfo: {
    name: string;
    description?: string;
    version?: string;
    publisher?: string;
  }[];
};

export function ModuleInstance(props: ModuleInstanceProps) {
  if (props.contractInfo.name.includes("Transferable")) {
    return <TransferableModule {...props} />;
  }

  if (props.contractInfo.name.includes("Mintable")) {
    return <MintableModule {...props} />;
  }

  if (props.contractInfo.name.includes("Royalty")) {
    return <RoyaltyModule {...props} />;
  }

  if (props.contractInfo.name.includes("Claimable")) {
    return <ClaimableModule {...props} />;
  }

  return <ModuleCardUI {...props} isOwnerAccount={!!props.ownerAccount} />;
}
