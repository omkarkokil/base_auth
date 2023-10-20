"use client";

import InputField from "@/components/Custom/Input/InputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import * as z from "zod";
import DateSelect from "@/components/Custom/Input/DateSelect";
import PhoneNumberInput from "@/components/Custom/Input/PhoneNumberInput";
import SearchSelect from "@/components/Custom/Select/SearchSelect";
import { Antenna, CalendarIcon, CarTaxiFront, Siren } from "lucide-react";
const formSchema = z.object({
  assignedTo: z.string().min(1, {
    message: "Assigned to field must not be empty",
  }),
  guest: z.string().min(1, {
    message: "Guest field is mandatory.",
  }),
  contact: z.string().min(4, {
    message: "Contact field is mandatory.",
  }),
  service: z.string().min(1, {
    message: "Service field is mandatory.",
  }),
  category: z.string().min(1, {
    message: "Category field is mandatory.",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({ message: "Email is not Valid" }),
});

const SalesForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const channelData: string[] = [
    "Custom",
    "Guest",
    "Brochure",
    "Website",
    "B2B",
  ];

  const VIPData: string[] = ["High", "Mid", "Low", "Reg"];

  // Vip State
  const [vipValue, setVipValue] = useState("");
  const [openVip, setOpenVip] = useState(false);

  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assignedTo: "",
      service: "",
      email: "",
      guest: "",
      contact: "",
      category: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const [currentTime, setCurrentTime] = useState("");

  const times = Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const minute = 15 * (i % 4);
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0"
    )}`;
  });
  return (
    <section className="flex mt-8 gap-4 h-max">
      <div className="flex flex-col w-[45%] h-full rounded-md ">
        <Form {...form}>
          <form
            autoComplete="off"
            autoCorrect="off"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 "
          >
            <div className="flex gap-2 w-full items-center">
              <div className="w-[50%]">
                <DateSelect />
              </div>
              <div className="w-[50%]">
                <InputField
                  form={form}
                  name="assignedTo"
                  label="Assigned To :"
                  placeholder="xyz"
                  desc=" This is your public display assignedTo."
                />
              </div>
            </div>

            <div className="py-2 px-4 bg-white rounded-md shadow-md h-max space-y-6">
              <InputField
                form={form}
                name="guest"
                label="Guest Name"
                placeholder="Enter guest name"
                desc=" This is your public display guest."
              />

              <PhoneNumberInput
                form={form}
                name="contact"
                label="Contact Number"
                placeholder="Enter contact name"
                desc=" This is your public display contact."
              />

              <InputField
                form={form}
                name="email"
                label="Enter Email id"
                type="email"
                placeholder="Enter email"
                desc=" This is your public display email."
              />

              <SearchSelect
                label={"Select Channel"}
                placeholder={"Channel..."}
                data={channelData}
                value={value}
                icon={Antenna}
                setValue={setValue}
                open={open}
                setOpen={setOpen}
              />

              <InputField
                form={form}
                name="service"
                label="Enter Services"
                placeholder="service..."
                desc=" This is your public display service."
              />

              <InputField
                form={form}
                name="category"
                label="Enter Category"
                placeholder="category..."
                desc="This is your public display category."
              />
              <SearchSelect
                label={"Select VIP Courtesy"}
                placeholder={"vip..."}
                data={VIPData}
                value={vipValue}
                icon={Siren}
                setValue={setVipValue}
                open={openVip}
                setOpen={setOpenVip}
              />

              <div className="flex gap-2 w-full items-center">
                <div className="w-[50%]">
                  <DateSelect />
                </div>
                <div className="w-[50%]">
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
                </div>
              </div>

              <div className="flex gap-2 w-full items-center">
                <div className="w-[50%]">
                  <DateSelect />
                </div>
                <div className="w-[50%]">
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
                </div>
              </div>

              <Button
                className=" text-white px-10"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? (
                  <div
                    className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                  </div>
                ) : (
                  "Next step"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="flex flex-col w-[50%]  py-2  bg-white rounded-md shadow-md"></div>
      <div className="flex h-[75vh] fixed right-5 items-center justify-center">
        <div className="h-[75vh] p-4 gap-7 flex justify-center flex-col bg-white shadow-md rounded-lg">
          {Array.from({ length: 8 }).map((_, id) => (
            <div className="relative h-[10px] w-[10px] rounded-full ring-1 ring-gray-400 ring-offset-2 overflow-hidden">
              <div
                className={`absolute inset-0  ${
                  id === 0 ? "bg-success animate-pulse" : "bg-danger"
                } `}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SalesForm;
