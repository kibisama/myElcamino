import * as React from "react";
import {
  Checkbox,
  FormGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { useSelector } from "react-redux";

export default function StationSelector({ handleChange }) {
  const { deliveries } = useSelector((s) => s.main);
  if (!handleChange) {
    return;
  }

  return (
    <FormControl>
      <FormGroup
        onChange={handleChange}
        sx={{ display: "flex", flexDirection: "row" }}
      >
        {deliveries.map((station) => (
          <FormControlLabel
            sx={{ mx: 1 }}
            label={station.invoiceCode}
            control={<Checkbox value={station.invoiceCode} />}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
