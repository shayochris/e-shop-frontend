import React from "react";

type GridProps = {
  className?: string;
  children: React.ReactNode;
  gap?: number;
};

export default function Grid({ children, className = "", gap = 4 }: GridProps) {
  return (
    <div
      className={`grid grid-cols-12 ${className} `}
      style={{ gap: `${gap * 0.25}rem` }}
    >
      {children}
    </div>
  );
}
