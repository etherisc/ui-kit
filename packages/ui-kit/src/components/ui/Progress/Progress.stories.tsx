import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "UI Components/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100 },
      description: "Progress value (0-100)",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
    className: "w-[300px]",
  },
};

export const Empty: Story = {
  render: () => (
    <div className="w-[300px]">
      <Progress value={0} />
    </div>
  ),
};

export const Half: Story = {
  render: () => (
    <div className="w-[300px]">
      <Progress value={50} />
    </div>
  ),
};

export const Complete: Story = {
  render: () => (
    <div className="w-[300px]">
      <Progress value={100} />
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <div className="w-[300px]">
      <Progress value={null} />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => {
    const progress = 75;
    return (
      <div className="w-[300px] space-y-2">
        <div className="flex justify-between text-sm">
          <span>Loading...</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} />
      </div>
    );
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium">Small (2px)</label>
        <Progress value={60} className="h-2" />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Default (16px)</label>
        <Progress value={60} />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Large (6px)</label>
        <Progress value={60} className="h-6" />
      </div>
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium">Success</label>
        <Progress value={80} className="[&>[role=progressbar]]:bg-green-500" />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Warning</label>
        <Progress value={60} className="[&>[role=progressbar]]:bg-yellow-500" />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium">Danger</label>
        <Progress value={30} className="[&>[role=progressbar]]:bg-red-500" />
      </div>
    </div>
  ),
};

const AnimatedProgress = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-[300px] space-y-2">
      <div className="flex justify-between text-sm">
        <span>Uploading...</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} />
    </div>
  );
};

export const Animated: Story = {
  render: () => <AnimatedProgress />,
};

export const MultipleSteps: Story = {
  render: () => {
    const steps = [
      { label: "Download", progress: 100 },
      { label: "Install", progress: 75 },
      { label: "Configure", progress: 30 },
      { label: "Finish", progress: 0 },
    ];

    return (
      <div className="w-[300px] space-y-4">
        <h3 className="font-medium">Installation Progress</h3>
        {steps.map((step, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{step.label}</span>
              <span>{step.progress}%</span>
            </div>
            <Progress value={step.progress} />
          </div>
        ))}
      </div>
    );
  },
};
