import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Box sx={{ flexGrow: "1px", mb: "2rem" }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Link to={"/"} className="link">
            <Typography variant="h6" component="div" >
              Create Your Lock
            </Typography>
          </Link>
          <Link to={"details"} className="link">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Lock details
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
