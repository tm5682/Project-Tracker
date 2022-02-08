import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "./AccountProfile";
import { AccountProfileDetails } from "./AcountProfileDetails";

import { useParams } from "react-router-dom";

function EditUserProfile() {
  const { projectId, userId } = useParams();
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h6" sx={{ mb: 5 }}>
          {" "}
          This is showing user profile for userId: {userId} and in project{" "}
          {projectId}
        </Typography>

        <Typography sx={{ mb: 3 }} variant="h4">
          Account
        </Typography>
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <AccountProfile />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default EditUserProfile;
