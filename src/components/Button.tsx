import { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { children, className, ...rest } = props;
  return (
    <button
      className={`rounded border bg-white px-4 py-2 transition-all duration-250 hover:cursor-pointer hover:bg-gray-300 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
