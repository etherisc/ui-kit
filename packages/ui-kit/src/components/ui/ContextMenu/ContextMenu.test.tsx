import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./ContextMenu";

describe("ContextMenu", () => {
  it("renders correctly", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger data-testid="trigger">
          Right click me
        </ContextMenuTrigger>
        <ContextMenuContent data-testid="content">
          <ContextMenuItem>Item 1</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    expect(screen.getByTestId("trigger")).toBeDefined();
    expect(screen.getByText("Right click me")).toBeDefined();
  });

  it("opens when trigger is right-clicked", async () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click area</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Context Item</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    const trigger = screen.getByText("Right click area");
    fireEvent.contextMenu(trigger);
    expect(screen.getByText("Context Item")).toBeDefined();
  });

  it("supports right-click trigger behavior", () => {
    const onSelect = vi.fn();
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click area</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={onSelect}>Context Item</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    const trigger = screen.getByText("Right click area");
    fireEvent.contextMenu(trigger);

    const item = screen.getByText("Context Item");
    fireEvent.click(item);
    expect(onSelect).toHaveBeenCalled();
  });
});

describe("ContextMenuContent", () => {
  it("renders with correct classes", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent data-testid="content">
          <ContextMenuItem>Item</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    const trigger = screen.getByText("Right click");
    fireEvent.contextMenu(trigger);

    const content = screen.getByTestId("content");
    expect(content.className).toContain("z-50");
    expect(content.className).toContain("min-w-[8rem]");
  });

  it("supports custom className", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent className="custom-content" data-testid="content">
          <ContextMenuItem>Item</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    const trigger = screen.getByText("Right click");
    fireEvent.contextMenu(trigger);

    const content = screen.getByTestId("content");
    expect(content.className).toContain("custom-content");
  });
});

describe("ContextMenuItem", () => {
  it("renders correctly", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem data-testid="item">Test Item</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    const trigger = screen.getByText("Right click");
    fireEvent.contextMenu(trigger);

    expect(screen.getByTestId("item")).toBeDefined();
    expect(screen.getByText("Test Item")).toBeDefined();
  });

  it("supports disabled state", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem disabled data-testid="item">
            Disabled Item
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    const trigger = screen.getByText("Right click");
    fireEvent.contextMenu(trigger);

    const item = screen.getByTestId("item");
    expect(item.className).toContain("data-[disabled]:pointer-events-none");
  });

  it("supports inset styling", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem inset data-testid="item">
            Inset Item
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    const trigger = screen.getByText("Right click");
    fireEvent.contextMenu(trigger);

    const item = screen.getByTestId("item");
    expect(item.className).toContain("pl-8");
  });

  it("handles click events", async () => {
    const onSelect = vi.fn();
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={onSelect}>Clickable Item</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    const trigger = screen.getByText("Right click");
    fireEvent.contextMenu(trigger);

    await userEvent.click(screen.getByText("Clickable Item"));
    expect(onSelect).toHaveBeenCalled();
  });
});

describe("ContextMenuCheckboxItem", () => {
  it("renders correctly", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuCheckboxItem data-testid="checkbox">
            Checkbox Item
          </ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    const trigger = screen.getByText("Right click");
    fireEvent.contextMenu(trigger);

    expect(screen.getByTestId("checkbox")).toBeDefined();
    expect(screen.getByText("Checkbox Item")).toBeDefined();
  });

  it("supports checked state", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuCheckboxItem checked={true} data-testid="checkbox">
            Checked Item
          </ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    const trigger = screen.getByText("Right click");
    fireEvent.contextMenu(trigger);

    const checkbox = screen.getByTestId("checkbox");
    expect(checkbox.getAttribute("data-state")).toBe("checked");
  });

  it("handles state changes", async () => {
    const onCheckedChange = vi.fn();
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuCheckboxItem onCheckedChange={onCheckedChange}>
            Toggle Item
          </ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    const trigger = screen.getByText("Right click");
    fireEvent.contextMenu(trigger);

    await userEvent.click(screen.getByText("Toggle Item"));
    expect(onCheckedChange).toHaveBeenCalled();
  });
});

describe("ContextMenuRadioGroup and ContextMenuRadioItem", () => {
  it("renders radio group correctly", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuRadioGroup value="option1">
            <ContextMenuRadioItem value="option1" data-testid="radio1">
              Option 1
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="option2" data-testid="radio2">
              Option 2
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>,
    );

    const trigger = screen.getByText("Right click");
    fireEvent.contextMenu(trigger);

    expect(screen.getByTestId("radio1")).toBeDefined();
    expect(screen.getByTestId("radio2")).toBeDefined();
  });

  it("handles radio selection", async () => {
    const onValueChange = vi.fn();
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuRadioGroup value="option1" onValueChange={onValueChange}>
            <ContextMenuRadioItem value="option1">
              Option 1
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="option2">
              Option 2
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>,
    );

    const trigger = screen.getByText("Right click");
    fireEvent.contextMenu(trigger);

    await userEvent.click(screen.getByText("Option 2"));
    expect(onValueChange).toHaveBeenCalledWith("option2");
  });
});

describe("ContextMenuLabel", () => {
  it("renders correctly", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel data-testid="label">My Label</ContextMenuLabel>
        </ContextMenuContent>
      </ContextMenu>,
    );

    const trigger = screen.getByText("Right click");
    fireEvent.contextMenu(trigger);

    expect(screen.getByTestId("label")).toBeDefined();
    expect(screen.getByText("My Label")).toBeDefined();
  });

  it("supports inset styling", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel inset data-testid="label">
            Inset Label
          </ContextMenuLabel>
        </ContextMenuContent>
      </ContextMenu>,
    );

    const trigger = screen.getByText("Right click");
    fireEvent.contextMenu(trigger);

    const label = screen.getByTestId("label");
    expect(label.className).toContain("pl-8");
  });
});

describe("ContextMenuSeparator", () => {
  it("renders correctly", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Item 1</ContextMenuItem>
          <ContextMenuSeparator data-testid="separator" />
          <ContextMenuItem>Item 2</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    const trigger = screen.getByText("Right click");
    fireEvent.contextMenu(trigger);

    const separator = screen.getByTestId("separator");
    expect(separator).toBeDefined();
    expect(separator.className).toContain("h-px");
  });
});

describe("ContextMenuShortcut", () => {
  it("renders correctly", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>
            Save
            <ContextMenuShortcut data-testid="shortcut">⌘S</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    const trigger = screen.getByText("Right click");
    fireEvent.contextMenu(trigger);

    const shortcut = screen.getByTestId("shortcut");
    expect(shortcut).toBeDefined();
    expect(shortcut.className).toContain("ml-auto");
    expect(screen.getByText("⌘S")).toBeDefined();
  });
});

describe("ContextMenuSub", () => {
  it("renders submenu correctly", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuSub>
            <ContextMenuSubTrigger data-testid="subtrigger">
              More options
            </ContextMenuSubTrigger>
            <ContextMenuPortal>
              <ContextMenuSubContent>
                <ContextMenuItem>Sub Item 1</ContextMenuItem>
                <ContextMenuItem>Sub Item 2</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuPortal>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>,
    );

    const trigger = screen.getByText("Right click");
    fireEvent.contextMenu(trigger);

    const subTrigger = screen.getByTestId("subtrigger");
    expect(subTrigger).toBeDefined();
    expect(screen.getByText("More options")).toBeDefined();
  });

  it("supports inset styling on subtrigger", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset data-testid="subtrigger">
              Inset Submenu
            </ContextMenuSubTrigger>
            <ContextMenuPortal>
              <ContextMenuSubContent>
                <ContextMenuItem>Sub Item</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuPortal>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>,
    );

    const trigger = screen.getByText("Right click");
    fireEvent.contextMenu(trigger);

    const subTrigger = screen.getByTestId("subtrigger");
    expect(subTrigger.className).toContain("pl-8");
  });
});

describe("ContextMenu Integration", () => {
  it("works with complex nested structure", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>File Area</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>File Operations</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem>New File</ContextMenuItem>
            <ContextMenuItem>Open File</ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>Recent Files</ContextMenuSubTrigger>
            <ContextMenuPortal>
              <ContextMenuSubContent>
                <ContextMenuItem>file1.txt</ContextMenuItem>
                <ContextMenuItem>file2.txt</ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuPortal>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>,
    );

    const trigger = screen.getByText("File Area");
    fireEvent.contextMenu(trigger);

    expect(screen.getByText("File Operations")).toBeDefined();
    expect(screen.getByText("New File")).toBeDefined();
    expect(screen.getByText("Open File")).toBeDefined();
    expect(screen.getByText("Recent Files")).toBeDefined();
  });

  it("supports ref forwarding", () => {
    const triggerRef = React.createRef<HTMLSpanElement>();
    const itemRef = React.createRef<HTMLDivElement>();

    render(
      <ContextMenu>
        <ContextMenuTrigger ref={triggerRef}>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem ref={itemRef}>Item</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    const trigger = screen.getByText("Right click");
    fireEvent.contextMenu(trigger);

    expect(triggerRef.current).toBeInstanceOf(HTMLSpanElement);
    expect(itemRef.current).toBeInstanceOf(HTMLDivElement);
  });
});
