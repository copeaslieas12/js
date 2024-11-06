import type { Meta, StoryObj } from "@storybook/react";
import { BadgeContainer } from "stories/utils";
import { CombinedBarChartCard } from "./CombinedBarChartCard";

const meta = {
  title: "project/Overview/CombinedBarChart",
  component: Component,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

const chartConfig = {
  dailyUsers: {
    label: "Daily Active Users",
    color: "hsl(var(--chart-1))",
  },
  monthlyUsers: {
    label: "Monthly Active Users",
    color: "hsl(var(--chart-2))",
  },
};

const generateTimeSeriesData = (days: number) => {
  const data = [];
  const today = new Date();

  let dailyBase = 1000;
  let monthlyBase = 5000;

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Add some random variation
    const dailyVariation = Math.random() * 200 - 100;
    const monthlyVariation = Math.random() * 500 - 250;

    // Trend upwards slightly
    dailyBase += 10;
    monthlyBase += 50;

    data.push({
      date: date.toISOString(),
      dailyUsers: Math.max(0, Math.round(dailyBase + dailyVariation)),
      monthlyUsers: Math.max(0, Math.round(monthlyBase + monthlyVariation)),
    });
  }

  return data;
};

function Component() {
  return (
    <div className="py-8 container max-w-[1000px] space-y-8">
      <BadgeContainer label="Daily Users View">
        <CombinedBarChartCard
          title="User Activity"
          chartConfig={chartConfig}
          data={generateTimeSeriesData(30)}
          activeChart="dailyUsers"
        />
      </BadgeContainer>

      <BadgeContainer label="Monthly Users View">
        <CombinedBarChartCard
          title="User Activity"
          chartConfig={chartConfig}
          data={generateTimeSeriesData(30)}
          activeChart="monthlyUsers"
        />
      </BadgeContainer>
    </div>
  );
}
