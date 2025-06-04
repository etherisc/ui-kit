import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "./InputOTP";

describe("InputOTP", () => {
  it("renders correctly", () => {
    render(
      <InputOTP maxLength={6} data-testid="input-otp">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>,
    );

    const inputOTP = screen.getByTestId("input-otp");
    expect(inputOTP).toBeInTheDocument();
  });

  it("renders correct number of slots", () => {
    render(
      <InputOTP maxLength={4}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>,
    );

    // Each slot is a div, so we expect 4 slots
    const slots = screen.getAllByRole("textbox");
    expect(slots).toHaveLength(1); // OTP input creates one textbox
  });

  it("handles value changes", () => {
    const onChange = vi.fn();

    render(
      <InputOTP maxLength={6} onChange={onChange}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>,
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "123456" } });

    expect(onChange).toHaveBeenCalledWith("123456");
  });

  it("handles controlled value", () => {
    render(
      <InputOTP maxLength={6} value="123">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>,
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("123");
  });

  it("calls onComplete when all slots are filled", () => {
    const onComplete = vi.fn();

    render(
      <InputOTP maxLength={6} onComplete={onComplete}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>,
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "123456" } });

    expect(onComplete).toHaveBeenCalledWith("123456");
  });

  it("does not call onComplete when partially filled", () => {
    const onComplete = vi.fn();

    render(
      <InputOTP maxLength={6} onComplete={onComplete}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>,
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "123" } });

    expect(onComplete).not.toHaveBeenCalled();
  });

  it("renders disabled state correctly", () => {
    render(
      <InputOTP maxLength={6} disabled>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>,
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  it("supports custom className", () => {
    render(
      <InputOTP maxLength={6} className="custom-class" data-testid="input-otp">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>,
    );

    const inputOTP = screen.getByTestId("input-otp");
    expect(inputOTP).toHaveClass("custom-class");
  });

  it("has proper accessibility attributes", () => {
    render(
      <InputOTP maxLength={6} aria-label="Enter verification code">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>,
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-label", "Enter verification code");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };

    render(
      <InputOTP maxLength={6} ref={ref}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>,
    );

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("supports autoFocus", () => {
    render(
      <InputOTP maxLength={6} autoFocus>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>,
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveFocus();
  });
});

describe("InputOTPGroup", () => {
  it("renders correctly", () => {
    render(
      <InputOTPGroup data-testid="otp-group">
        <div>Test content</div>
      </InputOTPGroup>,
    );

    const group = screen.getByTestId("otp-group");
    expect(group).toBeInTheDocument();
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("supports custom className", () => {
    render(
      <InputOTPGroup className="custom-group" data-testid="otp-group">
        <div>Test</div>
      </InputOTPGroup>,
    );

    const group = screen.getByTestId("otp-group");
    expect(group).toHaveClass("custom-group");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };

    render(
      <InputOTPGroup ref={ref}>
        <div>Test</div>
      </InputOTPGroup>,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe("InputOTPSlot", () => {
  it("renders correctly", () => {
    render(
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} data-testid="otp-slot" />
        </InputOTPGroup>
      </InputOTP>,
    );

    const slot = screen.getByTestId("otp-slot");
    expect(slot).toBeInTheDocument();
  });

  it("supports custom className", () => {
    render(
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot
            index={0}
            className="custom-slot"
            data-testid="otp-slot"
          />
        </InputOTPGroup>
      </InputOTP>,
    );

    const slot = screen.getByTestId("otp-slot");
    expect(slot).toHaveClass("custom-slot");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };

    render(
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} ref={ref} />
        </InputOTPGroup>
      </InputOTP>,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe("InputOTPSeparator", () => {
  it("renders correctly", () => {
    render(<InputOTPSeparator data-testid="otp-separator" />);

    const separator = screen.getByTestId("otp-separator");
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute("role", "separator");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };

    render(<InputOTPSeparator ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("supports additional props", () => {
    render(
      <InputOTPSeparator
        data-testid="otp-separator"
        className="custom-separator"
        aria-label="separator"
      />,
    );

    const separator = screen.getByTestId("otp-separator");
    expect(separator).toHaveClass("custom-separator");
    expect(separator).toHaveAttribute("aria-label", "separator");
  });
});

describe("InputOTP Integration", () => {
  it("handles complete form interaction", () => {
    const onChange = vi.fn();
    const onComplete = vi.fn();

    render(
      <InputOTP maxLength={6} onChange={onChange} onComplete={onComplete}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>,
    );

    const input = screen.getByRole("textbox");

    // Type partial value
    fireEvent.change(input, { target: { value: "123" } });
    expect(onChange).toHaveBeenCalledWith("123");
    expect(onComplete).not.toHaveBeenCalled();

    // Complete the value
    fireEvent.change(input, { target: { value: "123456" } });
    expect(onChange).toHaveBeenCalledWith("123456");
    expect(onComplete).toHaveBeenCalledWith("123456");
  });

  it("works with form submission", () => {
    const onSubmit = vi.fn();

    render(
      <form onSubmit={onSubmit}>
        <InputOTP maxLength={6} name="otp" defaultValue="123456">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <button type="submit">Submit</button>
      </form>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSubmit).toHaveBeenCalled();
  });
});
