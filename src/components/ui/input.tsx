import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  requiredDecorator?: boolean;
  error?: string | boolean;
  value?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      value = "",
      label,
      requiredDecorator,
      error = "",
      ...props
    },
    ref
  ) => {
    return (
      <div>
        {label && (
          <label className="mb-1 ml-2 text-sm font-semibold">{label}</label>
        )}
        {requiredDecorator && <span className="ml-1 text-red-500">*</span>}
        <input
          className={cn(
            `flex h-10 w-full rounded-md border ${
              error ? "border-destructive" : "border-gray-300"
            }  bg-background px-3 
          py-2 text-sm ring-offset-background file:border-0 file:bg-transparent 
          file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground 
          focus-visible:outline-none 
          focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 autoComplete-off`,
            className
          )}
          type={type}
          value={value}
          ref={ref}
          {...props}
        />
        {error && <small className="text-destructive ml-2">{error}</small>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
