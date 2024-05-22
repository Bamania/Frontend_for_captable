import React, { useState } from "react";
import VestingSchedule from "../Components/VestingSchedule.jsx";
import ClickToViewContent from "../Components/Clicktoview.jsx";

const AllocationsTable = () => {
  const [vesting, setVesting] = useState(false);
  const [formData, setFormData] = useState({
    allocationName: "",
    allocationAmount: "",
    allocationType: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleVestingClick = () => {
    setVesting(true);
  };

  const handleClose = () => {
    setVesting(false);
  };

  const handleRefresh = () => {
    window.location.reload(); // Reload the page
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form data:", formData);
    // You can perform further actions like sending data to a backend server here
  };

  return (
    <>
      <div className="  flex items-center justify-between    w-[100%] h-[10vh]    border-b border-gray-300  ">
        <div className="w-[15%] mx-[2%]">
          <h1 className="  text-2xl font-semilight font-source-code-pro">
            Allocations
          </h1>
        </div>

        <div className="flex gap-5 w-[50%] mr-[20px]  justify-end items-end ">
          <button
            onClick={handleVestingClick}
            className="font-source-code-pro  text-center text-[#3A74F2] w-[30%] p-2 font-medium  border rounded-lg border-[#3A74F2]"
          >
            Vesting Schedule
          </button>
          <button
            onClick={handleRefresh}
            className="font-source-code-pro font-medium flex items-center text-[#3A74F2] p-2  gap-2  border rounded-lg border-[#3A74F2] "
          >
            <svg
              className="p-1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.0229 9.348H21.0149L17.8339 6.165C16.8098 5.14087 15.5341 4.40439 14.1351 4.02961C12.7361 3.65482 11.2631 3.65493 9.86416 4.02992C8.46522 4.40492 7.18965 5.14159 6.16569 6.16587C5.14172 7.19015 4.40545 8.46595 4.03089 9.865M2.98489 19.644V14.652M2.98489 14.652H7.97689M2.98489 14.652L6.16489 17.835C7.189 18.8591 8.46468 19.5956 9.86368 19.9704C11.2627 20.3452 12.7357 20.3451 14.1346 19.9701C15.5336 19.5951 16.8091 18.8584 17.8331 17.8341C18.8571 16.8099 19.5933 15.5341 19.9679 14.135M21.0149 4.356V9.346"
                stroke="#3A74F2"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Refresh Page
          </button>
        </div>
      </div>
      {vesting && <VestingSchedule onClose={handleClose} />}
      <div className="w-[100%]">
        <ClickToViewContent />
      </div>
      <div className="mx-auto w-[50%] mt-8">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label htmlFor="allocationName" className="font-source-code-pro text-lg mb-2">
              Allocation Name
            </label>
            <input
              type="text"
              id="allocationName"
              name="allocationName"
              value={formData.allocationName}
              onChange={handleInputChange}
              className="border rounded-lg border-gray-300 p-2"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="allocationAmount" className="font-source-code-pro text-lg mb-2">
              Allocation Amount
            </label>
            <input
              type="text"
              id="allocationAmount"
              name="allocationAmount"
              value={formData.allocationAmount}
              onChange={handleInputChange}
              className="border rounded-lg border-gray-300 p-2"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="allocationType" className="font-source-code-pro text-lg mb-2">
              Allocation Type
            </label>
            <input
              type="text"
              id="allocationType"
              name="allocationType"
              value={formData.allocationType}
              onChange={handleInputChange}
              className="border rounded-lg border-gray-300 p-2"
            />
          </div>
          <button
            type="submit"
            className="font-source-code-pro font-medium bg-[#3A74F2] text-white p-2 rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AllocationsTable;
