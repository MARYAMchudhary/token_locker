import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import thinking from "../thinkingface.png";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

function createData(name, f, amount) {
  return { name, f, amount };
}

const rows = [
  createData("Abii", "(A.A)", "1000.0 (A.A)"),
  createData("TS", "TST", "1000 TST"),
  createData("BSC", "Bleach", "90 Bleach"),
  createData("BSC", "Bleach", "90 Bleach"),
  createData("Alpha", "Alpha", "99 Alpha"),
  createData("ADA", "ADA", "100 ADA"),
  createData("ADA", "ADA", "100 ADA"),
];

function ShowingData() {
  const matches = useMediaQuery("(max-width:700px)");
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);
  function handleChangePage(event, newpage) {
    setpg(event, newpage);
  }

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }

  return (
    <Container maxWidth="small">
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  paddingLeft: "50px",
                  fontWeight: "700",
                  fontSize: matches ? "14px" : "26px",
                  color: "#000",
                  borderBottom: " 1px solid #383A41",
                }}
              >
                Tokens
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "700",
                  fontSize: matches ? "14px" : "26px",
                  textAlign: matches ? "start" : "center",
                  color: "#000",
                  borderBottom: " 1px solid #383A41",
                }}
              >
                Amount
              </TableCell>
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
            {rows.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  borderBottom: " 1px solid #383A41",
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    color: "#000",
                    //   fontWeight: "500",
                    //
                    borderBottom: " 1px solid #383A41",
                    fontSize: matches ? "12px" : "17px",
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <img src={thinking} alt="" width="40px" height="40px" />
                    <Box
                      sx={{
                        fontWeight: 600,
                        fontSize: matches ? "12px" : "17px",

                        color: "#000",
                      }}
                    >
                      {row.name}
                      <br />
                      <span
                        style={{
                          fontStyle: "normal",
                          fontWeight: 600,
                          fontSize: matches ? "10px" : "15px",
                          color: "#000",
                        }}
                      >
                        {row.f}
                      </span>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: matches ? "start" : "center",
                    fontWeight: 600,
                    fontSize: matches ? "12px" : "17px",

                    borderBottom: " 1px solid #383A41",
                    color: "#000",
                  }}
                >
                  {row.amount}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: "1px solid #383A41",
                    textAlign: matches ? "start" : "end",
                  }}
                >
                  <Button
                    sx={{
                      backgroundColor: "transparent",
                      border: "none",

                      fontWeight: "600",
                      fontSize: matches ? "12px" : "16px",
                      color: "rgb(243, 71, 128)",
                      borderRadius: "3px",
                    }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {/* {emptyRows > 0 && (
              <TableRow style={{ height: 75 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )} */}
          </TableBody>
          {/* <TableFooter>
       
          </TableFooter> */}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={Number(rows.length || 0)}
        rowsPerPage={rpg}
        page={pg}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}

export default ShowingData;
