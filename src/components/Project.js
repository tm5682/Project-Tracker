//importing font awesome icons from react-icons
import { FaTimes } from "react-icons/fa";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { IconButton, Typography } from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import { Box } from "@mui/system";

import CardActions from "@mui/material/CardActions";

import Avatar from "@mui/material/Avatar";

import ProjectActionList from "./ProjectActionList";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import AddIcon from "@mui/icons-material/Add";

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
            avatar={
              <Avatar
                onClick={() => onToggle(project.id)}
                sx={{
                  "&:hover": {
                    color: "white",
                    bgcolor: "purple",
                  },

                  backgroundColor: "white",
                }}
              >
                <AddIcon color="primary" />
              </Avatar>
            }
            key={project.id}
            action={
              <IconButton onClick={() => onDelete(project.id)}>
                <DeleteOutlined />
              </IconButton>
            }
            title={
              <Typography variant="h6" color="Primary">
                {project.name}
              </Typography>
            }
            subheader={
              <Typography variant="h12" color="textSecondary">
                {project.clientName}
              </Typography>
            }
          />

          <CardContent>
            <Grid container spacing={1} sx={{ flexDirection: "column" }}>
              <Grid item>
                <Typography variant="h8">Project Status: Ongoing</Typography>
              </Grid>

              <Grid item>
                <Typography variant="h8">Users: 12</Typography>
              </Grid>

              <Grid item>
                <Typography variant="h8">Duration: 12 months </Typography>
              </Grid>
            </Grid>

            {project.actionList && <ProjectActionList />}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Project;
