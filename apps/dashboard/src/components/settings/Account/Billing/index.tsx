"use client";
import {
  type Account,
  type AccountPlan,
  accountPlan,
  accountStatus,
  useUpdateAccountPlan,
} from "@3rdweb-sdk/react/hooks/useApi";
import { Flex } from "@chakra-ui/react";
import { StepsCard } from "components/dashboard/StepsCard";
import { OnboardingModal } from "components/onboarding/Modal";
import { AccountForm } from "components/settings/Account/AccountForm";
import { ManageBillingButton } from "components/settings/Account/Billing/ManageButton";
import { useTrack } from "hooks/analytics/useTrack";
import { useTxNotifications } from "hooks/useTxNotifications";
import { ExternalLinkIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Heading, Text, TrackedLink } from "tw-components";
import { PLANS } from "utils/pricing";
import { LazyOnboardingBilling } from "../../../onboarding/LazyOnboardingBilling";
import { CouponSection } from "./CouponCard";
import { BillingDowngradeDialog } from "./DowngradeDialog";
import { BillingHeader } from "./Header";
import { BillingPlanCard } from "./PlanCard";
import { BillingPricing } from "./Pricing";

interface BillingProps {
  account: Account;
  teamId: string | undefined;
}

export const Billing: React.FC<BillingProps> = ({ account, teamId }) => {
  const updatePlanMutation = useUpdateAccountPlan(
    account?.plan === accountPlan.free,
  );
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethodSaving, setPaymentMethodSaving] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<AccountPlan | undefined>();
  const trackEvent = useTrack();

  const [stepsCompleted, setStepsCompleted] = useState<
    | undefined
    | {
        account: boolean;
        payment: boolean;
      }
  >();

  const [downgradePlan, setDowngradePlan] = useState<AccountPlan | undefined>();

  const { onSuccess, onError } = useTxNotifications(
    "Billing plan changed.",
    "Failed to change your billing plan.",
  );

  const validPayment = account.status === accountStatus.validPayment;
  const paymentVerification =
    account.status === accountStatus.paymentVerification;
  const invalidPayment = account.status === accountStatus.invalidPayment;

  const handleUpdatePlan = useCallback(
    (plan: AccountPlan, feedback?: string) => {
      const action = downgradePlan ? "downgradePlan" : "upgradePlan";
      setDowngradePlan(undefined);

      trackEvent({
        category: "account",
        action,
        label: "attempt",
      });

      updatePlanMutation.mutate(
        {
          plan,
          feedback,
        },
        {
          onSuccess: () => {
            onSuccess();

            trackEvent({
              category: "account",
              action,
              label: "success",
              data: {
                plan,
                feedback,
              },
            });
          },
          onError: (error) => {
            onError(error);

            trackEvent({
              category: "account",
              action,
              label: "error",
              error,
            });
          },
        },
      );
    },
    [downgradePlan, onError, onSuccess, trackEvent, updatePlanMutation],
  );

  const handlePlanSelect = (plan: AccountPlan) => {
    if (invalidPayment || paymentVerification) {
      return;
    }

    if (!validPayment) {
      setSelectedPlan(plan);
      setIsPaymentModalOpen(true);
      return;
    }
    // downgrade from Growth to Free
    if (plan === accountPlan.free || account.plan === accountPlan.growth) {
      setDowngradePlan(plan);
    } else {
      handleUpdatePlan(plan);
    }
  };

  const handlePaymentAdded = () => {
    setPaymentMethodSaving(true);
    setIsPaymentModalOpen(false);
  };

  const handleDowngradeAlertClose = () => {
    setDowngradePlan(undefined);
  };

  const steps = useMemo(() => {
    if (!stepsCompleted) {
      return [];
    }

    return [
      {
        title: (
          <div className="flex flex-row items-center justify-between gap-2">
            <Heading
              size="label.md"
              opacity={!stepsCompleted.account ? 1 : 0.6}
            >
              Enter billing account info
            </Heading>
            {stepsCompleted.account && (
              <Button
                size="sm"
                variant="link"
                colorScheme="blue"
                fontWeight="normal"
                onClick={() =>
                  setStepsCompleted({ account: false, payment: false })
                }
              >
                Edit
              </Button>
            )}
          </div>
        ),
        description:
          "This information will be used for billing notifications and invoices.",
        completed: stepsCompleted.account,
        children: (
          <AccountForm
            account={account}
            previewEnabled={stepsCompleted.account}
            horizontal
            onSave={() => setStepsCompleted({ account: true, payment: false })}
          />
        ),
        showCompletedChildren: true,
      },
      {
        title: "Add a payment method",
        description: "Click the link below to your payment method.",
        completed: stepsCompleted.payment,
        children: (
          <ManageBillingButton
            account={account}
            loading={paymentMethodSaving}
            loadingText="Verifying payment method"
            onClick={() => setIsPaymentModalOpen(true)}
          />
        ),
      },
    ];
  }, [account, paymentMethodSaving, stepsCompleted]);

  // FIXME: this entire flow needs to be re-worked
  // eslint-disable-next-line no-restricted-syntax
  useEffect(() => {
    if (account) {
      setStepsCompleted({
        account: !!account.email,
        payment: validPayment,
      });
    }
  }, [validPayment, account]);

  // FIXME: this entire flow needs to be re-worked
  // eslint-disable-next-line no-restricted-syntax
  useEffect(() => {
    if (account) {
      const paymentCompleted = validPayment;

      if (paymentCompleted && paymentMethodSaving) {
        // user chose a growth plan before adding a payment method,
        // and didn't have it already set, so update it here when payment
        // method is available.
        if (
          account.plan !== accountPlan.growth &&
          selectedPlan === accountPlan.growth
        ) {
          handleUpdatePlan(selectedPlan);
          setSelectedPlan(undefined);
        }
      }

      if (paymentCompleted || paymentVerification) {
        setPaymentMethodSaving(false);
      }
    }
  }, [
    account,
    validPayment,
    paymentVerification,
    selectedPlan,
    paymentMethodSaving,
    handleUpdatePlan,
  ]);

  const showSteps =
    account.status === accountStatus.noCustomer ||
    account.status === accountStatus.noPayment ||
    account.status === accountStatus.invalidPayment ||
    account.status === accountStatus.invalidPaymentMethod;

  return (
    <Flex flexDir="column" gap={8}>
      <OnboardingModal isOpen={isPaymentModalOpen}>
        <LazyOnboardingBilling
          onSave={handlePaymentAdded}
          onCancel={() => setIsPaymentModalOpen(false)}
        />
      </OnboardingModal>

      {showSteps ? (
        <>
          <StepsCard title="Get started with billing" steps={steps} />
        </>
      ) : (
        <>
          <BillingHeader
            validPayment={validPayment}
            paymentVerification={paymentVerification}
          />
          <BillingPlanCard />
          <AccountForm account={account} disableUnchanged showBillingButton />
        </>
      )}

      <BillingPricing
        plan={account.plan}
        trialPeriodEndedAt={account.trialPeriodEndedAt}
        canTrialGrowth={!account.trialPeriodEndedAt}
        validPayment={validPayment}
        paymentVerification={paymentVerification}
        invalidPayment={invalidPayment}
        loading={paymentMethodSaving || updatePlanMutation.isPending}
        onSelect={handlePlanSelect}
      />

      <TrackedLink
        textAlign="center"
        category="account"
        href="/pricing"
        label="pricing-plans"
        color="blue.500"
        isExternal
      >
        <div className="flex flex-row items-center gap-2">
          <Text color="blue.500">Learn more about thirdweb&apos;s pricing</Text>
          <ExternalLinkIcon className="size-4" />
        </div>
      </TrackedLink>

      {downgradePlan && (
        <BillingDowngradeDialog
          oldPlan={PLANS[account.plan].title}
          newPlan={PLANS[downgradePlan].title}
          oldPlanFeatures={PLANS[account.plan].features}
          onClose={handleDowngradeAlertClose}
          onConfirm={(feedback) => handleUpdatePlan(downgradePlan, feedback)}
          loading={updatePlanMutation.isPending}
        />
      )}

      <CouponSection
        teamId={teamId}
        onAddPayment={() => {
          setIsPaymentModalOpen(true);
        }}
        isPaymentSetup={validPayment}
      />
    </Flex>
  );
};
