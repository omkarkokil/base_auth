"use client";
import React, { FC } from "react";

import { data } from "@/app/data/driverdata";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  CarTaxiFront,
  Check,
  ChevronsUpDown,
  UserCircle2,
} from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SelectProps {
  data: string[];
  open: boolean;
  setOpen: (arg: boolean) => void;
  value: string;
  setValue: (arg: string) => void;
  label: string;
  placeholder: string;
  icon?: any;
}

const SearchSelect: FC<SelectProps> = ({
  data,
  open,
  setOpen,
  value,
  setValue,
  label,
  placeholder,
  icon: Icon,
}) => {
  return (
    <>
      <div className="flex justify-start items-start flex-col gap-4">
        <Label htmlFor="name">{label}</Label>
        <Popover modal={true} open={open} onOpenChange={setOpen}>
          <PopoverTrigger className="w-full" asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className=" justify-between"
            >
              {value
                ? data.find((item) => {
                    return item.toLowerCase() === value.toLowerCase();
                  })
                : placeholder}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full  bg-white p-0">
            <Command className="w-full  ">
              <CommandInput className="w-full" placeholder={placeholder} />
              <CommandEmpty>driver not found.</CommandEmpty>
              <CommandGroup className="w-full max-h-72 overflow-y-auto">
                {data.map((item) => (
                  <CommandItem
                    key={item}
                    className="hover:bg-primary cursor-pointer hover:text-white"
                    onSelect={(currentValue) => {
                      setValue(currentValue);
                      setOpen(false);
                    }}
                  >
                   {Icon && <Icon className="h-4 mr-2" />}
                    {item}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default SearchSelect;
