"use client";
import React, { useEffect, useState } from "react";
import { ModalBackdrop } from "../atoms/ModalBackdrop";
import { ModalContainer } from "../atoms/ModalContainer";
import { createPortal } from "react-dom";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  text?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const BaseModal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  text,
}: BaseModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isOpen) return null;

  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) return null;

  return createPortal(
    <>
      <ModalBackdrop onClick={onClose} />
      <ModalContainer>
        <div className="flex flex-col gap-2 justify-between items-center mb-4">
          {title && <h2 className="text-2xl font-bold">{title}</h2>}
          {text && <span className="text-gray-500">{text}</span>}
        </div>
        <div>{children}</div>
        {footer && <div>{footer}</div>}
      </ModalContainer>
    </>,
    modalRoot
  );
};
