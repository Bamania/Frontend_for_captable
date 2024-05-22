import { getInstance } from "./fhevm.jsx";

export const getReencryptPublicKey = async (contractAddress) => {
  const instance = await getInstance();
  if (!(await instance).hasKeypair(contractAddress)) {
    const eip712Domain = {
      // Give a user-friendly name to the specific contract you're signing for.
      // This must match the EIP712WithModifier string in the contract constructor.
      name: "Authorization token",
      // This identifies the latest version.
      // This must match the EIP712WithModifier version in the contract constructor.
      version: "1",
      // This defines the network, in this case, Gentry Testnet.
      chainId: 9090,
      // Add a verifying contract to make sure you're establishing contracts with the proper entity.
      verifyingContract: contractAddress,
    };
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
  
    const userAddress = accounts[0];

    const reencryption = (await instance).generatePublicKey(eip712Domain);

    const params = [userAddress, JSON.stringify(reencryption.eip712)];
    const sig = window.ethereum.request({
      method: "eth_signTypedData_v4",
      params,
    });

    (await instance).setSignature(contractAddress, sig);
  }
  
  return (await instance).getPublicKey(contractAddress);
  
};
