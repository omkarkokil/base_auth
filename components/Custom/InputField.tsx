"use client";

import { FC } from "react";

interface typesOfVal {
  name: string;
  email: string;
  password: string;
}

interface InputProps {
  label: string;
  name: string;
  placeholder?: string;
  desc?: string;
  type?: string;
  form?: UseFormReturn | any;
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

const InputField: FC<InputProps> = ({
  label,
  form,
  name,
  placeholder,
  type = "text",
  desc,
}) => {
  return (
    <div>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="h-min">
            <FormLabel>{label}</FormLabel>
            <FormControl autoCorrect="off">
              <Input
                className="dark:focus:ring-white "
                type={type}
                autoComplete="off"
                autoCorrect="off"
                placeholder={placeholder}
                {...field}
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
