import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";

//for material ui table
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

//if severity is high
const issueHighSeverity = {
  border: "3px solid red",
};

//if severity is medium
const issueMediumSeverity = {
  border: "3px solid orange",
};

////if severity is low
const issueLowSeverity = {
  border: "3px solid yellow",
  bgColor: "yellow",
};

function CardNote({
  issue: { id, name, details, severity, tags },
  handleDelete,
}) {
  return (
    <div>
      <Card
        elevation={3}
        //conditional border coloring depending on the severity of the issue
        sx={{
          ...(severity === "High" ? issueHighSeverity : null),
          ...(severity === "Medium" ? issueMediumSeverity : null),
          ...(severity === "Low" ? issueLowSeverity : null),
        }}
      >
        <CardHeader
          action={
            <IconButton onClick={() => handleDelete(id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={
            <Box sx={{ display: "flex" }}>
              <Typography variant="h5" color={"secondary"}>
                {name}
              </Typography>
            </Box>
          }
          subheader={
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Typography
                variant="h8"
                sx={{ fontWeight: 600, mt: 1.25, mr: 0.5 }}
                noWrap
              >
                Issue Tags:
              </Typography>

              {tags.map((tag) => (
                <Typography key={tag} sx={{ mt: 1.2 }} noWrap>
                  {" "}
                  {tag},
                </Typography>
              ))}
            </Box>
          }
        />

        <CardContent></CardContent>
      </Card>
    </div>
  );
}

export default CardNote;
