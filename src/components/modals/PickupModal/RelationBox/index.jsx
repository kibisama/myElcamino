import React from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import {
  getPickupRelation,
  selectPickupRelation,
} from "../../../../lib/api/client";

const RelationBox = ({ socket, open, row }) => {
  const [value, setValue] = React.useState("self");
  React.useEffect(() => {
    async function onConnect() {
      try {
        await getPickupRelation();
      } catch (e) {
        console.log(e);
      }
    }
    function onRelation(data) {
      setValue(data);
    }
    onConnect();
    socket.on("relation", onRelation);
    socket.on("connect", onConnect);
    return () => {
      socket.off("connect", onConnect);
      socket.off("relation", onRelation);
    };
  }, [open]);
  return (
    <FormControl>
      <RadioGroup
        row={row}
        value={value}
        onChange={async (e) => {
          try {
            await selectPickupRelation({ relation: e.target.value });
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <FormControlLabel value="self" control={<Radio />} label="Self" />
        <FormControlLabel
          value="ff"
          control={<Radio />}
          label="Family/Friend"
        />
        <FormControlLabel
          value="gc"
          control={<Radio />}
          label="Guardian/Caregiver"
        />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
  );
};

export default RelationBox;
