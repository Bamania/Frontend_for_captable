import React, { useEffect, useState } from "react";
import logo_2 from "../assets/logo_2.png";
import { useNavigate } from "react-router-dom";
import { captableContract, getInstance } from "../utils/fhevm";
import { getReencryptPublicKey } from "../utils/RencryptPublicKey";

const CAPTABLE_ADDRESS = "0x13D6c7652EaD49b377c9e7E5021D11FfaF032342";

export default function AlreadyOwner() {
  const [companyKey, setCompanyKey] = useState("");
  const [keyMatch, setKeyMatch] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const constactInstanceMain = await captableContract()

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      console.log(accounts)
      const key = await constactInstanceMain.adminKey(accounts[0]);
      console.log(key)

      if(key === companyKey){
        navigate("/allocations")
      }
      else{
        setKeyMatch(false);
      }
    } catch (error) {
      console.log("error", error);
    }
    
  };

  return (
    <div className="w-full h-screen flex flex-row items-center justify-between gap-[10%]">
      <div className="border rounded-[5%] w-[100%] ml-[5%]  h-[50%] border-[#E8E8E8]">
        <div className="text-center">
          <h1 className="font-source-code-pro text-semilight text-3xl mt-[10%] text-[#212427]">
            Enter Company Key
          </h1>
          <h1 className="text-[#5B5B5D] text-center mt-[5%] font-source-code-pro">
            Please enter your Company Key and
          </h1>
          <h1 className="text-[#5B5B5D] text-center font-source-code-pro">
            confirm it.
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <h1 className="ml-[7%] font-medium font-source-code-pro  mt-5 mb-2 text-sm text-[#212427]">
            Company key
          </h1>
          <div className="flex items-center justify-center">
            <input
              type="text"
              value={companyKey}
              onChange={(e) => {
                setCompanyKey(e.target.value);
                setKeyMatch(true); 
              }} 
              className={`w-[87%] h-[56px] flex items-center  font-source-code-pro focus:outline-[#3A74F2] border border-${keyMatch ? "[#BDBDBD]" : "[#DE3333]"} text-${keyMatch ? "[#BDBDBD]" : "[#DE3333]"} rounded-xl px-2 focus:outline-none `}
              placeholder="Enter Company Key"
              required 
            />
          </div>
          {!keyMatch && (
            <p className="ml-[7%] mt-1 font-source-code-pro font-extralight text-sm text-[#DE3333]">You are not the owner of this company.</p>
          )}
          <div className="  flex items-center justify-center "><button 
            type="submit" 
            className=" focus:ring-4 shadow-lg transform active:scale-75 transition-transform flex items-center justify-center text-center w-[88%] font-source-code-pro cursor-pointer rounded-lg bg-[#3A74F2] px-[24px] py-[12px] mr-[10px] mt-[5%] text-[#FFFFFF]"
          >
            Go to Dashboard
          </button></div>
          
        </form>
      </div>

      <div className="rounded-[5%] w-full h-[90%] mr-[5%]  ">
        <div className="rounded-[5%] h-[100%] w-full bg-[#3A74F2] text-left">
          <img className="pt-5 w-[30%]" src={logo_2} alt="" />
          <div className="w-[90%] pt-20 pl-10 h-[40%px]">
            <h1 className="font-source-code-pro text-[#FFFFFF] text-[400%]">
              Private Captable
            </h1>
            <h1 className="font-source-code-pro text-[#FFFFFF] text-[400%]">
              Built on FHE
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
