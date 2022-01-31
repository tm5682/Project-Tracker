import { Box } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";

function ProjectPage() {
  //to grab route parameters
  const { projectId } = useParams();
  return (
    <Box>
      Will show things later for project id: {projectId}
      <Box></Box>
      {/* end of main object box */}
    </Box>
  );
}

export default ProjectPage;
