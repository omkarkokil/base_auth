"use client";

import { FC } from "react";

interface typesOfVal {
  name: string;
  email: string;
  password: string;
}

export interface InputProps {
  label: string;
  name: string;
  placeholder?: string;
  desc?: string;
  type?: string;
  form?: UseFormReturn | any;
  setState?: React.Dispatch<React.SetStateAction<StateInputProps>>;
  onChange?: (name: string, value: string) => void;
}

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { StateInputProps } from "@/app/(routes)/sales/[salesid]/Components/Form1/SalesForm";
import { number } from "zod";

const InputField: FC<InputProps> = ({
  label,
  form,
  name,
  placeholder,
  type = "text",
  desc,
  setState,
  onChange,
}) => {
  return (
    <div>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="h-min">
            <FormLabel>{label}</FormLabel>
            <FormControl
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChange && onChange(name, e.target.value)
              }
              autoCorrect="off"
            >
              <Input
                className="dark:focus:ring-white "
                type={type}
                autoComplete="off"
                autoCorrect="off"
                placeholder={placeholder}
                value={field.value}
                min={1}
                max={100}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (type === "number") {
                    form.setValue(name, parseFloat(e.target.value));
                  } else {
                    form.setValue(name, e.target.value);
                  }
                }}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default InputField;
