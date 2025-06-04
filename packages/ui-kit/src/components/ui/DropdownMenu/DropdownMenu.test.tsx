import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./DropdownMenu";

describe("DropdownMenu", () => {
  it("renders correctly", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger data-testid="trigger">Open</DropdownMenuTrigger>
        <DropdownMenuContent data-testid="content">
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByTestId("trigger")).toBeInTheDocument();
    expect(screen.getByText("Open")).toBeInTheDocument();
  });

  it("opens when trigger is clicked", async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Menu Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await userEvent.click(screen.getByText("Open Menu"));
    expect(screen.getByText("Menu Item")).toBeInTheDocument();
  });

  it("closes on escape key", async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Menu Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await userEvent.click(screen.getByText("Open Menu"));
    expect(screen.getByText("Menu Item")).toBeInTheDocument();

    // Press Escape to close
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => {
      expect(screen.queryByText("Menu Item")).not.toBeInTheDocument();
    });
  });

  it("supports controlled state", async () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <DropdownMenu open={false} onOpenChange={onOpenChange}>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Controlled Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    // Menu should be closed initially
    expect(screen.queryByText("Controlled Item")).not.toBeInTheDocument();

    // Click trigger
    await userEvent.click(screen.getByText("Open Menu"));
    expect(onOpenChange).toHaveBeenCalledWith(true);

    // Simulate parent updating the state
    rerender(
      <DropdownMenu open={true} onOpenChange={onOpenChange}>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Controlled Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    // Menu should now be open
    expect(screen.getByText("Controlled Item")).toBeInTheDocument();
  });

  it("handles keyboard navigation", async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const trigger = screen.getByText("Open Menu");
    trigger.focus();

    // Open with Enter key
    fireEvent.keyDown(trigger, { key: "Enter" });
    expect(screen.getByText("Item 1")).toBeInTheDocument();

    // Close with Escape key
    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => {
      expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
    });
  });
});

describe("DropdownMenuContent", () => {
  it("renders with correct positioning classes", () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent data-testid="content">
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const content = screen.getByTestId("content");
    expect(content).toHaveClass("z-50");
    expect(content).toHaveClass("min-w-[8rem]");
    expect(content).toHaveClass("rounded-md");
    expect(content).toHaveClass("border");
  });

  it("supports custom className", () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent className="custom-content" data-testid="content">
          <DropdownMenuItem>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByTestId("content")).toHaveClass("custom-content");
  });
});

describe("DropdownMenuItem", () => {
  it("renders correctly", () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem data-testid="item">Test Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByTestId("item")).toBeInTheDocument();
    expect(screen.getByText("Test Item")).toBeInTheDocument();
  });

  it("supports disabled state", () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled data-testid="item">
            Disabled Item
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const item = screen.getByTestId("item");
    expect(item).toHaveClass("data-[disabled]:pointer-events-none");
    expect(item).toHaveClass("data-[disabled]:opacity-50");
  });

  it("supports inset styling", () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem inset data-testid="item">
            Inset Item
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByTestId("item")).toHaveClass("pl-8");
  });

  it("handles click events", async () => {
    const onClick = vi.fn();
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onClick}>Clickable Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await userEvent.click(screen.getByText("Clickable Item"));
    expect(onClick).toHaveBeenCalled();
  });
});

describe("DropdownMenuCheckboxItem", () => {
  it("renders correctly", () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem data-testid="checkbox">
            Checkbox Item
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByTestId("checkbox")).toBeInTheDocument();
    expect(screen.getByText("Checkbox Item")).toBeInTheDocument();
  });

  it("supports checked state", () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked={true} data-testid="checkbox">
            Checked Item
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const checkbox = screen.getByTestId("checkbox");
    expect(checkbox).toHaveAttribute("data-state", "checked");
  });

  it("handles state changes", async () => {
    const onCheckedChange = vi.fn();
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem onCheckedChange={onCheckedChange}>
            Toggle Item
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await userEvent.click(screen.getByText("Toggle Item"));
    expect(onCheckedChange).toHaveBeenCalled();
  });
});

describe("DropdownMenuRadioGroup and DropdownMenuRadioItem", () => {
  it("renders radio group correctly", () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="option1">
            <DropdownMenuRadioItem value="option1" data-testid="radio1">
              Option 1
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="option2" data-testid="radio2">
              Option 2
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByTestId("radio1")).toBeInTheDocument();
    expect(screen.getByTestId("radio2")).toBeInTheDocument();
  });

  it("handles radio selection", async () => {
    const onValueChange = vi.fn();
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="option1" onValueChange={onValueChange}>
            <DropdownMenuRadioItem value="option1">
              Option 1
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="option2">
              Option 2
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await userEvent.click(screen.getByText("Option 2"));
    expect(onValueChange).toHaveBeenCalledWith("option2");
  });
});

describe("DropdownMenuLabel", () => {
  it("renders correctly", () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel data-testid="label">My Label</DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByTestId("label")).toBeInTheDocument();
    expect(screen.getByText("My Label")).toBeInTheDocument();
  });

  it("supports inset styling", () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel inset data-testid="label">
            Inset Label
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByTestId("label")).toHaveClass("pl-8");
  });
});

describe("DropdownMenuSeparator", () => {
  it("renders correctly", () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuSeparator data-testid="separator" />
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const separator = screen.getByTestId("separator");
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveClass("h-px");
    expect(separator).toHaveClass("bg-muted");
  });
});

describe("DropdownMenuShortcut", () => {
  it("renders correctly", () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            Save
            <DropdownMenuShortcut data-testid="shortcut">
              ⌘S
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const shortcut = screen.getByTestId("shortcut");
    expect(shortcut).toBeInTheDocument();
    expect(shortcut).toHaveClass("ml-auto");
    expect(shortcut).toHaveClass("text-xs");
    expect(screen.getByText("⌘S")).toBeInTheDocument();
  });
});

describe("DropdownMenuSub", () => {
  it("renders submenu correctly", async () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger data-testid="subtrigger">
              More options
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
                <DropdownMenuItem>Sub Item 2</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const subTrigger = screen.getByTestId("subtrigger");
    expect(subTrigger).toBeInTheDocument();
    expect(screen.getByText("More options")).toBeInTheDocument();
  });

  it("supports inset styling on subtrigger", () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger inset data-testid="subtrigger">
              Inset Submenu
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Sub Item</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(screen.getByTestId("subtrigger")).toHaveClass("pl-8");
  });
});

describe("DropdownMenu Integration", () => {
  it("works with complex nested structure", async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>File Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>File Operations</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>New File</DropdownMenuItem>
            <DropdownMenuItem>Open File</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Recent Files</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>file1.txt</DropdownMenuItem>
                <DropdownMenuItem>file2.txt</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await userEvent.click(screen.getByText("File Menu"));

    expect(screen.getByText("File Operations")).toBeInTheDocument();
    expect(screen.getByText("New File")).toBeInTheDocument();
    expect(screen.getByText("Open File")).toBeInTheDocument();
    expect(screen.getByText("Recent Files")).toBeInTheDocument();
  });

  it("supports ref forwarding", () => {
    const triggerRef = React.createRef<HTMLButtonElement>();
    const itemRef = React.createRef<HTMLDivElement>();

    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger ref={triggerRef}>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem ref={itemRef}>Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(itemRef.current).toBeInstanceOf(HTMLDivElement);
  });

  it("maintains proper accessibility", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Accessible Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Accessible Item</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const trigger = screen.getByText("Accessible Menu");
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
