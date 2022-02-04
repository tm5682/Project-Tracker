import { Box, palette } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";

import { Avatar, Button, Grid, Typography } from "@mui/material";

import ProjectPageWorkOrderTable from "./ProjectPageWorkOrderTable";

function ProjectPage() {
  //to grab route parameters
  const { projectId } = useParams();
  return (
    <Box>
      <ProjectPageWorkOrderTable />
      {/* end of main object box */}
    </Box>
  );
}

export default ProjectPage;
