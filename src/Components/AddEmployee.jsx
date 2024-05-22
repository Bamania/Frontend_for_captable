import React, { useState } from "react";
import { CAPTABLE_ADDRESS, captableContract, getInstance } from "../utils/fhevm";
import { getReencryptPublicKey } from "../utils/RencryptPublicKey";
import { Buffer } from "buffer";
import Loader from "./Loader";

window.Buffer = Buffer;

const AddEmployee = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    walletAddress: "",
    amount: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const instance = await getInstance();
      const contractInstance = await captableContract();

      const amount = formData.amount;

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });

      const key = await contractInstance.adminKey(accounts[0]);
      console.log(key);

      const tx = await contractInstance.addEmploy(formData.name, formData.walletAddress, key);
      const receipt = await tx.wait();
      console.log("Transaction hash:", receipt);

      const cipher = await instance.encrypt32(+amount);
      console.log("cipher", cipher);
      const alloc = await contractInstance.addAllocation(formData.walletAddress, cipher, key);
      const alocreci = await alloc.wait();
      console.log("Alloc", alocreci);

      setLoading(false);
      onClose();
    } catch (error) {
      console.log("Error", error);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-end z-50 bg-black bg-opacity-50">
      <div className="lg:w-[40%] w-auto h-screen border-l border-[#F4F4F4] bg-white">
        <div className="flex justify-between w-[100%] h-[10%] items-center border-b border-[#F4F4F4] p-5">
          <h1 className="font-source-code-pro text-xl font-semibold">New Employee</h1>
          <svg
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
            <div className="flex flex-col gap-3 w-[100%] mt-20 ml-5 h-[50%]">
              <div className="flex flex-col gap-3 ">
                <h1 className="font-source-code-pro text-[90%] font-light">Name</h1>
                <input
                  type="text"
                  className="p-2 font-source-code-pro w-[80%] h-[6vh] border border-[#BDBDBD] rounded-lg focus:outline-none"
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="font-source-code-pro text-[90%] font-light">Wallet Address</h1>
                <input
                  type="text"
                  className="font-source-code-pro w-[80%] h-[6vh] border border-[#BDBDBD] rounded-lg focus:outline-none p-2"
                  placeholder="Enter Address"
                  name="walletAddress"
                  value={formData.walletAddress}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="font-source-code-pro text-[90%] font-light">Amount</h1>
                <div className="flex relative justify-between items-center border border-[#BDBDBD] w-[80%] rounded-lg">
                  <input
                    type="text"
                    className="rounded-lg font-source-code-pro h-[6vh] w-[100%] focus:outline-none p-2"
                    placeholder="Allocate Tokens"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <button className="focus:ring-4 shadow-lg transform active:scale-75 transition-transform font-source-code-pro text-lg bg-[#3A74F2] w-[25%] rounded-lg text-[#FFFFFF] cursor-pointer mt-5 p-2">
                    Add Employee
                  </button>
                </div>
              </div>
            </div>
          </form>
        
      </div>
    </div>
  );
};

export default AddEmployee;
