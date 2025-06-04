import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./AlertDialog";

describe("AlertDialog", () => {
  it("renders trigger correctly", () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger data-testid="trigger">
          Open Dialog
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Test Dialog</AlertDialogTitle>
        </AlertDialogContent>
      </AlertDialog>,
    );

    expect(screen.getByTestId("trigger")).toBeInTheDocument();
    expect(screen.getByText("Open Dialog")).toBeInTheDocument();
  });

  it("opens dialog when trigger is clicked", () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Test Dialog</AlertDialogTitle>
          <AlertDialogDescription>Dialog content</AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>,
    );

    // Dialog should not be visible initially
    expect(screen.queryByText("Test Dialog")).not.toBeInTheDocument();

    // Click trigger to open dialog
    fireEvent.click(screen.getByText("Open Dialog"));

    // Dialog should now be visible
    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
    expect(screen.getByText("Dialog content")).toBeInTheDocument();
  });

  it("renders complete dialog structure", () => {
    render(
      <AlertDialog defaultOpen>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Action</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>,
    );

    expect(screen.getByText("Confirm Action")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure you want to continue?"),
    ).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Continue")).toBeInTheDocument();
  });

  it("renders without description", () => {
    render(
      <AlertDialog defaultOpen>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Simple Dialog</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>,
    );

    expect(screen.getByText("Simple Dialog")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("OK")).toBeInTheDocument();
  });

  it("supports custom className", () => {
    render(
      <AlertDialog defaultOpen>
        <AlertDialogContent className="custom-content" data-testid="content">
          <AlertDialogHeader className="custom-header" data-testid="header">
            <AlertDialogTitle className="custom-title" data-testid="title">
              Title
            </AlertDialogTitle>
            <AlertDialogDescription
              className="custom-description"
              data-testid="description"
            >
              Description
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="custom-footer" data-testid="footer">
            <AlertDialogCancel className="custom-cancel" data-testid="cancel">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="custom-action" data-testid="action">
              Action
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>,
    );

    expect(screen.getByTestId("content")).toHaveClass("custom-content");
    expect(screen.getByTestId("header")).toHaveClass("custom-header");
    expect(screen.getByTestId("title")).toHaveClass("custom-title");
    expect(screen.getByTestId("description")).toHaveClass("custom-description");
    expect(screen.getByTestId("footer")).toHaveClass("custom-footer");
    expect(screen.getByTestId("cancel")).toHaveClass("custom-cancel");
    expect(screen.getByTestId("action")).toHaveClass("custom-action");
  });

  it("forwards refs correctly", () => {
    const triggerRef = { current: null };
    const titleRef = { current: null };
    const descriptionRef = { current: null };
    const actionRef = { current: null };
    const cancelRef = { current: null };

    render(
      <AlertDialog defaultOpen>
        <AlertDialogTrigger ref={triggerRef}>Trigger</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle ref={titleRef}>Title</AlertDialogTitle>
          <AlertDialogDescription ref={descriptionRef}>
            Description
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel ref={cancelRef}>Cancel</AlertDialogCancel>
            <AlertDialogAction ref={actionRef}>Action</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>,
    );

    expect(titleRef.current).toBeInstanceOf(HTMLHeadingElement);
    expect(descriptionRef.current).toBeInstanceOf(HTMLParagraphElement);
    expect(actionRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(cancelRef.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("has proper accessibility attributes", () => {
    render(
      <AlertDialog defaultOpen>
        <AlertDialogContent>
          <AlertDialogTitle>Alert Title</AlertDialogTitle>
          <AlertDialogDescription>Alert Description</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>,
    );

    // Check for dialog role
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();

    // Check for proper heading structure
    expect(
      screen.getByRole("heading", { name: "Alert Title" }),
    ).toBeInTheDocument();
  });

  it("handles controlled state", () => {
    const ControlledDialog = () => {
      const [open, setOpen] = React.useState(false);

      return (
        <div>
          <button onClick={() => setOpen(true)} data-testid="external-trigger">
            Open
          </button>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
              <AlertDialogTitle>Controlled Dialog</AlertDialogTitle>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>OK</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    };

    render(<ControlledDialog />);

    // Dialog should not be visible initially
    expect(screen.queryByText("Controlled Dialog")).not.toBeInTheDocument();

    // Click external trigger
    fireEvent.click(screen.getByTestId("external-trigger"));

    // Dialog should now be visible
    expect(screen.getByText("Controlled Dialog")).toBeInTheDocument();
  });
});
