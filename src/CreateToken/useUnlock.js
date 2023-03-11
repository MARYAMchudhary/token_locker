import React, { useEffect, useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import WagmiABI from "../ABI/wagmiABI.json";

function useUnlock() {
  const [unlockId, setunlockId] = useState();
//   const [hashStore, sethashStore] = useState();
  console.log(unlockId, "its unLockId");
  const { config } = usePrepareContractWrite({
    address: "0xc0698e75550aA53C8212Ef857d19ecf1DdE834E9",
    abi: WagmiABI,
    functionName: "unlock",
    args: [unlockId],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);


  console.log(data, "its data of unlock");
  return {
    write,
    setunlockId,
    // hashStore,
  };
}

export default useUnlock;
