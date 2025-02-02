import { DashboardTypeCookieSetter } from "@/components/DashboardTypeCookieSetter";
import { AppFooter } from "@/components/blocks/app-footer";
import { TWAutoConnect } from "../../components/autoconnect";

export default function RootTeamLayout(props: {
  children: React.ReactNode;
  params: Promise<{ team_slug: string }>;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex grow flex-col">{props.children}</div>
      <TWAutoConnect />
      <AppFooter />
      <DashboardTypeCookieSetter type="team" />
    </div>
  );
}
