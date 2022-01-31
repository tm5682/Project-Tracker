//Header component
//Button component imported

import PropTypes from "prop-types";
import AddButton from "./Button";

import Typography from "@mui/material/Typography";

import { Container } from "@mui/material";

const Header = ({ title = "Add New Project", onAdd, showAdd }) => {
  return (
    <Container sx={{ padding: 3, display: "flex", boxShadow: 0 }}>
      <Typography variant="h6" color={"Primary"} gutterBottom>
        {title}
      </Typography>

      <AddButton
        color={showAdd ? "secondary" : "primary"}
        text={showAdd ? "Close" : "Add"}
        onClick={onAdd}
      />
    </Container>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
