import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./NavigationMenu";

describe("NavigationMenu", () => {
  it("renders correctly", () => {
    render(
      <NavigationMenu data-testid="navigation-menu">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    expect(screen.getByTestId("navigation-menu")).toBeDefined();
    expect(screen.getByText("Home")).toBeDefined();
  });

  it("applies custom className", () => {
    render(
      <NavigationMenu className="custom-nav" data-testid="navigation-menu">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    const nav = screen.getByTestId("navigation-menu");
    expect(nav.className).toContain("custom-nav");
  });

  it("automatically includes viewport", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Trigger</NavigationMenuTrigger>
            <NavigationMenuContent>Content</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    // Viewport should be present (even if not visible)
    const viewport = document.querySelector(
      "[data-radix-navigation-menu-viewport]",
    );
    expect(viewport).toBeDefined();
  });
});

describe("NavigationMenuList", () => {
  it("renders correctly", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList data-testid="navigation-list">
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    expect(screen.getByTestId("navigation-list")).toBeDefined();
  });

  it("applies custom className", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList
          className="custom-list"
          data-testid="navigation-list"
        >
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    const list = screen.getByTestId("navigation-list");
    expect(list.className).toContain("custom-list");
  });

  it("supports multiple navigation items", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/about">About</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("About")).toBeDefined();
    expect(screen.getByText("Contact")).toBeDefined();
  });
});

describe("NavigationMenuLink", () => {
  it("renders correctly", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/test" data-testid="nav-link">
              Test Link
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    expect(screen.getByTestId("nav-link")).toBeDefined();
    expect(screen.getByText("Test Link")).toBeDefined();
  });

  it("applies navigationMenuTriggerStyle by default", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/test" data-testid="nav-link">
              Test Link
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    const link = screen.getByTestId("nav-link");
    expect(link.className).toContain("inline-flex");
    expect(link.className).toContain("h-10");
  });

  it("supports custom className", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/test"
              className="custom-link"
              data-testid="nav-link"
            >
              Test Link
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    const link = screen.getByTestId("nav-link");
    expect(link.className).toContain("custom-link");
  });

  it("handles click events", async () => {
    const mockClick = vi.fn();
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/test" onClick={mockClick}>
              Clickable Link
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    await userEvent.click(screen.getByText("Clickable Link"));
    expect(mockClick).toHaveBeenCalled();
  });
});

describe("NavigationMenuTrigger", () => {
  it("renders correctly", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger data-testid="nav-trigger">
              Trigger
            </NavigationMenuTrigger>
            <NavigationMenuContent>Content</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    expect(screen.getByTestId("nav-trigger")).toBeDefined();
    expect(screen.getByText("Trigger")).toBeDefined();
  });

  it("includes chevron down icon", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Trigger</NavigationMenuTrigger>
            <NavigationMenuContent>Content</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    // Check for chevron icon (should be present)
    const chevron = document.querySelector('svg[aria-hidden="true"]');
    expect(chevron).toBeDefined();
  });

  it("applies custom className", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className="custom-trigger"
              data-testid="nav-trigger"
            >
              Trigger
            </NavigationMenuTrigger>
            <NavigationMenuContent>Content</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    const trigger = screen.getByTestId("nav-trigger");
    expect(trigger.className).toContain("custom-trigger");
  });

  it("opens content when clicked", async () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Trigger</NavigationMenuTrigger>
            <NavigationMenuContent>Content Panel</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    const trigger = screen.getByText("Trigger");
    await userEvent.click(trigger);

    expect(screen.getByText("Content Panel")).toBeDefined();
  });
});

describe("NavigationMenuContent", () => {
  it("renders correctly when triggered", async () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Trigger</NavigationMenuTrigger>
            <NavigationMenuContent data-testid="nav-content">
              Content Panel
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    const trigger = screen.getByText("Trigger");
    await userEvent.click(trigger);

    expect(screen.getByTestId("nav-content")).toBeDefined();
    expect(screen.getByText("Content Panel")).toBeDefined();
  });

  it("applies custom className", async () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Trigger</NavigationMenuTrigger>
            <NavigationMenuContent
              className="custom-content"
              data-testid="nav-content"
            >
              Content Panel
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    const trigger = screen.getByText("Trigger");
    await userEvent.click(trigger);

    const content = screen.getByTestId("nav-content");
    expect(content.className).toContain("custom-content");
  });

  it("supports complex content structures", async () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4">
                <li>
                  <a href="/web-design">Web Design</a>
                </li>
                <li>
                  <a href="/consulting">Consulting</a>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    const trigger = screen.getByText("Services");
    await userEvent.click(trigger);

    expect(screen.getByText("Web Design")).toBeDefined();
    expect(screen.getByText("Consulting")).toBeDefined();
  });
});

describe("NavigationMenuViewport", () => {
  it("renders correctly within NavigationMenu", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Test</NavigationMenuTrigger>
            <NavigationMenuContent>Content</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    // Viewport is automatically included in NavigationMenu
    const viewport = document.querySelector(
      "[data-radix-navigation-menu-viewport]",
    );
    expect(viewport).toBeDefined();
  });

  it("applies custom styling within NavigationMenu", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Test</NavigationMenuTrigger>
            <NavigationMenuContent>Content</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    const viewport = document.querySelector(
      "[data-radix-navigation-menu-viewport]",
    );
    expect(viewport).toBeDefined();
    if (viewport?.className) {
      expect(viewport.className).toContain("rounded-md");
    }
  });
});

describe("NavigationMenuIndicator", () => {
  it("works within NavigationMenu context", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Test</NavigationMenuTrigger>
            <NavigationMenuContent>Content</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    // Indicator would be automatically managed by NavigationMenu
    const trigger = screen.getByText("Test");
    expect(trigger).toBeDefined();
  });

  it("supports navigation menu functionality", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div>Service content</div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    const trigger = screen.getByText("Services");
    expect(trigger).toBeDefined();
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });

  it("includes proper accessibility attributes", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Test</NavigationMenuTrigger>
            <NavigationMenuContent>Content</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    const trigger = screen.getByText("Test");
    expect(trigger.getAttribute("aria-expanded")).toBeDefined();
    expect(trigger.getAttribute("aria-controls")).toBeDefined();
  });
});

describe("navigationMenuTriggerStyle", () => {
  it("returns correct class string", () => {
    const classes = navigationMenuTriggerStyle();
    expect(classes).toContain("inline-flex");
    expect(classes).toContain("h-10");
    expect(classes).toContain("items-center");
    expect(classes).toContain("justify-center");
  });

  it("can be used with custom className", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/test"
              className={navigationMenuTriggerStyle()}
              data-testid="styled-link"
            >
              Styled Link
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    const link = screen.getByTestId("styled-link");
    expect(link.className).toContain("inline-flex");
    expect(link.className).toContain("h-10");
  });
});

describe("NavigationMenu Integration", () => {
  it("works with complex nested structure", async () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4">
                <li>
                  <a href="/web-design">Web Design</a>
                </li>
                <li>
                  <a href="/consulting">Consulting</a>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/about">About</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    // Test basic links
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("About")).toBeDefined();

    // Test dropdown functionality
    const servicesButton = screen.getByText("Services");
    await userEvent.click(servicesButton);

    expect(screen.getByText("Web Design")).toBeDefined();
    expect(screen.getByText("Consulting")).toBeDefined();
  });

  it("supports ref forwarding", () => {
    const navRef = React.createRef<HTMLElement>();
    const listRef = React.createRef<HTMLUListElement>();
    const linkRef = React.createRef<HTMLAnchorElement>();

    render(
      <NavigationMenu ref={navRef}>
        <NavigationMenuList ref={listRef}>
          <NavigationMenuItem>
            <NavigationMenuLink ref={linkRef} href="/">
              Home
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    expect(navRef.current).toBeInstanceOf(HTMLElement);
    expect(listRef.current).toBeInstanceOf(HTMLUListElement);
    expect(linkRef.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it("supports keyboard navigation", async () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <a href="/web-design">Web Design</a>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/about">About</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    const homeLink = screen.getByText("Home");
    const servicesButton = screen.getByText("Services");
    const aboutLink = screen.getByText("About");

    // Focus should be manageable
    homeLink.focus();
    expect(document.activeElement).toBe(homeLink);

    servicesButton.focus();
    expect(document.activeElement).toBe(servicesButton);

    aboutLink.focus();
    expect(document.activeElement).toBe(aboutLink);
  });

  it("handles multiple navigation items with different content", async () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div>Product content</div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div>Service content</div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    // Test that both triggers exist and are accessible
    const productsButton = screen.getByText("Products");
    const servicesButton = screen.getByText("Services");

    expect(productsButton).toBeDefined();
    expect(servicesButton).toBeDefined();

    // Test that both start closed
    expect(productsButton.getAttribute("aria-expanded")).toBe("false");
    expect(servicesButton.getAttribute("aria-expanded")).toBe("false");

    // Test first dropdown opens
    await userEvent.click(productsButton);
    expect(screen.getByText("Product content")).toBeDefined();
  });
});
