import Project from "./Project";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const ProjectList = ({ projectList, onDelete, onToggle }) => {
  return (
    // <Project
    //   key={project.id}
    //   project={project}
    //   onDelete={onDelete}
    //   onToggle={onToggle}
    // />
    <Container>
      <Grid container spacing={3}>
        {projectList.map((project) => (
          <Grid item key={project.id} xs={12}>
            <Project
              project={project}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProjectList;
