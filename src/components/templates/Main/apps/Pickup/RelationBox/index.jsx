import React from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { postPickup } from "../../../../../../lib/api/client";

const RelationBox = ({ socket, row }) => {
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
        onChange={async (e) => {
          try {
            await postPickup("relation", e.target.value);
          } catch (e) {
            console.error(e);
          }
        }}
      >
        <FormControlLabel
          slotProps={styleLabel("self")}
          value="self"
          control={<Radio />}
          label="Self"
        />
        <FormControlLabel
          slotProps={styleLabel("ff")}
          value="ff"
          control={<Radio />}
          label="Family/Friend"
        />
        <FormControlLabel
          slotProps={styleLabel("gc")}
          value="gc"
          control={<Radio />}
          label="Guardian/Caregiver"
        />
        <FormControlLabel
          slotProps={styleLabel("other")}
          value="other"
          control={<Radio />}
          label="Other"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default RelationBox;
