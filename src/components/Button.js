//creates button with props passed

import PropTypes from "prop-types";

import Button from "@mui/material/Button";

const AddButton = ({ color = "steelblue", text, onClick }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        "&:hover": {
          color: "purple",
          backgroundColor: "grey",
        },

        backgroundColor: color,
      }}
    >
      {text}
    </Button>
  );
};

AddButton.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default AddButton;
