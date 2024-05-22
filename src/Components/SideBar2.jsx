import React, { useState } from "react";
import bitPng from "../assets/bit.png";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
const SideBar2 = () => {
  const [activeHeading, setActiveHeading] = useState(null);
  const navigate = useNavigate();

  const handleClick = (heading) => {
    setActiveHeading(heading);
    navigate("/dashboard");
  };

  const isHeadingActive = (heading) => {
    return heading === activeHeading;
  };

  return (
    <div className="w-[20%]   h-screen border border-[#E8E8E8] flex flex-col justify-between ">
      <div>
        <img onClick={()=>navigate('/')} className="m-5" src={logo} alt="" />
        <div className="flex flex-col">
          <h1 className="-mb-[25%] mt-[30%] font-source-code-pro ml-5">Menu</h1>
          <h1
            className={`text-[#212427] font-source-code-pro items-center rounded-xl p-2 mx-[10%] mt-20 flex gap-[10px] hover:bg-[#F4F4F4] ${
              isHeadingActive("Dashboard") ? "bg-[#F4F4F4]" : "bg-white"
            }`}
            onClick={() => handleClick("Dashboard")}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.75 9.75V3H21V9.75H12.75ZM3 12.75V3H11.25V12.75H3ZM12.75 21V11.25H21V21H12.75ZM3 21V14.25H11.25V21H3ZM4.5 11.25H9.75V4.5H4.5V11.25ZM14.25 19.5H19.5V12.75H14.25V19.5ZM14.25 8.25H19.5V4.5H14.25V8.25ZM4.5 19.5H9.75V15.75H4.5V19.5Z"
                fill="#212427"
              />
            </svg>
            Dashboard
          </h1>
          <h1
            className={`text-[#212427] mx-[10%] items-center rounded-lg p-2 font-source-code-pro m-2 flex gap-[10px] hover:bg-[#F4F4F4] ${
              isHeadingActive("Transaction") ? "bg-[#F4F4F4]" : "bg-white"
            }`}
            onClick={() => handleClick("Transaction")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.5 19L1 14.5M1 14.5L5.5 10M1 14.5H14.5M14.5 1L19 5.5M19 5.5L14.5 10M19 5.5H5.5"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Transaction
          </h1>
        </div>
      </div>
      
    </div>
  );
};

export default SideBar2;
