import * as React from "react";

import {
  autocompleteClasses,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Drawer } from "@mui/material";
import { Box, typography } from "@mui/system";

import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { useLocation, useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import { format } from "date-fns";

import { Avatar } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import SearchIcon from "@mui/icons-material/Search";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";

import ArticleIcon from "@mui/icons-material/Article";

//Add Project
//const addProject = (name, clientName, actionList) => {
// const id = Math.floor(Math.random() * 1000) + 1;

// const newProject = { id, ...project };

// setProjects([...projectList, newProject]);

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
    {
      text: "Documents",
      icon: <ArticleIcon color="secondary" />,
      path: "/document",
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
        color="secondary"
        elevation={0}
        sx={{
          width: `calc(100% - ${drawerWidth}px )`,
        }}
      >
        <Toolbar>
          {/* <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>
            {" "}
            Today is the {format(new Date(), "do MMMM Y")}{" "}
          </Typography> */}

          {/* search bar  */}

          <Box sx={{ display: "flex", flex: 1, alignItems: "center" }}>
            <SearchIcon sx={{ mr: 1 }} />
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              size="small"
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
            <Avatar
              sx={{ p: 1, width: 35, height: 30 }}
              src={process.env.PUBLIC_URL + "/userpic2.jpg"}
            />
          </Box>
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
        <Box sx={{ display: "flex" }}>
          <Avatar
            sx={{ mt: 2.5, ml: 2 }}
            src={process.env.PUBLIC_URL + "/brandLogo.png"}
          />
          <Typography
            variant="h5"
            sx={{ padding: (theme) => theme.spacing(3) }}
          >
            Pennecon
          </Typography>
        </Box>

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
              {/* if location is document page then we show document sub menus */}
              {location.pathname == "/document" ? (
                <Box sx={{ display: "block" }}>
                  <AddTaskIcon color="secondary" />
                  <AddTaskIcon color="secondary" />
                </Box>
              ) : null}
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
