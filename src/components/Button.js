//creates button with props passed

import PropTypes from "prop-types";

const Button = ({ color = "steelblue", text, onClick }) => {
  return (
    <button onClick={onClick} style={{ backgroundColor: color }}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
