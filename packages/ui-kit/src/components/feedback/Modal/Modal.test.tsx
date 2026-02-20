import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Modal } from "./Modal";
import { ConfirmModal } from "./ConfirmModal";

describe("Modal", () => {
  it("renders title and children when open", () => {
    render(
      <Modal open={true} onOpenChange={vi.fn()} title="Test Modal">
        <p>Modal content</p>
      </Modal>,
    );
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("does not render content when closed", () => {
    render(
      <Modal open={false} onOpenChange={vi.fn()} title="Hidden">
        <p>Hidden content</p>
      </Modal>,
    );
    expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <Modal
        open={true}
        onOpenChange={vi.fn()}
        title="Title"
        description="A description"
      >
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByText("A description")).toBeInTheDocument();
  });

  it("renders footer when provided", () => {
    render(
      <Modal
        open={true}
        onOpenChange={vi.fn()}
        footer={<button>Save</button>}
      >
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByText("Save")).toBeInTheDocument();
  });
});

describe("ConfirmModal", () => {
  it("renders confirm and cancel buttons", () => {
    render(
      <ConfirmModal
        open={true}
        onOpenChange={vi.fn()}
        onConfirm={vi.fn()}
        title="Delete item?"
        description="This cannot be undone."
      />,
    );
    expect(screen.getByText("Delete item?")).toBeInTheDocument();
    expect(screen.getByText("This cannot be undone.")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("calls onConfirm when confirm button is clicked", async () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmModal
        open={true}
        onOpenChange={vi.fn()}
        onConfirm={onConfirm}
        title="Confirm?"
      />,
    );
    fireEvent.click(screen.getByText("Confirm"));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("calls onCancel and closes when cancel is clicked", () => {
    const onCancel = vi.fn();
    const onOpenChange = vi.fn();
    render(
      <ConfirmModal
        open={true}
        onOpenChange={onOpenChange}
        onConfirm={vi.fn()}
        onCancel={onCancel}
        title="Confirm?"
      />,
    );
    fireEvent.click(screen.getByText("Cancel"));
    expect(onCancel).toHaveBeenCalledOnce();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("uses custom button labels", () => {
    render(
      <ConfirmModal
        open={true}
        onOpenChange={vi.fn()}
        onConfirm={vi.fn()}
        title="Delete?"
        confirmLabel="Yes, delete"
        cancelLabel="No, keep"
      />,
    );
    expect(screen.getByText("Yes, delete")).toBeInTheDocument();
    expect(screen.getByText("No, keep")).toBeInTheDocument();
  });

  it("disables buttons when loading", () => {
    render(
      <ConfirmModal
        open={true}
        onOpenChange={vi.fn()}
        onConfirm={vi.fn()}
        title="Processing?"
        loading={true}
      />,
    );
    const buttons = screen.getAllByRole("button");
    const cancelBtn = buttons.find((b) => b.textContent === "Cancel");
    const confirmBtn = buttons.find((b) => b.textContent === "...");
    expect(cancelBtn).toBeDisabled();
    expect(confirmBtn).toBeDisabled();
  });
});
