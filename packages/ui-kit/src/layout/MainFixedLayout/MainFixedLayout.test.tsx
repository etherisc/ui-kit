import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MainFixedLayout } from "./MainFixedLayout";

describe("MainFixedLayout", () => {
  it("renders children content", () => {
    render(
      <MainFixedLayout>
        <div data-testid="test-content">Test Content</div>
      </MainFixedLayout>,
    );

    expect(screen.getByTestId("test-content")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders header when provided", () => {
    render(
      <MainFixedLayout header={<div data-testid="test-header">Header</div>}>
        <div>Content</div>
      </MainFixedLayout>,
    );

    expect(screen.getByTestId("test-header")).toBeInTheDocument();
  });

  it("renders footer when provided", () => {
    render(
      <MainFixedLayout footer={<div data-testid="test-footer">Footer</div>}>
        <div>Content</div>
      </MainFixedLayout>,
    );

    expect(screen.getByTestId("test-footer")).toBeInTheDocument();
  });

  it("renders sidebar when provided", () => {
    render(
      <MainFixedLayout sidebar={<div data-testid="test-sidebar">Sidebar</div>}>
        <div>Content</div>
      </MainFixedLayout>,
    );

    expect(screen.getByTestId("test-sidebar")).toBeInTheDocument();
  });

  it("renders right sidebar when provided", () => {
    render(
      <MainFixedLayout
        rightSidebar={<div data-testid="test-right-sidebar">Right Sidebar</div>}
      >
        <div>Content</div>
      </MainFixedLayout>,
    );

    expect(screen.getByTestId("test-right-sidebar")).toBeInTheDocument();
  });

  it("applies fixed positioning classes by default", () => {
    const { container } = render(
      <MainFixedLayout
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        sidebar={<div>Sidebar</div>}
        rightSidebar={<div>Right Sidebar</div>}
      >
        <div>Content</div>
      </MainFixedLayout>,
    );

    // Check for fixed positioning classes
    expect(
      container.querySelector(".fixed.top-0.left-0.right-0"),
    ).toBeInTheDocument(); // header
    expect(
      container.querySelector(".fixed.bottom-0.left-0.right-0"),
    ).toBeInTheDocument(); // footer
    expect(
      container.querySelector(".fixed.left-0.top-0.bottom-0"),
    ).toBeInTheDocument(); // sidebar
    expect(
      container.querySelector(".fixed.right-0.top-0.bottom-0"),
    ).toBeInTheDocument(); // right sidebar
  });

  it("applies relative positioning when fixed props are false", () => {
    const { container } = render(
      <MainFixedLayout
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        sidebar={<div>Sidebar</div>}
        rightSidebar={<div>Right Sidebar</div>}
        fixedHeader={false}
        fixedFooter={false}
        fixedSidebar={false}
        fixedRightSidebar={false}
      >
        <div>Content</div>
      </MainFixedLayout>,
    );

    // Check for relative positioning classes
    const elements = container.querySelectorAll(".relative");
    expect(elements.length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(
      <MainFixedLayout className="custom-class">
        <div>Content</div>
      </MainFixedLayout>,
    );

    expect(container.querySelector(".custom-class")).toBeInTheDocument();
  });

  it("applies content className", () => {
    render(
      <MainFixedLayout contentClassName="custom-content-class">
        <div>Content</div>
      </MainFixedLayout>,
    );

    const main = screen.getByRole("main");
    expect(main).toHaveClass("custom-content-class");
  });

  it("applies content padding by default", () => {
    render(
      <MainFixedLayout>
        <div>Content</div>
      </MainFixedLayout>,
    );

    const main = screen.getByRole("main");
    expect(main).toHaveClass("p-6");
  });

  it("removes content padding when contentPadding is false", () => {
    render(
      <MainFixedLayout contentPadding={false}>
        <div>Content</div>
      </MainFixedLayout>,
    );

    const main = screen.getByRole("main");
    expect(main).not.toHaveClass("p-6");
  });

  it("applies custom dimensions via inline styles", () => {
    const { container } = render(
      <MainFixedLayout
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        sidebar={<div>Sidebar</div>}
        rightSidebar={<div>Right Sidebar</div>}
        headerHeight={80}
        footerHeight={48}
        sidebarWidth={300}
        rightSidebarWidth={200}
      >
        <div>Content</div>
      </MainFixedLayout>,
    );

    // Check header height
    const header = container.querySelector(".fixed.top-0.left-0.right-0");
    expect(header).toHaveStyle({ height: "80px" });

    // Check footer height
    const footer = container.querySelector(".fixed.bottom-0.left-0.right-0");
    expect(footer).toHaveStyle({ height: "48px" });

    // Check sidebar width
    const sidebar = container.querySelector(".fixed.left-0.top-0.bottom-0");
    expect(sidebar).toHaveStyle({ width: "300px" });

    // Check right sidebar width
    const rightSidebar = container.querySelector(
      ".fixed.right-0.top-0.bottom-0",
    );
    expect(rightSidebar).toHaveStyle({ width: "200px" });
  });

  it("calculates content padding based on fixed elements", () => {
    render(
      <MainFixedLayout
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        sidebar={<div>Sidebar</div>}
        rightSidebar={<div>Right Sidebar</div>}
        headerHeight={80}
        footerHeight={48}
        sidebarWidth={300}
        rightSidebarWidth={200}
      >
        <div>Content</div>
      </MainFixedLayout>,
    );

    const main = screen.getByRole("main");
    expect(main).toHaveStyle({
      paddingTop: "80px",
      paddingBottom: "48px",
      paddingLeft: "300px",
      paddingRight: "200px",
    });
  });

  it("does not apply padding for non-fixed elements", () => {
    render(
      <MainFixedLayout
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        sidebar={<div>Sidebar</div>}
        rightSidebar={<div>Right Sidebar</div>}
        fixedHeader={false}
        fixedFooter={false}
        fixedSidebar={false}
        fixedRightSidebar={false}
      >
        <div>Content</div>
      </MainFixedLayout>,
    );

    const main = screen.getByRole("main");
    expect(main).toHaveStyle({
      paddingTop: "0px",
      paddingBottom: "0px",
      paddingLeft: "0px",
      paddingRight: "0px",
    });
  });

  it("has proper accessibility attributes", () => {
    render(
      <MainFixedLayout>
        <div>Content</div>
      </MainFixedLayout>,
    );

    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("role", "main");
  });

  it("renders all elements together", () => {
    render(
      <MainFixedLayout
        header={<div data-testid="header">Header</div>}
        footer={<div data-testid="footer">Footer</div>}
        sidebar={<div data-testid="sidebar">Sidebar</div>}
        rightSidebar={<div data-testid="right-sidebar">Right Sidebar</div>}
      >
        <div data-testid="content">Content</div>
      </MainFixedLayout>,
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("right-sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });
});
