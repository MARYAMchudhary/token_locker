import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { BigNumber } from "ethers";
import useLockToken from "../CreateToken/useLockToken";
import useUnlock from "../CreateToken/useUnlock";
import { useNavigate } from "react-router-dom";

function ShowingData() {
  const [storeLockData, setstoreLockData] = useState();
  const { write, setunlockId } = useUnlock();
  const {
    timedate,
    setTimedate,
    setAmount,
    Amount,
    ownerAddress,
    setOwnerAddress,
  } = useLockToken();
  console.log(storeLockData, "itsw stateee");
  const navigate = useNavigate();
  useEffect(() => {
    let TransactionData = JSON.parse(localStorage.getItem("tokenlock"));
    console.log(TransactionData, "local storage");
    setstoreLockData(TransactionData);
  }, []);
  return (
    <Container maxWidth="small">
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  // paddingLeft: "50px",
                  fontWeight: "700",
                  color: "#000",
                  borderBottom: " 1px solid #383A41",
                }}
              >
                id
              </TableCell>
              <TableCell
                sx={{
                  paddingLeft: "50px",
                  fontWeight: "700",
                  color: "#000",
                  borderBottom: " 1px solid #383A41",
                }}
              >
                Owner
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "700",

                  color: "#000",
                  borderBottom: " 1px solid #383A41",
                }}
              >
                Amount
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "700",

                  color: "#000",
                  borderBottom: " 1px solid #383A41",
                }}
              >
                Token
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "700",

                  color: "#000",
                  borderBottom: " 1px solid #383A41",
                }}
              >
                LockDate
              </TableCell>{" "}
              <TableCell
                sx={{
                  fontWeight: "700",

                  color: "#000",
                  borderBottom: " 1px solid #383A41",
                }}
              >
                UnlockDate
              </TableCell>
              <TableCell
                sx={{
                  color: "#000",
                  fontWeight: "bold",
                  borderBottom: " 1px solid #383A41",
                }}
                align="right"
              ></TableCell>
              <TableCell
                sx={{
                  color: "#000",
                  fontWeight: "bold",
                  borderBottom: " 1px solid #383A41",
                }}
                align="right"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {storeLockData &&
              storeLockData.map((row, index) => {
                // console.log(BigNumber.from(row.id).toString(), "helllllll");
                return (
                  <TableRow
                    key={BigNumber.from(row.id).toString()}
                    sx={{
                      borderBottom: " 1px solid #383A41",
                    }}
                  >
                    <TableCell
                      sx={{
                        fontWeight: 600,

                        borderBottom: " 1px solid #383A41",
                        color: "#000",
                      }}
                    >
                      {BigNumber.from(row.id).toString()}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        color: "#000",
                        //   fontWeight: "500",
                        //
                        borderBottom: " 1px solid #383A41",
                      }}
                    >
                      <Box
                        sx={{
                          fontWeight: 600,

                          color: "#000",
                        }}
                      >
                        {row.owner.slice(0, 15) + "..."}
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,

                        borderBottom: " 1px solid #383A41",
                        color: "#000",
                      }}
                    >
                      {BigNumber.from(row.amount).toString()}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,

                        borderBottom: " 1px solid #383A41",
                        color: "#000",
                      }}
                    >
                      {row.token.slice(0, 15) + "..."}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,

                        borderBottom: " 1px solid #383A41",
                        color: "#000",
                      }}
                    >
                      {BigNumber.from(row.lockdate).toString()}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,

                        borderBottom: " 1px solid #383A41",
                        color: "#000",
                      }}
                    >
                      {BigNumber.from(row.unlockDate).toString()}
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: "1px solid #383A41",
                      }}
                    >
                      <Button
                        sx={{
                          backgroundColor: "transparent",
                          border: "none",
                          fontWeight: "600",
                          color: "rgb(243, 71, 128)",
                          borderRadius: "3px",
                        }}
                        onClick={() => {
                          navigate("/editLock", {
                            state: {
                              lockId: BigNumber.from(row.id).toString(),
                            },
                          });
                          setAmount(row.amount);
                          // console.log(row.amount, "its amount");
                          // setTimedate(timedate);
                          // setOwnerAddress(ownerAddress);
                          // console.log(Amount, "its amount");
                          // console.log(timedate, "its date on Click");
                          // console.log(ownerAddress, "its owner on Click");
                        }}
                      >
                        Edit{" "}
                      </Button>
                    </TableCell>
                    <TableCell
                      sx={{
                        borderBottom: "1px solid #383A41",
                      }}
                    >
                      <Button
                        sx={{
                          backgroundColor: "transparent",
                          border: "none",
                          fontWeight: "600",
                          color: "rgb(243, 71, 128)",
                          borderRadius: "3px",
                        }}
                        onClick={() => {
                          setunlockId(BigNumber.from(row.id).toString());

                          write?.();
                        }}
                      >
                        Unlock
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ShowingData;
