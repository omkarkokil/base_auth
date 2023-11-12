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
import Select from "react-select";

interface CruiseModalProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  setData: React.Dispatch<SetStateAction<any>>;
  id: string;
}

const FiberBoatModal: FC<CruiseModalProps> = ({
  open,
  setOpen,
  setData,
  id,
}) => {
  const initialSelectedValues = {
    stay: null,
    service: null,
  };

  const [selectedValues, setSelectedValues] = useState(initialSelectedValues);

  const handleSelectChange = (selectedValue: any, fieldName: string) => {
    const selectedValueExtracted = selectedValue ? selectedValue.value : null;
    setSelectedValues({
      ...selectedValues,
      [fieldName]: selectedValueExtracted,
    });
  };

  useEffect(() => {
    setSelectedValues(initialSelectedValues);
  }, [open]);

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

  const stayOptions = [
    { value: "PB", label: "PB" },
    { value: "NL", label: "NL" },
    { value: "HL", label: "HL" },
    { value: "DP", label: "DP" },
    { value: "RN", label: "RN" },
    { value: "MY", label: "MY" },
  ];

  const serviceOptions = [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ];

  const form = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const newValues = {
      ...values,
      ...selectedValues,
      arrival: dateValue,
      time: timeValue,
      guestId: id,
    };

    setData((prev: any) => [...prev, newValues]);
    setOpen(false);
  };

  return (
    <DialogContent className="overflow-y-scroll max-h-[90vh] bg-white sm:max-w-[600px]">
      <DialogHeader className="pb-4">
        <DialogTitle>Add Fiber boat details</DialogTitle>
        <DialogDescription>Create a boat details</DialogDescription>
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
                label={"Date"}
              />
            </div>
            <div className="w-[50%]">
              <SearchSelect
                label={"Time"}
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
            <label className="text-sm font-medium " htmlFor="hotel">
              Select Stay
            </label>
            <div className="mt-2">
              <Select
                className="placeholder:text-md text-sm outline-none border-none"
                id="stay"
                options={stayOptions}
                onChange={(selectedValue) =>
                  handleSelectChange(selectedValue, "stay")
                }
              />
            </div>
          </div>

          <div className="w-full">
            <label className="text-sm font-medium " htmlFor="hotel">
              Select Service
            </label>
            <div className="mt-2">
              <Select
                className="placeholder:text-md text-sm outline-none border-none"
                id="service"
                options={serviceOptions}
                onChange={(selectedValue) =>
                  handleSelectChange(selectedValue, "service")
                }
              />
            </div>
          </div>

          <div className="w-full">
            <InputField
              form={form}
              name="boattype"
              label="Enter Boat Type"
              placeholder="boat..."
              desc=" This is your public display service."
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default FiberBoatModal;
