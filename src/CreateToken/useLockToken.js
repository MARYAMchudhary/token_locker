import { ethers } from "ethers";
import { useEffect, useState } from "react";

import {
  useContract,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useSigner,
} from "wagmi";
import WagmiABI from "../ABI/wagmiABI.json";
import { useDebounce } from "use-debounce";

function useLockToken() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [Amount, setAmount] = useState("0");
  console.log(Amount, "initilaize checkup");
  const [timedate, setTimedate] = useState("");
  const [debouncedAmount] = useDebounce(Amount, 500);
  console.log( debouncedAmount && ethers.utils.parseEther(debouncedAmount), "its amount of debounce");
  const { config } = usePrepareContractWrite({
    address: "0xc0698e75550aA53C8212Ef857d19ecf1DdE834E9",
    abi: WagmiABI,
    functionName: "lock",
    args: [
      ownerAddress,
      tokenAddress,
      false,
      debouncedAmount && ethers.utils.parseEther(debouncedAmount),
      new Date(timedate).valueOf() / 1000,
    ],
  });
  const { data, isLoading, isSuccess, write, writeAsync, reset } =
    useContractWrite(config);
  console.log(data, "its data");
  const lockToken = async () => {
    try {
      await writeAsync?.();
      // await tx?.wait();
    } catch (error) {
      console.log(error, "something went wrong");
    }
  };

  //?LOCK TOKEN END
  return {
    lockToken,

    tokenAddress,
    ownerAddress,
    setTokenAddress,
    setOwnerAddress,
    setAmount,
    debouncedAmount,
    timedate,
    setTimedate,
    Amount,
  };
}

export default useLockToken;
