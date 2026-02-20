import * as React from "react";
import { Modal } from "./Modal";
import type { ModalSize } from "./Modal";

export interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
  size?: ModalSize;
  loading?: boolean;
}

export function ConfirmModal({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  size = "sm",
  loading = false,
}: ConfirmModalProps) {
  const handleCancel = React.useCallback(() => {
    onCancel?.();
    onOpenChange(false);
  }, [onCancel, onOpenChange]);

  const handleConfirm = React.useCallback(async () => {
    await onConfirm();
    onOpenChange(false);
  }, [onConfirm, onOpenChange]);

  const confirmButtonClass =
    variant === "destructive"
      ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
      : "bg-primary text-primary-foreground hover:bg-primary/90";

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      size={size}
      footer={
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="px-4 py-2 rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 ${confirmButtonClass}`}
          >
            {loading ? "..." : confirmLabel}
          </button>
        </div>
      }
    >
      {null}
    </Modal>
  );
}

ConfirmModal.displayName = "ConfirmModal";
