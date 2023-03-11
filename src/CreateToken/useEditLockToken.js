import { ethers } from "ethers";
import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import WagmiABI from "../ABI/wagmiABI.json";
import useLockToken from "./useLockToken";

function useEditLockToken() {
  const [editId, seteditId] = useState();
  const [editAmount, seteditAmount] = useState("");
  const [editDate, seteditDate] = useState("");
  const [debouncedEditAmount] = useDebounce(editAmount, 500);

  console.log(
    editId,
    debouncedEditAmount && ethers.utils.parseEther(debouncedEditAmount),
    new Date(editDate).getTime() / 1000
  );
  // console.log();
  // console.log();
  // console.log();
  // console.log();
  const { config } = usePrepareContractWrite({
    address: "0xc0698e75550aA53C8212Ef857d19ecf1DdE834E9",
    abi: WagmiABI,
    functionName: "editLock",
    args: [
      editId,
      debouncedEditAmount && ethers.utils.parseEther(debouncedEditAmount),
      new Date(editDate).getTime() ,
    ],
  });
  const { data, isLoading, isSuccess, write, writeAsync } =
    useContractWrite(config);
  console.log(data, "its data of after update");

  return {
    debouncedEditAmount,
    seteditAmount,
    editDate,
    seteditDate,
    editId,
    seteditId,
    write,
    writeAsync,
  };
}

export default useEditLockToken;
