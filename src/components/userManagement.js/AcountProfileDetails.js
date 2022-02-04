import { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  TextField,
} from "@mui/material";

export const AccountProfileDetails = (props) => {
  const [values, setValues] = useState({
    firstName: "Aaron",
    lastName: "Janssen",
    email: "janssen@example.com",
    phone: "7093382929",
    company: "ETC Marine",
  });

  const [userProjects, setUserProjects] = useState(["Pegasus", "Enron"]);

  const projectList = ["Pegasus", "Enron", "Matrix"];

  const onProjectAdd = (event, newUserProjects) => {
    setUserProjects(newUserProjects);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Company"
                name="comapny"
                onChange={handleChange}
                required
                value={values.company}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Autocomplete
                name="projects"
                value={userProjects}
                onChange={onProjectAdd}
                multiple
                id="tags-filled"
                options={projectList}
                freeSolo
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => {
                    // foo(option);

                    return (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                    );
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    label="Projects Involved In"
                    placeholder="Assets "
                  />
                )}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
