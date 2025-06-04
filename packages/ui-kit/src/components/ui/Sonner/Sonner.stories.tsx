import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
  Sonner,
  success,
  error,
  warning,
  info,
  loading,
  dismissAll,
  promise as toastPromise,
} from "./Sonner";
import { Button } from "../button";

const meta = {
  title: "Components/Sonner",
  component: Sonner,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Enhanced toast notification system powered by Sonner. Provides better UX with smooth animations, rich content support, and improved accessibility. Maintains backwards compatibility with existing toast APIs.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    theme: {
      control: "select",
      options: ["light", "dark", "system"],
    },
    position: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
    },
    richColors: {
      control: "boolean",
    },
    expand: {
      control: "boolean",
    },
    visibleToasts: {
      control: { type: "number", min: 1, max: 10 },
    },
  },
} satisfies Meta<typeof Sonner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="space-y-4">
      <Sonner {...args} />
      <div className="space-y-2">
        <Button
          onClick={() =>
            success("Default Toast", {
              description: "This is a basic toast message.",
            })
          }
        >
          Show Default Toast
        </Button>
        <p className="text-sm text-muted-foreground">
          Click the button to see a basic toast notification.
        </p>
      </div>
    </div>
  ),
  args: {
    theme: "system",
    position: "bottom-right",
    richColors: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Sonner />
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={() =>
            success("Success!", {
              description: "Operation completed successfully.",
            })
          }
          variant="default"
        >
          Success Toast
        </Button>
        <Button
          onClick={() =>
            error("Error!", { description: "Something went wrong." })
          }
          variant="destructive"
        >
          Error Toast
        </Button>
        <Button
          onClick={() =>
            warning("Warning!", { description: "Please be careful." })
          }
          variant="outline"
        >
          Warning Toast
        </Button>
        <Button
          onClick={() =>
            info("Info", { description: "Here's some useful information." })
          }
          variant="secondary"
        >
          Info Toast
        </Button>
        <Button
          onClick={() =>
            loading("Loading...", {
              description: "Please wait while we process.",
            })
          }
          variant="outline"
        >
          Loading Toast
        </Button>
        <Button onClick={() => dismissAll()} variant="ghost">
          Dismiss All
        </Button>
      </div>
    </div>
  ),
};

export const PositionVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <Button
          onClick={() => {
            success("Top Left", { description: "Toast in top-left corner." });
          }}
          size="sm"
        >
          Top Left
        </Button>
        <Button
          onClick={() => {
            success("Top Center", { description: "Toast in top-center." });
          }}
          size="sm"
        >
          Top Center
        </Button>
        <Button
          onClick={() => {
            success("Top Right", { description: "Toast in top-right corner." });
          }}
          size="sm"
        >
          Top Right
        </Button>
        <Button
          onClick={() => {
            success("Bottom Left", {
              description: "Toast in bottom-left corner.",
            });
          }}
          size="sm"
        >
          Bottom Left
        </Button>
        <Button
          onClick={() => {
            success("Bottom Center", {
              description: "Toast in bottom-center.",
            });
          }}
          size="sm"
        >
          Bottom Center
        </Button>
        <Button
          onClick={() => {
            success("Bottom Right", {
              description: "Toast in bottom-right corner.",
            });
          }}
          size="sm"
        >
          Bottom Right
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Note: Position should be set on the Sonner component. This demo shows
        different positions.
      </p>

      {/* Multiple Sonner instances for different positions */}
      <Sonner position="top-left" />
      <Sonner position="top-center" />
      <Sonner position="top-right" />
      <Sonner position="bottom-left" />
      <Sonner position="bottom-center" />
      <Sonner position="bottom-right" />
    </div>
  ),
};

export const PromiseExample: Story = {
  render: () => (
    <div className="space-y-4">
      <Sonner />
      <div className="space-y-2">
        <Button
          onClick={() => {
            const promise = new Promise((resolve, reject) => {
              setTimeout(() => {
                if (Math.random() > 0.5) {
                  resolve("Success!");
                } else {
                  reject("Failed!");
                }
              }, 2000);
            });

            toastPromise(promise, {
              loading: "Saving data...",
              success: "Data saved successfully!",
              error: "Failed to save data.",
            });
          }}
        >
          Async Operation (Random Success/Fail)
        </Button>

        <Button
          onClick={() => {
            const promise = new Promise((resolve) => {
              setTimeout(() => resolve("Upload complete!"), 3000);
            });

            toastPromise(promise, {
              loading: "Uploading file...",
              success: (data) => `Upload successful: ${data}`,
              error: "Upload failed. Please try again.",
            });
          }}
          variant="outline"
        >
          File Upload Simulation
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Promise-based toasts automatically update from loading to success/error
        states.
      </p>
    </div>
  ),
};

export const CustomDuration: Story = {
  render: () => (
    <div className="space-y-4">
      <Sonner />
      <div className="space-y-2">
        <Button
          onClick={() =>
            success("Quick Toast", {
              description: "Disappears in 1 second.",
              duration: 1000,
            })
          }
        >
          1 Second Toast
        </Button>
        <Button
          onClick={() =>
            info("Medium Toast", {
              description: "Disappears in 5 seconds.",
              duration: 5000,
            })
          }
          variant="outline"
        >
          5 Second Toast
        </Button>
        <Button
          onClick={() =>
            warning("Persistent Toast", {
              description: "Stays until manually dismissed.",
              duration: Infinity,
            })
          }
          variant="secondary"
        >
          Persistent Toast
        </Button>
        <Button onClick={() => dismissAll()} variant="ghost">
          Clear All
        </Button>
      </div>
    </div>
  ),
};

export const StackedToasts: Story = {
  render: () => (
    <div className="space-y-4">
      <Sonner visibleToasts={3} expand={true} />
      <div className="space-y-2">
        <Button
          onClick={() => {
            for (let i = 1; i <= 5; i++) {
              setTimeout(() => {
                success(`Toast ${i}`, {
                  description: `This is toast number ${i}`,
                });
              }, i * 200);
            }
          }}
        >
          Create Multiple Toasts
        </Button>
        <Button
          onClick={() => {
            success("Success 1", { description: "First success message" });
            error("Error 1", { description: "First error message" });
            warning("Warning 1", { description: "First warning message" });
            info("Info 1", { description: "First info message" });
            loading("Loading 1", { description: "First loading message" });
          }}
          variant="outline"
        >
          Mixed Toast Types
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        This demo shows toast stacking with expand behavior and visible toast
        limits.
      </p>
    </div>
  ),
};

export const BackwardsCompatibility: Story = {
  render: () => {
    // This would normally use the existing useToast hook pattern
    const showLegacyToast = (type: string) => {
      switch (type) {
        case "success":
          success("Legacy Success", {
            description: "Using new Sonner backend",
          });
          break;
        case "error":
          error("Legacy Error", { description: "Using new Sonner backend" });
          break;
        case "warning":
          warning("Legacy Warning", {
            description: "Using new Sonner backend",
          });
          break;
        case "info":
          info("Legacy Info", { description: "Using new Sonner backend" });
          break;
      }
    };

    return (
      <div className="space-y-4">
        <Sonner />
        <div className="space-y-2">
          <div className="text-sm font-medium">Legacy API Compatibility:</div>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => showLegacyToast("success")} size="sm">
              Legacy Success
            </Button>
            <Button onClick={() => showLegacyToast("error")} size="sm">
              Legacy Error
            </Button>
            <Button onClick={() => showLegacyToast("warning")} size="sm">
              Legacy Warning
            </Button>
            <Button onClick={() => showLegacyToast("info")} size="sm">
              Legacy Info
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Existing toast APIs continue to work with enhanced Sonner backend.
          </p>
        </div>
      </div>
    );
  },
};

export const ThemeVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="text-sm font-medium">Light Theme</div>
        <Sonner theme="light" position="top-left" />
        <Button
          onClick={() =>
            success("Light Theme Toast", {
              description: "This toast uses the light theme.",
            })
          }
        >
          Show Light Toast
        </Button>
      </div>

      <div className="space-y-4 bg-gray-900 p-4 rounded">
        <div className="text-sm font-medium text-white">Dark Theme</div>
        <Sonner theme="dark" position="top-center" />
        <Button
          onClick={() =>
            success("Dark Theme Toast", {
              description: "This toast uses the dark theme.",
            })
          }
          variant="outline"
        >
          Show Dark Toast
        </Button>
      </div>

      <div className="space-y-4">
        <div className="text-sm font-medium">System Theme (Default)</div>
        <Sonner theme="system" position="top-right" />
        <Button
          onClick={() =>
            success("System Theme Toast", {
              description: "This toast adapts to system theme.",
            })
          }
          variant="secondary"
        >
          Show System Toast
        </Button>
      </div>
    </div>
  ),
};

export const RichContent: Story = {
  render: () => (
    <div className="space-y-4">
      <Sonner richColors={true} />
      <div className="space-y-2">
        <Button
          onClick={() =>
            success("Rich Colors Success", {
              description:
                "This uses rich color styling for better visual impact.",
            })
          }
        >
          Rich Colors Success
        </Button>
        <Button
          onClick={() =>
            error("Rich Colors Error", {
              description: "Rich colors make error states more prominent.",
            })
          }
          variant="destructive"
        >
          Rich Colors Error
        </Button>
        <Button
          onClick={() =>
            warning("Rich Colors Warning", {
              description:
                "Warning toasts are more noticeable with rich colors.",
            })
          }
          variant="outline"
        >
          Rich Colors Warning
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Rich colors enhance the visual distinction between different toast
        types.
      </p>
    </div>
  ),
};
