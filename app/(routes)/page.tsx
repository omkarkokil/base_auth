import LoginForm from "@/components/Custom/Authentication/LoginForm";
import React from "react";

const home = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="md:w-[500px]  px-6 rounded-lg border-[.5px] border-gray-200">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default home;
