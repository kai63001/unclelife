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
          backgroundColor: form?.pro?.customizations?.light
            ?.enableBackgroundColor
            ? form?.pro?.customizations?.light?.inputColor
            : null,
          ...(form?.pro?.customizations?.light?.enableBackgroundColor &&
            form?.pro?.customizations?.light?.inputColor && {
              color: calculateTextColor(
                form?.pro?.customizations?.light?.inputColor
              ),
            }),
        }}
      />
    );
  }
);

PhoneComponentInput.displayName = "PhoneComponentInput";

export default PhoneComponentInput;
