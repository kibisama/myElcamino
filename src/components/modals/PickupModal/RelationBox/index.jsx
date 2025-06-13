import React from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { getPickupData, setPickupRelation } from "../../../../lib/api/client";

const RelationBox = ({ socket, open, row }) => {
  const [value, setValue] = React.useState("self");
  React.useEffect(() => {
    (async function () {
      try {
        await getPickupData("relation");
      } catch (e) {
        console.log(e);
      }
    })();
    function onRelation(data) {
      setValue(data);
    }
    socket.on("relation", onRelation);
    return () => {
      socket.off("relation", onRelation);
    };
  }, [open]);

  const style = (v) =>
    v === value ? { fontWeight: 600, color: "#009688" } : null;

  return (
    <FormControl>
      <RadioGroup
        row={row}
        value={value}
        onChange={async (e) => {
          try {
            setValue(e.target.value);
            await setPickupRelation({ relation: e.target.value });
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <FormControlLabel
          sx={style("self")}
          value="self"
          control={
            <Radio
              sx={{
                "&.Mui-checked": {
                  color: "##009688",
                },
              }}
            />
          }
          label="Self"
        />
        <FormControlLabel
          sx={style("ff")}
          value="ff"
          control={<Radio />}
          label="Family/Friend"
        />
        <FormControlLabel
          sx={style("gc")}
          value="gc"
          control={<Radio />}
          label="Guardian/Caregiver"
        />
        <FormControlLabel
          sx={style("other")}
          value="other"
          control={<Radio />}
          label="Other"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default RelationBox;
