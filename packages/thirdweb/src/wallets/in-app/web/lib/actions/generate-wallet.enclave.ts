import type { ThirdwebClient } from "../../../../../client/client.js";
import { getThirdwebBaseUrl } from "../../../../../utils/domains.js";
import { getClientFetch } from "../../../../../utils/fetch.js";
import type { Ecosystem } from "../../types.js";

/**
 * Generate a new enclave wallet using an auth token
 * @internal
 */
export async function generateWallet({
	authToken,
	client,
	ecosystem,
}: {
	client: ThirdwebClient;
	authToken: string;
	ecosystem: Ecosystem;
}) {
	const clientFetch = getClientFetch(client, ecosystem);
	const response = await clientFetch(
		`${getThirdwebBaseUrl("inAppWallet")}/api/v1/enclave-wallet/generate`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-thirdweb-client-id": client.clientId,
				Authorization: `Bearer embedded-wallet-token:${authToken}`,
			},
		},
	);

	if (!response.ok) {
		throw new Error("Failed to generate wallet");
	}

	const { wallet } = (await response.json()) as {
		wallet: {
			address: string;
			type: "enclave";
		};
	};

	return wallet;
}
