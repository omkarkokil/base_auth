"use client";

import InputField from "@/components/Custom/InputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({ message: "Email is not Valid" }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

const AuthForm = () => {
  const { data } = useSession();
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  if (data?.user) {
    router.push("/home");
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setisLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (res?.error) {
        toast({
          variant: "destructive",
          title: "Invalid credentails",
          description: "please check your credentails and try again",
        });

        // toast.error("Something went wrong");
      }

      if (res?.ok) {
        toast({
          title: "Log in successfully",
          description: "You have successfully logged in",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "something went wrong",
      });
    } finally {
      setisLoading(false);
    }
  }

  return (
    <>
      <div className="pt-6">
        <p className="text-sm  text-primary">Welcome back</p>
        <h1 className={`text-2xl pt-2 pb-5 font-semibold`}>
          Login to your account
        </h1>
      </div>
      <Form {...form}>
        <form
          autoComplete="off"
          autoCorrect="off"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 "
        >
          <InputField
            form={form}
            name="email"
            label="email"
            type="email"
            placeholder="Enter your email"
            desc=" This is your public display email."
          />
          <InputField
            form={form}
            name="password"
            label="password"
            type="password"
            placeholder="Enter your password"
            desc=" This is your public display password."
          />

          <Button
            className="w-full text-white"
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
              "Log in"
            )}
          </Button>
        </form>
      </Form>

      <p className="text-xs text-gray-400 text-center mt-4 pb-10">
        Don`t have an account?
        <Link
          href={"/register"}
          className="text-primary hover:underline hover:text-black hover:font-bold pl-1"
        >
          Sign up
        </Link>
      </p>
    </>
  );
};

export default AuthForm;
