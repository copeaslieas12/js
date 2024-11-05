import { Button } from "@/components/ui/button";
import { DotNetIcon } from "components/icons/brand-icons/DotNetIcon";
import { ReactIcon } from "components/icons/brand-icons/ReactIcon";
import { TypeScriptIcon } from "components/icons/brand-icons/TypeScriptIcon";
import { UnityIcon } from "components/icons/brand-icons/UnityIcon";
import { UnrealIcon } from "components/icons/brand-icons/UnrealIcon";
import { DocLink } from "components/shared/DocLink";
import { ArrowRightIcon } from "lucide-react";
import authIcon from "../../../../../../public/assets/tw-icons/auth.svg";
import accountAbstractionIcon from "../../../../../../public/assets/tw-icons/account-abstraction.svg";
import payIcon from "../../../../../../public/assets/tw-icons/pay.svg";
import walletsIcon from "../../../../../../public/assets/tw-icons/wallets.svg";
import socialAuthIcon from "../../../../../../public/assets/tw-icons/social-auth.svg";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function EmptyState() {
  return (
    <div className="md:h-[770px] py-24 p-6 container flex items-center justify-center">
      <div className="flex-col gap-8 flex items-center group justify-center">
        <div className="flex flex-col gap-6 max-w-[500px] justify-center items-center">
          <AnimatedIcons />
          <div className="text-center flex flex-col gap-0.5">
            <h3 className="text-2xl font-semibold text-foreground">
              Project Overview is Coming Soon
            </h3>
            <p className="text-muted-foreground text-base">
              Understand how usees are interacting with your project in a
              glance.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center items-center">
            <SDKBadge
              icon={TypeScriptIcon}
              label="TypeScript"
              href="https://portal.thirdweb.com/typescript/v5"
            />
            <SDKBadge
              icon={ReactIcon}
              label="React"
              href="https://portal.thirdweb.com/react/v5"
            />
            <SDKBadge
              icon={ReactIcon}
              label="React Native"
              href="https://portal.thirdweb.com/react-native/v5"
            />
            <SDKBadge
              icon={UnityIcon}
              label="Unity"
              href="https://portal.thirdweb.com/unity/v5"
            />
            <SDKBadge
              icon={UnrealIcon}
              label="Unreal"
              href="https://portal.thirdweb.com/unreal-engine"
            />
            <SDKBadge
              icon={DotNetIcon}
              label=".NET"
              href="https://portal.thirdweb.com/dotnet"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="https://portal.thirdweb.com/connect" target="_blank">
              View Docs
            </Link>
          </Button>
          <Button asChild variant="primary">
            <Link href="https://thirdweb.com/dashboard/settings/api-keys">
              Get Started
              <ArrowRightIcon className="size-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function AnimatedIcons() {
  return (
    <div className="flex -space-x-2">
      <Icon
        icon={walletsIcon}
        className="z-[0] -rotate-[16deg] group-hover:-rotate-[32deg] scale-1 group-hover:scale-[1.2] translate-x-[0px] group-hover:-translate-x-[44px] translate-y-[0px] group-hover:-translate-y-[12px]"
      />
      <Icon
        icon={payIcon}
        className="z-[1] -rotate-[12deg] group-hover:-rotate-[24deg] scale-1 group-hover:scale-[1.2] translate-x-[0px] group-hover:-translate-x-[28px] -translate-y-[12px] group-hover:-translate-y-[40px]"
      />
      <Icon
        icon={authIcon}
        className="z-[2] scale-1 group-hover:scale-[1.2] -translate-y-[16px] group-hover:-translate-y-[52px]"
      />
      <Icon
        icon={accountAbstractionIcon}
        className="z-[1] rotate-[12deg] group-hover:rotate-[24deg] scale-1 group-hover:scale-[1.2] translate-x-[0px] group-hover:translate-x-[28px] -translate-y-[12px] group-hover:-translate-y-[40px]"
      />
      <Icon
        icon={socialAuthIcon}
        className="z-[0] rotate-[16deg] group-hover:rotate-[32deg] scale-1 group-hover:scale-[1.2] translate-x-[0px] group-hover:translate-x-[44px] translate-y-[0px] group-hover:-translate-y-[12px]"
      />
    </div>
  );
}

function Icon({
  icon,
  className,
}: {
  icon: StaticImageData;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border rounded-xl size-10 flex items-center justify-center bg-background transition-all duration-200 ease-in-out",
        className,
      )}
    >
      <Image
        src={icon}
        alt=""
        width={24}
        height={24}
        className="rounded-full"
      />
    </div>
  );
}

function SDKBadge({
  icon,
  label,
  href,
}: { icon: React.FC<{ className?: string }>; label: string; href: string }) {
  return (
    <div className="py-1 px-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800">
      <DocLink link={href} label={label} icon={icon} />
    </div>
  );
}
