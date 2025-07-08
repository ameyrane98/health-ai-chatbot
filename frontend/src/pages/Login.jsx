import React, { useState } from "react";
import { Box, TextField, Button, Alert, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import ThemeToggle from "../components/ThemeToggle";

export default function Login({ isDarkMode, setIsDarkMode }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Login failed");
      }

      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      navigate("/chat");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background:
          theme.palette.mode === "light"
            ? "linear-gradient(135deg, #e0f7fa, #e0f2f1)"
            : "linear-gradient(135deg, #121212, #1e1e1e)",
      }}
    >
      <Box sx={{ position: "absolute", top: 20, right: 20 }}>
        <ThemeToggle
          checked={isDarkMode}
          onChange={() => setIsDarkMode(!isDarkMode)}
        />
      </Box>

      <AuthCard title="Welcome Back!" subtitle="Sign in to your health coach">
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Sign In
        </Button>
      </AuthCard>
    </Box>
  );
}
