import * as React from "react";

import { TextField, Typography } from "@mui/material";

import { Box } from "@mui/system";

import { styled } from "@mui/material/styles";

import MainNavBar from "./MainNavBar";
import SideDrawer from "./SideDrawer";

function Layout({ children }) {
  /* MUI styled method is used to create custom component which will be used to justify contents after appbar so contents dont get hien or overwritten by appbar */
  const AppBarHeightAdjust = styled("div")(({ theme }) => ({
    ...theme.mixins.toolbar,
  }));

  return (
    <div style={{ display: "flex" }}>
      <SideDrawer />
      <MainNavBar />
      <Box
        sx={{
          padding: (theme) => theme.spacing(3),
          backgroundColor: "f9f9f9",
          width: "100%",
        }}
      >
        {/* This is used to justify space after appBar so contents dont get hidden or overwritten on */}
        <AppBarHeightAdjust />

        {/* children from app.js */}
        {children}
      </Box>
    </div>
  );
}

export default Layout;
