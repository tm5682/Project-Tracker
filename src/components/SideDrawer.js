import React from "react";

import {
  autocompleteClasses,
  Collapse,
  TextField,
  Typography,
} from "@mui/material";
import { Drawer } from "@mui/material";
import { Box } from "@mui/system";

import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";

import { useLocation, useNavigate } from "react-router-dom";

import { Avatar } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ArticleIcon from "@mui/icons-material/Article";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { useState } from "react";

import AddToDriveIcon from "@mui/icons-material/AddToDrive";

import FolderSharedIcon from "@mui/icons-material/FolderShared";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ChatIcon from "@mui/icons-material/Chat";

const drawerWidth = 240;

const activeMenuColor = {
  background: "#f4f4f4",
};

function SideDrawer() {
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
      icon: <HomeIcon color="primary" />,
      path: "/",
      items: [],
    },

    {
      text: "Projects",
      icon: <ArticleIcon color="primary" />,
      path: `/selectProject`,
    },
    {
      text: "User Profile",
      icon: <PersonAddAltIcon color="primary" />,
      path: "/profile",
      items: [],
    },
    {
      text: "File Management",
      icon: <ChatIcon color="primary" />,
      path: "/document",
      items: [],
    },
  ];

  //Main return of the function starts here

  return (
    <Box>
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
            CORSphere
          </Typography>
        </Box>

        {/* list/links */}
        {menuList.map((item, key) => (
          <MenuItem key={key} item={item} />
        ))}
      </Drawer>
    </Box>
  );
}

export default SideDrawer;
