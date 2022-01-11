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
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  const [category, setCategory] = useState("issues");

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
      fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, details, category }),
      }).then(() => navigate("/notes"));
    }
  };

  return (
    <Container>
      <Typography
        sx={{ ...title }}
        variant="h6"
        color={"textSecondary"}
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          sx={{ ...field }}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />

        <TextField
          onChange={(e) => setDetails(e.target.value)}
          sx={{ ...field }}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
        />

        <FormControl sx={{ ...field }}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel
              control={<Radio color="secondary" />}
              value="issues"
              label="Issues"
            />
            <FormControlLabel
              control={<Radio color="secondary" />}
              value="financial notes"
              label="Financial Notes"
            />

            <FormControlLabel
              control={<Radio color="secondary" />}
              value="contract notes"
              label="Contract Notes"
            />
          </RadioGroup>
        </FormControl>

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

export default Create;

/*       <Button type="submit" color="secondary" variant="outlined">
        Submit
      </Button>

      <ButtonGroup color="secondary" variant="contained">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
  </ButtonGroup> */
