"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import InputField from "../Input/InputField";
import AuthSelect from "../Select/AuthSelect";

const formSchema = z
  .object({
    name: z.string().min(5, {
      message: "Username must be at least 2 characters.",
    }),
    role: z.string().min(1, {
      message: "Select Field is mandatory.",
    }),
    email: z
      .string()
      .min(1, {
        message: "Email is required",
      })
      .email({ message: "Email is not Valid" }),
    password: z.string().min(5, {
      message: "Password must be at least 5 characters.",
    }),
    cpassword: z.string().min(1, {
      message: "Confirm password is required",
    }),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Passwords doesn't match",
    path: ["cpassword"],
  });

const RegisterForm = () => {
  const router = useRouter();
  const { data } = useSession();
  if (data?.user) {
    router.push("/home");
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 500) {
      console.log(res.statusText);
    }
    if (res.status === 200) {
      console.log("Registering succesfully login with your credentianls");
      router.push("/");
    }
  }

  return (
    <>
      <div className="pt-6">
        <h1 className={`text-2xl pt-2 pb-5 font-semibold `}>
          Register to your account
        </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
          <InputField
            form={form}
            name="name"
            label="Name"
            placeholder="Enter your Name"
            desc=" This is your public display name."
          />

          <AuthSelect form={form} name={"role"} label={"Choose your role"} />
          <InputField
            form={form}
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your Email"
            desc=" This is your public display email."
          />
          <InputField
            form={form}
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            desc=" This is your public display password."
          />

          <InputField
            form={form}
            name="cpassword"
            label="Confirm password"
            type="password"
            placeholder="confirm your password"
            desc=" This is your public display retype password."
          />

          <Button className="w-full text-white" type="submit">
            Register
          </Button>
        </form>
      </Form>

      <p className="text-xs text-gray-400 text-center mt-4 pb-10">
        Already have an accunt?
        <Link
          href={"/"}
          className="text-primary hover:font-bold hover:underline hover:text-black pl-1"
        >
          Log in
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
