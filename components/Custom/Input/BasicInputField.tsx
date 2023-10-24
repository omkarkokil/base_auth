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
  value?: string | number;
  setValue?: React.Dispatch<React.SetStateAction<{}>> | undefined;
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

const BasicInputField: FC<InputProps> = ({
  label,
  name,
  placeholder,
  value,
  setValue,
  type = "text",
}) => {
  return (
    <div className="flex flex-col gap-4">
      <FormLabel>{label}</FormLabel>
      <Input
        className="dark:focus:ring-white "
        type={type}
        name={name}
        autoComplete="off"
        autoCorrect="off"
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (setValue) {
            setValue(e.target.value);
          }
        }}
      />
    </div>
  );
};

export default BasicInputField;
