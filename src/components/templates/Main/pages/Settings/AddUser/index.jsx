import React from "react";
import { Box, OutlinedInput, Button, Stack } from "@mui/material";
import { postClient } from "../../../../../../lib/api";
import useSWRMutation from "swr/mutation";
import Section from "../../../../../inputs/Section";
import StationSelector from "../../../../../inputs/StationSelector";

export default function AddUser({ handleModeChange }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [stations, setStations] = React.useState([]);

  const { trigger: postUser } = useSWRMutation("/user", postClient);

  const disable = !(username && name && stations.length > 0);

  return (
    <div>
      <Section
        title="Username"
        Input={
          <OutlinedInput
            size="small"
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            value={username}
          />
        }
      />
      <Section
        title="Password"
        Input={
          <OutlinedInput
            size="small"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            value={password}
          />
        }
      />
      <Section
        title="Name"
        Input={
          <OutlinedInput
            size="small"
            fullWidth
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            value={password}
          />
        }
      />
      <Section title="Roles" Input={<StationSelector />} />
      <Box
        sx={{
          justifySelf: "flex-end",
          my: 2,
          width: 220,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          sx={{ width: 100 }}
          variant="outlined"
          children="BACK"
          onClick={handleModeChange}
        />
        <Button
          sx={{ width: 100 }}
          disabled={disable}
          variant="outlined"
          children="CREATE"
          onClick={() =>
            postUser({
              username,
              name,
              password,
              stations,
            })
          }
        />
      </Box>
    </div>
  );
}
