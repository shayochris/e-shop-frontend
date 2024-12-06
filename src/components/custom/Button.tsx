import React from "react";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

export type CustomButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "destructive"
    | "secondary"
    | "ghost"
    | "link";
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
};

export default function CustomButton({
  children,
  loading = false,
  className,
  variant,
  disabled = false,
  type = "button",
}: CustomButtonProps) {
  return (
    <Button
      className={className}
      variant={variant}
      disabled={disabled}
      type={type}
    >
      {loading && <Loader className="animate-spin" />}
      {children}
    </Button>
  );
}
