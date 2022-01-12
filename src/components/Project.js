//importing font awesome icons from react-icons
import { FaTimes } from "react-icons/fa";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { IconButton, Typography } from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import { Box } from "@mui/system";

const Project = ({ project, onDelete, onToggle }) => {
  return (
    // <div
    //   //if current status true then use reminder css class else project class
    //   className={`project ${project.favorite ? "reminder" : ""}`}
    //   onDoubleClick={() => onToggle(project.id)}
    // >
    //   <br />
    //   <h3>
    //     {project.name}
    //     <FaTimes
    //       style={{ color: "red", cursor: "pointer" }}
    //       onClick={() => onDelete(project.id)}
    //     />
    //   </h3>
    //   <br />
    //   <p>
    //     {" "}
    //     <b>Client Name:</b> {project.clientName}{" "}
    //   </p>
    //   <br />
    // </div>

    <div>
      <Box display="flex" flexDirection="column">
        <Card>
          <CardHeader
            onClick={() => console.log("Toggler")}
            key={project.id}
            action={
              <IconButton onClick={() => onDelete(project.id)}>
                <DeleteOutlined />
              </IconButton>
            }
            title={project.name}
            subheader={project.clientName}
          />
        </Card>
      </Box>
    </div>
  );
};

export default Project;
