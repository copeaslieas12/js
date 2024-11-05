import { getThirdwebClient } from "@/constants/thirdweb.server";
import { defineDashboardChain } from "lib/defineDashboardChain";
import { notFound } from "next/navigation";
import { getContract, toTokens } from "thirdweb";
import { getContractMetadata } from "thirdweb/extensions/common";
import { getCurrencyMetadata } from "thirdweb/extensions/erc20";
import {
  getActiveClaimCondition as getActiveClaimCondition721,
  getNFT as getNFT721,
} from "thirdweb/extensions/erc721";
import {
  getActiveClaimCondition as getActiveClaimCondition1155,
  getNFT as getNFT1155,
} from "thirdweb/extensions/erc1155";
import { NftMint } from "./mint-ui";

type DropPageData = {
  slug: string;
  contractAddress: string;
  chainId: number;
  hideQuantitySelector?: boolean;
  hideMintToCustomAddress?: boolean;
  // If not defined, we will use the image of the NFT or contract's image
  thumbnail?: string;
} & ({ type: "erc1155"; tokenId: bigint } | { type: "erc721" });

export const DROP_PAGES: DropPageData[] = [
  {
    slug: "test",
    type: "erc1155",
    contractAddress: "0xBD9d7f15f3C850B35c30b8F9F698B511c20b7263",
    tokenId: 0n,
    chainId: 11155111,
    hideQuantitySelector: true,
    hideMintToCustomAddress: true,
    thumbnail: "/drop/thumbnails/zero-x-thirdweb.mp4",
  },
];

export default async function DropPage({
  params,
}: { params: { slug: string } }) {
  const { slug } = params;

  const project = DROP_PAGES.find((p) => p.slug === slug);

  if (!project) {
    return notFound();
  }
  // eslint-disable-next-line no-restricted-syntax
  const chain = defineDashboardChain(project.chainId, undefined);
  const client = getThirdwebClient();

  const contract = getContract({
    address: project.contractAddress,
    chain,
    client,
  });

  const [nft, claimCondition, contractMetadata] = await Promise.all([
    project.type === "erc1155"
      ? getNFT1155({ contract, tokenId: project.tokenId })
      : getNFT721({ contract, tokenId: 0n }),
    project.type === "erc1155"
      ? getActiveClaimCondition1155({ contract, tokenId: project.tokenId })
      : getActiveClaimCondition721({ contract }),
    getContractMetadata({ contract }),
  ]);

  const currencyMetadata = claimCondition.currency
    ? await getCurrencyMetadata({
        contract: getContract({
          address: claimCondition.currency,
          chain,
          client,
        }),
      })
    : undefined;

  const currencySymbol = currencyMetadata?.symbol || "";
  if (!currencyMetadata?.decimals) {
    return notFound();
  }
  const pricePerToken = Number(
    toTokens(claimCondition.pricePerToken, currencyMetadata.decimals),
  );

  const thumbnail =
    project.thumbnail || nft.metadata.image || contractMetadata.image || "";

  const displayName = contractMetadata.name || nft.metadata.name || "";

  const description =
    contractMetadata.description || nft.metadata.description || "";

  return (
    <NftMint
      contract={contract}
      displayName={displayName || ""}
      thumbnail={thumbnail}
      description={description || ""}
      currencySymbol={currencySymbol}
      pricePerToken={pricePerToken}
      {...project}
    />
  );
}
