import { useAllContractList } from "@3rdweb-sdk/react/hooks/useRegistry";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { AppLayout } from "components/app-layouts/app";
import {
  useEns,
  usePublishedContractsQuery,
  usePublisherProfile,
} from "components/contract-components/hooks";
import { PublisherSocials } from "components/contract-components/publisher/PublisherSocials";
import { EditProfile } from "components/contract-components/publisher/edit-profile";
import { PublisherAvatar } from "components/contract-components/publisher/masked-avatar";
import { DeployedContracts } from "components/contract-components/tables/deployed-contracts";
import { PublishedContracts } from "components/contract-components/tables/published-contracts";
import { THIRDWEB_DOMAIN } from "constants/urls";
import type { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { ProfileOG } from "og-lib/url-utils";
import { PageId } from "page-id";
import { useEffect, useMemo } from "react";
import { useActiveAccount } from "thirdweb/react";
import { getAddress, isAddress } from "thirdweb/utils";
import { Heading, Text } from "tw-components";
import { getSingleQueryValue } from "utils/router";
import type { ThirdwebNextPage } from "utils/types";
import { shortenIfAddress } from "utils/usedapp-external";

type UserPageProps = {
  profileAddress: string;
};

const UserPage: ThirdwebNextPage = (props: UserPageProps) => {
  const ens = useEns(props.profileAddress);

  const router = useRouter();
  // We do this so it doesn't break for users that haven't updated their CLI

  // TODO: re-visit, do we still need to do this?
  // eslint-disable-next-line no-restricted-syntax
  useEffect(() => {
    const previousPath = router.asPath.split("/")[2];
    if (
      previousPath !== "[profileAddress]" &&
      props.profileAddress?.startsWith("Qm") &&
      !props.profileAddress?.endsWith(".eth")
    ) {
      router.replace(`/contracts/deploy/${previousPath}`);
    }
  }, [props.profileAddress, router]);

  const publisherProfile = usePublisherProfile(ens.data?.address || undefined);

  const displayName = shortenIfAddress(
    ens?.data?.ensName || props.profileAddress,
  ).replace("deployer.thirdweb.eth", "thirdweb.eth");

  const currentRoute = `${THIRDWEB_DOMAIN}${router.asPath}`.replace(
    "deployer.thirdweb.eth",
    "thirdweb.eth",
  );

  const publishedContracts = usePublishedContractsQuery(
    ens.data?.address || undefined,
  );

  const mainnetsContractList = useAllContractList(
    ens.data?.address || props.profileAddress,
    { onlyMainnet: true },
  );

  const address = useActiveAccount()?.address;

  const ogImage = useMemo(() => {
    if (!publisherProfile.data || !publishedContracts.data) {
      return undefined;
    }

    return ProfileOG.toUrl({
      displayName,
      bio: publisherProfile.data?.bio,
      avatar: publisherProfile.data?.avatar || undefined,
      publishedCnt: publishedContracts.data?.length.toString(),
    });
  }, [displayName, publishedContracts.data, publisherProfile.data]);

  return (
    <>
      <NextSeo
        title={displayName}
        description={`Visit ${displayName}'s profile. See their published contracts and deploy them in one click.`}
        openGraph={{
          title: displayName,
          images: ogImage
            ? [
                {
                  url: ogImage.toString(),
                  alt: `${displayName}'s profile on thirdweb.com`,
                  width: 1200,
                  height: 630,
                },
              ]
            : undefined,
          url: currentRoute,
        }}
      />

      <Flex flexDir="column" gap={12}>
        {props.profileAddress && (
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            w="full"
            align="center"
            gap={4}
          >
            <Flex gap={{ base: 4, md: 8 }} align="center" w="full">
              <PublisherAvatar
                address={ens.data?.ensName || props.profileAddress}
                className="size-30"
              />
              <Flex direction="column" gap={0}>
                <Heading
                  as="h1"
                  size="title.xl"
                  color="white"
                  _light={{ color: "black" }}
                  _dark={{ color: "white" }}
                >
                  {displayName}
                </Heading>
                {publisherProfile.data?.bio && (
                  <Text size="body.lg" noOfLines={2}>
                    {publisherProfile.data.bio}
                  </Text>
                )}
                {publisherProfile.data && (
                  <PublisherSocials
                    mt={1}
                    size="md"
                    publisherProfile={publisherProfile.data}
                  />
                )}
              </Flex>
            </Flex>
            {ens.data?.address === address && publisherProfile.data && (
              <Box flexShrink={0}>
                <EditProfile publisherProfile={publisherProfile.data} />
              </Box>
            )}
          </Flex>
        )}
        <Flex flexDir="column" gap={4}>
          <Flex gap={2} direction="column">
            <Heading size="title.md">Published contracts</Heading>
            <Text fontStyle="italic" maxW="container.md">
              All contracts published by this wallet
            </Text>
          </Flex>
          {ens.data?.address && (
            <PublishedContracts address={ens.data?.address} noHeader />
          )}
        </Flex>
        <Flex flexDir="column" gap={4}>
          <Flex
            justify="space-between"
            align="top"
            gap={4}
            direction={{ base: "column", md: "row" }}
          >
            <Flex gap={2} direction="column">
              <Heading size="title.md">Deployed contracts</Heading>
              <Text fontStyle="italic" maxW="container.md">
                The list of contract instances that this wallet has deployed
                across all mainnets
              </Text>
            </Flex>
          </Flex>
          {ens.data?.address && (
            <DeployedContracts
              contractList={mainnetsContractList.data}
              isPending={mainnetsContractList.isPending}
            />
          )}
        </Flex>
      </Flex>
    </>
  );
};
UserPage.getLayout = function getLayout(page, props) {
  return (
    <AppLayout {...props} noSEOOverride>
      {page}
    </AppLayout>
  );
};

// TODO better skeleton needed
UserPage.fallback = (
  <AppLayout noSEOOverride>
    <Flex h="100%" justifyContent="center" alignItems="center">
      <Spinner size="xl" />
    </Flex>
  </AppLayout>
);

UserPage.pageId = PageId.Profile;

export default UserPage;

export const getStaticProps: GetStaticProps<UserPageProps> = async (ctx) => {
  const profileAddress = getSingleQueryValue(
    // biome-ignore lint/suspicious/noExplicitAny: FIXME
    ctx.params as any,
    "profileAddress",
  );

  if (!profileAddress) {
    return {
      redirect: {
        destination: "/explore",
        permanent: false,
      },
    };
  }

  const lowercaseAddress = profileAddress.toLowerCase();
  const checksummedAddress = isAddress(lowercaseAddress)
    ? getAddress(lowercaseAddress)
    : lowercaseAddress;

  return {
    props: {
      profileAddress: checksummedAddress,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    fallback: true,
    paths: [],
  };
};
