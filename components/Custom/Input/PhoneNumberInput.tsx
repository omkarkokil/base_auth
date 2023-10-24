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
import { Phone } from "lucide-react";

type PhoneAddtional = {
  state: string;
};

const PhoneNumberInput: FC<InputProps & PhoneAddtional> = ({
  label,
  form,
  name,
  placeholder,
  state,
  onChange,
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="h-min">
            <FormLabel
            // className={`${!state ? "text-danger" : "text-black"}`}
            >
              {label}
            </FormLabel>
            <FormControl autoCorrect="off">
              <PhoneInput
                country={"in"}
                inputStyle={{ width: "100%", borderColor: "#e5e7eb" }}
                specialLabel="Enter Phone number of guest"
                placeholder={placeholder}
                onChange={(phone) => {
                  onChange && onChange(name, phone);
                }}
              />
            </FormControl>

            {/* <FormMessage /> */}
          </FormItem>
        )}
      />
    </>
  );
};

export default PhoneNumberInput;
