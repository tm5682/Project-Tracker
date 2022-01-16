import { autocompleteClasses, Typography, useTheme } from "@mui/material";
import { Drawer } from "@mui/material";
import { Box, typography } from "@mui/system";

import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const activeMenuColor = {
  background: "#f4f4f4",
};

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

  return (
    <div style={{ display: "flex" }}>
      {/*app bar */}
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
        {children}
      </Box>
      ;
    </div>
  );
}

export default Layout;
