import React from "react";

const Indicator = () => {
  return (
    <div className="flex h-[75vh] fixed right-5 items-center justify-center">
      <div className="h-[75vh] p-4 gap-7 flex justify-center flex-col bg-white shadow-md rounded-lg">
        {Array.from({ length: 8 }).map((_, id) => (
          <div className="relative h-[10px] w-[10px] rounded-full ring-1 ring-gray-400 ring-offset-2 overflow-hidden">
            <div
              className={`absolute inset-0  ${
                id === 0 ? "bg-green-500 animate-pulse  " : "bg-transparent"
              } `}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Indicator;
