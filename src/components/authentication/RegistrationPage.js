import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRef, useState } from "react";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { useAuth } from "../contexts/AuthContext";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const registrationFunction = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}

      <title>Register</title>

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

          <form onSubmit={registrationFunction}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Create a new account
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Use your email to create a new account
              </Typography>
            </Box>

            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              name="email"
              ref={emailRef}
              type="email"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              ref={passwordRef}
              type="password"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              ref={passwordConfirmRef}
              type="password"
              variant="outlined"
              required
            />
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                ml: -1,
              }}
            >
              <Checkbox />
              <Typography color="textSecondary" variant="body2">
                I have read the{" "}
                <Link color="primary" underline="always" variant="subtitle2">
                  Terms and Conditions
                </Link>
              </Typography>
            </Box>

            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={loading}
              >
                Sign Up Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Have an account?{" "}
              <Button
                onClick={() => navigate(`/login`)}
                variant="text"
                underline="hover"
                sx={{
                  cursor: "pointer",
                }}
              >
                Sign In
              </Button>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
