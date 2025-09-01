import * as React from "react";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import BarcodeReaderIcon from "@mui/icons-material/BarcodeReader";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
// import { useDialogs } from '../hooks/useDialogs/useDialogs';
import AppButton from "../AppButton";
import PageContainer from "../PageContainer";

const INITIAL_PAGE_SIZE = 10;

export default function Drugs() {
  // const dialogs = useDialogs();
  // const notifications = useNotifications();

  const [rowState, setRowState] = React.useState({ rows: [], filtered: [] });

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const initialState = React.useMemo(
    () => ({
      pagination: { paginationModel: { pageSize: INITIAL_PAGE_SIZE } },
    }),
    []
  );

  const columns = React.useMemo(
    () => [
      {
        field: "name",
        headerName: "Group Name",
        flex: 1,
      },
      {
        field: "stations",
        headerName: "Stations",
        width: 124,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "actions",
        type: "actions",
        width: 160,
        align: "center",
        getActions: ({ row }) => [
          <GridActionsCellItem
          // key={actionMode ? "print-item" : "edit-item"}
          // icon={actionMode ? <PrintIcon /> : <EditIcon />}
          // label={actionMode ? "Print" : "Edit"}
          // onClick={
          //   actionMode
          //     ? () =>
          //         window.open(
          //           `/print/pickups/${row._id}/${row.rxNumber}`,
          //           "_blank"
          //         )
          //     : //
          //       undefined
          // }
          />,
        ],
        rowSpanValueGetter: (v, r) => r._id,
      },
    ],
    []
  );

  return (
    <PageContainer
      title="Drugs"
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
          <AppButton app={"ScanInv"}>
            <BarcodeReaderIcon />
          </AppButton>
        </Stack>
      }
    >
      <Box sx={{ flex: 1, width: "100%" }}>
        <DataGrid
          autoPageSize
          columns={columns}
          rows={[]}
          showCellVerticalBorder
          disableColumnMenu
          disableRowSelectionOnClick
          loading={isLoading}
          // initialState={initialState}
          pageSizeOptions={[]}
          sx={{
            [`& .${gridClasses.cell}`]: {
              display: "flex",
              alignItems: "center",
            },
            [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
              outline: "transparent",
            },
            [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
              {
                outline: "none",
              },
            [`& .${gridClasses.row}:hover`]: {
              backgroundColor: "inherit",
            },
            ".MuiDataGrid-sortButton": {
              ml: 1,
            },
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
