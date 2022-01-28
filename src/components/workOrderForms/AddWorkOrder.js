import React from "react";
import { useState } from "react";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
/* import { ButtonGroup } from "@mui/material"; */

import { Checkbox, Container, Divider, FormControlLabel } from "@mui/material";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { TextField } from "@mui/material";

import { Radio } from "@mui/material";

import { RadioGroup } from "@mui/material";

import FormControl from "@mui/material/FormControl";

import { FormLabel } from "@mui/material";

import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";

import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";

//luxon
import DateAdapter from "@mui/lab/AdapterLuxon";

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";

import { db } from "../../firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

import cuid from "cuid";
import { Box } from "@mui/system";

import CheckListForm from "./CheckListForm";

import PassFail from "./PassFail";

import DetailedInspection from "./DetailedInspection";

import DowntimeMaintenance from "./DowntimeMaintenance";

//some css
const radioCss = {
  marginRight: 5,
};

function AddWorkOrder() {
  //states
  const [workOrderType, setworkOrderType] = useState("");

  //to hold the issue tags
  const [issueTags, setIssueTags] = useState([]);

  //today's date - we use it as default for project due date and start date if no date is passed
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  //to hold due date
  const [dueDate, setDueDate] = useState(today.toLocaleDateString());

  //to hold start date
  const [startDate, setStartDate] = useState(today.toLocaleDateString());

  //to hold machine offline value
  const [machineOffline, setMachineOffline] = useState(false);

  //to hold preventative maintenance value
  const [preventativeMaintenance, setPreventativeMaintenance] = useState(false);

  //to hold assigned users
  const [assignedUsers, setAssignedUsers] = useState([]);

  //to deal with users assigned to this work order - can be multiple
  const onUsersAssigned = (event, assignedUsers) => {
    setAssignedUsers(assignedUsers);
  };

  //adds to issue tag state
  const onIssueTagChange = (event, newTags) => {
    //let newIssueTag = event.target.value;
    // console.log(newTags);
    setIssueTags(newTags);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {/* heading */}
        <Grid item>
          <Typography
            variant="h6"
            color={"textSecondary"}
            sx={{ fontWeight: 700 }}
            gutterBottom
          >
            Create a Work Order
          </Typography>
        </Grid>

        {/* WorkOrder Type Selection - depending on the radio button selection we show different forms */}

        <Grid item sm={12} sx={{ display: "flex" }}>
          {/* subheader label */}
          <Typography
            variant="h6"
            color={"textSecondary"}
            sx={{ fontWeight: 300, mt: -0.5 }}
            gutterBottom
          >
            Work Order Type :
          </Typography>
          {/* radio selection */}
          <RadioGroup
            sx={{ mt: -1, ml: 5 }}
            row
            value={workOrderType}
            onChange={(e) => setworkOrderType(e.target.value)}
          >
            <FormControlLabel
              control={<Radio color="secondary" />}
              value="checkList"
              label="Checklist"
              sx={{ ...radioCss }}
            />
            <FormControlLabel
              control={<Radio color="secondary" />}
              value="passFail"
              label="Pass/Fail"
              sx={{ ...radioCss }}
            />

            <FormControlLabel
              control={<Radio color="secondary" />}
              value="detailedInspection"
              label="Detailed Inspection"
              sx={{ ...radioCss }}
            />

            <FormControlLabel
              control={<Radio color="secondary" />}
              value="downtimeMaintenance"
              label="Downtime Maintenance"
              sx={{ ...radioCss }}
            />
          </RadioGroup>
        </Grid>

        {/* workOrder name, asset input and tags input - asset input later to be changed with selection */}
        <Grid item sm={12} justifyContent="center">
          <Grid item sm={12}>
            <TextField
              //onChange={(e) => setTitle(e.target.value)}
              sx={{}}
              label="Work Order Name"
              variant="outlined"
              color="secondary"
              required
              fullWidth

              //error={titleError}
            />
          </Grid>

          {/* this part is for asset name using a label with selection */}
          <Grid item sm={12} sx={{ mt: 5 }}>
            <Autocomplete
              onChange={onIssueTagChange}
              multiple
              id="tags-filled"
              options={tagOptions}
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
                  label="Tags"
                  placeholder="Assets "
                />
              )}
            />
          </Grid>
          {/* below ends parent grid for work oder name and asset selection */}
        </Grid>

        {/* below one is main container grid */}
      </Grid>

      {/* this section for due dates and start date */}
      <Box sx={{ mt: 6 }}>
        <Box sx={{ mt: 4, display: "flex" }}>
          <Box sx={{ mr: 60 }}>
            {/* this is start date */}
            <LocalizationProvider dateAdapter={DateAdapter}>
              <MobileDatePicker
                label="Start Date"
                inputFormat="MM/dd/yyyy"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>

          <Box>
            {/* this part is for due date */}
            <LocalizationProvider dateAdapter={DateAdapter}>
              <MobileDatePicker
                label="Due Date"
                inputFormat="MM/dd/yyyy"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </Box>
      </Box>

      {/* for two Checkboxes */}
      <Box sx={{ mt: 2, display: "flex" }}>
        {/* This one for machine offline */}
        <Box sx={{ display: "flex", ml: -1, mt: 3 }}>
          <Checkbox
            checked={machineOffline}
            onChange={() => setMachineOffline(!machineOffline)}
            inputProps={{ "aria-label": "controlled" }}
          />
          <Typography
            sx={{ mt: 1, fontWeight: 400 }}
            color="textSecondary"
            variant="body1"
          >
            Does the machine need to be taken offline for this?
          </Typography>
        </Box>

        {/* This one for Preventative Maintenance */}
        <Box sx={{ display: "flex", mt: 3, ml: 34 }}>
          <Checkbox
            checked={preventativeMaintenance}
            onChange={() =>
              setPreventativeMaintenance(!preventativeMaintenance)
            }
            inputProps={{ "aria-label": "controlled" }}
          />
          <Typography
            sx={{ mt: 1, fontWeight: 400 }}
            color="textSecondary"
            variant="body1"
          >
            Is this preventative maintenance?
          </Typography>
        </Box>
      </Box>

      {/* this is for user assign */}
      <Box sx={{ mt: 5, mb: 8 }}>
        <Grid item sm={4} sx={{ mt: 3 }}>
          <Autocomplete
            onChange={onUsersAssigned}
            multiple
            id="tags-filled"
            options={assignUsers}
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
                label="Assign Users"
                placeholder="Assign Users"
              />
            )}
          />
        </Grid>
      </Box>

      {/* Checklist form */}
      {workOrderType === "checkList" && <CheckListForm />}
      {console.log(workOrderType)}

      {/* Pass Fail Form */}
      {workOrderType === "passFail" && <PassFail />}
      {console.log(workOrderType)}

      {/* Detailed Inspection Form */}
      {workOrderType === "detailedInspection" && <DetailedInspection />}

      {/* DowntimeMaintenance Form */}
      {workOrderType === "downtimeMaintenance" && <DowntimeMaintenance />}

      {/* Submit Button */}
      <Box sx={{ mt: 6 }}>
        <Button variant="contained">Submit</Button>
      </Box>

      {/* end of MAIN parent object box */}
    </Box>
  );
}

//for now keeping the tag list here
const tagOptions = [
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

//for now keeping the tag list here
const assignUsers = ["Tahrin", "Brandon", "Add New User"];

export default AddWorkOrder;
