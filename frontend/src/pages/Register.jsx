import { useState } from "react";
import { Box, TextField, Button, Alert, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Registration failed");
      }

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          theme.palette.mode === "light"
            ? "linear-gradient(135deg, #f0f7f7, #e0f2f1)"
            : "linear-gradient(135deg, #121212, #1e1e1e)",
      }}
    >
      <AuthCard title="Create Account" subtitle="Sign up for your health coach">
        {error && <Alert severity="error">{error}</Alert>}
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
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          onClick={handleRegister}
        >
          Sign Up
        </Button>
      </AuthCard>
    </Box>
  );
}
