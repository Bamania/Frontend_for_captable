import React, { useEffect, useState } from "react";
import VestingSchedule from "../Components/VestingSchedule.jsx";
import ClickToViewContent from "../Components/Clicktoview.jsx";
const AllocationsTable = ({ employNumber }) => {
  const [vesting, setVesting] = useState(false);

  const handleVestingClick = () => {
    setVesting(true);
  };

  const handleClose = () => {
    setVesting(false);
  };

  const handleRefresh = () => {
    window.location.reload(); // Reload the page
  };

  return (
    <>
      <div className="  flex items-center justify-between    w-[100%] h-[10vh]    border-b  border-[#F4F4F4] ">
        <div className="w-[15%] mx-[2%]">
          <h1 className="  text-2xl font-semilight font-source-code-pro">
            Allocations
          </h1>
        </div>

        <div className="flex gap-5 w-[50%] mr-[20px]  justify-end items-end ">
          <button
            onClick={handleVestingClick}
            className="font-source-code-pro focus:ring-4  transform active:scale-75 transition-transform text-center text-[#3A74F2] w-[30%] p-2 font-medium  border rounded-lg border-[#3A74F2]"
          >
            Vesting Schedule
          </button>
          {employNumber > 0 ? (
            <button
              onClick={handleRefresh}
              className="font-source-code-pro focus:ring-4  transform active:scale-75 transition-transform font-medium flex items-center text-[#3A74F2] p-2  gap-2  border rounded-lg border-[#3A74F2] "
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
          ) : (
            <button
              onClick={handleRefresh}
              className="font-source-code-pro focus:ring-4  transform active:scale-75 transition-transform font-medium flex items-center text-[#BDBDBD] p-2  gap-2  border rounded-lg border-[#BDBDBD] "
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.023 9.34794H21.015L17.834 6.16494C16.8099 5.14081 15.5342 4.40433 14.1352 4.02955C12.7362 3.65476 11.2632 3.65487 9.86428 4.02986C8.46534 4.40486 7.18977 5.14153 6.16581 6.16581C5.14184 7.19009 4.40557 8.46588 4.03101 9.86494M2.98501 19.6439V14.6519M2.98501 14.6519H7.97701M2.98501 14.6519L6.16501 17.8349C7.18912 18.8591 8.4648 19.5955 9.8638 19.9703C11.2628 20.3451 12.7358 20.345 14.1347 19.97C15.5337 19.595 16.8092 18.8584 17.8332 17.8341C18.8572 16.8098 19.5934 15.534 19.968 14.1349M21.015 4.35594V9.34594"
                  stroke="#BDBDBD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Refresh Page
            </button>
          )}
        </div>
      </div>
      {vesting && <VestingSchedule onClose={handleClose} />}
      <div className="w-[100%]">
        <ClickToViewContent />
      </div>
    </>
  );
};

export default AllocationsTable;
