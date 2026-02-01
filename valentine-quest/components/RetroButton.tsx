import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface RetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "normal" | "danger" | "success";
}

export const RetroButton: React.FC<RetroButtonProps> = ({
  className,
  children,
  variant = "normal",
  ...props
}) => {
  return (
    <button
      className={twMerge(
        "retro-button",
        variant === "danger" && "text-red-900",
        variant === "success" && "text-green-900",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
