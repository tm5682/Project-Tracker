import * as React from "react";

import {
  autocompleteClasses,
  Collapse,
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
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { useState } from "react";

import AddToDriveIcon from "@mui/icons-material/AddToDrive";

import ShareIcon from "@mui/icons-material/Share";

import FolderSharedIcon from "@mui/icons-material/FolderShared";

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

  //this is used to keep the state of the dynamic multi level collapsible menus and sub-menus
  const [open, setOpen] = useState(false);

  //this function will be used to render menu those have single layer on side drawer
  const SingleLevel = ({ item }) => {
    return (
      <ListItem
        button
        /* using useLocation hook we compare to see in which path we are in, if it matches use activeMenuColor class css */
        sx={{
          ...(location.pathname == item.path ? activeMenuColor : null),
          my: 1,
        }}
        //Here onClick activates new route but also sets open's state to true so that when we refresh collapsible menus dont collapse back
        onClick={(e) => navigate(item.path) && setOpen(true)}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItem>
    );
  };

  //this function will render menus with multiple layer on side drawer for example document page
  const MultiLevel = ({ item }) => {
    const { items: children } = item;

    function handleClick() {
      //changing state of open
      setOpen((prev) => !prev);
    }

    return (
      <React.Fragment>
        <ListItem
          button
          onClick={() => {
            handleClick();
          }}
          /* using useLocation hook we compare to see in which path we are in, if it matches use activeMenuColor class css */
          sx={{
            ...(location.pathname == item.path ? activeMenuColor : null),
            my: 1,
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit={false}>
          <List component="div" disablePadding sx={{ ml: 2, my: 1 }}>
            {children.map((child, key) => (
              <MenuItem key={key} item={child} />
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    );
  };

  //this function determines if menu has children
  function hasChildren(item) {
    const { items: children } = item;

    if (children === undefined) {
      return false;
    }

    if (children.constructor !== Array) {
      return false;
    }

    if (children.length === 0) {
      return false;
    }

    return true;
  }

  //this function abstracts the menu
  const MenuItem = ({ item }) => {
    const Component = hasChildren(item) ? MultiLevel : SingleLevel;
    return <Component item={item} />;
  };

  const menuList = [
    {
      text: "Home",
      icon: <HomeIcon color="secondary" />,
      path: "/",
      items: [],
    },

    {
      text: "Project Page",
      icon: <ArticleIcon color="secondary" />,
      path: "/issues",
      items: [
        {
          text: "View Work Orders",
          icon: <FolderSharedIcon />,
          path: "/issues",
        },
        {
          text: "New Work Order",
          icon: <AddToDriveIcon />,
          path: "/addWorkOrder",
        },

        {
          text: "Project Files & Settings",
          icon: <ShareIcon />,
          path: "/document",
        },
      ],
    },

    {
      text: "Dashboard",
      icon: <AddTaskIcon color="secondary" />,
      path: "/dashboard",
      items: [],
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
        {menuList.map((item, key) => (
          <MenuItem key={key} item={item} />
        ))}
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
