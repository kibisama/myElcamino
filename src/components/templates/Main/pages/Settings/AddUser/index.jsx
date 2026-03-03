import React from "react";
import { Box, OutlinedInput, Button } from "@mui/material";
import { postClient } from "../../../../../../lib/api";
import useSWRMutation from "swr/mutation";
import Section from "../../../../../inputs/Section";
import StationSelector from "../../../../../inputs/StationSelector";
import { enqueueSnackbar } from "notistack";

export default function AddUser({ handleModeChange }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [stationCodes, setStationCodes] = React.useState([]);

  const { trigger: postUser, isMutating } = useSWRMutation(
    "/user",
    postClient,
    {
      throwOnError: false,
      onSuccess: () => {
        enqueueSnackbar("The user has been created successfully.", {
          variant: "success",
        });
        handleModeChange();
      },
    },
  );

  const disable = isMutating || !(username && name && password);

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
            value={name}
          />
        }
      />
      <Section
        title="Roles"
        Input={
          <StationSelector
            handleChange={(e) =>
              setStationCodes((prev) => {
                const s = e.target.value;
                if (prev.includes(s)) return prev.filter((v) => v !== s);
                return [...prev, s];
              })
            }
          />
        }
      />
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
              stationCodes,
            })
          }
        />
      </Box>
    </div>
  );
}
