import RegisterForm from "@/components/Custom/Authentication/RegisterForm";
import React from "react";

const Register = () => {
  return (
    <>
      <div className="flex items-center my-14  justify-center h-screen">
        <div className="md:w-[500px]  px-6 rounded-lg border-[.5px] border-gray-200">
          <RegisterForm />
        </div>
      </div>
    </>
  );
};

export default Register;
