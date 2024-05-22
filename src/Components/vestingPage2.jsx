import React, { useState } from "react";
import {
  captableContract,
  captableDataContract,
  getInstance,
  vestingContract,
} from "../utils/fhevm";
import { getReencryptPublicKey } from "../utils/RencryptPublicKey";
import moment from "moment";

const CAPTABLE_DATA = "0x6b6845a3DA474079CA531F7c3FEa1678e9C064CD";

const VestingSchedule2 = ({ onClose }) => {
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
    try {
      const sd = scheduleData.startDate;
      const ed = scheduleData.endDate;
      const sp = scheduleData.startPercentage;
      const lpac = scheduleData.linearPercentageAfterCliff;
      const c = scheduleData.cliff;
      const cp = scheduleData.cliffPercentage;

      const so = moment(sd, "DD/MM/YYYY");
      const su = so.unix();
      console.log(su);

      const eo = moment(ed, "DD/MM/YYYY");
      const eu = eo.unix();
      console.log(eu);

      const co = moment().set("day", c);
      const cu = co.unix();
      console.log(cu);

      const totalVestingDuration = eu - su;

      const instance = await getInstance();
      const reencrypt = await getReencryptPublicKey(CAPTABLE_DATA);
      console.log(reencrypt);
      console.log(await instance.hasKeypair(CAPTABLE_DATA));
      const contractInstance = await captableContract();

      const contractDataInstance = await captableDataContract();

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      console.log(accounts);

      const key = await contractInstance.adminKey(accounts[0]);
      console.log(key);

      const totalAmount = await contractDataInstance.viewCompanytotalFund(
        key,
        reencrypt.publicKey,
        reencrypt.signature
      );
      console.log("TX", totalAmount);
      const ta = await instance.decrypt(CAPTABLE_DATA, totalAmount);

      const se = await instance.encrypt32(+su);
      // const ee=await instance.encrypt32(eu);
      const tvde = await instance.encrypt32(+totalVestingDuration);
      const ce = await instance.encrypt32(cu);
      const tae = await instance.encrypt32(ta);
      const lpace = await instance.encrypt32(+lpac);
      const spe = await instance.encrypt32(+sp);
      const cpe = await instance.encrypt32(+cp);

      console.log("se", se);
      console.log("tvde", tvde);
      console.log("ce", ce);
      console.log("ta", tae);

      console.log("lpace", lpace);
      console.log("spe", spe);
      console.log("cpe", cpe);

      const vestingInstance = await vestingContract();

      const vestingParams = {
        startTimestamp: se,
        cliffDurationInSeconds: ce,
        totalVestingDurationInSeconds: tvde,
        totalAmount: tae,
        EreleaseAtStartPercentage: spe,
        EreleaseAtCliffPercentage: cpe,
        ElinearReleasePercentage: lpace,
      };

      const vr = await vestingInstance.addVestingSchedule(key, {
        startTimestamp: se,
        cliffDurationInSeconds: ce,
        totalVestingDurationInSeconds: tvde,
        totalAmount: t,
        EreleaseAtStartPercentage: spe,
        EreleaseAtCliffPercentage: cpe,
        ElinearReleasePercentage: lpace,
      });

      console.log("HEllo", vr);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-end z-50 bg-black bg-opacity-50">
      <div className="lg:w-[40%] w-auto h-screen border-l bg-white border-[#BDBDBD] ">
        <div className="flex justify-between w-[100%] h-[10%] items-center border-b border-[#F4F4F4] p-5">
          <h1 className="font-source-code-pro text-2xl font-semibold">
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

        <div className="ml-[20px] mt-10">
          <div className="">
            <ol className="flex items-center w-full  mb-4 sm:mb-5">
              <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-[209px] after:h-[2px] after:border-b after:border-blue-100 after:border-2 after:inline-block dark:after:border-blue-800">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full lg:h-8 lg:w-8 dark:bg-[#EFF0F7] shrink-0">
                  <svg
                    width="34"
                    height="33"
                    viewBox="0 0 34 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="16.832"
                      cy="16.5532"
                      r="16.248"
                      fill="#EFF0F7"
                    />
                    <g clip-path="url(#clip0_301_142330)">
                      <rect
                        x="6.45129"
                        y="5.72119"
                        width="21.664"
                        height="21.664"
                        rx="10.832"
                        fill="#F9FAFB"
                      />
                      <rect
                        x="6.45129"
                        y="5.72119"
                        width="21.664"
                        height="21.664"
                        rx="10.832"
                        fill="#F9FAFB"
                      />
                      <circle
                        cx="17.2833"
                        cy="16.5535"
                        r="3.61067"
                        fill="#020246"
                      />
                      <g clip-path="url(#clip1_301_142330)">
                        <rect
                          x="5.87512"
                          y="5.99951"
                          width="21.664"
                          height="21.664"
                          rx="10.832"
                          fill="#F9FAFB"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M21.3075 12.6701L14.8444 18.9075L13.1293 17.0751C12.8134 16.7772 12.3169 16.7592 11.9559 17.0119C11.6038 17.2737 11.5045 17.734 11.7212 18.1041L13.7522 21.4079C13.9507 21.7148 14.2938 21.9044 14.6819 21.9044C15.052 21.9044 15.404 21.7148 15.6026 21.4079C15.9276 20.9836 22.1289 13.5908 22.1289 13.5908C22.9413 12.7604 21.9574 12.0292 21.3075 12.6611V12.6701Z"
                          fill="#020246"
                        />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_301_142330">
                        <rect
                          x="6.45129"
                          y="5.72119"
                          width="21.664"
                          height="21.664"
                          rx="10.832"
                          fill="white"
                        />
                      </clipPath>
                      <clipPath id="clip1_301_142330">
                        <rect
                          x="5.87512"
                          y="5.99951"
                          width="21.664"
                          height="21.664"
                          rx="10.832"
                          fill="white"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </li>
              <li className="flex w-full items-center after:content-[''] after:w-[209px] after:h-[2px] after:border-b after:border-[#BDBDBD] after:border-2 after:inline-block dark:after:border-gray-700">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-8 lg:w-8 dark:bg-gray-700 shrink-0">
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_301_141971)">
                      <rect
                        x="0.57666"
                        y="0.721191"
                        width="21.664"
                        height="21.664"
                        rx="10.832"
                        fill="#F9FAFB"
                      />
                      <rect
                        x="0.57666"
                        y="0.721191"
                        width="21.664"
                        height="21.664"
                        rx="10.832"
                        fill="#F9FAFB"
                      />
                      <circle
                        cx="11.4086"
                        cy="11.5535"
                        r="3.61067"
                        fill="#020246"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_301_141971">
                        <rect
                          x="0.57666"
                          y="0.721191"
                          width="21.664"
                          height="21.664"
                          rx="10.832"
                          fill="white"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </li>
              <li className="flex items-center w-full">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-8 lg:w-8 dark:bg-gray-700 shrink-0">
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_301_141971)">
                      <rect
                        x="0.57666"
                        y="0.721191"
                        width="21.664"
                        height="21.664"
                        rx="10.832"
                        fill="#F9FAFB"
                      />
                      <rect
                        x="0.57666"
                        y="0.721191"
                        width="21.664"
                        height="21.664"
                        rx="10.832"
                        fill="#F9FAFB"
                      />
                      <circle
                        cx="11.4086"
                        cy="11.5535"
                        r="3.61067"
                        fill="#020246"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_301_141971">
                        <rect
                          x="0.57666"
                          y="0.721191"
                          width="21.664"
                          height="21.664"
                          rx="10.832"
                          fill="white"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </li>
            </ol>
          </div>

          <ol className="flex items-center gap-[100px]  -mt-[15px] w-full ">
            <li className="font-source-code-pro ">Add Duration</li>
            <li className="font-source-code-pro">Add Percentage</li>
            <li className="font-source-code-pro">Add Amount</li>
          </ol>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="m-5 flex flex-col gap-10 w-[85%] h-[60%] ">
            <div className="flex space-x-[90px] mt-10 ">
              <div className="">
                <h1 className="font-source-code-pro text-sm text-[#212427]">
                  Start Percentage
                </h1>
                <input
                  className=" font-source-code-pro w-[100%] p-2 focus:outline-none border border-[#BDBDBD] rounded-lg "
                  type="text"
                  name="startDate"
                  value={scheduleData.startDate}
                  onChange={handleChange}
                  placeholder="Enter %"
                />
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.21936 4.00098L1.50002 19.9985"
                    stroke="#BDBDBD"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M16.268 13.008C15.82 13.008 15.4147 12.9013 15.052 12.688C14.6894 12.464 14.4067 12.1493 14.204 11.744C14.0014 11.328 13.9 10.848 13.9 10.304C13.9 9.472 14.124 8.82133 14.572 8.352C15.0307 7.872 15.596 7.632 16.268 7.632C16.9507 7.632 17.516 7.872 17.964 8.352C18.412 8.82133 18.636 9.472 18.636 10.304C18.636 10.848 18.5347 11.328 18.332 11.744C18.1294 12.1493 17.8467 12.464 17.484 12.688C17.1214 12.9013 16.716 13.008 16.268 13.008ZM16.268 11.744C16.4707 11.744 16.6467 11.6427 16.796 11.44C16.956 11.2267 17.036 10.848 17.036 10.304C17.036 9.76 16.956 9.392 16.796 9.2C16.6467 8.99733 16.4707 8.896 16.268 8.896C16.076 8.896 15.9 8.99733 15.74 9.2C15.58 9.392 15.5 9.76 15.5 10.304C15.5 10.848 15.58 11.2267 15.74 11.44C15.9 11.6427 16.076 11.744 16.268 11.744ZM14.988 17.552L13.788 16.384L16.764 13.616L17.58 14.368L14.988 17.552ZM19.868 11.968L19.052 11.2L21.644 8.016L22.844 9.184L19.868 11.968ZM20.332 18.192C19.884 18.192 19.4787 18.0853 19.116 17.872C18.7534 17.648 18.4707 17.3333 18.268 16.928C18.0654 16.512 17.964 16.032 17.964 15.488C17.964 14.656 18.188 14.0053 18.636 13.536C19.0947 13.056 19.66 12.816 20.332 12.816C21.0147 12.816 21.58 13.056 22.028 13.536C22.476 14.0053 22.7 14.656 22.7 15.488C22.7 16.032 22.5987 16.512 22.396 16.928C22.1934 17.3333 21.9107 17.648 21.548 17.872C21.1854 18.0853 20.78 18.192 20.332 18.192ZM20.332 16.928C20.5347 16.928 20.7107 16.8267 20.86 16.624C21.02 16.4107 21.1 16.032 21.1 15.488C21.1 14.944 21.02 14.576 20.86 14.384C20.7107 14.1813 20.5347 14.08 20.332 14.08C20.14 14.08 19.964 14.1813 19.804 14.384C19.644 14.576 19.564 14.944 19.564 15.488C19.564 16.032 19.644 16.4107 19.804 16.624C19.964 16.8267 20.14 16.928 20.332 16.928Z"
                    fill="#515151"
                  />
                </svg>
              </div>
              <div className="w-[44%]">
                <h1 className="font-source-code-pro text-sm text-[#212427]">
                  Linear Percentage after cliff
                </h1>
                <div></div>
                <input
                  className="font-source-code-pro w-[100%] p-2 focus:outline-none border border-[#BDBDBD] rounded-lg "
                  type="text"
                  name="endDate"
                  value={scheduleData.endDate}
                  onChange={handleChange}
                  placeholder="Enter %"
                />
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.71935 4.00098L2 19.9985"
                    stroke="#BDBDBD"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M16.768 13.008C16.32 13.008 15.9147 12.9013 15.552 12.688C15.1893 12.464 14.9067 12.1493 14.704 11.744C14.5013 11.328 14.4 10.848 14.4 10.304C14.4 9.472 14.624 8.82133 15.072 8.352C15.5307 7.872 16.096 7.632 16.768 7.632C17.4507 7.632 18.016 7.872 18.464 8.352C18.912 8.82133 19.136 9.472 19.136 10.304C19.136 10.848 19.0347 11.328 18.832 11.744C18.6293 12.1493 18.3467 12.464 17.984 12.688C17.6213 12.9013 17.216 13.008 16.768 13.008ZM16.768 11.744C16.9707 11.744 17.1467 11.6427 17.296 11.44C17.456 11.2267 17.536 10.848 17.536 10.304C17.536 9.76 17.456 9.392 17.296 9.2C17.1467 8.99733 16.9707 8.896 16.768 8.896C16.576 8.896 16.4 8.99733 16.24 9.2C16.08 9.392 16 9.76 16 10.304C16 10.848 16.08 11.2267 16.24 11.44C16.4 11.6427 16.576 11.744 16.768 11.744ZM15.488 17.552L14.288 16.384L17.264 13.616L18.08 14.368L15.488 17.552ZM20.368 11.968L19.552 11.2L22.144 8.016L23.344 9.184L20.368 11.968ZM20.832 18.192C20.384 18.192 19.9787 18.0853 19.616 17.872C19.2533 17.648 18.9707 17.3333 18.768 16.928C18.5653 16.512 18.464 16.032 18.464 15.488C18.464 14.656 18.688 14.0053 19.136 13.536C19.5947 13.056 20.16 12.816 20.832 12.816C21.5147 12.816 22.08 13.056 22.528 13.536C22.976 14.0053 23.2 14.656 23.2 15.488C23.2 16.032 23.0987 16.512 22.896 16.928C22.6933 17.3333 22.4107 17.648 22.048 17.872C21.6853 18.0853 21.28 18.192 20.832 18.192ZM20.832 16.928C21.0347 16.928 21.2107 16.8267 21.36 16.624C21.52 16.4107 21.6 16.032 21.6 15.488C21.6 14.944 21.52 14.576 21.36 14.384C21.2107 14.1813 21.0347 14.08 20.832 14.08C20.64 14.08 20.464 14.1813 20.304 14.384C20.144 14.576 20.064 14.944 20.064 15.488C20.064 16.032 20.144 16.4107 20.304 16.624C20.464 16.8267 20.64 16.928 20.832 16.928Z"
                    fill="#515151"
                  />
                </svg>
              </div>
            </div>

            <div className="flex space-x-[62px] ">
              <div>
                <h1 className="font-source-code-pro text-sm text-[#212427]">
                  Cliff percentage
                </h1>
                <div className="flex items-center justify-between pr-2  w-[88%] focus:outline-none border border-[#BDBDBD] rounded-lg ">
                  <input
                    className="font-source-code-pro  ml-1 w-[100%] focus:outline-none p-2 "
                    type="text"
                    name="cliff"
                    value={scheduleData.cliff}
                    onChange={handleChange}
                    placeholder="Enter % "
                  />
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.71936 4.00098L2.00002 19.9985"
                      stroke="#BDBDBD"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M16.768 13.008C16.32 13.008 15.9147 12.9013 15.552 12.688C15.1894 12.464 14.9067 12.1493 14.704 11.744C14.5014 11.328 14.4 10.848 14.4 10.304C14.4 9.472 14.624 8.82133 15.072 8.352C15.5307 7.872 16.096 7.632 16.768 7.632C17.4507 7.632 18.016 7.872 18.464 8.352C18.912 8.82133 19.136 9.472 19.136 10.304C19.136 10.848 19.0347 11.328 18.832 11.744C18.6294 12.1493 18.3467 12.464 17.984 12.688C17.6214 12.9013 17.216 13.008 16.768 13.008ZM16.768 11.744C16.9707 11.744 17.1467 11.6427 17.296 11.44C17.456 11.2267 17.536 10.848 17.536 10.304C17.536 9.76 17.456 9.392 17.296 9.2C17.1467 8.99733 16.9707 8.896 16.768 8.896C16.576 8.896 16.4 8.99733 16.24 9.2C16.08 9.392 16 9.76 16 10.304C16 10.848 16.08 11.2267 16.24 11.44C16.4 11.6427 16.576 11.744 16.768 11.744ZM15.488 17.552L14.288 16.384L17.264 13.616L18.08 14.368L15.488 17.552ZM20.368 11.968L19.552 11.2L22.144 8.016L23.344 9.184L20.368 11.968ZM20.832 18.192C20.384 18.192 19.9787 18.0853 19.616 17.872C19.2534 17.648 18.9707 17.3333 18.768 16.928C18.5654 16.512 18.464 16.032 18.464 15.488C18.464 14.656 18.688 14.0053 19.136 13.536C19.5947 13.056 20.16 12.816 20.832 12.816C21.5147 12.816 22.08 13.056 22.528 13.536C22.976 14.0053 23.2 14.656 23.2 15.488C23.2 16.032 23.0987 16.512 22.896 16.928C22.6934 17.3333 22.4107 17.648 22.048 17.872C21.6854 18.0853 21.28 18.192 20.832 18.192ZM20.832 16.928C21.0347 16.928 21.2107 16.8267 21.36 16.624C21.52 16.4107 21.6 16.032 21.6 15.488C21.6 14.944 21.52 14.576 21.36 14.384C21.2107 14.1813 21.0347 14.08 20.832 14.08C20.64 14.08 20.464 14.1813 20.304 14.384C20.144 14.576 20.064 14.944 20.064 15.488C20.064 16.032 20.144 16.4107 20.304 16.624C20.464 16.8267 20.64 16.928 20.832 16.928Z"
                      fill="#515151"
                    />
                  </svg>
                </div>
              </div>
              {/* <div className="w-[44%]">
                <h1 className="font-source-code-pro text-sm text-[#212427]">
                  Cliff Percentage
                </h1>
                <input
                  className="font-source-code-pro w-[100%] p-2 focus:outline-none border border-[#BDBDBD] rounded-lg "
                  type="text"
                  name="cliffPercentage"
                  value={scheduleData.cliffPercentage}
                  onChange={handleChange}
                  placeholder="Enter %"
                />
              </div> */}
            </div>
            <div className="flex justify-between w-[100%] p-2 focus:outline-dashed border border-dashed border-[#3A74F2] rounded-lg ">
              <h1 className="text-[#3A74F2] text-sm font-source-code-pro p-1 ">
                Next Cliff in:
              </h1>
              <h1 className="text-[#3A74F2] text-sm font-source-code-pro p-1 ">
                DD/MM/YY
              </h1>
            </div>
            <div className="flex gap-5">
              <button
                type=""
                className="font-source-code-pro text-lg border-[1.5px] p-2 h-[60%] w-[30%] border-[#3A74F2] px-3 rounded-lg text-[#3A74F2] cursor-pointer "
              >
                Back
              </button>

              <button
                type="submit"
                className="font-source-code-pro text-base bg-[#3A74F2] w-[30%] px-4 rounded-lg text-[#FFFFFF] cursor-pointer p-1"
              >
                Add percentage
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VestingSchedule2;
