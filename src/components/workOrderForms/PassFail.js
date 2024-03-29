import {
  Autocomplete,
  Button,
  Chip,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import cuid from "cuid";

import { FaTimes } from "react-icons/fa";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

function PassFail() {
  //state

  //this is to hold selected assets
  const [selectedAssets, setSelectedAssets] = useState([]);

  //this is to deal with selected assets for the checklist
  const onSelectedAssets = (event, selectedAssets) => {
    setSelectedAssets(selectedAssets);
  };

  //this is to hold checkListTask value
  const [checkListTask, setCheckListTask] = useState();

  //this is to hold all the checklists objects
  const [checkListObjects, setCheckListObjects] = useState([]);

  //function to handle adding new passfail to state
  const onPassFailAdd = () => {
    const newId = cuid();
    const newCheckListItem = { newId, selectedAssets, checkListTask };
    setCheckListObjects([...checkListObjects, newCheckListItem]);

    setTimeout(console.log(checkListObjects), 10000);

    //to reset the values
    setSelectedAssets([""]);
    setCheckListTask("");
  };

  return (
    <Box>
      {/* Form Header Label */}
      {/* We use a divider with chip and inside chip use the form header */}
      <Divider sx={{ mb: 3 }}>
        <Chip
          label={
            <Typography
              variant="h6"
              color={"textSecondary"}
              sx={{ fontWeight: 400, mt: -0.5 }}
              gutterBottom
              align="center"
            >
              Pass Fail Form
            </Typography>
          }
        />
      </Divider>

      {/* This will have the select asset and text on left and an add button to its right */}
      <Box sx={{ display: "flex" }}>
        {/* asset select */}
        <Autocomplete
          sx={{ minWidth: 200 }}
          size="medium"
          onChange={onSelectedAssets}
          multiple
          id="tags-filled"
          options={assetOptions}
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              // foo(option);

              return (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              );
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Select Asset"
              placeholder="Select Asset"
            />
          )}
        />

        {/* TextBox */}
        <TextField
          multiline
          maxRows={4}
          value={checkListTask}
          onChange={(e) => setCheckListTask(e.target.value)}
          id="outlined-multiline-flexible"
          label="Check Details"
          variant="outlined"
          sx={{ ml: 4, minWidth: 400 }}
        />

        {/* Button */}
        <Button variant="text" sx={{ ml: 3, mt: 2 }} onClick={onPassFailAdd}>
          ADD
        </Button>
      </Box>

      {/* TO show the pass fail objects with pass fail boolean */}
      <Box sx={{ mt: 3 }}>
        {/* Table to show results */}
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 1200, alignItems: "left" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Pass Fail Details</TableCell>
                <TableCell align="left">Asset Name</TableCell>
                <TableCell align="left">Pass</TableCell>
                <TableCell align="left">Fail</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {checkListObjects.map((checklist) => (
                <TableRow
                  key={checklist.newId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {checklist.checkListTask}
                  </TableCell>
                  <TableCell align="left">{checklist.selectedAssets}</TableCell>
                  <TableCell align="left">
                    {" "}
                    <CheckCircleIcon />{" "}
                  </TableCell>
                  <TableCell align="left">
                    {" "}
                    <CancelIcon />
                  </TableCell>
                  <TableCell align="center">
                    <FaTimes style={{ color: "red", cursor: "pointer" }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* end of main object Box */}
    </Box>
  );
}

//for now keeping the assset options to select for labels
const assetOptions = [
  "galley",
  "cleaning",
  "sea water cooling pipework",
  "starboard generator",
  "Micro-commander",
  "UPS",
  "Generator",
  "Main Engine",
  "Propulsion",
  "steering",
  "crane",
  "bow thruster",
  "haul",
  "rudder",
  "stern frame",
  "Tank soundings",
  "Fuel tank #3 PORT",
  "Engine Room",
  "Dishwasher",
  "Public Address System",
  "windlass",
  "Navigation Lights",
  "Fuses",
  "A-Frame",
  "hydraulic",
  "Radar",
  "Magnetron",
  "Wiper Seal",
  "hydraulic cylinder",
  "telephone",
  "convection oven",
  "dry store",
  "SKF Coupling",
  "Intermediate shaft",
  "docking",
  "Assessment",
  "Repair",
  "HQ",
  "Hull",
  "Silva",
  "Labour",
  "Parts",
  "Piping",
  "electronic",
  "Electrical",
  "KS",
  "Mechanical",
  "operations",
  "Trim Tabs",
  "Certificate",
  "Inspection",
  "harness",
  "lanyard",
  "Striker",
  "Survey",
  "Fire Detection",
  "Fire safety",
  "Life Saving",
  "Safety",
  "Lift",
  "LIfting Gear",
  "Davits",
  "hauler",
  "davit",
  "Rigging",
  "Report",
];

export default PassFail;
