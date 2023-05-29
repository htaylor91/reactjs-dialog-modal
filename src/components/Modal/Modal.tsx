import React, { useCallback, useEffect, useRef, ReactNode } from 'react'

export interface ModalProps {
  onClose: () => void
  children: (handleClose: () => void) => ReactNode
  showModal: boolean
  onCancel?: () => void
  className?: string
  role?: "dialog" | "alertdialog"
  ariaLabelledBy?: string
  ariaDescribedBy?: string
  ariaLabel?: string
}

const Modal = (
  {
    onClose,
    children,
    showModal,
    onCancel,
    className,
    role = "dialog",
    ariaLabelledBy,
    ariaDescribedBy,
    ariaLabel
  }: ModalProps) => {

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open && showModal) {
      dialogRef.current?.showModal();
    }
  }, [showModal]);

  const handleClose = useCallback(() => {
    if (dialogRef.current?.open) {
      dialogRef.current?.close();
    }
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onCancel={onCancel && onCancel}
      onClose={onClose}
      className={className && className}
      role={role && role}
      aria-labelledby={ariaLabelledBy && ariaLabelledBy}
      aria-describedby={ariaDescribedBy && ariaDescribedBy}
      aria-label={ariaLabel && ariaLabel}
    >
      {children(handleClose)}
    </dialog>
  );
}

export default Modal;