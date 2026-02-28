import React from "react";
import { Box, Checkbox, OutlinedInput, Button, Stack } from "@mui/material";
import useSWRMutation from "swr/mutation";
import { get, post } from "../../../../../lib/api";
import Section from "../../../../inputs/Section";
import PageContainer from "../PageContainer";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../../../../reduxjs@toolkit/mainSlice";
import useSWR from "swr";

export default function EditDeliveryGroup() {
  const { section } = useSelector((s) => s.main);
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

  const { trigger } = useSWRMutation("/delivery/station", post);
  const { data } = useSWR(
    isCreateMode ? null : `/delivery/station/${section}`,
    get
  );

  const disable = isCreateMode
    ? !(
        name &&
        invoiceCode &&
        address &&
        city &&
        state &&
        zip &&
        phone &&
        displayName
      )
    : true;
  //   !(username && name && stations.length > 0) ||
  //   (name === settings?.storeName &&
  //     address === settings?.storeAddress &&
  //     city === settings?.storeCity &&
  //     state === settings?.storeState &&
  //     zip === settings?.storeZip &&
  //     phone === settings?.storePhone &&
  //     fax === settings?.storeFax &&
  //     email === settings?.storeEmail &&
  //     managerLN === settings?.storeManagerLN &&
  //     managerFN === settings?.storeManagerFN);

  const dispatch = useDispatch();

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
            children="CREATE"
            onClick={() =>
              trigger({
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
            }
          />
        </Box>
      </div>
    </PageContainer>
  );
}
