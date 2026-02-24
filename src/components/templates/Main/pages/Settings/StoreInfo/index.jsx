import React from "react";
import {
  Box,
  OutlinedInput,
  Button,
  Typography,
  Stack,
  useTheme,
  useColorScheme,
} from "@mui/material";
import { get, post } from "../../../../../../lib/api";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { enqueueSnackbar } from "notistack";

const Section = ({ title, subtitle, Input }) => {
  const theme = useTheme();
  const { systemMode, mode } = useColorScheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: 1,
        borderColor:
          mode === "dark" || systemMode === "dark"
            ? (theme.vars || theme).palette.grey[800]
            : (theme.vars || theme).palette.grey[100],
        py: 2,
      }}
    >
      <Box sx={{ width: "45%" }}>
        <Typography sx={{ fontSize: 13 }}>{title}</Typography>
        {subtitle && (
          <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      <Box sx={{ width: "45%" }}>{Input}</Box>
    </Box>
  );
};

const StoreInfo = () => {
  const [settings, setSettings] = React.useState(null);
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [fax, setFax] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [managerLN, setManagerLN] = React.useState("");
  const [managerFN, setManagerFN] = React.useState("");

  const { data, mutate: refreshSettings } = useSWR("/apps/settings", get);
  const { trigger: postSettings } = useSWRMutation("/apps/settings", post);

  const onGetSettings = React.useCallback((settings) => {
    setSettings(settings);
    setName(settings.storeName);
    setAddress(settings.storeAddress);
    setCity(settings.storeCity);
    setState(settings.storeState);
    setZip(settings.storeZip);
    setPhone(settings.storePhone);
    setFax(settings.storeFax);
    setEmail(settings.storeEmail);
    setManagerLN(settings.storeManagerLN);
    setManagerFN(settings.storeManagerFN);
  }, []);

  React.useEffect(() => {
    data && onGetSettings(data);
  }, [data, onGetSettings]);

  const disable =
    !(
      name &&
      address &&
      city &&
      state &&
      zip &&
      phone &&
      fax &&
      email &&
      managerLN &&
      managerFN
    ) ||
    (name === settings?.storeName &&
      address === settings?.storeAddress &&
      city === settings?.storeCity &&
      state === settings?.storeState &&
      zip === settings?.storeZip &&
      phone === settings?.storePhone &&
      fax === settings?.storeFax &&
      email === settings?.storeEmail &&
      managerLN === settings?.storeManagerLN &&
      managerFN === settings?.storeManagerFN);

  return (
    <div>
      <Section
        title="Store Name"
        Input={
          <OutlinedInput
            size="small"
            fullWidth
            onChange={(e) => setName(e.target.value)}
            placeholder="Store Name"
            value={name}
          />
        }
      />
      <Section
        title="Manager"
        Input={
          <Stack direction="row" spacing={1}>
            <OutlinedInput
              size="small"
              fullWidth
              onChange={(e) => setManagerFN(e.target.value)}
              placeholder="First Name"
              value={managerFN}
            />
            <OutlinedInput
              size="small"
              fullWidth
              onChange={(e) => setManagerLN(e.target.value)}
              placeholder="Last Name"
              value={managerLN}
            />
          </Stack>
        }
      />
      <Section
        title="Address"
        Input={
          <Stack spacing={1}>
            <OutlinedInput
              size="small"
              fullWidth
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street Address"
              value={address}
            />
            <OutlinedInput
              size="small"
              fullWidth
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              value={city}
            />
            <Stack spacing={1} direction="row">
              <OutlinedInput
                size="small"
                fullWidth
                onChange={(e) => setState(e.target.value)}
                placeholder="State"
                value={state}
              />
              <OutlinedInput
                size="small"
                fullWidth
                onChange={(e) => setZip(e.target.value)}
                placeholder="Zip Code"
                value={zip}
              />
            </Stack>
          </Stack>
        }
      />
      <Section
        title="Contact"
        Input={
          <Stack spacing={1}>
            <OutlinedInput
              size="small"
              fullWidth
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              value={phone}
            />
            <OutlinedInput
              size="small"
              fullWidth
              onChange={(e) => setFax(e.target.value)}
              placeholder="Fax"
              value={fax}
            />
            <OutlinedInput
              size="small"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              value={email}
            />
          </Stack>
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
          disabled={disable}
          variant="outlined"
          children="RESET"
          onClick={() => onGetSettings(settings)}
        />
        <Button
          sx={{ width: 100 }}
          disabled={disable}
          variant="outlined"
          children="SAVE"
          onClick={() =>
            postSettings({
              storeName: name,
              storeAddress: address,
              storeCity: city,
              storeState: state,
              storeZip: zip,
              storePhone: phone,
              storeFax: fax,
              storeEmail: email,
              storeManagerLN: managerLN,
              storeManagerFN: managerFN,
            })
          }
        />
      </Box>
    </div>
  );
};

export default StoreInfo;
