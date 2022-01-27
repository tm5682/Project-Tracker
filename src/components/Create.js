import React from "react";
import { useState } from "react";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
/* import { ButtonGroup } from "@mui/material"; */

import { Container, Divider, FormControlLabel } from "@mui/material";

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

// date-fns
//import DateAdapter from "@mui/lab/AdapterDateFns";

//luxon
import DateAdapter from "@mui/lab/AdapterLuxon";

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";

import { db } from "../firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

import cuid from "cuid";

const buttonStyle = {};
const title = {
  textDecoration: "underline",
};

const field = {
  marginTop: 3,
  marginBottom: 3,
  display: "block",
};

function Create() {
  const navigate = useNavigate();

  //issue name
  //Issue severity (high medium low)
  //Issue Tags
  //Issue Description
  //

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  const [severity, setSeverity] = useState("Low");

  //to hold the issue tags
  const [issueTags, setIssueTags] = useState([]);

  //today's date - we use it as default for project due date if no date is passed
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  //to hold due date
  const [dueDate, setDueDate] = useState(today.toLocaleDateString());
  //to handle submission of the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    //unique id for the issue
    const newIssueId = cuid();

    //data to upload as new issue
    const newIssue = {
      id: newIssueId,
      name: title,
      details: details,
      severity: severity,
      tags: issueTags || null,
      dueDate: dueDate.ts || null,
    };

    setTitleError(false);
    setDetailsError(false);

    if (title === "") {
      setTitleError(true);
    }

    if (details === "") {
      setDetailsError(true);
    }

    if (title && details) {
      await setDoc(doc(db, "issues", newIssueId), newIssue);
      console.log("Data passed", newIssue);
    }

    //old json-server post code
    // {
    //   fetch("http://localhost:8000/issues", {
    //     method: "POST",
    //     headers: { "Content-type": "application/json" },
    //     body: JSON.stringify({ title, details, severity, issueTags }),
    //   }).then(() => navigate("/issues"));
    // }
  };

  //adds to issue tag state
  const onIssueTagChange = (event, newTags) => {
    //let newIssueTag = event.target.value;

    // console.log(newTags);

    setIssueTags(newTags);
  };

  //to handle due date change
  const dueDateChange = (dueDate) => {
    console.log(dueDate);
    setDueDate(dueDate);
  };

  return (
    <Container>
      <Typography
        sx={{ ...title }}
        variant="h6"
        color={"textSecondary"}
        gutterBottom
      >
        Create a Work Order
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          sx={{ ...field }}
          label="Work Order Name"
          variant="outlined"
          color="secondary"
          required
          error={titleError}
        />

        <TextField
          onChange={(e) => setDetails(e.target.value)}
          sx={{ ...field }}
          label="Asset"
          variant="outlined"
          color="secondary"
          multiline
          fullWidth
          required
          error={detailsError}
        />

        {/* Grid container to split horizontal space;;first one for severity radio buttons */}

        <Grid container spacing={3}>
          <Grid item sm={6}>
            <FormControl sx={{ ...field }}>
              <FormLabel>Issue Severity</FormLabel>
              <RadioGroup
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
              >
                <FormControlLabel
                  control={<Radio color="secondary" />}
                  value="High"
                  label="High"
                />
                <FormControlLabel
                  control={<Radio color="secondary" />}
                  value="Medium"
                  label="Medium"
                />

                <FormControlLabel
                  control={<Radio color="secondary" />}
                  value="Low"
                  label="Low"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* tags */}
          <Grid item sm={6}>
            <FormControl sx={{ ...field }}>
              {/* MUI Tags */}

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
                    label="Issue Tags"
                    placeholder="Issue Tags"
                  />
                )}
              />
            </FormControl>

            {/* date picker */}
            <FormControl sx={{ mt: 2.5 }}>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <MobileDatePicker
                  label="Issue Due Date"
                  inputFormat="MM/dd/yyyy"
                  value={dueDate}
                  onChange={dueDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
        </Grid>

        <Button
          sx={{ ...buttonStyle, mt: 3 }}
          type="submit"
          color="primary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>

      {/*    
      <br />
      <AcUnitOutlinedIcon /> */}
    </Container>
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

export default Create;

/*       <Button type="submit" color="secondary" variant="outlined">
        Submit
      </Button>

      <ButtonGroup color="secondary" variant="contained">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
  </ButtonGroup> */
