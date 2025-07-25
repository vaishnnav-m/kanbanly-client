import React from "react";

interface ModalBackdropProps {
  onClick?: () => void;
}

export const ModalBackdrop = ({ onClick }: ModalBackdropProps) => (
  <div
    className="fixed inset-0 bg-black/50 z-[999]"
    onClick={onClick}
    aria-hidden="true"
  />
);