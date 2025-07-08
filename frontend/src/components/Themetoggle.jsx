import { Switch, FormControlLabel } from "@mui/material";

export default function ThemeToggle({ checked, onChange }) {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={onChange}
          inputProps={{ "aria-label": "Dark mode toggle" }}
        />
      }
      label="Dark Mode"
    />
  );
}
