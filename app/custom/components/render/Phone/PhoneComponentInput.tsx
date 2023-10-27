import { useAppSelector } from "@/app/redux/hook";
import { Input, InputProps } from "@/components/ui/input";
import { calculateTextColor } from "@/lib/formController";
import React from "react";

const PhoneComponentInput = React.forwardRef<HTMLInputElement, InputProps>(
  function PhoneComponentInput({ className, type, ...props }, ref) {
    const { form } = useAppSelector((state) => state.formReducer);

    return (
      <Input
        {...props}
        ref={ref}
        style={{
          backgroundColor:
            form?.pro?.customizations?.light?.enableBackgroundColor
              ? form?.pro?.customizations?.light?.inputColor
              : null,
          color:
            form?.pro?.customizations?.light?.enableBackgroundColor
              ? calculateTextColor(form?.pro?.customizations?.light?.inputColor)
              : undefined,
        }}
      />
    );
  }
);

PhoneComponentInput.displayName = "PhoneComponentInput";

export default PhoneComponentInput;
