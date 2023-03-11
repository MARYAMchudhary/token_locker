import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import useEditLockToken from "./useEditLockToken";
import { useLocation } from "react-router-dom";

function EditForm() {
  const {
    debouncedEditAmount,
    seteditAmount,
    editDate,
    seteditDate,
    editId,
    seteditId,
    write,
    writeAsync,
  } = useEditLockToken();
  const location = useLocation();
  useEffect(() => {
    seteditId(location.state.lockId);
    console.log(editId, "useEffect");
  }, []);
  return (
    <div>
      <form>
        <Container maxWidth="md">
          <Typography variant="h5" my={1}>Edit Lock</Typography>
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
              value={debouncedEditAmount}
              onChange={(e) => {
                seteditAmount(e.target.value);
                console.log(debouncedEditAmount, "its debponce Amount");
              }}
            />
          </Box>
          <Box my={2}>
            <input
              type={"datetime-local"}
              style={{
                // background: "transparent",
                // border: "none",
                // outline: "none",
                color: "#000",
                height: "25px",
                width: "96%",
                // paddingLeft: "7px",
              }}
              value={editDate}
              onChange={(e) => {
                seteditDate(e.target.value);
                // setTimedate(new Date(e.target.value).getTime() / 1000);
                console.log(editDate, "its time date");
              }}
            />
          </Box>

          <Button
            variant="contained"
            sx={{ border: "1px solid rgb(243, 71, 128)" }}
            // disabled={!approveConfirmation}
            onClick={() => {
              writeAsync?.();
            }}
          >
            Update
            {/* {storeLockData ? "Locking..." : checkData ? "locked" : "Lock"} */}
          </Button>
        </Container>
      </form>
    </div>
  );
}

export default EditForm;
