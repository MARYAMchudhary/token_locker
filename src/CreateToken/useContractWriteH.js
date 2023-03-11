import { ethers } from "ethers";
import { useCallback, useState } from "react";
import {
  useAccount,
  useContract,
  useContractWrite,
  usePrepareContractWrite,
  useSigner,
} from "wagmi";

import ERC20abi from "../ABI/ERC20abi.json";
// import useLockToken from "./useLockToken";

function useContractWriteH() {
  const [approveConfirmation, setapproveConfirmation] = useState();
  const [storingHash, setstoringHash] = useState();
  const { address } = useAccount();
  console.log(address, "its address");
  const { data: signer } = useSigner();

  console.log(signer, "its signer ");
  
  //*CONTRACT APPROVE START
  const erc20 = useContract({
    address: "0xBA62BCfcAaFc6622853cca2BE6Ac7d845BC0f2Dc",
    abi: ERC20abi,
    signerOrProvider: signer,
  });

  const approveToken = async () => {

    try {
      const app = await erc20?.approve(
        "0xc0698e75550aA53C8212Ef857d19ecf1DdE834E9",
        ethers.utils.parseEther("100")
      );
      console.log(app, "its app ");
      setstoringHash(app?.hash);
      const conformation = await app.wait();
      if (conformation) {
        setapproveConfirmation(conformation);
        console.log(conformation, "hello this is conformation");
        // write?.();
      }
    } catch (error) {
      console.log(error);
    }
  };
  //*CONTRACT APPROVE END

  return {
    approveConfirmation,
    approveToken,
    storingHash,
  };
}

export default useContractWriteH;
