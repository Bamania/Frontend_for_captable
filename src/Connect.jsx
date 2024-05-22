import { BrowserProvider } from "ethers";
import { createFhevmInstance } from "./utils/fhevm.jsx";
import { useState, useCallback, useEffect, useMemo, React } from "react";

const AUTHORIZED_CHAIN_ID = ["0x2382", "0x2383"]; // 9090, 9091

export const Connect = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [validNetwork, setValidNetwork] = useState(false);
  const [account, setAccount] = useState("");
  const [error, setError] = useState(null);
  const [provider, setProvider] = useState(null);

  const refreshAccounts = (accounts) => {
    setAccount(accounts[0] || "");
    setConnected(accounts.length > 0);
  };

  const hasValidNetwork = async () => {
    const currentChainId = await window.ethereum.request({
      method: "eth_chainId",
    });
    console.log(currentChainId);
    return AUTHORIZED_CHAIN_ID.includes(currentChainId.toLowerCase());
  };

  const refreshNetwork = useCallback(async () => {
    try {
      const valid = await hasValidNetwork();
      console.log(valid);
      if (valid) {
        await createFhevmInstance();
        setValidNetwork(true);
      } else {
        setValidNetwork(false);
      }
    } catch (error) {
      console.error("Error refreshing network:", error);
      setValidNetwork(false);
    }
  }, []);

  const refreshProvider = (eth) => {
    const p = new BrowserProvider(eth);
    setProvider(p);
    return p;
  };

  useEffect(() => {
    const eth = window.ethereum;
    if (!eth) {
      setError("No wallet has been found");
      return;
    }

    const p = refreshProvider(eth);

    p.send("eth_accounts", [])
      .then(async (accounts) => {
        refreshAccounts(accounts);
        await refreshNetwork();
      })
      .catch(() => {
        // Do nothing
      });
    eth.on("accountsChanged", refreshAccounts);
    eth.on("chainChanged", refreshNetwork);
  }, [refreshNetwork]);

  const connect = async () => {
    if (!provider) {
      return;
    }
    const accounts = await provider.send("eth_requestAccounts", []);

    if (accounts.length > 0) {
      setAccount(accounts[0]);
      setConnected(true);
      if (!(await hasValidNetwork())) {
        await switchNetwork();
      }
    }
  };

  const switchNetwork = useCallback(async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: AUTHORIZED_CHAIN_ID[0] }],
      });
    } catch (e) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: AUTHORIZED_CHAIN_ID[0],
            rpcUrls: ["https://testnet.inco.org"],
            chainName: "Inco Gentry Testnet",
            nativeCurrency: {
              name: "INCO",
              symbol: "INCO",
              decimals: 18,
            },
            blockExplorerUrls: ["https://explorer.inco.org/"],
          },
        ],
      });
    }
    await refreshNetwork();
  }, [refreshNetwork]);

  const child = useMemo(() => {
    if (!account || !provider) {
      return null;
    }

    if (!validNetwork) {
      return (
        <div>
          <p>You're not on the correct network</p>
          <p>
            <button className="Connect__button" onClick={switchNetwork}>
              Switch to Inco Gentry Testnet
            </button>
          </p>
        </div>
      );
    }

    return children(account, provider);
  }, [account, provider, validNetwork, children, switchNetwork]);

  if (error) {
    return <p>No wallet has been found.</p>;
  }

  const [showFullAddress, setShowFullAddress] = useState("");
  const toggleShowFullAddress = () => {
    setShowFullAddress(!showFullAddress);
  };
  const connectInfos = (
    <div className="Connect__info">
      <div className="flex items-center justify-end  border-b border-[#F4F4F4] -mt-[1%] py-[1%]">
        {!connected && (
          <button
            className="Connect__button font-source-code-pro cursor-pointer rounded-lg w-[200px] h-[40px] mt-[2px] bg-[#3A74F2] px-[24px]   mr-[20px]  text-[#FFFFFF]  "
            onClick={connect}
          >
            Connect wallet
          </button>
        )}
        {connected && (
          <div className="Connect__account ">
            <div className="flex items-center">
              <div className="flex flex-col p-2 ">
                <h1 className="text-[#BDBDBD] font-source-code-pro">Linked Wallet</h1>
                <div className="font-source-code-pro text-[#3F3F41] font-semibold">
                {showFullAddress ? `${account}` : `${account}`.slice(0,5) + '...'+`${account}`.slice(-5)}
                </div>
                
              </div>
              <svg
              onClick={toggleShowFullAddress}
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mt-[22px] cursor-pointer mr-[15px]"
              >
                <path
                  d="M15.88 9.29L12 13.17L8.11998 9.29C7.72998 8.9 7.09998 8.9 6.70998 9.29C6.31998 9.68 6.31998 10.31 6.70998 10.7L11.3 15.29C11.69 15.68 12.32 15.68 12.71 15.29L17.3 10.7C17.69 10.31 17.69 9.68 17.3 9.29C16.91 8.91 16.27 8.9 15.88 9.29Z"
                  fill="#76787A"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {connectInfos}
      <div className="Connect__child">{child}</div>
    </>
  );
};
