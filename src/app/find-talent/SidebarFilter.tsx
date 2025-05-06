import React, { ReactNode } from "react";
import {
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Icons } from "@/icons";

const SidebarFilter = () => {
  const renderCheckbox = (label: ReactNode) => (
    <FormControlLabel
      control={<Checkbox sx={{ color: "var(--black-color) !important" }} />}
      label={label ?? ""}
    />
  );

  const renderRadio = (value: string, label: ReactNode) => (
    <FormControlLabel
      value={value}
      control={<Radio />}
      label={label}
      color="success"
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
          Talent badge
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {renderCheckbox(
            <div className="flex gap-1">
              <Icons.topratedplus />
              <div className="text-sm text-context">Top Rated Plus</div>
            </div>
          )}
          {renderCheckbox(
            <div className="flex gap-1">
              <Icons.toprated />
              <div className="text-sm text-context">Top Rated</div>
            </div>
          )}
          {renderCheckbox(
            <div className="flex gap-1">
              <Icons.risingtalent />
              <div className="text-sm text-context">Rising Talent</div>
            </div>
          )}
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Typography fontSize={18} color="textSecondary">
          Job success
        </Typography>
        <RadioGroup defaultValue="freelancer_n_agencies" name="talent-type">
          {renderRadio("freelancer_n_agencies", "Freelancer & Agencies")}
          {renderRadio("freelancers", "Freelancers")}
          {renderRadio("agencies", "Agencies")}
        </RadioGroup>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Typography fontSize={18} color="textSecondary">
          Job success
        </Typography>
        <RadioGroup defaultValue="any" name="talent-type">
          {renderRadio("any", "Any job success")}
          {renderRadio("80+", "80% & up")}
          {renderRadio("90+", "90% & up")}
        </RadioGroup>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Typography fontSize={18} color="textSecondary">
          Earned amount
        </Typography>
        <RadioGroup defaultValue="any" name="talent-type">
          {renderRadio("any", "Any amount earned")}
          {renderRadio("1+", "$1+ earned")}
          {renderRadio("100+", "$100+ earned")}
          {renderRadio("1k+", "$1k+ earned")}
          {renderRadio("10k+", "$10k+ earned")}
          {renderRadio("no", "No earnings yet")}
        </RadioGroup>
      </Box>
    </Box>
  );
};

export default SidebarFilter;
