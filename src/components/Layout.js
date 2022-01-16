import * as React from "react";

import { autocompleteClasses, Typography, useTheme } from "@mui/material";
import { Drawer } from "@mui/material";
import { Box, typography } from "@mui/system";

import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { useLocation, useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = 240;

const activeMenuColor = {
  background: "#f4f4f4",
};

/* using styled method from mui we create a custom component which inherits toolbar's height and other attriutes so content goes below appbar */
//const appBarHeightAdjuster = styled("box")(({ theme }) => theme.mixins.toolbar);

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: "Home",
      icon: <HomeIcon color="secondary" />,
      path: "/",
    },
    {
      text: "Issues",
      icon: <AddTaskIcon color="secondary" />,
      path: "/issues",
    },
  ];

  /* MUI styled method is used to create custom component which will be used to justify contents after appbar so contents dont get hien or overwritten by appbar */
  const AppBarHeightAdjust = styled("div")(({ theme }) => ({
    ...theme.mixins.toolbar,
  }));

  return (
    <div style={{ display: "flex" }}>
      {/*app bar */}
      <AppBar
        sx={{
          width: `calc(100% - ${drawerWidth}px )`,
        }}
      >
        <Toolbar>
          <Typography>dsdsds</Typography>
        </Toolbar>
      </AppBar>
      {/*side drawer*/}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <div>
          <Typography
            variant="h5"
            sx={{ padding: (theme) => theme.spacing(3) }}
          >
            Project Tracker
          </Typography>
        </div>

        {/* list/links */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              button
              onClick={() => navigate(item.path)}
              /* using useLocation hook we compare to see in which path we are in, if it matches use activeMenuColor class css */
              sx={{
                ...(location.pathname == item.path ? activeMenuColor : null),
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        /* sx and styled properties can access theme, here we are multiplying 3 with default 8px spacing by mui */
        sx={{
          padding: (theme) => theme.spacing(3),
          backgroundColor: "f9f9f9",
          width: "100%",
        }}
      >
        {/* This is used to justify space after appBar so contents dont get hidden or overwritten on */}
        <AppBarHeightAdjust />
        {children}
      </Box>
      ;
    </div>
  );
}

export default Layout;
