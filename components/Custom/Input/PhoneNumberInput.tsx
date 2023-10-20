import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import React, { FC } from "react";
import { Label } from "@radix-ui/react-label";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputProps } from "./InputField";

const PhoneNumberInput: FC<InputProps> = ({
  label,
  form,
  name,
  placeholder,
  type = "text",
  desc,
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="h-min">
            <FormLabel>{label}</FormLabel>
            <FormControl autoCorrect="off">
              <PhoneInput
                country={"us"}
                inputStyle={{ width: "100%", borderColor: "#e5e7eb" }}
                specialLabel="Enter Phone number of guest"
                placeholder={placeholder}
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default PhoneNumberInput;
