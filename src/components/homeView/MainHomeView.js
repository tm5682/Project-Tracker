import { Box } from "@mui/system";
import React, { useState } from "react";

import { useAuth } from "../contexts/AuthContext";

import { Link, useNavigate } from "react-router-dom";

import HomeWorkOrderTable from "./HomeWorkOrderTable";
import { Alert, Button, Typography } from "@mui/material";

function MainHomeView() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <Box sx={{ mt: 3 }}>
      {error && <Alert variant="danger">{error}</Alert>}

      <Typography
        variant="h8"
        sx={{ fontWeight: 600, mt: 1.25, mr: 0.5, display: "block" }}
        noWrap
      >
        Logged in User Email:{currentUser.email} 
      </Typography>

      <Link sx={{ display: "block", fontWeight: 600, mt: 1.25, mr: 0.5 }} to="/profile">
        Update Profile
      </Link>

      <Button variant="link" onClick={handleLogout}>
        Log Out
      </Button>

      <HomeWorkOrderTable />
    </Box>
  );
}

export default MainHomeView;
