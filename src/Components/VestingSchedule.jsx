import React, { useState } from "react";
import {
  CAPTABLE_DATA,
  VESTING_ADDRESS,
  captableContract,
  captableDataContract,
  getInstance,
  vestingContract,
} from "../utils/fhevm";
import { getReencryptPublicKey } from "../utils/RencryptPublicKey";
import { parse, getUnixTime, addSeconds, fromUnixTime, format } from "date-fns"; 
import vestingabi from "../JSON/Vesting (3).json";
import Web3 from "web3";
import Loader from "./Loader";

const VestingSchedule = ({ onClose }) => {
  const [allocations, setAllocations] = useState(0);
  const [nextCliff, setNextCliff] = useState("");
  const [loading, setLoading] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    startDate: "",
    endDate: "",
    startPercentage: "",
    linearPercentageAfterCliff: "",
    cliff: "",
    cliffPercentage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScheduleData({
      ...scheduleData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const instance = await getInstance();
      const reencrypt = await getReencryptPublicKey(CAPTABLE_DATA);
      console.log(reencrypt);

      const contractInstance = await captableContract();
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const key = await contractInstance.adminKey(accounts[0]);

      const startdate = scheduleData.startDate;
      const enddate = scheduleData.endDate;
      const cliff = parseInt(scheduleData.cliff);

      const sp = parseInt(scheduleData.startPercentage);
      const lpac = parseInt(scheduleData.linearPercentageAfterCliff);
      const cp = parseInt(scheduleData.cliffPercentage);

      const startUnix = getUnixTime(parse(startdate, "yyyy-MM-dd", new Date()));
      const endUnix = getUnixTime(parse(enddate, "yyyy-MM-dd", new Date()));

      // const nextCliffUnix = getUnixTime(addSeconds(parse(startdate, "yyyy-MM-dd", new Date()), cliff * 24 * 60 * 60));
      // const nextCliffDate = fromUnixTime(nextCliffUnix);
      // const formattedNextCliff = format(nextCliffDate, "dd-MM-yyyy");

      // setNextCliff(formattedNextCliff);

      const totalVestingDuration = 1716393300 - 1716392700;
      console.log(startUnix);
      console.log(endUnix);
      // console.log(nextCliffUnix);
      console.log(totalVestingDuration);

   
      const contractDataInstance = await captableDataContract();

      const companyTotalFunds = await contractDataInstance.viewCompanytotalFund(
        key,
        reencrypt.publicKey,
        reencrypt.signature
      );
      console.log("TX", companyTotalFunds);
      const alloc = await instance.decrypt(CAPTABLE_DATA, companyTotalFunds);
      setAllocations(parseInt(alloc.toString()));
      console.log(allocations);

      const captablecontract = await captableContract();

      const period = {
        start: 1716397800,
        cliffDuration: 300,
        totalDuration: 900,
        amountTotal: 11000,
        releaseAtStartPercentage: 10,
        releaseAtCliffPercentage: 10,
        linearReleasePercentage: 10,
      };
      console.log("Period",period);
      const addPeriod = await captablecontract.addSchedule(period, key);
      console.log("Vesting period added successfully:", addPeriod);
      onClose();
    } catch (error) {
      console.error("Error adding vesting period:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-end z-50 bg-black bg-opacity-50">
      <div className="lg:w-[40%] w-auto h-screen border-l bg-white border-[#BDBDBD] ">
        <div className="flex justify-between w-[100%] h-[10%] items-center border-b border-[#F4F4F4] p-5">
          <h1 className="font-source-code-pro text-xl font-semibold">
            Vesting Schedule
          </h1>
          <svg
            onClose={onClose}
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
            onClick={onClose}
          >
            <path
              d="M1 13L13 1M1 1L13 13"
              stroke="#76787A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {loading && 
          <Loader/>
}
        <form onSubmit={handleSubmit}>
          <div className="m-5 flex flex-col gap-10 w-[85%] h-[60%] ">
            <div className="flex space-x-[90px] mt-10 ">
              <div className="w-[44%]">
                <h1 className="font-source-code-pro text-sm text-[#212427]">
                  Start date
                </h1>
                <input
                  className=" font-source-code-pro w-[100%] p-2 focus:outline-none border border-[#BDBDBD] rounded-lg "
                  type="date"
                  name="startDate"
                  value={scheduleData.startDate}
                  onChange={handleChange}
                  placeholder="DD/MM/YYYY"
                />
              </div>
              <div className="w-[44%]">
                <h1 className="font-source-code-pro text-sm text-[#212427]">
                  End date
                </h1>
                <input
                  className="font-source-code-pro w-[100%] p-2 focus:outline-none border border-[#BDBDBD] rounded-lg "
                  type="date"
                  name="endDate"
                  value={scheduleData.endDate}
                  onChange={handleChange}
                  placeholder="DD/MM/YYYY"
                />
              </div>
            </div>

            <div className="flex  space-x-[85px]">
              <div className="w-[44%]">
                <h1 className="font-source-code-pro text-sm text-[#212427]">
                  Start Percentage
                </h1>
                <input
                  className="font-source-code-pro w-[100%] p-2 focus:outline-none border border-[#BDBDBD] rounded-lg "
                  type="number"
                  name="startPercentage"
                  value={scheduleData.startPercentage}
                  onChange={handleChange}
                  placeholder="Enter %"
                />
              </div>
              <div className="w-[44%]">
                <h1 className="font-source-code-pro    text-sm text-[#212427]">
                  Linear Percentage
                </h1>
                <input
                  className="font-source-code-pro w-[100%]  p-2 focus:outline-none border border-[#BDBDBD] rounded-lg "
                  type="number"
                  name="linearPercentageAfterCliff"
                  value={scheduleData.linearPercentageAfterCliff}
                  onChange={handleChange}
                  placeholder="Enter %"
                />
              </div>
            </div>

            <div className="flex space-x-[85px] ">
              <div className="w-[42%]">
                <h1 className="font-source-code-pro text-sm text-[#212427]">
                  Cliff
                </h1>
                <div className="flex items-center justify-between   w-[100%] focus:outline-none border border-[#BDBDBD] rounded-lg ">
                  <input
                    className="font-source-code-pro  rounded-lg  w-[100%] focus:outline-none p-2 "
                    type="number"
                    name="cliff"
                    value={scheduleData.cliff}
                    onChange={handleChange}
                    placeholder="5 Days "
                  />
                </div>
              </div>
              <div className="w-[44%]">
                <h1 className="font-source-code-pro text-sm text-[#212427]">
                  Cliff Percentage
                </h1>
                <input
                  className="font-source-code-pro w-[100%] p-2 focus:outline-none border border-[#BDBDBD] rounded-lg "
                  type="number"
                  name="cliffPercentage"
                  value={scheduleData.cliffPercentage}
                  onChange={handleChange}
                  placeholder="Enter %"
                />
              </div>
            </div>
            <div className="flex justify-between w-[100%] p-2 focus:outline-dashed border border-dashed border-[#3A74F2] rounded-lg ">
              <h1 className="text-[#3A74F2] text-sm font-source-code-pro p-1 ">
                Next Cliff in:
              </h1>
              <h1 className="text-[#3A74F2] text-sm font-source-code-pro p-1 ">
                {nextCliff || "DD-MM-YYYY"}
              </h1>
            </div>
            <div className="flex">
              <button
                type="submit"
                className="font-source-code-pro text-lg bg-[#3A74F2] px-3 rounded-lg text-[#FFFFFF] cursor-pointer p-1"
              >
                Add Schedule
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VestingSchedule;
