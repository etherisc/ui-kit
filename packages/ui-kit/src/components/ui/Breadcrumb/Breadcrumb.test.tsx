import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./Breadcrumb";

describe("Breadcrumb", () => {
  it("renders correctly", () => {
    render(
      <Breadcrumb data-testid="breadcrumb">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );

    expect(screen.getByTestId("breadcrumb")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByLabelText("breadcrumb")).toBeInTheDocument();
  });

  it("renders breadcrumb links", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );

    const homeLink = screen.getByRole("link", { name: "Home" });
    const docsLink = screen.getByRole("link", { name: "Docs" });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
    expect(docsLink).toBeInTheDocument();
    expect(docsLink).toHaveAttribute("href", "/docs");
  });

  it("renders current page correctly", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current Page</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );

    const currentPage = screen.getByText("Current Page");
    expect(currentPage).toBeInTheDocument();
    expect(currentPage).toHaveAttribute("aria-current", "page");
    expect(currentPage).toHaveAttribute("aria-disabled", "true");
  });

  it("renders separators correctly", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator data-testid="separator" />
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );

    const separator = screen.getByTestId("separator");
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute("role", "presentation");
    expect(separator).toHaveAttribute("aria-hidden", "true");
  });

  it("renders ellipsis correctly", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis data-testid="ellipsis" />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );

    const ellipsis = screen.getByTestId("ellipsis");
    expect(ellipsis).toBeInTheDocument();
    expect(ellipsis).toHaveAttribute("role", "presentation");
    expect(ellipsis).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("More")).toBeInTheDocument();
  });

  it("supports custom className", () => {
    render(
      <Breadcrumb className="custom-breadcrumb" data-testid="breadcrumb">
        <BreadcrumbList className="custom-list" data-testid="list">
          <BreadcrumbItem className="custom-item" data-testid="item">
            <BreadcrumbLink href="/" className="custom-link">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );

    expect(screen.getByTestId("breadcrumb")).toHaveClass("custom-breadcrumb");
    expect(screen.getByTestId("list")).toHaveClass("custom-list");
    expect(screen.getByTestId("item")).toHaveClass("custom-item");
    expect(screen.getByRole("link")).toHaveClass("custom-link");
  });

  it("forwards refs correctly", () => {
    const breadcrumbRef = { current: null };
    const listRef = { current: null };
    const itemRef = { current: null };
    const linkRef = { current: null };
    const pageRef = { current: null };

    render(
      <Breadcrumb ref={breadcrumbRef}>
        <BreadcrumbList ref={listRef}>
          <BreadcrumbItem ref={itemRef}>
            <BreadcrumbLink ref={linkRef} href="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage ref={pageRef}>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );

    expect(breadcrumbRef.current).toBeInstanceOf(HTMLElement);
    expect(listRef.current).toBeInstanceOf(HTMLOListElement);
    expect(itemRef.current).toBeInstanceOf(HTMLLIElement);
    expect(linkRef.current).toBeInstanceOf(HTMLAnchorElement);
    expect(pageRef.current).toBeInstanceOf(HTMLSpanElement);
  });
});
