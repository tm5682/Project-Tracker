//Header component
//Button component imported

import PropTypes from "prop-types";
import AddButton from "./Button";

import Typography from "@mui/material/Typography";

import { Container } from "@mui/material";

const Header = ({ title = "Project Tracker", onAdd, showAdd }) => {
  return (
    <Container sx={{ mt: 5 }}>
      <header className="header">
        <Typography variant="h4" color={"Secondary"} gutterBottom>
          {title}
        </Typography>

        <AddButton
          color={showAdd ? "red" : "green"}
          text={showAdd ? "Close" : "Add"}
          onClick={onAdd}
        />
      </header>
    </Container>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
