import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useBalance, useContractRead, useNetwork, useToken } from "wagmi";
import useConnectWallet from "./useConnectWallet";
import useContractWriteH from "./useContractWriteH";
import useLockToken from "./useLockToken";
import WagmiABI from "../ABI/wagmiABI.json";
import ShowingData from "../ShowingData/ShowingData";
function Form() {
  const [toggle, setToggle] = useState(false);
  const [hide, sethide] = useState(1);

  const {
    connect,
    connectors,
    isLoading,
    pendingConnector,
    address,
    isConnected,
    disconnect,
  } = useConnectWallet();
  const { approveConfirmation, approveToken, storingHash } =
    useContractWriteH();
  const {
    lockToken,
    // write,
    setTokenAddress,
    setOwnerAddress,
    setAmount,
    ownerAddress,
    tokenAddress,
    debouncedAmount,
    timedate,
    setTimedate,
    // storeLockData,
    // checkData,
  } = useLockToken();
  const { data: balance } = useBalance({
    address: address,
    token: tokenAddress,
  });

  const { data: tokenInfo } = useToken({
    address: tokenAddress,
  });

  const { chain, chains } = useNetwork();

  const handleDisconnect = () => {
    disconnect();
    // setValueToken("");
    // setto("");
  };
  const { data } = useContractRead({
    address: "0xc0698e75550aA53C8212Ef857d19ecf1DdE834E9",
    abi: WagmiABI,
    functionName: "normalLocksForUser",
    args: [ownerAddress],
  });
  console.log(data, "its usetoken file");

  const save =
    data &&
    data.map((e) => {
      let obj = {
        id: e[0],
        token: e[1],
        owner: e[2],
        amount: e[3],
        lockdate: e[4],
        unlockDate: e[5],
      };
      // console.log(obj, "hello");
      return obj;
    });
  useEffect(() => {
    if (data) {
      // data.push(save);
      console.log(data, "its useeffect inner");
      localStorage.setItem("tokenlock", JSON.stringify(save));
    }
  }, []);
  return (
    <Box>
      {hide !== 1 ? (
        <Box>
          <ShowingData />
        </Box>
      ) : (
        <Container maxWidth="md">
          {!chain ? (
            ""
          ) : chains.map((chain) => chain.name).includes(chain?.name) ? (
            <p style={{ color: "green", fontWeight: "bold" }}>
              you are connected to correct network
            </p>
          ) : (
            <p style={{ color: "red", fontWeight: "bold" }}>
              you are connected to incorrect network
            </p>
          )}

          {!isConnected ? (
            <div>
              <h4>connect your wallet</h4>
              {connectors.map((connector) => (
                <Button
                  variant="contained"
                  color="secondary"
                  key={connector.id}
                  fullWidth
                  onClick={() => connect({ connector })}
                >
                  {connector.name}
                  {isLoading &&
                    pendingConnector?.id === connector.id &&
                    " (connecting)"}
                </Button>
              ))}
            </div>
          ) : (
            <>
              <div>
                Your Account adddress : <h4>{address}</h4>
                Your {tokenAddress ? "Token" : "Account"} Balance:
                <h4>
                  {parseFloat(balance?.formatted).toFixed(2)}
                  {balance?.symbol}
                </h4>
              </div>

              <div>
                {" "}
                <Button
                  onClick={handleDisconnect}
                  variant="outlined"
                  sx={{ marginLeft: "1rem" }}
                >
                  Disconnect
                </Button>
              </div>
            </>
          )}

          {!approveConfirmation ? (
          <Box mt={1}>
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "rgb(243, 71, 128)" }}
              // disabled={storingHash}
              onClick={() => {
                approveToken();
              }}
                >
                  Approve
              {/* {storingHash ? " Approving..." : "Approve"} */}
            </Button>
            {/* <Box></Box> */}
          </Box>
           ) : ( 
          <Box
            component="form"
            autoComplete="off"
            display={"flex"}
            flexDirection="column"
            sx={{ gap: "1rem" }}
            mt={3}
          >
            <Typography variant="h5">Create Your Lock</Typography>

            <Box>
              <TextField
                id="outlined-basic"
                label="Token address"
                variant="outlined"
                value={tokenAddress}
                onChange={(e) => {
                  setTokenAddress(e.target.value);
                }}
                fullWidth
              />
            </Box>
            <Box>
              <Checkbox
                checked={toggle === true ? true : false}
                onClick={() => {
                  console.log(toggle, "before state update");
                  if (toggle === true) {
                    setToggle(false);
                  } else {
                    setToggle(true);
                  }

                  console.log(toggle, "after state update");
                }}
                sx={{
                  color: "rgb(243, 71, 128)",
                  "&.Mui-checked": {
                    color: "rgb(243, 71, 128)",
                  },
                }}
              />
              use another owner?
            </Box>
            {toggle === true ? (
              <Box>
                <TextField
                  id="filled-basic"
                  label="Enter owner Address"
                  variant="outlined"
                  fullWidth
                  value={ownerAddress}
                  onChange={(e) => {
                    setOwnerAddress(e.target.value);
                  }}
                />
              </Box>
            ) : (
              ""
            )}
            {/* //*ITS TOKEN DETAIL */}
            {tokenInfo ? (
              <>
                {" "}
                <Box>
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableBody>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              textAlign: "right",
                              color: "blue",
                            }}
                          >
                            {tokenInfo?.name}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Symbol</TableCell>
                          <TableCell
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              textAlign: "right",
                            }}
                          >
                            {tokenInfo?.symbol}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Decimal</TableCell>
                          <TableCell
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              textAlign: "right",
                            }}
                          >
                            {tokenInfo?.decimals}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Balance</TableCell>
                          <TableCell
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              textAlign: "right",
                              color: "blue",
                            }}
                          >
                            {parseFloat(balance?.formatted).toFixed()}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </>
            ) : (
              ""
            )}

            <Box
              display="flex"
              alignItems="center"
              sx={{ border: "1px solid grey", color: "#fff" }}
            >
              <input
                placeholder="Enter Amount"
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#000",
                  height: "25px",
                  width: "90%",
                  paddingLeft: "7px",
                }}
                value={debouncedAmount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  console.log(debouncedAmount, "its debponce Amount");
                }}
              />
              <Button
                size="small"
                onClick={() => {
                  setAmount(parseFloat(balance?.formatted).toFixed());
                }}
              >
                Max
              </Button>
            </Box>
            <Box>
              <input
                type={"datetime-local"}
                value={timedate}
                onChange={(e) => {
                  setTimedate(e.target.value);
                  // setTimedate(new Date(e.target.value).getTime() / 1000);
                  console.log(timedate, "its time date");
                }}
              />
            </Box>

            <Button
              variant="contained"
              sx={{ border: "1px solid rgb(243, 71, 128)" }}
              // disabled={!approveConfirmation}
              onClick={() => {
                lockToken();
              }}
            >
              lock
              {/* {storeLockData ? "Locking..." : checkData ? "locked" : "Lock"} */}
            </Button>
          </Box>

           )}
        </Container>
      )}
    </Box>
  );
}

export default Form;
