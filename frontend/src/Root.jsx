import React, { useState, useEffect } from "react";
import App from "./App.jsx";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./themes/themes.js";

export default function Root() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // ✅ Load preference on mount
  useEffect(() => {
    const storedMode = localStorage.getItem("isDarkMode") === "true";
    setIsDarkMode(storedMode);
  }, []);

  // ✅ Save preference when changed
  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <App isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </ThemeProvider>
  );
}
