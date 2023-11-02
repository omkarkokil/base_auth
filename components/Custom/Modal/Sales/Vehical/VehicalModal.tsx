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

interface CruiseModalProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  setData: React.Dispatch<SetStateAction<any>>;
  id: string;
}

const VehicalModal: FC<CruiseModalProps> = ({ open, setOpen, setData, id }) => {
  const initialSelectedValues = {
    place: null,
    service: null,
    ac_nonac: null,
    vehical_type: null,
  };

  const [selectedValues, setSelectedValues] = useState(initialSelectedValues);

  const stayOptions = [
    { value: "PB", label: "PB" },
    { value: "NL", label: "NL" },
    { value: "HL", label: "HL" },
    { value: "DP", label: "DP" },
    { value: "RN", label: "RN" },
    { value: "MY", label: "MY" },
  ];

  const acOptions = [
    { value: "AC", label: "AC" },
    { value: "NON_AC", label: "NON_AC" },
  ];

  const typeOptions = [
    { value: "Two wheeler", label: "Two wheeler" },
    { value: "Four Wheeler", label: "Four Wheeler" },
  ];

  const serviceOptions = [
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ];

  const handleSelectChange = (selectedValue: any, fieldName: string) => {
    const selectedValueExtracted = selectedValue ? selectedValue.value : null;
    setSelectedValues({
      ...selectedValues,
      [fieldName]: selectedValueExtracted,
    });
  };

  const form = useForm();

  useEffect(() => {
    setSelectedValues(initialSelectedValues);
  }, [open]);

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const newValues = {
      ...selectedValues,
      guestId: id,
    };
    setData((prev: any) => [...prev, newValues]);
    setOpen(false);
  };

  return (
    <DialogContent className="overflow-y-scroll max-h-[90vh] bg-white sm:max-w-[600px]">
      <DialogHeader className="pb-4">
        <DialogTitle>Add Vehical Requisition</DialogTitle>
        <DialogDescription>Create a vehical requisition</DialogDescription>
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
              Select Stay
            </label>
            <div className="mt-2">
              <Select
                className="placeholder:text-md text-sm outline-none border-none"
                id="place"
                options={stayOptions}
                onChange={(selectedValue) =>
                  handleSelectChange(selectedValue, "place")
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
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default VehicalModal;
