import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import useLockToken from "./useLockToken";
import WagmiABI from "../ABI/wagmiABI.json";

function useContractReadData() {
  const [saveResponseData, setsaveResponseData] = useState([]);
  const { checkData, ownerAddress } = useLockToken();
  const contractRead = useContractRead({
    address: "0xc0698e75550aa53c8212ef857d19ecf1dde834e9",
    abi: WagmiABI,
    functionName: "normalLocksForUser",
    args: [ownerAddress],
  });
  useEffect(() => {
    setsaveResponseData(contractRead?.data);
    console.log("hello world", contractRead?.data);
  }, []);

  return { saveResponseData };
}

export default useContractReadData;
