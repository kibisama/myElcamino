import * as React from "react";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import BarcodeReaderIcon from "@mui/icons-material/BarcodeReader";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
// import { useDialogs } from '../hooks/useDialogs/useDialogs';
import AppButton from "../AppButton";
import PageContainer from "../PageContainer";

export default function Drugs() {
  // const dialogs = useDialogs();

  const [rows, setRows] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const columns = React.useMemo(
    () => [
      {
        field: "bookmark",
        headerName: "",
        width: 80,
      },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
      },
      {
        field: "packages",
        headerName: "Packages",
        width: 120,
      },
      {
        field: "track",
        headerName: "Track",
        width: 80,
      },
      // {
      //   field: "actions",
      //   type: "actions",
      //   width: 80,
      //   align: "center",
      //   getActions: ({ row }) => [
      //     <GridActionsCellItem
      //       key="edit-item"
      //       icon={<EditIcon />}
      //       label="Edit"
      //       onClick={() => {}}
      //     />,
      //   ],
      // },
    ],
    []
  );
  const search = React.useCallback(() => {
    (async () => {
      try {
        // const { data } = await getDrugs();
        // setRows(data.data);
      } catch (e) {
        console.error(e);
        // const { status } = e;
        // if (status !== 404) {
        //   enqueueSnackbar(e.response?.data.message || e.message, {
        //     variant: "error",
        //   });
        // }
        // setRows([]);
      }
      setIsLoading(false);
    })();
  }, []);
  React.useEffect(() => {
    search();
  }, [search]);
  console.log("render");
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
          rows={rows}
          showCellVerticalBorder
          disableColumnMenu
          disableRowSelectionOnClick
          loading={isLoading}
          // initialState={initialState}
          pageSizeOptions={[]}
          // showToolbar
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
