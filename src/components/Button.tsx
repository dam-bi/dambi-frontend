import React from "react";

export default function Button({
  type,
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={`p-2.5 rounded-xl ${className}`} {...props}>
      {children}
    </button>
  );
}
