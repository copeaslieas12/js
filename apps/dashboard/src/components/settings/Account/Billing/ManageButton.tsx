import { Spinner } from "@/components/ui/Spinner/Spinner";
import { Button } from "@/components/ui/button";
import { TrackedLinkTW } from "@/components/ui/tracked-link";
import {
  type Account,
  accountStatus,
  useCreateBillingSession,
} from "@3rdweb-sdk/react/hooks/useApi";
import { useMemo } from "react";
import { useTrack } from "../../../../hooks/analytics/useTrack";

interface ManageBillingButtonProps {
  account: Account;
  loading?: boolean;
  loadingText?: string;
  onClick?: () => void;
}

export const ManageBillingButton: React.FC<ManageBillingButtonProps> = ({
  account,
  loading,
  loadingText,
  onClick,
}) => {
  const trackEvent = useTrack();

  const [buttonLabel, buttonText] = useMemo(() => {
    switch (account.status) {
      case accountStatus.invalidPayment:
      case accountStatus.validPayment: {
        return ["manage", "Manage billing"];
      }
      case accountStatus.paymentVerification: {
        return ["verifyPaymentMethod", "Verify your payment method →"];
      }
      case accountStatus.invalidPaymentMethod: {
        return ["addAnotherPayment", "Add another payment method →"];
      }
      default: {
        return ["addPayment", "Add payment method"];
      }
    }
  }, [account.status]);

  const query = useCreateBillingSession(buttonLabel === "manage");
  const url = useMemo(() => {
    switch (buttonLabel) {
      case "verifyPaymentMethod":
        return account.stripePaymentActionUrl;
      case "manage":
        return query.data?.url;
    }
  }, [query.data, buttonLabel, account.stripePaymentActionUrl]);

  if (url) {
    return (
      <Button asChild>
        <TrackedLinkTW href={url} category="billingAccount" label={buttonLabel}>
          {buttonText}
        </TrackedLinkTW>
      </Button>
    );
  }

  return (
    <Button
      disabled={loading || !onClick}
      onClick={(e) => {
        trackEvent({
          category: "billingAccount",
          label: buttonLabel,
          action: "click",
        });

        if (loading) {
          e.preventDefault();
          return;
        }

        if (!["verifyPaymentMethod", "manage"].includes(buttonLabel)) {
          e.preventDefault();
          onClick?.();
        }
      }}
      className="gap-2"
    >
      {loading && <Spinner className="size-4" />}
      {loading ? loadingText : buttonText}
    </Button>
  );
};
