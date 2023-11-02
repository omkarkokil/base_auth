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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/Custom/Input/InputField";
import { Button } from "@/components/ui/button";
import DateSelect from "@/components/Custom/Input/DateSelect";
import Select from "react-select";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";

interface CruiseModalProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  setData: React.Dispatch<SetStateAction<any>>;
  id: string;
}

const formSchema = z.object({
  seat_class: z.string().min(1, {
    message: "sest class field is mandatory.",
  }),
  PNR: z.string().min(1, {
    message: "PNR field is mandatory.",
  }),
});

const CruiseModal: FC<CruiseModalProps> = ({ open, setOpen, setData, id }) => {
  const [journeyDate, setJourneyDate] = useState("");

  const initialSelectedValues = {
    time: null,
    route: null,
    cruise: null,
  };

  const [selectedValues, setSelectedValues] = useState(initialSelectedValues);

  const timeOptions = [
    { value: "AM", label: "AM" },
    { value: "PM", label: "PM" },
  ];

  const routeOptions = [
    { value: "PB-Havelock", label: "PB-Havelock" },
    { value: "PB-Neil", label: "PB-Neil" },
    { value: "Havelock-Neil", label: "Havelock-Neil" },
    { value: "Havelock-PB", label: "Havelock-PB" },
    { value: " Neil-Havelock", label: " Neil-Havelock" },
    { value: " Neil-PB", label: " Neil-PB" },
  ];

  const cruiseOptions = [
    { value: "Nautika", label: "Nautika" },
    { value: "Makruzz", label: "Makruzz" },
    { value: "Green Ocean", label: "Green Ocean" },
  ];

  const handleSelectChange = (selectedValue: any, fieldName: string) => {
    const selectedValueExtracted = selectedValue ? selectedValue.value : null;
    setSelectedValues({
      ...selectedValues,
      [fieldName]: selectedValueExtracted,
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      PNR: "",
      seat_class: "",
    },
  });

  useEffect(() => {
    setSelectedValues(initialSelectedValues);
    setJourneyDate("");
  }, [open]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const checkValues = Object.values({ ...values, ...selectedValues }).some(
      (value) => !value
    );

    if (checkValues || !journeyDate) {
      toast({
        title: "All fields are mandatory",
        variant: "destructive",
      });
      return false;
    }
    const newValues = {
      ...values,
      ...selectedValues,
      journeyDate: format(new Date(journeyDate), "PP"),
      guestId: id,
    };

    setData((prev: any) => [...prev, newValues]);

    setOpen(false);
  }

  return (
    <DialogContent className="overflow-y-scroll max-h-[90vh] bg-white sm:max-w-[600px]">
      <DialogHeader className="pb-4">
        <DialogTitle>Add Cruise Requisition</DialogTitle>
        <DialogDescription>Create a cruise requisition</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          autoComplete="off"
          autoCorrect="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <div className="w-full">
            <label className="text-sm font-medium " htmlFor="hotel">
              Select Time
            </label>
            <div className="mt-2">
              <Select
                className="placeholder:text-md text-sm outline-none border-none"
                id="time"
                options={timeOptions}
                onChange={(selectedValue) =>
                  handleSelectChange(selectedValue, "time")
                }
              />
            </div>
          </div>
          <div className="flex w-full justify-start items-start flex-col gap-4">
            <div className="w-full">
              <DateSelect
                label="Journey Date"
                date={journeyDate}
                setDate={setJourneyDate}
              />
            </div>

            <div className="w-full">
              <label className="text-sm font-medium " htmlFor="hotel">
                Select Route
              </label>
              <div className="mt-2">
                <Select
                  className="placeholder:text-md text-sm outline-none border-none"
                  id="route"
                  options={routeOptions}
                  onChange={(selectedValue) =>
                    handleSelectChange(selectedValue, "route")
                  }
                />
              </div>
            </div>

            <div className="w-full">
              <label className="text-sm font-medium " htmlFor="hotel">
                Select Cruise
              </label>
              <div className="mt-2">
                <Select
                  className="placeholder:text-md text-sm outline-none border-none"
                  id="cruise"
                  options={cruiseOptions}
                  onChange={(selectedValue) =>
                    handleSelectChange(selectedValue, "cruise")
                  }
                />
              </div>
            </div>

            <div className="w-full">
              <InputField
                form={form}
                name="seat_class"
                label="Seat Class"
                placeholder="Enter Seat Class"
                desc=" This is your public display guest."
              />
            </div>
            <div className="w-full">
              <InputField
                form={form}
                name="PNR"
                label="PNR.."
                placeholder="Enter PNR"
                desc=" This is your public display guest."
              />
            </div>

            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

export default CruiseModal;
