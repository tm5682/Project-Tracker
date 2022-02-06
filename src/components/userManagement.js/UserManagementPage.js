import { Box, palette } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";

import UserManagementTable from "./UserManagementTable";

function UserManagementPage() {
  return (
    <Box>
      <UserManagementTable />
      {/* End of main parent object */}
    </Box>
  );
}

export default UserManagementPage;
