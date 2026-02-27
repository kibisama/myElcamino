import * as React from "react";
import {
  Checkbox,
  FormGroup,
  FormControl,
  FormControlLabel,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";

export default function StationSelector() {
  const { deliveries } = useSelector((s) => s.main);

  const [value, setValue] = React.useState([]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <FormControl>
      <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
        {deliveries.map((station) => (
          <FormControlLabel
            sx={{ mx: 1 }}
            label={station.invoiceCode}
            control={<Checkbox name={station.invoiceCode} />}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
