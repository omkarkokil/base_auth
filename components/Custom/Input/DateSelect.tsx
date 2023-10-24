"use client";
import React, { FC, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, CarTaxiFront } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

type DateProps = {
  label: string;
  date: any;
  setDate: React.Dispatch<React.SetStateAction<any>>;
};

const DateSelect: FC<DateProps> = ({ label, date, setDate }) => {
  const newDate = new Date();
  return (
    <div className="flex justify-start items-start flex-col gap-4">
      <Label htmlFor="username">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-white w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateSelect;
