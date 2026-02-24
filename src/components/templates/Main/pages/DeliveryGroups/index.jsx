import * as React from "react";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import RefreshIcon from "@mui/icons-material/Refresh";
import LayersIcon from "@mui/icons-material/Layers";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import EditIcon from "@mui/icons-material/Edit";
import PageContainer from "../PageContainer";
import AppButton from "../AppButton";
import { useDispatch, useSelector } from "react-redux";

const rowHeight = 52;

export default function DeliveryGroups() {
  const dispatch = useDispatch();
  const { deliveries, isLoadingDeliveries } = useSelector((s) => s.main);
  const refresh = React.useCallback(() => {
    // (async function () {
    //   try {
    //     dispatch(asyncGetDeliveryStations());
    //   } catch (e) {
    //     console.error(e);
    //   }
    // })();
  }, [dispatch]);
  React.useEffect(() => {
    refresh();
  }, [refresh]);

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
            disabled
            key="deactivate"
            icon={<LayersClearIcon />}
            label="Deactivate"
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
              <IconButton size="small" aria-label="refresh" onClick={refresh}>
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
          loading={isLoadingDeliveries}
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
