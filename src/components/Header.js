//Header component
//Button component imported

import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title = "Project Tracker", onAdd, showAdd }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        color={showAdd ? "red" : "green"}
        text={showAdd ? "Close" : "Add"}
        onClick={onAdd}
      />
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
