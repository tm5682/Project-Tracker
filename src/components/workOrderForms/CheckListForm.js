import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import cuid from "cuid";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { FaTimes } from "react-icons/fa";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function CheckListForm() {
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
  const [checkListObjects, setCheckListObjects] = useState([
    {
      checkListTask:
        "Check the gearbox, change the exhaust, and examine brake pads",
      newId: "dsjkdjkfdjkfjdsjds9",
      selectedAssets: ["Gearbox, ", "Brakes"],
    },
  ]);

  //function to handle adding new checklist to state
  const onCheckListAdd = () => {
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
              Checklist Form
            </Typography>
          }
        />
      </Divider>

      {/* In this grid select an aset, input text for the task, button to add to checklist */}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {/* Select Asset */}
        <Grid item sm={2} sx={{ mt: 2 }}>
          <Autocomplete
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
        </Grid>

        {/* checklist task text */}
        <Grid item sm={9} sx={{ mt: 2 }} justifyContent="center">
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={checkListTask}
            onChange={(e) => setCheckListTask(e.target.value)}
            id="outlined-multiline-flexible"
            label="CheckList Task"
            variant="outlined"
          />
        </Grid>

        {/* button to submit each checklist */}
        <Grid item sm={1}>
          <Button variant="text" sx={{ ml: 3, mt: 2 }} onClick={onCheckListAdd}>
            ADD
          </Button>
        </Grid>

        {/* end of main grid */}
      </Grid>

      {/* This is to show the checklist objects that are being added */}
      <Box sx={{ mt: 3 }}>
        {/* Table to show results */}
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 1200, alignItems: "left" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">CheckList Task</TableCell>
                <TableCell align="left">CheckList Asset</TableCell>
                <TableCell align="left">Assigned Users</TableCell>
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
                  <TableCell align="left">Tahrin, Brandon</TableCell>
                  <TableCell align="center">
                    <FaTimes style={{ color: "red", cursor: "pointer" }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* main box object ends */}
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

export default CheckListForm;
