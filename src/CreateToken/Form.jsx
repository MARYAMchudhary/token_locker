import {
  Box,
  Button,
  Checkbox,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useBalance, useNetwork, useToken } from "wagmi";
import useConnectWallet from "./useConnectWallet";
import useContractWriteH from "./useContractWriteH";

function Form() {
  const [toggle, setToggle] = useState(false);
  const {
    connect,
    connectors,
    isLoading,
    pendingConnector,
    address,
    isConnected,
    disconnect,
  } = useConnectWallet();
  const {
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
  } = useContractWriteH();

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
  return (
    <Box>
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

          <Box>
            <TextField
              id="filled-basic"
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Box>
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
              value={Amount}
              onChange={(e) => {
                setAmount(e.target.value);
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
              type={"date"}
              value={timedate}
              onChange={(e) => setTimedate(e.target.value)}
            />
            {/* <DatePicker
              selected={timedate}
              onChange={(date) => setTimedate(date)}
              showTimeSelect
              showIcon
              placeholderText="Enter Date"
              dateFormat="MMMM d, yyyy h:mm aa"
              // timeIntervals={15}
              timeCaption="time"
            /> */}
          </Box>
          <Button
            variant="contained"
            sx={{ backgroundColor: "rgb(243, 71, 128)" }}
            disabled={!write}
            onClick={() => {
              onApproveContract();
            }}
          >
            Lock
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Form;
