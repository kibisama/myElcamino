import * as React from "react";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PageContainer from "../PageContainer";
import AppButton from "../AppButton";
import { useSelector } from "react-redux";

const rowHeight = 52;

export default function DeliveryGroups() {
  const { deliveries } = useSelector((s) => s.main);
  const [isLoading, setIsLoading] = React.useState(false);

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
        width: 96,
        align: "center",
        getActions: ({ row }) => [
          <GridActionsCellItem
            key="edit"
            icon={<EditIcon />}
            label="Edit"
            onClick={() => {}}
          />,
          <GridActionsCellItem
            key="delete"
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {}}
          />,
        ],
      },
    ],
    []
  );

  return (
    <PageContainer
      breadcrumbs={[{ title: "Deliveries" }, { title: "" }]}
      title="Manage Groups"
      actions={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Tooltip title="Reload data" placement="right" enterDelay={1000}>
            <div>
              <IconButton
                size="small"
                aria-label="refresh"
                // onClick={}
              >
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
          rows={deliveries}
          showCellVerticalBorder
          disableColumnMenu
          disableRowSelectionOnClick
          loading={isLoading}
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
