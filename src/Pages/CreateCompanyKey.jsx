import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo_2 from "../assets/logo_2.png";
import {
  captableContract,
  getInstance,
  CAPTABLE_ADDRESS,
} from "../utils/fhevm.jsx";
import { getReencryptPublicKey } from "../utils/RencryptPublicKey.jsx";

import { Buffer } from "buffer";
import CompanyKey from "./CompanyKey.jsx";
import Loader from "../Components/Loader.jsx";
window.Buffer = Buffer;

export default function CreateCompanyKey() {
  const [companyName, setCompanyName] = useState("");
  const [registrationYear, setRegistrationYear] = useState("");
  let [key, setKey] = useState("");
  const [generating, setGenerating] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate("/alreadyOwner");
  };
  const handleGeneratekey = async (e) => {
    e.preventDefault();
    setGenerating(true);
    try {

      const contractInstance = await captableContract();

      const tx = await contractInstance.createCompanykey(
        companyName,
        registrationYear
      );
      const receipt = await tx.wait();

      key = receipt.logs[0].data;
      console.log(key);
      if (key > 0) {
        navigate(`/companyKey?companyKey=${key}`);
      }
    } catch (error) {
      console.error("Error sending transaction:", error.message);
      if (
        error.data.message &&
        error.data.message.includes("Internal JSON-RPC error")
      ) {
        navigate("/alreadyOwner");
      } else {
        throw error;
      }
    }
  };

  return (
    <>
      {key.length > 0 && <CompanyKey companyKey={key} />}
      <div className="w-screen h-screen flex flex-row  items-center  justify-between">
        <div className=" border rounded-[30px] w-[35%] mx-[10%]  h-[450px] border-[#E8E8E8]">
          <form className="">
            <div className=" text-center pt-5">
              <h1 className="font-source-code-pro text-[30px] text-[#212427]">
                Create Company Key
              </h1>
              <h1 className="text-[#5B5B5D] pt-[2%] text-center font-source-code-pro">
                Please enter your company name and
              </h1>
              <h1 className="text-[#5B5B5D] text-center font-source-code-pro">
                confirm it
              </h1>
            </div>

            <h1 className="font-medium p-1 ml-9 font-source-code-pro text-sm    text-[#212427] ">
              Company Name
            </h1>
            <input
              className="ml-9 w-[85%] h-[56px] font-source-code-pro focus:outline-[#3A74F2] border border-[#BDBDBD] rounded-xl px-2"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />

            <h1 className="font-medium font-source-code-pro text-sm m-9 mb-2 text-[#212427]">
              Registration Year
            </h1>
            <input
              className="ml-9 w-[85%] h-[56px] font-source-code-pro focus:outline-[#3A74F2] border border-[#BDBDBD] rounded-xl px-2"
              value={registrationYear}
              onChange={(e) => setRegistrationYear(e.target.value)}
            />

            {generating ? (
              <div>
                <h1 className="ml-9 text-center w-[85%] font-source-code-pro cursor-pointer rounded-lg bg-[#3A74F2] px-[24px] py-[12px] mr-[10px] mt-[8%] text-[#FFFFFF]">
                  Generating Company Key...
                </h1>
                <Loader />
              </div>
            ) : (
              <button
                onClick={handleGeneratekey}
                className="focus:ring-4 shadow-lg transform active:scale-75 transition-transform ml-9 text-center w-[85%] font-source-code-pro cursor-pointer rounded-lg bg-[#3A74F2] px-[24px] py-[12px] mr-[10px] mt-[8%] text-[#FFFFFF]"
              >
                Generate Company Key
              </button>
            )}
          </form>
        </div>

        <div className="rounded-[10%] w-[42%] h-[90%] mr-10">
          <div className="rounded-[5%] flex flex-col justify-between  h-[100%] w-[100%] bg-[#3A74F2] text-left">
            <div>
              <img className="pt-10 w-[30%] pl-5 " src={logo_2} alt="" />
              <div className="w-[80%] pt-5 pl-10">
                <h1 className="font-source-code-pro text-[#FFFFFF] text-[55px]">
                  Private Captable
                </h1>

                <h1 className="font-source-code-pro text-[#FFFFFF] text-[55px]">
                  Built on INCO
                </h1>

                <h1 className="font-source-code-pro mt-10 text-[#FFFFFF] text-[18px]">
                  Allocate your token now privately.
                </h1>
              </div>
            </div>

            <h1
              onClick={handleClick}
              className=" font-source-code-pro  p-10  text-[#FFFFFF] text-[100%] flex gap-2 items-center hover:underline cursor-pointer"
            >
              Already have a Company
              <svg
                width="15"
                height="15"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hover:underline"
              >
                <path
                  d="M1.5 16.5L16.5 1.5M16.5 1.5L5.25 1.5M16.5 1.5L16.5 12.75"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
