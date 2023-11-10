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
import Select from "react-select";
import SearchSelect from "@/components/Custom/Select/SearchSelect";
import DateSelect from "@/components/Custom/Input/DateSelect";
import { Calendar } from "lucide-react";
import InputField from "@/components/Custom/Input/InputField";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface CruiseModalProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  setData: React.Dispatch<SetStateAction<any>>;
  id: string;
}

const DiscountedModal: FC<CruiseModalProps> = ({
  open,
  setOpen,
  setData,
  id,
}) => {
  const initialSelectedValues = {
    Activies: null,
    stay: null,
    service: null,
    complimentary: null,
  };

  const [selectedValues, setSelectedValues] = useState(initialSelectedValues);

  const [openTime, setOpenTime] = useState(false);
  const [timeValue, setTimeValue] = useState("");
  const [dateValue, setDateValue] = useState();
  const [remark, setRemark] = useState("");

  const activitesOptions = [
    { value: "Activity1", label: "Activity1" },
    { value: "Activity2", label: "Activity2" },
    { value: "Activity3", label: "Activity3" },
  ];

  const stayOptions = [
    { value: "PB", label: "PB" },
    { value: "NL", label: "NL" },
    { value: "HL", label: "HL" },
    { value: "DP", label: "DP" },
    { value: "RN", label: "RN" },
    { value: "MY", label: "MY" },
  ];

  const baseOptions = [
    { value: true, label: "yes" },
    { value: false, label: "No" },
  ];

  const handleSelectChange = (selectedValue: any, fieldName: string) => {
    const selectedValueExtracted = selectedValue ? selectedValue.value : null;
    setSelectedValues({
      ...selectedValues,
      [fieldName]: selectedValueExtracted,
    });
  };

  const times = Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const minute = 15 * (i % 4);
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0"
    )}`;
  });

  const form = useForm();

  useEffect(() => {
    setSelectedValues(initialSelectedValues);
  }, [open]);

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const newValues = {
      ...values,
      arrival: dateValue,
      time: timeValue,
      ...selectedValues,
      remark: remark,
      guestId: id,
    };

    console.log(newValues);
    setData((prev: any) => [...prev, newValues]);
    setOpen(false);
  };

  return (
    <DialogContent className="overflow-y-scroll max-h-[90vh] bg-white sm:max-w-[600px]">
      <DialogHeader className="pb-4">
        <DialogTitle>Add Complimentary / Discounted Requisition</DialogTitle>
        <DialogDescription>
          Create a Complimentary / Discounted requisition
        </DialogDescription>
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
              Select Activities
            </label>
            <div className="mt-2">
              <Select
                className="placeholder:text-md text-sm outline-none border-none"
                id="Activies"
                options={activitesOptions}
                onChange={(selectedValue) =>
                  handleSelectChange(selectedValue, "Activies")
                }
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
              name="pax"
              label="Enter Pax"
              placeholder="pax..."
              desc=" This is your public display service."
            />
          </div>

          <div className="w-full">
            <InputField
              form={form}
              name="amount"
              label="Enter Amount"
              placeholder="Amount..."
              desc=" This is your public display service."
            />
          </div>

          <div className="flex gap-2 w-full items-center">
            <div className="w-[50%]">
              <label className="text-sm font-medium " htmlFor="hotel">
                No Complimentry
              </label>
              <div className="mt-2">
                <Select
                  className="placeholder:text-md text-sm outline-none border-none"
                  id="complimentary"
                  options={baseOptions}
                  onChange={(selectedValue) =>
                    handleSelectChange(selectedValue, "complimentary")
                  }
                />
              </div>
            </div>
            <div className="w-[50%]">
              <label className="text-sm font-medium " htmlFor="service">
                Paid Service
              </label>
              <div className="mt-2">
                <Select
                  className="placeholder:text-md text-sm outline-none border-none"
                  id="service"
                  options={baseOptions}
                  onChange={(selectedValue) =>
                    handleSelectChange(selectedValue, "service")
                  }
                />
              </div>
            </div>
          </div>

          <div className="w-full">
            <Label htmlFor="remark">Remarks</Label>
            <Textarea
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className="mt-2"
              placeholder="Remarks"
            />
          </div>

          {/* <div className="w-full">
            <label className="text-sm font-medium " htmlFor="hotel">
              AC/NON_AC
            </label>
            <div className="mt-2">
              <Select
                className="placeholder:text-md text-sm outline-none border-none"
                id="ac_nonac"
                options={acOptions}
                onChange={(selectedValue) =>
                  handleSelectChange(selectedValue, "ac_nonac")
                }
              />
            </div>
          </div>

          <div className="w-full">
            <label className="text-sm font-medium " htmlFor="hotel">
              Vehical Type
            </label>
            <div className="mt-2">
              <Select
                className="placeholder:text-md text-sm outline-none border-none"
                id="vehical_type"
                options={typeOptions}
                onChange={(selectedValue) =>
                  handleSelectChange(selectedValue, "vehical_type")
                }
              />
            </div>
          </div> */}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default DiscountedModal;
