import React from "react";
import { Checkbox, FormControlLabel, Typography, Box } from "@mui/material";

const SidebarFilter = () => {
  const renderCheckbox = (label = "") => (
    <FormControlLabel
      control={<Checkbox sx={{ color: "var(--black-color) !important" }} />}
      label={label}
    />
  );

  return (
    <Box
      component="aside"
      sx={{ width: "16rem", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography fontSize={24} fontWeight="600">
        Filters
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Typography fontSize={18} color="textSecondary">
          Working schedule
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {renderCheckbox("Full time")}
          {renderCheckbox("Part time")}
          {renderCheckbox("Internship")}
          {renderCheckbox("Project work")}
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Typography fontSize={18} color="textSecondary">
          Employment type
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {renderCheckbox("Full day")}
          {renderCheckbox("Flexible schedule")}
          {renderCheckbox("Shift work")}
          {renderCheckbox("Distant work")}
          {renderCheckbox("Shift method")}
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarFilter;
