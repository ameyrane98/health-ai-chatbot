import { Paper, Typography, Box } from "@mui/material";

export default function AuthCard({ title, subtitle, children }) {
  return (
    <Paper
      elevation={6}
      sx={{
        p: 5,
        maxWidth: 400,
        width: "100%",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle1" gutterBottom align="center">
          {subtitle}
        </Typography>
      )}
      <Box sx={{ mt: 2 }}>{children}</Box>
    </Paper>
  );
}
