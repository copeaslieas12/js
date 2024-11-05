"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useThirdwebClient } from "@/constants/thirdweb.client";
import { CustomConnectWallet } from "@3rdweb-sdk/react/components/connect-wallet";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import type React from "react";
import { toast } from "sonner";
import type { ThirdwebContract } from "thirdweb";
import { ClaimButton, MediaRenderer, useActiveAccount } from "thirdweb/react";
type Props = {
  contract: ThirdwebContract;
  displayName: string;
  description: string;
  thumbnail: string;
  pricePerToken: number;
  currencySymbol: string | null;
  hideQuantitySelector?: boolean;
  hideMintToCustomAddress?: boolean;
} & ({ type: "erc1155"; tokenId: bigint } | { type: "erc721" });

export function NftMint(props: Props) {
  const [isMinting, setIsMinting] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [useCustomAddress, setUseCustomAddress] = useState(false);
  const [customAddress, setCustomAddress] = useState("");
  const account = useActiveAccount();
  const client = useThirdwebClient();

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1); // Assuming a max of 10 NFTs can be minted at once
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    if (!Number.isNaN(value)) {
      setQuantity(Math.min(Math.max(1, value)));
    }
  };
  return (
    <div className="mx-4 my-16 flex flex-col items-center justify-center transition-colors duration-200">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="relative mb-4 aspect-square overflow-hidden rounded-lg">
            <MediaRenderer
              client={client}
              className="h-full w-full object-cover"
              alt=""
              src={props.thumbnail}
            />
            <Badge className="absolute top-2 right-2">
              {props.pricePerToken} {props.currencySymbol}/each
            </Badge>
          </div>
          <h2 className="mb-2 font-bold text-2xl">{props.displayName}</h2>
          <p className="mb-4 text-muted-foreground">{props.description}</p>
          {!props.hideQuantitySelector && (
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="rounded-r-none"
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-28 rounded-none border-x-0 pl-6 text-center"
                  min="1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={increaseQuantity}
                  aria-label="Increase quantity"
                  className="rounded-l-none"
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
              <div className="pr-1 font-semibold text-base">
                Total: {props.pricePerToken * quantity} {props.currencySymbol}
              </div>
            </div>
          )}

          {!props.hideMintToCustomAddress && (
            <div className="mb-4 flex items-center space-x-2">
              <Switch
                id="custom-address"
                checked={useCustomAddress}
                onCheckedChange={setUseCustomAddress}
              />
              <Label
                htmlFor="custom-address"
                className={`${useCustomAddress ? "" : "text-gray-400"} cursor-pointer`}
              >
                Mint to a custom address
              </Label>
            </div>
          )}
          {useCustomAddress && (
            <div className="mb-4">
              <Input
                id="address-input"
                type="text"
                placeholder="Enter recipient address"
                value={customAddress}
                onChange={(e) => setCustomAddress(e.target.value)}
                className="w-full"
              />
            </div>
          )}
        </CardContent>
        <CardFooter>
          {account ? (
            <ClaimButton
              style={{ width: "100%" }}
              contractAddress={props.contract.address}
              chain={props.contract.chain}
              client={props.contract.client}
              claimParams={
                props.type === "erc1155"
                  ? {
                      type: "ERC1155",
                      tokenId: props.tokenId,
                      quantity: BigInt(quantity),
                      to: customAddress,
                      from: account.address,
                    }
                  : props.type === "erc721"
                    ? {
                        type: "ERC721",
                        quantity: BigInt(quantity),
                        to: customAddress,
                        from: account.address,
                      }
                    : {
                        type: "ERC20",
                        quantity: String(quantity),
                        to: customAddress,
                        from: account.address,
                      }
              }
              disabled={isMinting}
              onTransactionSent={() => {
                toast.loading("Minting NFT");
                setIsMinting(true);
              }}
              onTransactionConfirmed={() => {
                toast.success("Minted successfully");
                setIsMinting(false);
              }}
              onError={(err) => {
                toast.error(err.message);
                setIsMinting(false);
              }}
            >
              {quantity > 1 ? `Mint ${quantity} NFTs` : "Mint"}
            </ClaimButton>
          ) : (
            <CustomConnectWallet
              loginRequired={false}
              connectButtonClassName="!w-full !rounded !bg-primary !text-primary-foreground !px-4 !py-2 !text-sm"
            />
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
