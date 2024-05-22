import { BrowserProvider, AbiCoder, Contract } from "ethers";
import { initFhevm, createInstance } from "fhevmjs";

import captableAddress from "../JSON/EncryptedCapTable (9).json";
import captableData from "../JSON/CapTableData (6).json";
import vestingabi from "../JSON/Vesting (4).json"
export const init = async () => {
  await initFhevm();
};

const FHE_LIB_ADDRESS = "0x000000000000000000000000000000000000005d";
export const CAPTABLE_ADDRESS = "0xc874AFB8c53d5bd284a31ecAE3c2C4B5B015903A";
export const CAPTABLE_DATA="0x971462599f839e70EC2d7D4B76191Ed674077fBf";
export const VESTING_ADDRESS="0xc4a1aD756D084C33864a2b312AfAb5F0b22C539B"

export const provider = new BrowserProvider(window.ethereum);
export let signer;
let instance; 

export const setSigner = async () => {
  signer = await provider.getSigner();
};


export const createFhevmInstance = async () => {
  const network = await provider.getNetwork();
  const chainId = +network.chainId.toString();

  // Get blockchain public key
  const ret = await provider.call({
    to: FHE_LIB_ADDRESS,
    data: "0xd9d47bb001",
  });
  const decoded = AbiCoder.defaultAbiCoder().decode(["bytes"], ret);
  const publicKey = decoded[0];
  instance = await createInstance({ chainId, publicKey }); // initialize instance here
  return instance; // return instance
};

export const getInstance = async () => {
  await init();
  return instance || (await createFhevmInstance()); // return the created instance
};

export const captableContract = async () => {
  await setSigner();
  return new Contract(CAPTABLE_ADDRESS, captableAddress.abi, signer);
};



export const captableDataContract = async () => {
  await setSigner();
  return new Contract(CAPTABLE_DATA, captableData.abi, signer);
};

export const vestingContract=async()=>{
  await setSigner();
  return new Contract(VESTING_ADDRESS,vestingabi.abi,signer)
}

export const captableContrac = async () => {
  await setSigner();
  return new Contract(CAPTABLE_ADDRESS, captableAddress.abi);
};


