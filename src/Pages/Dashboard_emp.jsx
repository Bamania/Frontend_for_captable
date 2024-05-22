import React, { useEffect, useState, useRef } from "react";
import SideBar2 from "../Components/SideBar2.jsx";
import { Connect } from "../Connect.jsx";
import ClaimToken from "../Components/ClaimToken.jsx";
import SteppedGraph from "../Components/MyChart.jsx";
import { CAPTABLE_DATA, captableDataContract, getInstance } from "../utils/fhevm.jsx";
import { getReencryptPublicKey } from "../utils/RencryptPublicKey.jsx";
import { useLocation } from "react-router-dom";

export const claimed = {
  claim: "24",
};

export default function Dashboard_emp() {
  const [open, setOpen] = useState(false);
  const [totalAlloc, setTotalAlloc] = useState(0);
  const [unlocked, setUnlocked] = useState(0);
  const [locked, setLocked] = useState(0);
  const [claimed, setClaimed] = useState(0);
  const [companyKey, setCompanyKey] = useState("");
  const [empName, setEmpName] = useState("");
  const location = useLocation(); 
  const dataFetchedRef = useRef(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen(true);
  };
  const handleRefresh = () => {
    window.location.reload(); // Reload the page
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const companykey = searchParams.get("companyKey");
    setCompanyKey(companykey);
  }, [location.search]);

  const dataView = async () => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    try {
      const instance = await getInstance();
      const reencrypt = await getReencryptPublicKey(CAPTABLE_DATA);
      console.log(reencrypt);
      console.log(await instance.hasKeypair(CAPTABLE_DATA));
      const contractDataInstance = await captableDataContract();
 
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      console.log(accounts)
      
      console.log(companyKey);
      
      const empname = await contractDataInstance.viewEmployeName(companyKey);
      setEmpName(empname);
      console.log(empname);

      const employeeTotalAllocations = await contractDataInstance.viewEmployeTotalAllocation(companyKey, reencrypt.publicKey, reencrypt.signature, accounts[0]);
      console.log("TX", employeeTotalAllocations);
      setTotalAlloc(parseInt(await instance.decrypt(CAPTABLE_DATA, employeeTotalAllocations)));

      const employeeUnlocked = await contractDataInstance.viewEmployeUnlocked(companyKey, reencrypt.publicKey, reencrypt.signature, accounts[0]);
      console.log("TX", employeeUnlocked);
      setUnlocked(parseInt(await instance.decrypt(CAPTABLE_DATA, employeeUnlocked)));
      console.log(parseInt(await instance.decrypt(CAPTABLE_DATA, employeeUnlocked)));
      const employeeClaimed = await contractDataInstance.viewEmployeClaimed(companyKey, reencrypt.publicKey, reencrypt.signature, accounts[0]);
      console.log("TX", employeeClaimed);
      setClaimed(parseInt(await instance.decrypt(CAPTABLE_DATA, employeeClaimed)));

      setLocked(unlocked - claimed);
    } catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    if (companyKey) {
      dataView();
    }
  }, [companyKey]);

  return (
    <>
      <div className="flex h-[100vh]">
        <SideBar2 />
        <div className="flex-1 overflow-auto">
          <div className="pt-1">
            <Connect>{(account, provider) => null}</Connect>
          </div>
          
          {/* Manish verma navbar */}
          <div>
            <div className=" flex justify-between items-center bg-white w-[100%] h-[10vh] border-t border-b border-[#F4F4F4]">
              <h1 className="ml-[20px] text-2xl font-source-code-pro font-normal">
                {empName}
              </h1>

              <div className="flex gap-5 w-[50%] justify-end items-end">
                <button
                  onClick={handleClick}
                  className="font-source-code-pro text-center text-[#3A74F2] w-[30%] p-2 font-medium border rounded-lg border-[#3A74F2]"
                >
                  Claim Tokens
                </button>
                <button onClick={handleRefresh} className="font-source-code-pro flex gap-1 text-center text-[#3A74F2] w-[30%] mr-[20px] p-2 font-medium border rounded-lg border-[#3A74F2]">
                  <svg
                    className="pl-1"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.0229 9.348H21.0149L17.8339 6.165C16.8098 5.14087 15.5341 4.40439 14.1351 4.02961C12.7361 3.65482 11.2631 3.65493 9.86416 4.02992C8.46522 4.40492 7.18965 5.14159 6.16569 6.16587C5.14172 7.19015 4.40545 8.46595 4.03089 9.865M2.98489 19.644V14.652M2.98489 14.652H7.97689M2.98489 14.652L6.16489 17.835C7.189 18.8591 8.46468 19.5956 9.86368 19.9704C11.2627 20.3452 12.7357 20.3451 14.1346 19.9701C15.5336 19.5951 16.8091 18.8584 17.8331 17.8341C18.8571 16.8099 19.5933 15.5341 19.9679 14.135M21.0149 4.356V9.346"
                      stroke="#3A74F2"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
          <div>
            {/* allocations div */}
            <div className="ml-[20px] flex mt-[20px] border-[#BDBDBD] border-[1px] justify-between rounded-lg w-[full] h-[120px] mr-[20px]">
              <div className=" p-[16px] flex flex-col justify-between h-[120px]  border-r w-[282.5px] border-[#BDBDBD]">
                <h4 className=" text-[16px] text-[#BDBDBD] font-source-code-pro">Allocated</h4>
                <h1 className="text-[24px] font-source-code-pro">{totalAlloc}</h1>
              </div>

              <div className=" flex flex-col p-[16px] justify-between h-[120px] border-[#BDBDBD] border-r w-[282.5px]">
                <h4 className="text-[16px] text-[#BDBDBD] font-source-code-pro">Unlocked</h4>
                <h1 className="text-[24px] font-source-code-pro">{unlocked}</h1>
              </div>

              <div className=" flex flex-col p-[16px] justify-between h-[120px]  border-r w-[282.5px] border-[#BDBDBD]">
                <h4 className="text-[16px] text-[#BDBDBD] font-source-code-pro">Locked</h4>
                <h1 className="text-[24px] font-source-code-pro">{locked}</h1>
              </div>

              <div className=" flex flex-col  p-[16px] justify-between h-[120px]  w-[282.5px] border-[#BDBDBD]">
                <h4 className="text-[16px] text-[#BDBDBD] font-source-code-pro">Claimed </h4>
                <h1 className="text-[24px] font-source-code-pro">{claimed}</h1>
              </div>
            </div>
            <div className="mt-10 mr-[20px]">
              <SteppedGraph />
            </div>
          </div>
        </div>
      </div>
      {open && <ClaimToken onClose={handleClose} />}
    </>
  );
}
