import React, { FC, SetStateAction, useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import * as z from "zod";
import { Form } from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import SearchSelect from "@/components/Custom/Select/SearchSelect";
import DateSelect from "@/components/Custom/Input/DateSelect";
import { Calendar } from "lucide-react";
import InputField from "@/components/Custom/Input/InputField";

interface CruiseModalProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  setData: React.Dispatch<SetStateAction<any>>;
  id: string;
}

const FlightModal: FC<CruiseModalProps> = ({ open, setOpen, setData, id }) => {
  const [openTime, setOpenTime] = useState(false);
  const [timeValue, setTimeValue] = useState("");
  const [dateValue, setDateValue] = useState();

  const times = Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const minute = 15 * (i % 4);
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0"
    )}`;
  });

  const form = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const newValues = {
      ...values,
      arrival: dateValue,
      time: timeValue,
      guestId: id,
    };

    console.log(newValues);
    setData((prev: any) => [...prev, newValues]);
    setOpen(false);
  };

  return (
    <DialogContent className="overflow-y-scroll max-h-[90vh] bg-white sm:max-w-[600px]">
      <DialogHeader className="pb-4">
        <DialogTitle>Add Create a Flight details</DialogTitle>
        <DialogDescription>Create a Flight details</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          autoComplete="off"
          autoCorrect="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <div className="flex gap-2 w-full items-center">
            <div className="w-[50%]">
              <DateSelect
                date={dateValue}
                setDate={setDateValue}
                label={"Date of Arrival"}
              />
            </div>
            <div className="w-[50%]">
              <SearchSelect
                label={"Time for arrival"}
                placeholder={"select time... "}
                data={times}
                value={timeValue}
                setValue={setTimeValue}
                icon={Calendar}
                open={openTime}
                setOpen={setOpenTime}
              />
            </div>
          </div>

          <div className="w-full">
            <InputField
              form={form}
              name="flightno"
              label="Enter Flight No"
              placeholder="flight no..."
              desc=" This is your public display service."
            />
          </div>

          <div className="w-full">
            <InputField
              form={form}
              name="deptcity"
              label="Enter Dept.City"
              placeholder="Dept.City..."
              desc=" This is your public display service."
            />
          </div>

          <div className="w-full">
            <InputField
              form={form}
              name="arrivalcity"
              label="Enter arrival city"
              placeholder="arrival..."
              desc=" This is your public display service."
            />
          </div>

          <div className="w-full">
            <InputField
              form={form}
              name="PNR"
              label="Enter PNR"
              placeholder="PNR..."
              desc=" This is your public display service."
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default FlightModal;
