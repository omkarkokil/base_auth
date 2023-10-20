"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserCircle, UserCog } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const DeskNav = () => {
  const { data } = useSession();

  return (
    <div className="flex items-center justify-between gap-4 px-4 h-[8vh] w-full">
      <Link href={"/home"} className="text-xl tracking-tight font-semibold">
        LOGO
      </Link>
      <div className="space-x-6 flex  items-center ">
        <Link href={"/dashboard"} className="text-sm">
          Dashboard
        </Link>
        <Link href={"/driver"} className="text-sm">
          Driver
        </Link>
        <Link href={"/sales"} className="text-sm">
          Sales
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className=" cursor-pointer">
              <AvatarImage src={""} alt="@shadcn" />
              <AvatarFallback className="text-primary hover:bg-primary hover:text-gray-50 transition-all">
                <UserCog className="h-5" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-6 ">
            <DropdownMenuLabel>
              <div className="pr-20 pl-4">
                <h1 className="font-semibold text-md ">Signed in as</h1>
                <h1 className="font-semibold text-md">{data?.user.email}</h1>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div
              onClick={() => {
                signOut();
              }}
            >
              <DropdownMenuItem className="hover:!bg-red-500 cursor-pointer hover:!text-white">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DeskNav;
