import React, { useEffect, useState } from 'react'

import { CAPTABLE_ADDRESS, CAPTABLE_DATA, captableContrac, captableContract, captableDataContract, getInstance } from '../utils/fhevm';
import { getReencryptPublicKey } from '../utils/RencryptPublicKey';
import Web3 from "web3";
import captableAddress from "../JSON/EncryptedCapTable (8).json";
import Loader from './Loader.jsx';

export default function DataView() {

  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true); 

  

  const dataView = async () => {
   
    try {
      const addresses = [];
      const instance = await getInstance();
      const reencrypt = await getReencryptPublicKey(CAPTABLE_DATA);
     console.log(reencrypt.publicKey);
      const contractDataInstance = await captableDataContract();

      const constactInstanceMain = await captableContract()

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
     
      const key = await constactInstanceMain.adminKey(accounts[0]);
     

      const companyEmploys = await contractDataInstance.viewCompanyemploys(key, reencrypt.publicKey, reencrypt.signature)
     
      const employeeCount = parseInt(await instance.decrypt(CAPTABLE_DATA, companyEmploys));

      const web3 = new Web3("https://testnet.inco.org");
      const contract = new web3.eth.Contract(captableAddress.abi, CAPTABLE_ADDRESS);
      const employeeDataList = [];

      for (let i = 0; i < employeeCount; i++) {
        const ad = await contract.methods.getEmployeeList(key, i).call((error, result) => {
          if (!error) {
            console.log("Result", result);
          } else {
            console.log("Error", error);
          }
        })
        addresses.push(ad);
      }

      for (let i = 0; i < addresses.length; i++) {
        const empdetails = await constactInstanceMain.getemployee(key, addresses[i]);
        

        const totalAllocations = await contractDataInstance.viewEmployeTotalAllocation(key, reencrypt.publicKey, reencrypt.signature, addresses[i]);
        const totalAlloc = await instance.decrypt(CAPTABLE_DATA, totalAllocations);
       
        
       
        const addressData = {
          address: addresses[i].toString(),
          name: empdetails[0].toString(),
          totalAllocation: totalAlloc.toString(),
          unlocked: empdetails[3].toString(),
          claimed: empdetails[4].toString(),
          isClaimAvailable: empdetails[5].toString(),
          allocationTime: empdetails[6].toString(),
          
        };

        employeeDataList.push(addressData);
      }

      setEmployeeData(employeeDataList);

      setLoading(false);
    } catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    dataView();
  }, []);

  return (
    <>
    {loading && <Loader />}
      {!loading && employeeData.map((employee, index) => (
        <div key={index} className={`flex h-[100px] mx-[20px]   border-b ${index % 2 !== 0 ? 'bg-[#F4F4F4]' : 'bg-white'}`}>
          <div className='px-6 w-[280px] flex items-center  justify-center '>
            <h1 className='font-light text-[14px] font-source-code-pro text-[#3F3F41]'>{employee.name}</h1>
          </div>
          <div className='w-[280px] flex items-center  justify-center h-[100px] px-6 py-6'>
            <h1 className='text-[14px]  font-source-code-pro text-[#3F3F41]'>{employee.totalAllocation}</h1>
          </div>
          <div className='w-[280px] flex items-center justify-center h-[100px] px-6 py-6'>
            <h1 className='text-[14px] font-source-code-pro text-[#3F3F41]'>{employee.unlocked}</h1>
          </div>
          <div className='w-[280px] flex items-center justify-center h-[100px] px-6 py-6'>
            <h1 className='text-[14px] font-source-code-pro text-[#3F3F41]'>{employee.claimed}</h1>
          </div>
          <div className='w-[280px] flex items-center justify-center h-[100px] px-6 py-6'>
          <h1 className={`text-[14px] font-source-code-pro text-[#3F3F41] ${employee.address>0 ? '' : 'text-[#3A74F2] '}`}>{employee.address.slice(0,5)+'...'+employee.address.slice(-5) || 'Add Wallet'}</h1>
          </div>
          <div className='w-[280px]  flex items-center justify-center h-[100px] px-6 py-6'>
          <h1 className={`text-[14px] font-source-code-pro text-[#3F3F41] ${parseInt(employee.unlocked) < parseInt(employee.totalAllocation) ? 'text-[#C88913] bg-[#FDF2E0] text-[10px] p-1 rounded-full' : 'text-[#4A9C52] bg-[#F0F8F0] text-[13px] px-4 py-2 rounded-full'}`}>{parseInt(employee.unlocked) < parseInt(employee.totalAllocation) ? 'Claim Available' : 'Up To Date'}</h1>
          </div>
        </div>
      ))}
    </>
  )
}
