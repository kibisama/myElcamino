import React from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const RelationBox = ({ socket, row, sx }) => {
  const [value, setValue] = React.useState("self");
  React.useEffect(() => {
    function onRelation(data) {
      setValue(data);
    }
    socket.on("relation", onRelation);
    return () => {
      socket.off("relation", onRelation);
    };
  }, [socket]);

  const styleLabel = React.useCallback(
    (v) =>
      v === value
        ? { typography: { sx: { color: "#26a69a" } } }
        : { typography: { sx: { color: "text.secondary" } } },
    [value]
  );
  return (
    <FormControl>
      <RadioGroup
        row={row}
        value={value}
        onChange={(e) => socket.emit("relation", e.target.value)}
      >
        <FormControlLabel
          slotProps={styleLabel("self")}
          value="self"
          control={<Radio sx={sx} />}
          label="Self"
        />
        <FormControlLabel
          slotProps={styleLabel("ff")}
          value="ff"
          control={<Radio sx={sx} />}
          label="Family/Friend"
        />
        <FormControlLabel
          slotProps={styleLabel("gc")}
          value="gc"
          control={<Radio sx={sx} />}
          label="Guardian/Caregiver"
        />
        <FormControlLabel
          slotProps={styleLabel("other")}
          value="other"
          control={<Radio sx={sx} />}
          label="Other"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default RelationBox;
