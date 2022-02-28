import React, { useRef, useState } from "react";
import { Alert, Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

import { Link, useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateUserPassword, updateUserEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      console.log("passwords dont match")
      return setError("Passwords do not match");
      
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateUserEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updateUserPassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
<Card> 
  <CardHeader subheader="The information can be edited" title="Profile" />
  {error && <Alert variant="danger">{error}</Alert>} 
  <Divider /> 
  <CardContent>
    <Grid container spacing={3}>
      <Grid item md={6} xs={12}>
        <TextField
          fullWidth
          helperText="Please specify the Email"
          label="Email"
          name="email"
          type="email"
          inputRef={emailRef}
          required
          defaultValue={currentUser.email}
          variant="outlined"
        />
      </Grid>

      <Grid item md={6} xs={12}>
        <TextField
          fullWidth
          helperText="Leave blank to keep the same"
          label="Password"
          name="password"
          inputRef={passwordRef}
          variant="outlined"
        />
      </Grid>

      <Grid item md={6} xs={12}>
        <TextField
          fullWidth
          helperText="Leave blank to keep the same"
          label="Confirm Password"
          name="confirmPassword"
          inputRef={passwordConfirmRef}
          variant="outlined"
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
    <Button color="primary" type="submit" disabled={loading} variant="contained">
      Update
    </Button> 
  </Box>
</Card>
</form>
    </>
  );
}


