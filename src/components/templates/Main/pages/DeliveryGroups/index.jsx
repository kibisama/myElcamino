import * as React from "react";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import PageContainer from "../PageContainer";
import AppButton from "../AppButton";
import useSWR from "swr";
import { get } from "../../../../../lib/api";

const rowHeight = 52;

export default function DeliveryGroups() {
  const { data, mutate } = useSWR("/delivery/stations/all", get);

  const columns = React.useMemo(
    () => [
      {
        field: "displayName",
        headerName: "Display",
        width: 140,
      },
      {
        field: "invoiceCode",
        headerName: "Code",
        width: 80,
      },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
      },
      {
        field: "address",
        headerName: "Street Address",
        flex: 1,
      },
      {
        field: "city",
        headerName: "City",
        width: 140,
      },
      {
        field: "actions",
        type: "actions",
        width: 52,
        align: "center",
        getActions: ({ row }) => [
          <GridActionsCellItem
            key="edit"
            icon={<EditIcon />}
            label="Edit"
            onClick={() => {}}
          />,
        ],
      },
    ],
    [],
  );
  return (
    <PageContainer
      breadcrumbs={[{ title: "Deliveries" }, { title: "" }]}
      title="Manage Groups"
      actions={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Tooltip title="Reload data" placement="right" enterDelay={1000}>
            <div>
              <IconButton size="small" aria-label="refresh" onClick={mutate}>
                <RefreshIcon />
              </IconButton>
            </div>
          </Tooltip>
          <AppButton children={<GroupAddIcon />} onClick={() => {}} />
        </Stack>
      }
    >
      <Box sx={{ flex: 1, width: "100%" }}>
        <DataGrid
          autoPageSize
          columns={columns}
          rows={data}
          showCellVerticalBorder
          disableColumnMenu
          disableRowSelectionOnClick
          pageSizeOptions={[]}
          sx={{
            maxHeight: rowHeight * 100,
          }}
          slotProps={{
            loadingOverlay: {
              variant: "circular-progress",
              noRowsVariant: "circular-progress",
            },
            baseIconButton: {
              size: "small",
            },
          }}
        />
      </Box>
    </PageContainer>
  );
}
