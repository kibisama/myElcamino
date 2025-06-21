import React from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  styled,
} from "@mui/material";
import { setPickupRelation } from "../../../../lib/api/client";

const CustomRadio = styled(({ ...props }) => <Radio {...props} />)(
  ({ theme }) => ({
    "&.Mui-checked": {
      color: "#26a69a",
    },
  })
);

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
  }, []);

  const styleLabel = (v) =>
    v === value
      ? { typography: { sx: { color: "#26a69a" } } }
      : { typography: { sx: { color: "text.secondary" } } };
  return (
    <FormControl>
      <RadioGroup
        row={row}
        value={value}
        onChange={async (e) => {
          try {
            await setPickupRelation({ relation: e.target.value });
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <FormControlLabel
          slotProps={styleLabel("self")}
          value="self"
          control={<CustomRadio />}
          label="Self"
        />
        <FormControlLabel
          slotProps={styleLabel("ff")}
          value="ff"
          control={<CustomRadio />}
          label="Family/Friend"
        />
        <FormControlLabel
          slotProps={styleLabel("gc")}
          value="gc"
          control={<CustomRadio />}
          label="Guardian/Caregiver"
        />
        <FormControlLabel
          slotProps={styleLabel("other")}
          value="other"
          control={<CustomRadio />}
          label="Other"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default RelationBox;
