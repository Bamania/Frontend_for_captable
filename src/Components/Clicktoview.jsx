import React, { useState } from "react";
import {
  CAPTABLE_DATA,
  captableContract,
  captableDataContract,
  getInstance,
} from "../utils/fhevm";
import { getReencryptPublicKey } from "../utils/RencryptPublicKey";

function ClickToViewContent() {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [allocations, setAllocations] = useState(0);
  const [unlocked, setUnlocked] = useState(0);
  const [companyKey, setCompanyKey] = useState("");
  const [employee, setEmployee] = useState(0);
  const handleClick = async () => {
    setIsVisible(true);
    try {
      const instance = await getInstance();
      const reencrypt = await getReencryptPublicKey(CAPTABLE_DATA);
      const contractInstance = await captableContract();

      const contractDataInstance = await captableDataContract();

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
     
      const key = await contractInstance.adminKey(accounts[0]);
  
      setCompanyKey(key);

      const companyEmploys = await contractDataInstance.viewCompanyemploys(
        key,
        reencrypt.publicKey,
        reencrypt.signature
      );
   
      const employee = await instance.decrypt(CAPTABLE_DATA, companyEmploys);
      setEmployee(employee.toString());


      const companyTotalFunds = await contractDataInstance.viewCompanytotalFund(
        key,
        reencrypt.publicKey,
        reencrypt.signature
      );
  
      const alloc = await instance.decrypt(CAPTABLE_DATA, companyTotalFunds);
      setAllocations(alloc.toString());


      const companyTotalLocked =
        await contractDataInstance.viewCompanytotalLocked(
          key,
          reencrypt.publicKey,
          reencrypt.signature
        );
     
      const unlock = await instance.decrypt(CAPTABLE_DATA, companyTotalLocked);
      setUnlocked((allocations-parseInt(unlock.toString())));
    
    } catch (error) {
      console.log("Error", error);
    }
  };
  const handleCopyCompanyKey = () => {
    navigator.clipboard.writeText(companyKey);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <>
      {isVisible == true ? (
        <div>
          <div className=" flex  border-[#BDBDBD] border-[1px] justify-between rounded-lg w-[full] h-[120px] m-[20px]">
            <div className=" p-[16px] flex flex-col justify-between h-[120px]  border-r w-[282.5px] border-[#BDBDBD]">
              <h4 className=" text-[16px] text-[#BDBDBD] font-source-code-pro">
                Company Key
              </h4>
              <div className="flex items-center">
                <h1 className="text-[24px] font-source-code-pro font-light">
                  {companyKey.substring(0, 10)}...
                </h1>
                <button onClick={handleCopyCompanyKey} className="ml-2">
                  <svg
                    width="18"
                    height="21"
                    className="cursor-pointer"
                    viewBox="0 0 18 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.75 15.75V19.125C12.75 19.746 12.246 20.25 11.625 20.25H1.875C1.57663 20.25 1.29048 20.1315 1.0795 19.9205C0.868527 19.7095 0.75 19.4234 0.75 19.125V6.375C0.75 5.754 1.254 5.25 1.875 5.25H3.75C4.25257 5.24966 4.7543 5.29114 5.25 5.374M12.75 15.75H16.125C16.746 15.75 17.25 15.246 17.25 14.625V9.75C17.25 5.29 14.007 1.589 9.75 0.874002C9.2543 0.791137 8.75257 0.74966 8.25 0.750002H6.375C5.754 0.750002 5.25 1.254 5.25 1.875V5.374M12.75 15.75H6.375C6.07663 15.75 5.79048 15.6315 5.5795 15.4205C5.36853 15.2095 5.25 14.9234 5.25 14.625V5.374M17.25 12V10.125C17.25 9.2299 16.8944 8.37145 16.2615 7.73852C15.6286 7.10558 14.7701 6.75 13.875 6.75H12.375C12.0766 6.75 11.7905 6.63148 11.5795 6.4205C11.3685 6.20952 11.25 5.92337 11.25 5.625V4.125C11.25 3.68179 11.1627 3.24292 10.9931 2.83345C10.8235 2.42397 10.5749 2.05191 10.2615 1.73852C9.94809 1.42512 9.57603 1.17652 9.16656 1.00691C8.75708 0.837299 8.31821 0.750002 7.875 0.750002H6.75"
                      stroke="#212427"
                      strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                    />
                  </svg>
                  {copied && <p className="text-[#BDBDBD]">Copied</p>}
                </button>
              </div>{" "}
            </div>

            <div className=" flex flex-col p-[16px] justify-between h-[120px] border-[#BDBDBD] border-r w-[282.5px]">
              <h4 className="text-[16px] text-[#BDBDBD] font-source-code-pro">
                Total Allocation
              </h4>
              <h1 className="text-[24px] font-light font-source-code-pro">
                {allocations}
              </h1>
            </div>

            <div className=" flex flex-col p-[16px] justify-between h-[120px]  border-r w-[282.5px] border-[#BDBDBD]">
              <h4 className="text-[16px] text-[#BDBDBD] font-source-code-pro">
                Total Unlocked Tokens
              </h4>
              <h1 className="text-[24px] font-light font-source-code-pro">
                {unlocked}
              </h1>
            </div>

            <div className=" flex flex-col  p-[16px] justify-between h-[120px]  w-[282.5px] border-[#BDBDBD]">
              <h4 className="text-[16px] text-[#BDBDBD] font-source-code-pro">
                No. of Employees{" "}
              </h4>
              <h1 className="text-[24px] font-light font-source-code-pro">
                {employee}
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-[20px] flex items-center justify-center mt-[20px] bg-[#f4f4f4]  rounded-lg w-[full] h-[120px]  ">
          <button
            onClick={handleClick}
            className=" font-source-code-pro flex justify-center items-center w-[20%] text-right text-white h-[40%] bg-[#3A74F2] rounded-[12px]"
          >
            <svg
              className="m-2"
              width="30"
              height="30"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.53589 12.322C2.46688 12.1146 2.46688 11.8904 2.53589 11.683C3.92289 7.51 7.85989 4.5 12.4999 4.5C17.1379 4.5 21.0729 7.507 22.4629 11.678C22.5329 11.885 22.5329 12.109 22.4629 12.317C21.0769 16.49 17.1399 19.5 12.4999 19.5C7.86189 19.5 3.92589 16.493 2.53589 12.322Z"
                stroke="white"
                strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
              />
              <path
                d="M15.5 12C15.5 12.7956 15.1839 13.5587 14.6213 14.1213C14.0587 14.6839 13.2956 15 12.5 15C11.7044 15 10.9413 14.6839 10.3787 14.1213C9.81607 13.5587 9.5 12.7956 9.5 12C9.5 11.2044 9.81607 10.4413 10.3787 9.87868C10.9413 9.31607 11.7044 9 12.5 9C13.2956 9 14.0587 9.31607 14.6213 9.87868C15.1839 10.4413 15.5 11.2044 15.5 12Z"
                stroke="white"
                strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
              />
            </svg>
            Click to view
          </button>
        </div>
      )}
    </>
  );
}

export default ClickToViewContent;
