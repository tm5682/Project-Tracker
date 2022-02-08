import { Box, palette } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";

import { Avatar, Button, Grid, Typography } from "@mui/material";

import ProjectPageWorkOrderTable from "./ProjectPageWorkOrderTable";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import { useNavigate } from "react-router-dom";
import TotalWorkOrders from "./projectStats/TotalWorkOrders";
import CompletedWorkOrders from "./projectStats/CompletedWorkOrders";
import ExpiredWorkOrders from "./projectStats/ExpiredWorkOrders";
import ProjectProgress from "./projectStats/ProjectProgress";
import UserStatsChart from "./projectStats/UserStatsChart";
import WorkOrdersPie from "./projectStats/WorkOrdersPie";

function ProjectPage() {
  const navigate = useNavigate();

  //to grab route parameters
  const { projectId } = useParams();
  return (
    <Box>
      {/* user management top right */}
      <Box
        //display="flex"
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          ml: 2,
          mt: 5,
          mb: 2,
        }}
      >
        <ManageAccountsIcon
          onClick={() => navigate(`/userManagement/${projectId}`)}
          color="primary"
          sx={{
            "&:hover": {
              color: "white",
              bgcolor: "primary.light",
            },
          }}
        />
        <Typography color="textSecondary" sx={{ ml: 2 }} variant="h6">
          Project User Management
        </Typography>
      </Box>

      {/* Project Stats */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          mb: 5,
          justifyContent: "space-between",
        }}
      >
        <TotalWorkOrders />
        <CompletedWorkOrders />
        <ExpiredWorkOrders />
        <ProjectProgress />
      </Box>

      <ProjectPageWorkOrderTable />

      <UserStatsChart />
      <WorkOrdersPie />

      {/* end of main object box */}
    </Box>
  );
}

export default ProjectPage;
