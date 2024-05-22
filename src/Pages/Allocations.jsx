import React, { useContext, useEffect, useRef, useState } from "react";
import cvImage from "../assets/cvImage.png";
import AddEmployee from "../Components/AddEmployee.jsx";
import AllocationsTable from "./AllocationsTable.jsx";
import SearchField from "../Components/SearchField.jsx";
import ActualDashboard from "../Components/ActualDashboard.jsx";
import DataView from "../Components/DataView.jsx";
import { Connect } from "../Connect.jsx";
import SideBar from "../Components/SideBar.jsx";
import {
  CAPTABLE_DATA,
  captableContract,
  captableDataContract,
  getInstance,
} from "../utils/fhevm.jsx";
import { getReencryptPublicKey } from "../utils/RencryptPublicKey.jsx";

const Allocations = () => {
  const [noEmploy, setNoEmploy] = useState(0);
  const dataFetchedRef = useRef(false);

  const [instances,setInstances]=useState(null)
  const [publicKey,setPublicKey]=useState(null)
  const [signature,setSignature]=useState(null)
  
  const employNumber = async () => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    try {
      const instance = await getInstance();
      const reencrypt = await getReencryptPublicKey(CAPTABLE_DATA);
      console.log(reencrypt.publicKey);
      const contractDataInstance = await captableDataContract();
      
      const constactInstanceMain = await captableContract();

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const key = await constactInstanceMain.adminKey(accounts[0]);

      const companyEmploys = await contractDataInstance.viewCompanyemploys(
        key,
        reencrypt.publicKey,
        reencrypt.signature
      );
      setNoEmploy(
        parseInt(await instance.decrypt(CAPTABLE_DATA, companyEmploys))
      );
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    employNumber()
  },[]);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen(true);
  };
  return (
    <>
      <div className="flex h-[100vh]">
        <div className=" w-[20%] h-full">
          <SideBar />
        </div>
        <div className="flex-1 w-[70%] overflow-y-auto">
          <div className="mt-[1%]">
            <Connect>{(account, provider) => null}</Connect>
          </div>
          {open && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
          )}
          <AllocationsTable employNumber={noEmploy} />
          {noEmploy > 0 ? (
            <div className="flex flex-col w-full">
              <SearchField />
              <ActualDashboard />
              <DataView />
            </div>
          ) : (
            <div className="flex flex-col gap-5 -ml-15 justify-center items-center h-[60%]">
              <img className="w-[220px] h-[180px]" src={cvImage} alt="" />
              <div className="flex flex-col">
                <h1 className="font-source-code-pro text-[130%]">
                  Looks pretty empty here !!
                </h1>
                <h1 className="font-source-code-pro text-[130%]">
                  Try adding{" "}
                  <span className="font-source-code-pro text-[#3A74F2]">
                    your employees
                  </span>
                </h1>
              </div>
              <button
                onClick={handleClick}
                className="focus:ring-4 shadow-lg transform active:scale-75 transition-transform cursor-pointer w-[13.5%%] h-[10%] flex items-center justify-center gap-2 font-source-code-pro border border-[#3A74F2] rounded-lg text-[#3A74F2] p-4"
              >
                Add Employee
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 11L11 1M11 1L3.5 0.999999M11 1L11 8.5"
                    stroke="#3A74F2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
      {open && <AddEmployee onClose={handleClose} />}
    </>
  );
};

export default Allocations;
