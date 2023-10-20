"use client";

import { data } from "@/app/data/driverdata";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, CarTaxiFront } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import SearchSelect from "../Select/SearchSelect";

export function DriverModal({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const getValues = useMemo(
    () =>
      data.find((items) => {
        return items.id === id;
      }),
    []
  );

  const newDate = new Date(getValues?.date as any);
  const [date, setDate] = useState(newDate);

  const [open2, setOpen2] = useState(false);
  const [value, setValue] = useState(getValues?.name as any);
  const [currentTime, setCurrentTime] = useState(getValues?.time as any);

  const times = Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const minute = 15 * (i % 4);
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0"
    )}`;
  });

  const driver = data.map((ele) => {
    return ele.name;
  });

  return (
    <DialogContent className="  bg-white sm:max-w-[600px]">
      <DialogHeader className="pb-4">
        <DialogTitle>Assign driver</DialogTitle>
        <DialogDescription>
          Assign driver for <b> {getValues?.trName}</b>
        </DialogDescription>
      </DialogHeader>

      <SearchSelect
        label={"Select driver for pickup"}
        placeholder={"Select driver..."}
        data={driver}
        value={value}
        icon={CarTaxiFront}
        setValue={setValue}
        open={open2}
        setOpen={setOpen2}
      />

      <div className="flex justify-start items-start flex-col gap-4">
        <Label htmlFor="username">Date of pickup</Label>
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
              onSelect={setDate as any}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <SearchSelect
        label={"Time for pickup"}
        placeholder={"select time... "}
        data={times}
        value={currentTime}
        setValue={setCurrentTime}
        icon={CalendarIcon}
        open={open}
        setOpen={setOpen}
      />

      <DialogFooter>
        <Button className="bg-primary" type="submit">
          Save changes
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
