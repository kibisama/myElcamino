import React from "react";
import { Box, Checkbox, OutlinedInput, Button, Stack } from "@mui/material";
import useSWRMutation from "swr/mutation";
import { get, post, api } from "../../../../../lib/api";
import Section from "../../../../inputs/Section";
import PageContainer from "../PageContainer";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../../../../reduxjs@toolkit/mainSlice";
import { enqueueSnackbar } from "notistack";

export default function EditDeliveryGroup() {
  const { section } = useSelector((s) => s.main);
  const [data, setData] = React.useState(null);
  const [name, setName] = React.useState("");
  const [invoiceCode, setInvoiceCode] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [active, setActive] = React.useState(true);

  const isCreateMode = section === "CREATE";

  const { trigger: create, isMutating: isCreating } = useSWRMutation(
    isCreateMode ? "/delivery/station" : null,
    post,
    {
      throwOnError: false,
      onSuccess: () => {
        enqueueSnackbar("The delivery group has been created successfully.", {
          variant: "success",
        });
        dispatch(setPage({ page: "DeliveryGroups" }));
      },
    },
  );
  const { trigger: load, isMutating: isLoading } = useSWRMutation(
    isCreateMode ? null : `/delivery/${section}`,
    get,
    {
      throwOnError: false,
      onSuccess: (data) => {
        setData(data);
        setName(data.name);
        setInvoiceCode(data.invoiceCode);
        setAddress(data.address);
        setCity(data.city);
        setState(data.state);
        setZip(data.zip);
        setPhone(data.phone);
        setDisplayName(data.displayName);
        setActive(data.active);
      },
    },
  );
  const { trigger: edit, isMutating: isEditing } = useSWRMutation(
    isCreateMode ? null : `/main/delivery/${section}`,
    (url, { arg }) => api.put(url, arg),
    {
      throwOnError: false,
      onSuccess: () => {
        enqueueSnackbar("The information has been updated successfully.", {
          variant: "success",
        });
        dispatch(setPage({ page: "DeliveryGroups" }));
      },
    },
  );

  const disable =
    isCreating ||
    isLoading ||
    isEditing ||
    !(
      name &&
      invoiceCode &&
      address &&
      city &&
      state &&
      zip &&
      phone &&
      displayName
    ) ||
    (isEditing &&
      name === data.name &&
      invoiceCode === data.invoiceCode &&
      address === data.address &&
      city === data.city &&
      state === data.state &&
      zip === data.zip &&
      phone === data.phone &&
      displayName === data.displayName &&
      active === data.active);

  const dispatch = useDispatch();

  React.useLayoutEffect(function loadStationData() {
    if (!isCreateMode) {
      (async function () {
        await load();
      })();
    }
  }, []);

  return (
    <PageContainer
      breadcrumbs={[{ title: "Deliveries" }, { title: "" }]}
      title={isCreateMode ? "Create Delivery Group" : "Edit Delivery Group"}
    >
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
        title="Invoice Code"
        Input={
          <OutlinedInput
            disabled={!isCreateMode}
            size="small"
            fullWidth
            onChange={(e) => setInvoiceCode(e.target.value)}
            placeholder="Invoice Code"
            value={invoiceCode}
          />
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
        title="Phone"
        Input={
          <OutlinedInput
            size="small"
            fullWidth
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            value={phone}
          />
        }
      />
      <Section
        title="Display Name"
        Input={
          <OutlinedInput
            size="small"
            fullWidth
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Display Name"
            value={displayName}
          />
        }
      />
      <Section
        title="Active"
        Input={
          <Checkbox
            disabled={isCreateMode}
            checked={active}
            onChange={(e) => setActive((prev) => !prev)}
          />
        }
      />
      <div>
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
            onClick={() => dispatch(setPage({ page: "DeliveryGroups" }))}
          />
          <Button
            sx={{ width: 100 }}
            disabled={disable}
            variant="outlined"
            children={isCreateMode ? "CREATE" : "SAVE"}
            onClick={
              isCreateMode
                ? () =>
                    create({
                      name,
                      address,
                      city,
                      state,
                      zip,
                      phone,
                      active,
                      displayName,
                      invoiceCode,
                    })
                : () =>
                    edit({
                      name,
                      address,
                      city,
                      state,
                      zip,
                      phone,
                      active,
                      displayName,
                    })
            }
          />
        </Box>
      </div>
    </PageContainer>
  );
}
