import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { BadgeContainer } from "../../../../stories/utils";
import { Button } from "../../ui/button";
import { GradientAvatar } from "./GradientAvatar";

const meta = {
  title: "blocks/Avatars/GradientAvatar",
  component: Story,
  parameters: {},
} satisfies Meta<typeof Story>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  args: {},
};

function Story() {
  return (
    <div className="flex flex-col gap-10 p-10">
      <p> All images below are set with size-6 className </p>

      <BadgeContainer label="No Src, No id - Skeleton">
        <GradientAvatar id={undefined} src={undefined} className="size-6" />
      </BadgeContainer>

      <BadgeContainer label="No Src, id=foo - Skeleton">
        <GradientAvatar id={"foo"} src={undefined} className="size-6" />
      </BadgeContainer>

      <BadgeContainer label="Invalid/Empty Src, id=foo - Gradient">
        <GradientAvatar id={"foo"} src={""} className="size-6" />
      </BadgeContainer>

      <BadgeContainer label="Invalid/Empty Src, id=bar - Gradient">
        <GradientAvatar id={"bar"} src={""} className="size-6" />
      </BadgeContainer>

      <BadgeContainer label="Empty/Invalid Src, No id - default fallback">
        <GradientAvatar src="invalid-src" id={undefined} className="size-6" />
      </BadgeContainer>

      <ToggleTest />
    </div>
  );
}

function ToggleTest() {
  const [data, setData] = useState<undefined | { src: string; id: string }>(
    undefined,
  );

  return (
    <div className="relative flex flex-col gap-10 border p-6">
      <Button
        variant="outline"
        onClick={() => {
          if (data) {
            setData(undefined);
          } else {
            setData({
              id: "foo",
              src: "https://picsum.photos/400",
            });
          }
        }}
        className="absolute top-6 right-6 inline-flex"
      >
        Toggle Src
      </Button>

      <p> Src+ID is: {data ? "set" : "not set"} </p>

      <BadgeContainer label="Valid Src">
        <GradientAvatar src={data?.src} id={data?.id} className="size-6" />
      </BadgeContainer>

      <BadgeContainer label="invalid Src">
        <GradientAvatar
          className="size-6"
          src={data ? "invalid-src" : undefined}
          id={undefined}
        />
      </BadgeContainer>
    </div>
  );
}
