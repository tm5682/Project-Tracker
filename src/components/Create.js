import React from "react";
import { useState } from "react";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
/* import { ButtonGroup } from "@mui/material"; */

import { Container, FormControlLabel } from "@mui/material";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { TextField } from "@mui/material";

import { Radio } from "@mui/material";

import { RadioGroup } from "@mui/material";

import { FormControl } from "@mui/material";

import { FormLabel } from "@mui/material";

import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";

import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    setTitleError(false);
    setDetailsError(false);

    if (title == "") {
      setTitleError(true);
    }

    if (details == "") {
      setDetailsError(true);
    }

    if (title && details) {
      fetch("http://localhost:8000/issues", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, details, severity, issueTags }),
      }).then(() => navigate("/issues"));
    }
  };

  //adds to issue tag state
  const onIssueTagChange = (event) => {
    let newIssueTag = event.target.value;

    console.log("NEW ISSUE TAG", newIssueTag);

    setIssueTags((params) => [...params, newIssueTag]);
  };

  const foo = (option) => {
    console.log(option);
    setIssueTags((params) => [...params, option]);
  };

  return (
    <Container>
      <Typography
        sx={{ ...title }}
        variant="h6"
        color={"textSecondary"}
        gutterBottom
      >
        Create a New Issue
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          sx={{ ...field }}
          label="Issue Name"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />

        <TextField
          onChange={(e) => setDetails(e.target.value)}
          sx={{ ...field }}
          label="Briefly describe the issue"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
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
                        onChange={onIssueTagChange}
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
                onChange={onIssueTagChange}
              />
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

const tagOptions = ["galley", "abc"];

export default Create;

/*       <Button type="submit" color="secondary" variant="outlined">
        Submit
      </Button>

      <ButtonGroup color="secondary" variant="contained">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
  </ButtonGroup> */
