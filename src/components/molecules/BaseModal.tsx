"use client";
import React from "react";
import { ModalBackdrop } from "../atoms/ModalBackdrop";
import { ModalContainer } from "../atoms/ModalContainer";

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
  if (!isOpen) return null;

  return (
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
    </>
  );
};
