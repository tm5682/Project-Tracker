import React from "react";
import { TextField, Typography } from "@mui/material";

import { Box } from "@mui/system";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import SearchIcon from "@mui/icons-material/Search";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";

const drawerWidth = 240;

function MainNavBar() {
  return (
    <Box>
      <AppBar
        elevation={0}
        sx={{
          width: `calc(100% - ${drawerWidth}px )`,
          color: "white",
          backgroundColor: "primary.main",
        }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", flex: 1, alignItems: "center" }}>
            <SearchIcon sx={{ mr: 1 }} />
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              size="small"
              InputLabelProps={{ style: { color: "white" } }}
            />
            <ExpandMoreIcon sx={{ ml: 1 }} />
          </Box>

          {/* right hand side settings icon on appBar */}
          <Box
            sx={{ display: "flex", alignItems: "center", mr: -2, padding: 1 }}
          >
            <HelpOutlineIcon sx={{ p: 1 }} />
            <SettingsIcon sx={{ p: 1 }} />
            <AppsRoundedIcon sx={{ p: 1 }} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainNavBar;
