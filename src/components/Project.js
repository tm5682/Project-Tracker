//importing font awesome icons from react-icons
import { FaTimes } from "react-icons/fa";

const Project = ({ project, onDelete, onToggle }) => {
  return (
    <div
      //if current status true then use reminder css class else project class
      className={`project ${project.current_status ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(project.id)}
    >
      <br />
      <h3>
        {project.name}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(project.id)}
        />
      </h3>
      <br />
      <p>
        {" "}
        <b>Client Name:</b> {project.client_name}{" "}
      </p>
      <br />
    </div>
  );
};

export default Project;
