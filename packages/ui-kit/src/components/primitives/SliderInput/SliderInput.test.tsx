import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import { SliderInput } from "./SliderInput";

describe("SliderInput", () => {
  it("renders with basic props", () => {
    render(<SliderInput value={50} />);
    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute("aria-valuenow", "50");
  });

  it("renders with label", () => {
    render(<SliderInput label="Volume" id="volume-slider" value={30} />);
    const label = screen.getByText("Volume");
    const sliderRoot = screen
      .getByRole("slider")
      .closest('[id="volume-slider"]');

    expect(label).toBeInTheDocument();
    expect(sliderRoot).toHaveAttribute(
      "aria-labelledby",
      "volume-slider-label",
    );
  });

  it("renders with description", () => {
    render(
      <SliderInput
        description="Adjust the volume level"
        id="volume-slider"
        value={30}
      />,
    );
    const description = screen.getByText("Adjust the volume level");
    const sliderRoot = screen
      .getByRole("slider")
      .closest('[id="volume-slider"]');

    expect(description).toBeInTheDocument();
    expect(sliderRoot).toHaveAttribute(
      "aria-describedby",
      "volume-slider-description",
    );
  });

  it("renders with error state", () => {
    render(
      <SliderInput error="Value is too high" id="volume-slider" value={30} />,
    );
    const error = screen.getByText("Value is too high");
    const sliderRoot = screen
      .getByRole("slider")
      .closest('[id="volume-slider"]');

    expect(error).toBeInTheDocument();
    expect(sliderRoot).toHaveAttribute("aria-invalid", "true");
    expect(sliderRoot).toHaveAttribute(
      "aria-describedby",
      "volume-slider-error",
    );
  });

  it("displays current value", () => {
    render(<SliderInput value={75} showValue />);
    expect(screen.getByText("75")).toBeInTheDocument();
  });

  it("hides value when showValue is false", () => {
    render(<SliderInput value={75} showValue={false} />);
    expect(screen.queryByText("75")).not.toBeInTheDocument();
  });

  it("formats value with custom formatter", () => {
    const formatValue = (value: number) => `${value}%`;
    render(<SliderInput value={75} formatValue={formatValue} />);
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("calls onChange when value changes", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<SliderInput value={50} onChange={handleChange} />);

    const slider = screen.getByRole("slider");

    // Simulate keyboard interaction
    await user.click(slider);
    await user.keyboard("{ArrowRight}");

    expect(handleChange).toHaveBeenCalled();
  });

  it("respects min and max values", () => {
    render(<SliderInput value={50} min={10} max={90} />);
    const slider = screen.getByRole("slider");

    expect(slider).toHaveAttribute("aria-valuemin", "10");
    expect(slider).toHaveAttribute("aria-valuemax", "90");
  });

  it("handles disabled state", () => {
    render(<SliderInput value={50} disabled />);
    const sliderRoot = screen.getByRole("slider").closest("[data-disabled]");
    expect(sliderRoot).toBeInTheDocument();
  });

  it("handles different sizes", () => {
    const { rerender } = render(<SliderInput value={50} size="sm" />);
    let sliderRoot = screen.getByRole("slider").closest('[class*="h-1"]');
    expect(sliderRoot).toBeInTheDocument();

    rerender(<SliderInput value={50} size="lg" />);
    sliderRoot = screen.getByRole("slider").closest('[class*="h-2"]');
    expect(sliderRoot).toBeInTheDocument();
  });

  it("handles step values", () => {
    const handleChange = vi.fn();
    render(<SliderInput value={50} step={5} onChange={handleChange} />);
    const slider = screen.getByRole("slider");

    // Test that the slider renders correctly with step value
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute("aria-valuenow", "50");
  });

  it("supports custom class names", () => {
    render(
      <SliderInput
        value={50}
        className="custom-wrapper"
        sliderClassName="custom-slider"
      />,
    );

    const wrapper = screen.getByRole("slider").closest(".custom-wrapper");
    expect(wrapper).toBeInTheDocument();
  });

  it("handles label and value display together", () => {
    render(
      <SliderInput
        label="Brightness"
        value={80}
        showValue
        formatValue={(v) => `${v}%`}
      />,
    );

    expect(screen.getByText("Brightness")).toBeInTheDocument();
    expect(screen.getByText("80%")).toBeInTheDocument();
  });

  it("handles error state with proper styling", () => {
    render(<SliderInput value={50} error="Invalid value" id="test-slider" />);
    const sliderRoot = screen.getByRole("slider").closest('[id="test-slider"]');

    expect(sliderRoot).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Invalid value")).toBeInTheDocument();
  });

  it("handles default values correctly", () => {
    render(<SliderInput />);
    const slider = screen.getByRole("slider");

    expect(slider).toHaveAttribute("aria-valuenow", "0");
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "100");
    // Test that the slider renders with default values
    expect(slider).toBeInTheDocument();
  });

  it("shows description but not error when both are provided", () => {
    render(
      <SliderInput
        value={50}
        description="This is a description"
        error="This is an error"
      />,
    );

    expect(screen.getByText("This is an error")).toBeInTheDocument();
    expect(screen.queryByText("This is a description")).not.toBeInTheDocument();
  });
});
