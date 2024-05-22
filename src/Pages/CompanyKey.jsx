import React, { useEffect, useState } from "react";
import logo_2 from "../assets/logo_2.png";
import { useLocation, useNavigate } from "react-router-dom";

export default function CompanyKey() {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const [companyKey, setCompanyKey] = useState("");
  const location = useLocation();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(companyKey);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000); // Reset copied state after 2 seconds
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const companyKey = searchParams.get("companyKey");
    if (companyKey) {
      setCompanyKey(companyKey);
    }
  }, [location.search]);


  const handleClick = () => {
    navigate("/allocations");
  };

  return (
    <div className="w-screen h-screen flex flex-row  items-center justify-between">
      <div className="border rounded-[20px] w-[35%]  ml-20  h-[400px] border-[#E8E8E8]">
        <div className="text-center">
          <h1 className="font-source-code-pro text-3xl mt-[10%] text-[#212427]">
            Company Created
          </h1>
          <h1 className="text-[#5B5B5D] text-center mt-[3%] font-source-code-pro">
            Collect your company key
          </h1>
        </div>

        <h1 className="font-medium font-source-code-pro ml-8 mt-7 mb-2 text-sm text-[#212427]">
          Company key
        </h1>
        <div className="pb-5 flex items-center  justify-center gap-4">
          <input
          value={companyKey && companyKey.length > 0
            ? companyKey.substring(0,28)+"..."
            : "#1Lbcfr7zzcczzczczcsAH..........ZnX71"}
           className=" w-[75%] h-[56px] font-source-code-pro focus:outline-[#3A74F2] border border-[#BDBDBD] text-black rounded-xl px-2"/>
            
         
<div className="flex flex-col">
<svg
            width="42"
            height="42"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
            onClick={copyToClipboard}
          >
            <path
              d="M27.5625 30.1875V36.0938C27.5625 37.1805 26.6805 38.0625 25.5938 38.0625H8.53125C8.00911 38.0625 7.50835 37.8551 7.13913 37.4859C6.76992 37.1167 6.5625 36.6159 6.5625 36.0938V13.7813C6.5625 12.6945 7.4445 11.8125 8.53125 11.8125H11.8125C12.692 11.8119 13.57 11.8845 14.4375 12.0295M27.5625 30.1875H33.4688C34.5555 30.1875 35.4375 29.3055 35.4375 28.2188V19.6875C35.4375 11.8825 29.7622 5.40575 22.3125 4.1545C21.445 4.00949 20.567 3.93691 19.6875 3.9375H16.4062C15.3195 3.9375 14.4375 4.8195 14.4375 5.90625V12.0295M27.5625 30.1875H16.4062C15.8841 30.1875 15.3833 29.9801 15.0141 29.6109C14.6449 29.2417 14.4375 28.7409 14.4375 28.2188V12.0295M35.4375 23.625V20.3438C35.4375 18.7773 34.8152 17.275 33.7076 16.1674C32.6 15.0598 31.0977 14.4375 29.5312 14.4375H26.9062C26.3841 14.4375 25.8833 14.2301 25.5141 13.8609C25.1449 13.4917 24.9375 12.9909 24.9375 12.4688V9.84375C24.9375 9.06813 24.7847 8.30011 24.4879 7.58353C24.1911 6.86695 23.756 6.21585 23.2076 5.6674C22.6592 5.11896 22.0081 4.68391 21.2915 4.38709C20.5749 4.09027 19.8069 3.9375 19.0312 3.9375H17.0625"
              stroke="#5B5B5D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {copied && 
          <div className="text-[#5B5B5D]">
            Copied
          </div>}
</div>
         
        </div>
        <h1
          onClick={handleClick}
          className="ml-8 focus:ring-4 shadow-lg transform active:scale-75 transition-transform  text-center w-[88%] font-source-code-pro cursor-pointer rounded-lg bg-[#3A74F2] px-[24px] py-[12px] mr-[10px] mt-[3.33%] text-[#FFFFFF]"
        >
          Go to Dashboard
        </h1>
      </div>

      <div className="rounded-[20px] w-[42%] h-[90%] mr-4 md:mr-20 md:ml-0 sm:ml-4">
        <div className="rounded-[20px] h-[100%] w-[100%] bg-[#3A74F2] text-left">
          <img className="pt-5 w-[30%]" src={logo_2} alt="" />
          <div className="w-[75%] pt-20 pl-10 h-[40%px]">
            <h1 className="font-source-code-pro text-[#FFFFFF] text-[380%]">
              Private Captable
            </h1>

            <h1 className="font-source-code-pro text-[#FFFFFF] text-[350%]">
              Built on INCO
            </h1>

            <h1 className="font-source-code-pro mt-10 text-[#FFFFFF] text-[100%]">
              Allocate your token now privately.
            </h1>
          </div>

        
        </div>
      </div>
    </div>
  );
}
