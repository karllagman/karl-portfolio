import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={clsx("px-4 py-2 rounded-md bg-cyan-600 text-white hover:bg-cyan-700", className)} {...props} />;
}