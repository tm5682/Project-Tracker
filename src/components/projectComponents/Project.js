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
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const Project = ({ project, onDelete, onToggle }) => {
  const navigate = useNavigate();

  return (
    <div>
      {/* we use link to link the project id with router */}

      <Box display="flex" flexDirection="column">
        <Card>
          <CardHeader
            avatar={
              <Avatar
                //we navigate to project page when clicked
                onClick={() => navigate(`/project/${project.id}`)}
                sx={{
                  "&:hover": {
                    color: "white",
                    bgcolor: "purple",
                  },

                  backgroundColor: "white",
                }}
              >
                <AddIcon color="secondary" />
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
                <Typography variant="h8">Total Work Orders: 175</Typography>
              </Grid>

              <Grid item>
                <Typography variant="h8">
                  Total Unresolved Issues: 12
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="h8">Past Due Work Orders: 19 </Typography>
              </Grid>
            </Grid>

            {/* {project.actionList && <ProjectActionList />} */}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Project;
