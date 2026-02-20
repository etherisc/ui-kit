import * as React from "react";
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import "@testing-library/jest-dom";

import { Sonner } from "./Sonner";

// Simple mock for sonner
vi.mock("sonner", () => ({
  Toaster: ({
    children,
    ...props
  }: React.PropsWithChildren<Record<string, unknown>>) => (
    <div data-testid="sonner-toaster" {...props}>
      {children}
    </div>
  ),
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
    loading: vi.fn(),
    promise: vi.fn(),
    dismiss: vi.fn(),
  },
}));

describe("Sonner", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Sonner Component", () => {
    it("renders with default props", () => {
      render(<Sonner />);

      const toaster = screen.getByTestId("sonner-toaster");
      expect(toaster).toBeInTheDocument();
    });

    it("renders with custom className", () => {
      render(<Sonner className="custom-class" />);

      const toaster = screen.getByTestId("sonner-toaster");
      expect(toaster).toHaveClass("custom-class");
    });

    it("passes props to underlying Toaster", () => {
      render(<Sonner position="top-left" richColors={true} />);

      const toaster = screen.getByTestId("sonner-toaster");
      expect(toaster).toBeInTheDocument();
      // Props are passed through to the underlying component
    });
  });

  describe("Toast Functions", () => {
    it("exports toast functions", async () => {
      // Test that the functions are exported and can be imported
      const { success, error, warning, info, loading, dismiss, dismissAll } =
        await import("./Sonner");

      expect(typeof success).toBe("function");
      expect(typeof error).toBe("function");
      expect(typeof warning).toBe("function");
      expect(typeof info).toBe("function");
      expect(typeof loading).toBe("function");
      expect(typeof dismiss).toBe("function");
      expect(typeof dismissAll).toBe("function");
    });
  });

});
