import { Box, palette } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";

function WorkOrderPage() {
  //to grab route parameters
  const { projectId, workOrderId } = useParams();
  return (
    <Box>
      Will show things for project id: {projectId}
      WorkOrderId: {workOrderId}
      {/* end of main object box */}
    </Box>
  );
}
export default WorkOrderPage;
