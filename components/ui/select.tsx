import * as React from "react";
import { cn } from "@/lib/utils";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.ComponentPropsWithoutRef<"select">
>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "border-2 border-gray-300 rounded-lg shadow-md p-2 text-sm focus:ring-2 focus:ring-violet-500",
      className
    )}
    {...props}
  />
));

Select.displayName = "Select";

export const SelectTrigger = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-between">{children}</div>
);

export const SelectContent = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white p-2 rounded-md shadow-md">{children}</div>
);

export const SelectItem = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: string;
}) => (
  <option value={value} className="text-sm py-2 hover:bg-violet-100">
    {children}
  </option>
);

export const SelectValue = ({ children }: { children: React.ReactNode }) => (
  <span className="text-sm text-gray-700">{children}</span>
);
