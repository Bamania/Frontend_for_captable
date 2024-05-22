import React, { useState, useEffect } from 'react';
import { captableContract, getInstance } from '../utils/fhevm';
import { getReencryptPublicKey } from '../utils/RencryptPublicKey';

const CAPTABLE_ADDRESS = "0x325996bC4d37e5626059a1205dfa683353744002";

const ClaimToken = ({ onClose }) => {
  const [claimAmount, setClaimAmount] = useState('');
  const [claimableTokens, setClaimableTokens] = useState(0);

  const handleChange = (e) => {
    e.preventDefault();
    setClaimAmount(e.target.value);
  };

  const fetchClaimableTokens = async () => {
    try {
      const instance = await getInstance();
      const contractInstance = await captableContract();
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      const key = await contractInstance.adminKey(accounts[0]);
      const claimableAmount = await contractInstance.claimableAmount(key);
      setClaimableTokens(Number(claimableAmount));
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchClaimableTokens();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const instance = await getInstance();
      const reencrypt = await getReencryptPublicKey(CAPTABLE_ADDRESS);
      console.log(reencrypt);
      const contractInstance = await captableContract();

      const ciphertext = await instance.encrypt32(BigInt(claimAmount));
      console.log(ciphertext);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      console.log(accounts);
      const key = await contractInstance.adminKey(accounts[0]);
      console.log(key);

      const claimTokens = await contractInstance.claim(ciphertext, key);
      console.log("Token", claimTokens);

      const claimedTokens = await contractInstance.claimableAmount(key);
      console.log("Claimed", claimedTokens);
      setClaimableTokens(Number(claimedTokens)); // Update the claimable token amount
    } catch (error) {
      console.log("error", error);
    }
    setClaimAmount('');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-end z-50 bg-black bg-opacity-50">
      <div className="lg:w-[40%] w-auto h-screen border-l border-[#F4F4F4] bg-white">
        <div className="flex justify-between w-[100%] h-[10%] items-center border-b border-[#F4F4F4] p-5">
          <h1 className="font-source-code-pro text-xl font-semibold">
            Claim Token
          </h1>
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
        <div className="border border-dashed border-[#3A74F2] rounded-lg flex justify-between ml-[5%] mt-5 items-center w-[80%]">
          <h1 className="text-[#3A74F2] font-source-code-pro font-semilight text-sm p-3">
            Tokens ready to be Claimed:
          </h1>
          <h2 className="text-[#3A74F2] font-source-code-pro font-semilight text-sm p-3">
            {claimableTokens.toLocaleString()}
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <h1 className="mt-[5%] font-source-code-pro text-sm ml-[5%]">
              Claim Tokens
            </h1>
            <input
              type="text"
              className="border p-3 font-source-code-pro  border-[#BDBDBD] rounded-lg flex justify-between ml-[5%] mt-2 focus:outline-none items-center w-[80%]"
              placeholder="Enter Amount"
              value={claimAmount}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-[#3A74F2] p-3 font-source-code-pro cursor-pointer w-[25%] mt-[5%] rounded-lg ml-[5%] text-white"
          >
            Claim Tokens
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClaimToken;
