"use client";

import { data } from "@/app/data/driverdata";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { FC, useEffect, useMemo, useState } from "react";
import InputField from "../../Input/InputField";
import * as z from "zod";
import { useRouter } from "next/navigation";
import DateSelect from "../../Input/DateSelect";
import { toast } from "@/components/ui/use-toast";
import { Guest } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Guest field is mandatory.",
  }),
  points: z.number().min(1, {
    message: "Point field is mandatory.",
  }),
});

export interface InputProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
  open: boolean;
}

export const SalesGuestModal: FC<InputProps> = ({ setOpen, id, open }) => {
  const [userData, setUserData] = useState<Guest>();
  const getUsers = async () => {
    try {
      if (!id) {
        return null;
      }
      const res = await fetch(`/api/guest/${id}`);

      if (!res.ok) {
        return res.status;
      }

      if (res.ok) {
        const data = await res.json();

        setUserData(data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
    console.log(userData);
  }, []);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData && userData?.name,
      points: userData && userData?.points,
    },
  });

  const [filledDate, setFilledDate] = useState(userData?.filledDate);
  const [bookedDate, setBookedDate] = useState(userData?.bookedDate);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("/api/guest", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          filledDate: filledDate && new Date(filledDate),
          bookedDate: bookedDate && new Date(bookedDate),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200 || res.status === 402) {
        toast({
          title: res.statusText,
        });
      }

      if (res.ok) {
        setOpen(false);
        router.refresh();
        toast({
          title: "Sales Requisition created successfully",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DialogContent className=" bg-white sm:max-w-[600px]">
      <DialogHeader className="pb-4">
        <DialogTitle>{id ? "Edit" : "Create"} Sales Requistion</DialogTitle>
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
                name="name"
                label="Guest Name"
                placeholder="Enter guest name"
                desc=" This is your public display guest."
              />
            </div>

            {/* <div className="w-full">
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
            </div> */}

            <div className="w-full">
              <DateSelect
                date={filledDate}
                setDate={setFilledDate}
                label={"Enter Filed Date"}
              />
            </div>
            <div className="w-full">
              <DateSelect
                date={bookedDate}
                setDate={setBookedDate}
                label={"Enter Booked Date"}
              />
            </div>
            <div className="w-full">
              <InputField
                form={form}
                name="points"
                label="Enter Points"
                type="number"
                placeholder="1.2"
                desc=" This is your public display email."
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              disabled={!filledDate || !bookedDate}
              className="bg-primary"
              type="submit"
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
