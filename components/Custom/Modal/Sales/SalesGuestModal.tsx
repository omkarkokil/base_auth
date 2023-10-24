"use client";

import { data } from "@/app/data/driverdata";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import InputField from "../../Input/InputField";
import PhoneNumberInput from "../../Input/PhoneNumberInput";
import * as z from "zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  guest: z.string().min(1, {
    message: "Guest field is mandatory.",
  }),
  contact: z.string().min(4, {
    message: "Contact field is mandatory.",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({ message: "Email is not Valid" }),
});

export function SalesGuestModal({ id }: { id: string }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      guest: "",
      contact: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    router.push("/sales/1/GuestInfo");
  }

  return (
    <DialogContent className=" bg-white sm:max-w-[600px]">
      <DialogHeader className="pb-4">
        <DialogTitle>Create Sales Requistion</DialogTitle>
        <DialogDescription>
          Make sales requisition form for new guest
        </DialogDescription>
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
              <InputField
                form={form}
                name="guest"
                label="Guest Name"
                placeholder="Enter guest name"
                desc=" This is your public display guest."
              />
            </div>

            <div className="w-full">
              <PhoneNumberInput
                form={form}
                name="contact"
                label="Contact Number"
                placeholder="Enter contact name"
                desc=" This is your public display contact."
              />
            </div>

            <div className="w-full">
              <InputField
                form={form}
                name="email"
                label="Enter Email id"
                type="email"
                placeholder="Enter email"
                desc=" This is your public display email."
              />
            </div>
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
}
