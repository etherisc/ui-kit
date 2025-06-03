import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./Pagination";

describe("Pagination", () => {
  it("renders correctly", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const nav = screen.getByRole("navigation");
    expect(nav).toBeDefined();
    expect(nav.getAttribute("aria-label")).toBe("pagination");
  });

  it("renders with custom className", () => {
    render(
      <Pagination className="custom-pagination">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const nav = screen.getByRole("navigation");
    expect(nav.className.includes("custom-pagination")).toBe(true);
    expect(nav.className.includes("mx-auto")).toBe(true);
    expect(nav.className.includes("flex")).toBe(true);
    expect(nav.className.includes("w-full")).toBe(true);
    expect(nav.className.includes("justify-center")).toBe(true);
  });

  it("supports navigation role and aria-label", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const nav = screen.getByRole("navigation");
    expect(nav.getAttribute("role")).toBe("navigation");
    expect(nav.getAttribute("aria-label")).toBe("pagination");
  });
});

describe("PaginationContent", () => {
  it("renders as unordered list", () => {
    render(
      <Pagination>
        <PaginationContent data-testid="pagination-content">
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const content = screen.getByTestId("pagination-content");
    expect(content.tagName).toBe("UL");
  });

  it("applies correct styling classes", () => {
    render(
      <Pagination>
        <PaginationContent data-testid="pagination-content">
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const content = screen.getByTestId("pagination-content");
    expect(content.className.includes("flex")).toBe(true);
    expect(content.className.includes("flex-row")).toBe(true);
    expect(content.className.includes("items-center")).toBe(true);
    expect(content.className.includes("gap-1")).toBe(true);
  });

  it("supports custom className", () => {
    render(
      <Pagination>
        <PaginationContent
          className="custom-content"
          data-testid="pagination-content"
        >
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const content = screen.getByTestId("pagination-content");
    expect(content.className.includes("custom-content")).toBe(true);
  });

  it("forwards ref correctly", () => {
    let contentRef: HTMLUListElement | null = null;

    render(
      <Pagination>
        <PaginationContent
          ref={(ref) => {
            contentRef = ref;
          }}
        >
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    expect(contentRef).not.toBeNull();
    expect(contentRef!.tagName).toBe("UL");
  });
});

describe("PaginationItem", () => {
  it("renders as list item", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem data-testid="pagination-item">
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const item = screen.getByTestId("pagination-item");
    expect(item.tagName).toBe("LI");
  });

  it("supports custom className", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem className="custom-item" data-testid="pagination-item">
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const item = screen.getByTestId("pagination-item");
    expect(item.className.includes("custom-item")).toBe(true);
  });

  it("forwards ref correctly", () => {
    let itemRef: HTMLLIElement | null = null;

    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem
            ref={(ref) => {
              itemRef = ref;
            }}
          >
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    expect(itemRef).not.toBeNull();
    expect(itemRef!.tagName).toBe("LI");
  });
});

describe("PaginationLink", () => {
  it("renders as anchor element", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" data-testid="pagination-link">
              1
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const link = screen.getByTestId("pagination-link");
    expect(link.tagName).toBe("A");
    expect(link.getAttribute("href")).toBe("#");
  });

  it("applies correct styling classes", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" data-testid="pagination-link">
              1
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const link = screen.getByTestId("pagination-link");
    expect(link.className.includes("cursor-pointer")).toBe(true);
  });

  it("handles active state correctly", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" isActive data-testid="active-link">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" data-testid="inactive-link">
              2
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const activeLink = screen.getByTestId("active-link");
    const inactiveLink = screen.getByTestId("inactive-link");

    expect(activeLink.getAttribute("aria-current")).toBe("page");
    expect(inactiveLink.getAttribute("aria-current")).toBe(null);
  });

  it("supports different sizes", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" size="sm" data-testid="small-link">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" size="lg" data-testid="large-link">
              2
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const smallLink = screen.getByTestId("small-link");
    const largeLink = screen.getByTestId("large-link");

    expect(smallLink).toBeDefined();
    expect(largeLink).toBeDefined();
  });

  it("supports custom className", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              href="#"
              className="custom-link"
              data-testid="pagination-link"
            >
              1
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const link = screen.getByTestId("pagination-link");
    expect(link.className.includes("custom-link")).toBe(true);
  });
});

describe("PaginationPrevious", () => {
  it("renders with correct aria-label", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" data-testid="previous-link" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const link = screen.getByTestId("previous-link");
    expect(link.getAttribute("aria-label")).toBe("Go to previous page");
  });

  it("renders Previous text and chevron icon", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    expect(screen.getByText("Previous")).toBeDefined();
  });

  it("applies correct styling classes", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" data-testid="previous-link" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const link = screen.getByTestId("previous-link");
    expect(link.className.includes("gap-1")).toBe(true);
    expect(link.className.includes("pl-2.5")).toBe(true);
  });

  it("supports custom className", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              className="custom-previous"
              data-testid="previous-link"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const link = screen.getByTestId("previous-link");
    expect(link.className.includes("custom-previous")).toBe(true);
  });

  it("supports disabled state", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              className="pointer-events-none opacity-50"
              aria-disabled="true"
              data-testid="disabled-previous"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const link = screen.getByTestId("disabled-previous");
    expect(link.className.includes("pointer-events-none")).toBe(true);
    expect(link.className.includes("opacity-50")).toBe(true);
    expect(link.getAttribute("aria-disabled")).toBe("true");
  });
});

describe("PaginationNext", () => {
  it("renders with correct aria-label", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationNext href="#" data-testid="next-link" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const link = screen.getByTestId("next-link");
    expect(link.getAttribute("aria-label")).toBe("Go to next page");
  });

  it("renders Next text and chevron icon", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    expect(screen.getByText("Next")).toBeDefined();
  });

  it("applies correct styling classes", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationNext href="#" data-testid="next-link" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const link = screen.getByTestId("next-link");
    expect(link.className.includes("gap-1")).toBe(true);
    expect(link.className.includes("pr-2.5")).toBe(true);
  });

  it("supports custom className", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationNext
              href="#"
              className="custom-next"
              data-testid="next-link"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const link = screen.getByTestId("next-link");
    expect(link.className.includes("custom-next")).toBe(true);
  });

  it("supports disabled state", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationNext
              href="#"
              className="pointer-events-none opacity-50"
              aria-disabled="true"
              data-testid="disabled-next"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const link = screen.getByTestId("disabled-next");
    expect(link.className.includes("pointer-events-none")).toBe(true);
    expect(link.className.includes("opacity-50")).toBe(true);
    expect(link.getAttribute("aria-disabled")).toBe("true");
  });
});

describe("PaginationEllipsis", () => {
  it("renders with correct aria-hidden", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationEllipsis data-testid="ellipsis" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const ellipsis = screen.getByTestId("ellipsis");
    expect(ellipsis.getAttribute("aria-hidden")).toBe("true");
  });

  it("renders as span element", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationEllipsis data-testid="ellipsis" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const ellipsis = screen.getByTestId("ellipsis");
    expect(ellipsis.tagName).toBe("SPAN");
  });

  it("applies correct styling classes", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationEllipsis data-testid="ellipsis" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const ellipsis = screen.getByTestId("ellipsis");
    expect(ellipsis.className.includes("flex")).toBe(true);
    expect(ellipsis.className.includes("h-9")).toBe(true);
    expect(ellipsis.className.includes("w-9")).toBe(true);
    expect(ellipsis.className.includes("items-center")).toBe(true);
    expect(ellipsis.className.includes("justify-center")).toBe(true);
  });

  it("contains screen reader text", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    expect(screen.getByText("More pages")).toBeDefined();
  });

  it("supports custom className", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationEllipsis
              className="custom-ellipsis"
              data-testid="ellipsis"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const ellipsis = screen.getByTestId("ellipsis");
    expect(ellipsis.className.includes("custom-ellipsis")).toBe(true);
  });
});

describe("Pagination Integration", () => {
  it("renders complete pagination with all components", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">10</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    expect(screen.getByText("Previous")).toBeDefined();
    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined();
    expect(screen.getByText("3")).toBeDefined();
    expect(screen.getByText("More pages")).toBeDefined();
    expect(screen.getByText("10")).toBeDefined();
    expect(screen.getByText("Next")).toBeDefined();

    // Check active state
    const activeLink = screen.getByText("2").closest("a");
    expect(activeLink?.getAttribute("aria-current")).toBe("page");
  });

  it("handles first page state correctly", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              className="pointer-events-none opacity-50"
              aria-disabled="true"
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const prevButton = screen.getByText("Previous").closest("a");
    expect(prevButton?.className.includes("pointer-events-none")).toBe(true);
    expect(prevButton?.className.includes("opacity-50")).toBe(true);
    expect(prevButton?.getAttribute("aria-disabled")).toBe("true");

    const activeLink = screen.getByText("1").closest("a");
    expect(activeLink?.getAttribute("aria-current")).toBe("page");
  });

  it("handles last page state correctly", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">9</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              10
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              className="pointer-events-none opacity-50"
              aria-disabled="true"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const nextButton = screen.getByText("Next").closest("a");
    expect(nextButton?.className.includes("pointer-events-none")).toBe(true);
    expect(nextButton?.className.includes("opacity-50")).toBe(true);
    expect(nextButton?.getAttribute("aria-disabled")).toBe("true");

    const activeLink = screen.getByText("10").closest("a");
    expect(activeLink?.getAttribute("aria-current")).toBe("page");
  });

  it("supports different alignment configurations", () => {
    render(
      <Pagination className="justify-start">
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    const nav = screen.getByRole("navigation");
    expect(nav.className.includes("justify-start")).toBe(true);
  });
});
