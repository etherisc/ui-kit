import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { vi } from "vitest";
import { DataDenseLayout } from "./DataDenseLayout";

describe("DataDenseLayout", () => {
  it("renders children content", () => {
    render(
      <DataDenseLayout>
        <div data-testid="test-content">Test Content</div>
      </DataDenseLayout>,
    );

    expect(screen.getByTestId("test-content")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders header when provided", () => {
    render(
      <DataDenseLayout header={<div data-testid="test-header">Header</div>}>
        <div>Content</div>
      </DataDenseLayout>,
    );

    expect(screen.getByTestId("test-header")).toBeInTheDocument();
  });

  it("renders footer when provided", () => {
    render(
      <DataDenseLayout footer={<div data-testid="test-footer">Footer</div>}>
        <div>Content</div>
      </DataDenseLayout>,
    );

    expect(screen.getByTestId("test-footer")).toBeInTheDocument();
  });

  it("renders sidebar when provided", () => {
    render(
      <DataDenseLayout sidebar={<div data-testid="test-sidebar">Sidebar</div>}>
        <div>Content</div>
      </DataDenseLayout>,
    );

    expect(screen.getByTestId("test-sidebar")).toBeInTheDocument();
  });

  it("renders right sidebar when provided", () => {
    render(
      <DataDenseLayout
        rightSidebar={<div data-testid="test-right-sidebar">Right Sidebar</div>}
      >
        <div>Content</div>
      </DataDenseLayout>,
    );

    expect(screen.getByTestId("test-right-sidebar")).toBeInTheDocument();
  });

  it("applies density classes correctly", () => {
    const { rerender } = render(
      <DataDenseLayout density="compact">
        <div>Content</div>
      </DataDenseLayout>,
    );

    let main = screen.getByRole("main");
    expect(main).toHaveClass("p-2");

    rerender(
      <DataDenseLayout density="normal">
        <div>Content</div>
      </DataDenseLayout>,
    );

    main = screen.getByRole("main");
    expect(main).toHaveClass("p-4");

    rerender(
      <DataDenseLayout density="comfortable">
        <div>Content</div>
      </DataDenseLayout>,
    );

    main = screen.getByRole("main");
    expect(main).toHaveClass("p-6");
  });

  it("shows borders by default", () => {
    const { container } = render(
      <DataDenseLayout
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        sidebar={<div>Sidebar</div>}
        rightSidebar={<div>Right Sidebar</div>}
      >
        <div>Content</div>
      </DataDenseLayout>,
    );

    expect(container.querySelector(".border-b")).toBeInTheDocument(); // header
    expect(container.querySelector(".border-t")).toBeInTheDocument(); // footer
    expect(container.querySelector(".border-r")).toBeInTheDocument(); // sidebar
    expect(container.querySelector(".border-l")).toBeInTheDocument(); // right sidebar
  });

  it("hides borders when showBorders is false", () => {
    const { container } = render(
      <DataDenseLayout
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        sidebar={<div>Sidebar</div>}
        rightSidebar={<div>Right Sidebar</div>}
        showBorders={false}
      >
        <div>Content</div>
      </DataDenseLayout>,
    );

    expect(container.querySelector(".border-b")).not.toBeInTheDocument();
    expect(container.querySelector(".border-t")).not.toBeInTheDocument();
    expect(container.querySelector(".border-r")).not.toBeInTheDocument();
    expect(container.querySelector(".border-l")).not.toBeInTheDocument();
  });

  it("applies sticky header by default", () => {
    const { container } = render(
      <DataDenseLayout header={<div>Header</div>}>
        <div>Content</div>
      </DataDenseLayout>,
    );

    expect(container.querySelector(".sticky.top-0")).toBeInTheDocument();
  });

  it("removes sticky header when stickyHeader is false", () => {
    const { container } = render(
      <DataDenseLayout header={<div>Header</div>} stickyHeader={false}>
        <div>Content</div>
      </DataDenseLayout>,
    );

    expect(container.querySelector(".sticky.top-0")).not.toBeInTheDocument();
  });

  it("applies sticky footer when stickyFooter is true", () => {
    const { container } = render(
      <DataDenseLayout footer={<div>Footer</div>} stickyFooter={true}>
        <div>Content</div>
      </DataDenseLayout>,
    );

    expect(container.querySelector(".sticky.bottom-0")).toBeInTheDocument();
  });

  it("renders toggle buttons for collapsible sidebars", () => {
    render(
      <DataDenseLayout
        sidebar={<div>Sidebar</div>}
        rightSidebar={<div>Right Sidebar</div>}
        collapsibleSidebars={true}
      >
        <div>Content</div>
      </DataDenseLayout>,
    );

    const toggleButtons = screen.getAllByRole("button");
    expect(toggleButtons).toHaveLength(2);
    expect(toggleButtons[0]).toHaveAttribute("aria-label", "Collapse sidebar");
    expect(toggleButtons[1]).toHaveAttribute("aria-label", "Collapse sidebar");
  });

  it("hides toggle buttons when collapsibleSidebars is false", () => {
    render(
      <DataDenseLayout
        sidebar={<div>Sidebar</div>}
        rightSidebar={<div>Right Sidebar</div>}
        collapsibleSidebars={false}
      >
        <div>Content</div>
      </DataDenseLayout>,
    );

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("toggles left sidebar when button is clicked", () => {
    render(
      <DataDenseLayout sidebar={<div data-testid="sidebar">Sidebar</div>}>
        <div>Content</div>
      </DataDenseLayout>,
    );

    const toggleButton = screen.getByRole("button");
    const sidebarContainer = screen.getByTestId("sidebar").parentElement;

    // Initially visible (not hidden)
    expect(sidebarContainer).not.toHaveClass("hidden");

    // Click to collapse
    fireEvent.click(toggleButton);
    expect(sidebarContainer).toHaveClass("hidden");
    expect(toggleButton).toHaveAttribute("aria-label", "Expand sidebar");

    // Click to expand
    fireEvent.click(toggleButton);
    expect(sidebarContainer).not.toHaveClass("hidden");
    expect(toggleButton).toHaveAttribute("aria-label", "Collapse sidebar");
  });

  it("toggles right sidebar when button is clicked", () => {
    render(
      <DataDenseLayout
        rightSidebar={<div data-testid="right-sidebar">Right Sidebar</div>}
      >
        <div>Content</div>
      </DataDenseLayout>,
    );

    const toggleButton = screen.getByRole("button");
    const sidebarContainer = screen.getByTestId("right-sidebar").parentElement;

    // Initially visible (not hidden)
    expect(sidebarContainer).not.toHaveClass("hidden");

    // Click to collapse
    fireEvent.click(toggleButton);
    expect(sidebarContainer).toHaveClass("hidden");

    // Click to expand
    fireEvent.click(toggleButton);
    expect(sidebarContainer).not.toHaveClass("hidden");
  });

  it("calls onLeftSidebarToggle callback", () => {
    const onToggle = vi.fn();
    render(
      <DataDenseLayout
        sidebar={<div>Sidebar</div>}
        onLeftSidebarToggle={onToggle}
      >
        <div>Content</div>
      </DataDenseLayout>,
    );

    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);

    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it("calls onRightSidebarToggle callback", () => {
    const onToggle = vi.fn();
    render(
      <DataDenseLayout
        rightSidebar={<div>Right Sidebar</div>}
        onRightSidebarToggle={onToggle}
      >
        <div>Content</div>
      </DataDenseLayout>,
    );

    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);

    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it("starts with collapsed sidebars when specified", () => {
    render(
      <DataDenseLayout
        sidebar={<div data-testid="sidebar">Sidebar</div>}
        rightSidebar={<div data-testid="right-sidebar">Right Sidebar</div>}
        leftSidebarCollapsed={true}
        rightSidebarCollapsed={true}
      >
        <div>Content</div>
      </DataDenseLayout>,
    );

    const leftSidebarContainer = screen.getByTestId("sidebar").parentElement;
    const rightSidebarContainer =
      screen.getByTestId("right-sidebar").parentElement;

    expect(leftSidebarContainer).toHaveClass("hidden");
    expect(rightSidebarContainer).toHaveClass("hidden");
  });

  it("applies custom class names", () => {
    const { container } = render(
      <DataDenseLayout
        className="custom-root"
        contentClassName="custom-content"
        headerClassName="custom-header"
        footerClassName="custom-footer"
        header={<div>Header</div>}
        footer={<div>Footer</div>}
      >
        <div>Content</div>
      </DataDenseLayout>,
    );

    expect(container.querySelector(".custom-root")).toBeInTheDocument();
    expect(container.querySelector(".custom-header")).toBeInTheDocument();
    expect(container.querySelector(".custom-footer")).toBeInTheDocument();

    const main = screen.getByRole("main");
    expect(main).toHaveClass("custom-content");
  });

  it("applies custom sidebar widths via inline styles", () => {
    const { container } = render(
      <DataDenseLayout
        sidebar={<div>Sidebar</div>}
        rightSidebar={<div>Right Sidebar</div>}
        leftSidebarWidth={300}
        rightSidebarWidth={250}
        collapsedSidebarWidth={40}
      >
        <div>Content</div>
      </DataDenseLayout>,
    );

    const sidebars = container.querySelectorAll('[style*="width"]');
    expect(sidebars[0]).toHaveStyle({ width: "300px" });
    expect(sidebars[1]).toHaveStyle({ width: "250px" });
  });

  it("has proper accessibility attributes", () => {
    render(
      <DataDenseLayout>
        <div>Content</div>
      </DataDenseLayout>,
    );

    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("role", "main");
  });
});
