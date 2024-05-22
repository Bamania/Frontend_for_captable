import React, { useState } from "react";
import bitPng from "../assets/bit.png";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"
const SideBar = () => {
  const [activeHeading, setActiveHeading] = useState(null);
  const navigate=useNavigate()

  const handleClick = (heading) => {
    setActiveHeading(heading);
    navigate('/allocations')
  };

  const isHeadingActive = (heading) => {
    return heading === activeHeading;
  };

  return (
    <div className="w-full h-screen border  border-[#E8E8E8] flex flex-col justify-between ">
      <div>
      <img onClick={()=>navigate('/')} className="m-5" src={logo} alt="" />
        <div className="flex flex-col">
        <h1 className="-mb-[25%] mt-[30%] font-semibold font-source-code-pro ml-5">Menu</h1>
        <h1
          className={`text-[#212427] font-source-code-pro items-center rounded-xl p-2 mx-[10%] mt-20 flex gap-[10px] hover:bg-[#F4F4F4] ${
            isHeadingActive("Allocations") ? "bg-[#F4F4F4]" : "bg-white"
          }`}
          onClick={() => handleClick("Allocations")}

        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1_57)">
              <path
                d="M9 4.5H6V1.5H4.5V4.5H1.5V6H4.5V9H6V6H9V4.5Z"
                fill="black"
              />
              <path
                d="M18 5H18.5V4.5V3.5H22V7H21H20.5V7.5V18V18.5H21H22V22H18.5V21V20.5H18H7.5H7V21V22H3.5V18.5H4.5H5V18V12.5H5.5V18V18.5H6H7V19.5V20H7.5H18H18.5V19.5V18.5H19.5H20V18V7.5V7H19.5H18.5V6V5.5H18H12.5V5H18ZM6 21.5H6.5V21V19.5V19H6H4.5H4V19.5V21V21.5H4.5H6ZM21 21.5H21.5V21V19.5V19H21H19.5H19V19.5V21V21.5H19.5H21ZM19.5 4H19V4.5V6V6.5H19.5H21H21.5V6V4.5V4H21H19.5Z"
                fill="black"
                stroke="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_57">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Allocations
        </h1>
        <h1
          className={`text-[#212427] font-source-code-pro mx-[10%] items-center rounded-lg p-2 m-2 flex gap-[10px] hover:bg-[#F4F4F4] ${
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

export default SideBar;