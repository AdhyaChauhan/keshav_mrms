import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

export const Select = SelectPrimitive.Root;

export const SelectTrigger = React.forwardRef(
  ({ className = "", children, ...props }, ref) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md bg-white
        text-gray-700 flex justify-between items-center
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        ${className}`}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
);

export const SelectContent = React.forwardRef(
  ({ className = "", children, ...props }, ref) => (
    <SelectPrimitive.Content
      ref={ref}
      className={`bg-white border border-gray-200 rounded-md shadow-lg
        overflow-hidden mt-1
        ${className}`}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  )
);

export const SelectItem = React.forwardRef(
  ({ className = "", children, ...props }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={`px-3 py-2 rounded-md cursor-pointer text-gray-700
        hover:bg-gray-100
        focus:bg-gray-100 focus:outline-none
        ${className}`}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <Check className="w-4 h-4 ml-2 text-indigo-600" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
);

export const SelectValue = SelectPrimitive.Value;
