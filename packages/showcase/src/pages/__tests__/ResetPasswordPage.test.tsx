import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "@etherisc/ui-kit";
import { ResetPasswordPage } from "../ResetPasswordPage";
import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";

// Mock the useNavigate hook
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock the useToast hook
const mockSuccess = vi.fn();
const mockError = vi.fn();
vi.mock("@etherisc/ui-kit", async () => {
  const actual = await vi.importActual("@etherisc/ui-kit");
  return {
    ...actual,
    useToast: () => ({
      success: mockSuccess,
      error: mockError,
    }),
  };
});

const ResetPasswordPageWithProviders = () => (
  <BrowserRouter>
    <ToastProvider>
      <ResetPasswordPage />
    </ToastProvider>
  </BrowserRouter>
);

describe("ResetPasswordPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the reset password form", () => {
    const { container } = render(<ResetPasswordPageWithProviders />);

    expect(
      screen.getByRole("heading", { name: /reset your password/i }),
    ).toBeDefined();
    expect(
      screen.getByText(/enter your email address and we'll send you a link/i),
    ).toBeDefined();
    
    const submitButton = container.querySelector('button[type="submit"]');
    expect(submitButton).toBeDefined();
    expect(submitButton?.textContent).toContain("Send Reset Link");
  });

  it("validates email field is required", async () => {
    const { container } = render(<ResetPasswordPageWithProviders />);

    const submitButton = container.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(submitButton).toBeDefined();
    
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/please enter a valid email address/i),
      ).toBeDefined();
    });
  });

  it("submits form with valid email", async () => {
    const { container } = render(<ResetPasswordPageWithProviders />);

    const emailInput = container.querySelector(
      'input[type="email"]',
    ) as HTMLInputElement;
    const submitButton = container.querySelector('button[type="submit"]') as HTMLButtonElement;

    expect(emailInput).toBeDefined();
    expect(submitButton).toBeDefined();

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSuccess).toHaveBeenCalledWith(
        "Reset Link Sent",
        "Password reset instructions have been sent to user@example.com",
      );
    }, { timeout: 3000 });
  });

  it("navigates back to login when back button is clicked", () => {
    const { container } = render(<ResetPasswordPageWithProviders />);

    const backButton = container.querySelector(
      'button[type="button"]',
    ) as HTMLElement;
    expect(backButton).toBeDefined();

    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
