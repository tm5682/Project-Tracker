import { Box, palette } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import faker from "@faker-js/faker";
import { Avatar, Button, Grid, Typography } from "@mui/material";

//this is to generate and hold fake workder data for now
let workOrderForms = [],
  workorderTypes = ["Checklist", "Pass/Fail", "Inspection", "DowntimeMain"],
  workOrderStatuses = [
    "Started",
    "Completed",
    "Expired",
    "DueThisWeek",
    "DueLater",
  ];

//this is to generate and hold fake issue data for now
for (let i = 0; i < 20; i++) {
  workOrderForms[i] = {
    workOrderId: faker.datatype.uuid(),
    // projectName:
    //   faker.lorem.word().charAt(0).toUpperCase() + faker.lorem.word().slice(1),
    workOrderName:
      faker.lorem.sentence().charAt(0).toUpperCase() +
      faker.lorem.sentence().slice(1),
    workOrderType:
      workorderTypes[Math.floor(Math.random() * workorderTypes.length)],
    workOrderCreationDate: faker.date.past().toLocaleDateString("en-US"),
    workOrderDueDate: faker.date.past().toLocaleDateString("en-US"),
    workOrderAssignedUser:
      faker.lorem.word().charAt(0).toUpperCase() + faker.lorem.word().slice(1),
    workOrderStatus:
      workOrderStatuses[Math.floor(Math.random() * workOrderStatuses.length)],
  };
}

//css for table
const tableContainer = {
  borderRadius: 1,
  margin: "10 px 10 px",
  maxWidth: 1400,
};

const tableHeader = {
  fontWeight: "bold",
  //backgroundColor: (theme) => theme.palette.primary.light,
  color: (theme) => theme.palette.primary.dark,
  borderBottom: (theme) => `1px dotted ${theme.palette.primary.light}`,
};

const avatar = {
  backgroundColor: (theme) => theme.palette.primary.light,
  color: (theme) => theme.palette.getContrastText(theme.palette.primary.dark),
};

const names = {
  //fontWeight: "bold",
  //color: "textSecondary",
};

const workOrderTypeCss = {
  fontWeight: "bold",
  fontSize: "0.8rem",
  color: (theme) => theme.palette.primary.main,
};

const workOrderStatusCss = {
  //fontWeight: "bold",
  fontSize: "0.8rem",
  color: "white",
  backgroundColor: "Blue",
  borderRadius: 8,
  padding: "4px 10px",
  display: "inline-block",
};

function ProjectPage() {
  //to grab route parameters
  const { projectId } = useParams();
  return (
    <Box>
      {/* Will show things for project id: {projectId} */}
      {/* Cretea work order, issue form, see all users in the project, delete button */}
      {/* Work Order Table */}
      <TableContainer component={Paper} sx={{ ...tableContainer }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow align="center">
              {/* <TableCell sx={{ ...tableHeader }}>Project Name</TableCell> */}
              <TableCell sx={{ ...tableHeader }}>
                <Typography variant="h6">WorkOrder Name</Typography>
              </TableCell>
              <TableCell sx={{ ...tableHeader }}>
                <Typography variant="h6">Type</Typography>
              </TableCell>
              <TableCell sx={{ ...tableHeader }}>
                <Typography variant="h6" noWrap>
                  Creation Date
                </Typography>
              </TableCell>
              <TableCell sx={{ ...tableHeader }}>
                <Typography variant="h6" noWrap>
                  Due Date
                </Typography>
              </TableCell>
              <TableCell sx={{ ...tableHeader }}>
                <Typography variant="h6">Assigned User</Typography>
              </TableCell>
              <TableCell sx={{ ...tableHeader }}>
                <Typography variant="h6">Status</Typography>
              </TableCell>
              <TableCell sx={{ ...tableHeader }} align="center">
                <Typography variant="h6">Send Reminder</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workOrderForms.map((workOrderForm) => (
              <TableRow
                key={workOrderForm.workOrderId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                align="center"
              >
                {/* <TableCell
                 
                  color="textSecondary"
                  variant="body2"
                  sx={{ fontWeight: 400 }}
                >
                  {workOrderForm.projectName}
                </TableCell> */}
                <TableCell component="th" scope="row" sx={{ ...names }}>
                  <Typography variant="body1" color="textSecondary">
                    {workOrderForm.workOrderName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ ...workOrderTypeCss }}>
                    {workOrderForm.workOrderType}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="body2">
                    {workOrderForm.workOrderCreationDate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="body2">
                    {workOrderForm.workOrderDueDate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Grid container>
                    <Grid item sm={2}>
                      <Avatar
                        alt={workOrderForm.workOrderAssignedUser}
                        src="."
                        sx={{ ...avatar }}
                      />
                    </Grid>

                    <Grid item sm={10} sx={{ ml: 6, p: 0.5, mt: -4.5 }}>
                      <Typography variant="body2" color="textSecondary">
                        {" "}
                        {workOrderForm.workOrderAssignedUser}
                      </Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      ...workOrderStatusCss,

                      backgroundColor: (theme) =>
                        (workOrderForm.workOrderStatus === "Completed" &&
                          theme.palette.success.dark) ||
                        (workOrderForm.workOrderStatus === "Started" &&
                          theme.palette.success.light) ||
                        (workOrderForm.workOrderStatus === "Expired" &&
                          theme.palette.error.dark) ||
                        (workOrderForm.workOrderStatus === "DueThisWeek" &&
                          theme.palette.warning.dark) ||
                        (workOrderForm.workOrderStatus === "DueLater" &&
                          theme.palette.warning.light),
                    }}
                  >
                    {workOrderForm.workOrderStatus}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button>
                    <Typography variant="button" color="textSecondary">
                      Send Reminder
                    </Typography>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Issues Table */}
      {/* end of main object box */}
    </Box>
  );
}

export default ProjectPage;
