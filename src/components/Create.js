import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
/* import { ButtonGroup } from "@mui/material"; */

import { Container } from "@mui/material";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function Create() {
  const buttonStyle = {
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: "blue",
    },
  };
  const title = {
    textDecoration: "underline",
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

      <Button
        sx={{ ...buttonStyle }}
        onClick={() => console.log("Clicked me")}
        type="submit"
        color="secondary"
        variant="contained"
        endIcon={<KeyboardArrowRightIcon />}
      >
        Submit
      </Button>

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
