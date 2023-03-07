import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import WagmiABI from "../ABI/wagmiABI.json";
import ERC20abi from "../ABI/ERC20abi.json";
function useContractWriteH() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [title, setTitle] = useState("");
  const [Amount, setAmount] = useState();
  const [timedate, setTimedate] = useState(new Date());

  const { config: checkApproved } = usePrepareContractWrite({
    address: "0xc0698e75550aA53C8212Ef857d19ecf1DdE834E9",
    abi: ERC20abi,
    functionName: "approve",
    args: [
      "0xc0698e75550aA53C8212Ef857d19ecf1DdE834E9",
      ethers.utils.parseEther("0.1").toString(),
    ],
  });
  console.log(checkApproved, "its show that approved");

  const { config } = usePrepareContractWrite({
    address: "0xc0698e75550aA53C8212Ef857d19ecf1DdE834E9",
    abi: WagmiABI,
    functionName: "lock",
    chainId: 5,
    // args: [tokenAddress, ownerAddress, Amount, true, timedate],
    args: [
      "0xBA62BCfcAaFc6622853cca2BE6Ac7d845BC0f2Dc",
      "0x33b45b33fE487C375d5B220cdA128C85c837eF11",
      false,
      (10 * 1e18).toString(),
      1694073683,
    ],
  });
  console.log(config, "its config");
  const {
    data: contateData,
    write,
    writeAsync,
  } = useContractWrite(config, checkApproved);

  console.log(contateData, "its data ");

  const onApproveContract = async () => {
    try {
      const tx = await writeAsync?.();
      await tx?.wait();
    } catch (error) {
      console.log(error, "something went wrong");
    }
  };

  return {
    tokenAddress,
    setTokenAddress,
    ownerAddress,
    setOwnerAddress,
    title,
    setTitle,
    Amount,
    setAmount,
    timedate,
    setTimedate,
    contateData,
    config,
    write,
    onApproveContract,
  };
}

export default useContractWriteH;
