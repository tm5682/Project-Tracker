import React from "react";
import { useState } from "react";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
/* import { ButtonGroup } from "@mui/material"; */

import { Container } from "@mui/material";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { TextField } from "@mui/material";

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
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && details) {
      console.log(title, details);
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
        />

        <Button
          sx={{ ...buttonStyle }}
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
