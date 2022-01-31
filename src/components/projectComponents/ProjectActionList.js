import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import { IconButton, Typography } from "@mui/material";
import { Button } from "@mui/material";

import NoteAddIcon from "@mui/icons-material/NoteAdd";
import NoteIcon from "@mui/icons-material/Note";

function ProjectActionList() {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item>
          <Button href="/notes" sx={{ mt: 3 }}>
            <NoteIcon size="small" sx={{ mr: 1 }} /> Issues
          </Button>

          <Button href="/create" sx={{ ml: 5, mt: 3 }}>
            <NoteAddIcon size="small" sx={{ mr: 1 }} /> Add Issue
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProjectActionList;
