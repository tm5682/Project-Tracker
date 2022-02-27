import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { useRef, useState } from "react";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { useAuth } from "../contexts/AuthContext";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const {login } = useAuth();
  const [emailRef, setEmailRef] = useState("")
  const [passwordRef, setPasswordRef] = useState("")
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loginFunction = async (e) => {

    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      console.log(emailRef,passwordRef)
      await login(emailRef, passwordRef);
      navigate("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  };

  return (
    <>
      <title>Login</title>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
            Dashboard
          </Button>
          {error && <Alert variant="danger">{error}</Alert>}

          <form onSubmit={loginFunction}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Sign in
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Sign in on the internal platform
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Button
                  color="info"
                  fullWidth
                  startIcon={<FacebookIcon />}
                  size="large"
                  variant="contained"
                >
                  Login with Facebook
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  color="error"
                  startIcon={<GoogleIcon />}
                  size="large"
                  variant="contained"
                >
                  Login with Google
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            >
              <Typography align="center" color="textSecondary" variant="body1">
                or login with email address (only one available for now)
              </Typography>
            </Box>
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              name="email"
              type="email"
              variant="outlined"
              required
              onChange={(event) => {
                setEmailRef(event.target.value);
              }}
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              type="password"
              variant="outlined"
              required
              onChange={(event) => {
                setPasswordRef(event.target.value);
              }}
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={loading}
                endIcon={<KeyboardArrowRightIcon />}
              >
                Sign In Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Don&apos;t have an account?{" "}
              <Button
                onClick={() => navigate(`/registration`)}
                variant="text"
                underline="hover"
                sx={{
                  cursor: "pointer",
                }}
              >
                Sign Up
              </Button>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
