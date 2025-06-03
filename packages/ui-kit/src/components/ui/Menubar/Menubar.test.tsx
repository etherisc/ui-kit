import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "./Menubar";

describe("Menubar", () => {
  it("renders correctly", () => {
    render(
      <Menubar data-testid="menubar">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    expect(screen.getByTestId("menubar")).toBeDefined();
    expect(screen.getByText("File")).toBeDefined();
  });

  it("applies custom className", () => {
    render(
      <Menubar className="custom-menubar" data-testid="menubar">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    const menubar = screen.getByTestId("menubar");
    expect(menubar.className).toContain("custom-menubar");
  });

  it("supports multiple menu triggers", () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Copy</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Zoom</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    expect(screen.getByText("File")).toBeDefined();
    expect(screen.getByText("Edit")).toBeDefined();
    expect(screen.getByText("View")).toBeDefined();
  });
});

describe("MenubarTrigger and MenubarContent", () => {
  it("opens when trigger is clicked", async () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New File</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    const trigger = screen.getByText("File");
    await userEvent.click(trigger);
    expect(screen.getByText("New File")).toBeDefined();
  });

  it("applies custom className to trigger", () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="custom-trigger" data-testid="trigger">
            File
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    const trigger = screen.getByTestId("trigger");
    expect(trigger.className).toContain("custom-trigger");
  });

  it("applies custom className to content", async () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent className="custom-content" data-testid="content">
            <MenubarItem>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    const trigger = screen.getByText("File");
    await userEvent.click(trigger);

    const content = screen.getByTestId("content");
    expect(content.className).toContain("custom-content");
  });
});

describe("MenubarItem", () => {
  it("renders correctly", async () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem data-testid="item">New File</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    const trigger = screen.getByText("File");
    await userEvent.click(trigger);

    expect(screen.getByTestId("item")).toBeDefined();
    expect(screen.getByText("New File")).toBeDefined();
  });

  it("supports disabled state", async () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem disabled data-testid="item">
              Disabled Item
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    const trigger = screen.getByText("File");
    await userEvent.click(trigger);

    const item = screen.getByTestId("item");
    expect(item.className).toContain("data-[disabled]:pointer-events-none");
  });

  it("supports inset styling", async () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem inset data-testid="item">
              Inset Item
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    const trigger = screen.getByText("File");
    await userEvent.click(trigger);

    const item = screen.getByTestId("item");
    expect(item.className).toContain("pl-8");
  });

  it("handles click events", async () => {
    const onSelect = vi.fn();
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onSelect={onSelect}>Clickable Item</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    const trigger = screen.getByText("File");
    await userEvent.click(trigger);

    await userEvent.click(screen.getByText("Clickable Item"));
    expect(onSelect).toHaveBeenCalled();
  });
});

describe("MenubarCheckboxItem", () => {
  it("renders correctly", async () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem data-testid="checkbox">
              Show Toolbar
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    const trigger = screen.getByText("View");
    await userEvent.click(trigger);

    expect(screen.getByTestId("checkbox")).toBeDefined();
    expect(screen.getByText("Show Toolbar")).toBeDefined();
  });

  it("supports checked state", async () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem checked={true} data-testid="checkbox">
              Checked Item
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    const trigger = screen.getByText("View");
    await userEvent.click(trigger);

    const checkbox = screen.getByTestId("checkbox");
    expect(checkbox.getAttribute("data-state")).toBe("checked");
  });

  it("handles state changes", async () => {
    const onCheckedChange = vi.fn();
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem onCheckedChange={onCheckedChange}>
              Toggle Item
            </MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    const trigger = screen.getByText("View");
    await userEvent.click(trigger);

    await userEvent.click(screen.getByText("Toggle Item"));
    expect(onCheckedChange).toHaveBeenCalled();
  });
});

describe("MenubarRadioGroup and MenubarRadioItem", () => {
  it("renders radio group correctly", async () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Sort</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value="name">
              <MenubarRadioItem value="name" data-testid="radio1">
                By Name
              </MenubarRadioItem>
              <MenubarRadioItem value="date" data-testid="radio2">
                By Date
              </MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    const trigger = screen.getByText("Sort");
    await userEvent.click(trigger);

    expect(screen.getByTestId("radio1")).toBeDefined();
    expect(screen.getByTestId("radio2")).toBeDefined();
  });

  it("handles radio selection", async () => {
    const onValueChange = vi.fn();
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Sort</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value="name" onValueChange={onValueChange}>
              <MenubarRadioItem value="name">By Name</MenubarRadioItem>
              <MenubarRadioItem value="date">By Date</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    const trigger = screen.getByText("Sort");
    await userEvent.click(trigger);

    await userEvent.click(screen.getByText("By Date"));
    expect(onValueChange).toHaveBeenCalledWith("date");
  });
});

describe("MenubarLabel", () => {
  it("renders correctly", async () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarLabel data-testid="label">View Options</MenubarLabel>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    const trigger = screen.getByText("View");
    await userEvent.click(trigger);

    expect(screen.getByTestId("label")).toBeDefined();
    expect(screen.getByText("View Options")).toBeDefined();
  });

  it("supports inset styling", async () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarLabel inset data-testid="label">
              Inset Label
            </MenubarLabel>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    const trigger = screen.getByText("View");
    await userEvent.click(trigger);

    const label = screen.getByTestId("label");
    expect(label.className).toContain("pl-8");
  });
});

describe("MenubarSeparator", () => {
  it("renders correctly", async () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
            <MenubarSeparator data-testid="separator" />
            <MenubarItem>Open</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    const trigger = screen.getByText("File");
    await userEvent.click(trigger);

    const separator = screen.getByTestId("separator");
    expect(separator).toBeDefined();
    expect(separator.className).toContain("h-px");
  });
});

describe("MenubarShortcut", () => {
  it("renders correctly", async () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Save
              <MenubarShortcut data-testid="shortcut">⌘S</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    const trigger = screen.getByText("File");
    await userEvent.click(trigger);

    const shortcut = screen.getByTestId("shortcut");
    expect(shortcut).toBeDefined();
    expect(shortcut.className).toContain("ml-auto");
    expect(screen.getByText("⌘S")).toBeDefined();
  });
});

describe("MenubarSub", () => {
  it("renders submenu correctly", async () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger data-testid="subtrigger">
                Recent Files
              </MenubarSubTrigger>
              <MenubarPortal>
                <MenubarSubContent>
                  <MenubarItem>file1.txt</MenubarItem>
                  <MenubarItem>file2.txt</MenubarItem>
                </MenubarSubContent>
              </MenubarPortal>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    const trigger = screen.getByText("File");
    await userEvent.click(trigger);

    const subTrigger = screen.getByTestId("subtrigger");
    expect(subTrigger).toBeDefined();
    expect(screen.getByText("Recent Files")).toBeDefined();
  });

  it("supports inset styling on subtrigger", async () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger inset data-testid="subtrigger">
                Inset Submenu
              </MenubarSubTrigger>
              <MenubarPortal>
                <MenubarSubContent>
                  <MenubarItem>Sub Item</MenubarItem>
                </MenubarSubContent>
              </MenubarPortal>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    const trigger = screen.getByText("File");
    await userEvent.click(trigger);

    const subTrigger = screen.getByTestId("subtrigger");
    expect(subTrigger.className).toContain("pl-8");
  });
});

describe("Menubar Integration", () => {
  it("works with complex nested structure", async () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarLabel>File Operations</MenubarLabel>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarItem>New File</MenubarItem>
              <MenubarItem>Open File</MenubarItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Recent Files</MenubarSubTrigger>
              <MenubarPortal>
                <MenubarSubContent>
                  <MenubarItem>file1.txt</MenubarItem>
                  <MenubarItem>file2.txt</MenubarItem>
                </MenubarSubContent>
              </MenubarPortal>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    const trigger = screen.getByText("File");
    await userEvent.click(trigger);

    expect(screen.getByText("File Operations")).toBeDefined();
    expect(screen.getByText("New File")).toBeDefined();
    expect(screen.getByText("Open File")).toBeDefined();
    expect(screen.getByText("Recent Files")).toBeDefined();
  });

  it("supports ref forwarding", () => {
    const menubarRef = React.createRef<HTMLDivElement>();
    const triggerRef = React.createRef<HTMLButtonElement>();
    const itemRef = React.createRef<HTMLDivElement>();

    render(
      <Menubar ref={menubarRef}>
        <MenubarMenu>
          <MenubarTrigger ref={triggerRef}>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem ref={itemRef}>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    expect(menubarRef.current).toBeInstanceOf(HTMLDivElement);
    expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("supports keyboard navigation", async () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
            <MenubarItem>Open</MenubarItem>
            <MenubarItem>Save</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>,
    );

    const fileTrigger = screen.getByText("File");
    const editTrigger = screen.getByText("Edit");

    // Focus should be manageable
    fileTrigger.focus();
    expect(document.activeElement).toBe(fileTrigger);

    // Should be able to navigate between triggers
    editTrigger.focus();
    expect(document.activeElement).toBe(editTrigger);
  });
});
