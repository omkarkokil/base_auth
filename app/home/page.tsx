"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
const page = () => {
  const { data } = useSession();

  return (
    <>
      <div className="flex items-center justify-between gap-4 px-4 h-[9vh] w-full">
        <h1 className="text-2xl font-bold">Here Logo</h1>
        <div className="space-x-4 flex  items-center">
          <h1>{data?.user?.name}</h1>
          <Link href={"/admin"} className="text-blue-900 font-bold">
            admin
          </Link>
          <Button
            variant={"destructive"}
            onClick={() => {
              signOut();
            }}
          >
            Log out
          </Button>
        </div>
      </div>
    </>
  );
};

export default page;
