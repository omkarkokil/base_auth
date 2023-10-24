"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { FC, useEffect, useMemo, useState } from "react";
import * as z from "zod";
import { useRouter } from "next/navigation";
import InputField from "@/components/Custom/Input/InputField";
import BasicInputField from "@/components/Custom/Input/BasicInputField";
import { ActivityStateProps } from "@/app/(routes)/sales/[salesid]/Components/Form2/Iternairyform";

// const formSchema = z.object({
//   guest: z.string().min(1, {
//     message: "Guest field is mandatory.",
//   }),
//   contact: z.string().min(4, {
//     message: "Contact field is mandatory.",
//   }),
//   email: z
//     .string()
//     .min(1, {
//       message: "Email is required",
//     })
//     .email({ message: "Email is not Valid" }),
// });

export interface InputProps {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  setFormData?: React.Dispatch<React.SetStateAction<ActivityStateProps>>;
  formdata?: string[];
}

export const ItineraryModal: FC<InputProps> = ({
  setOpen,
  setFormData,
  formdata,
}) => {
  const [activity, setActivity] = useState<any>(0);

  const form = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    console.log(values);
    if (setOpen && setFormData) {
      setFormData(Object.values(values));
      values && setOpen(false);
    }
    console.log(formdata, "form");
  };

  return (
    <DialogContent className=" bg-white sm:max-w-[600px]">
      <DialogHeader className="pb-4">
        <DialogTitle>Add Activity Form</DialogTitle>
        <DialogDescription>Create a Activity Form</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          autoComplete="off"
          autoCorrect="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <div className="flex w-full justify-start items-start flex-col gap-4">
            <div className="w-full">
              <BasicInputField
                name="guest"
                label="Total Activity"
                placeholder="2"
                value={activity}
                setValue={setActivity}
              />
            </div>

            {Array.from({ length: activity }, (_, index) => (
              <div className="w-full">
                <InputField
                  form={form}
                  name={`activty${index + 1}`}
                  label={`activty ${index + 1}`}
                  placeholder={`Enter activty ${index + 1}`}
                  desc=" This is your public display guest."
                />
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button className="bg-primary" type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
