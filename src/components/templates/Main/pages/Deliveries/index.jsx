import * as React from "react";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import PageContainer from "../PageContainer";
import AppButton from "../AppButton";
import { getDeliveryStations } from "../../../../../lib/api/client";

const rowHeight = 52;

export default function Deliveries({ section }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  //   const getStations = React.useCallback(() => {
  //     (async () => {
  //       try {
  //         const { data } = await getDeliveryStations();
  //         setRows(data.data);
  //       } catch (e) {
  //         console.error(e);
  //         setRows([]);
  //       }
  //     })();
  //   }, []);
  //   React.useEffect(() => {
  //     getStations();
  //   }, [getStations]);
  const columns = React.useMemo(
    () => [
      {
        field: "displayName",
        headerName: "Display",
        width: 120,
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
        headerName: "Address",
        flex: 1,
      },
      {
        field: "city",
        headerName: "City",
        width: 140,
      },
      // {
      //   field: "actions",
      //   type: "actions",
      //   width: 160,
      //   align: "center",
      //   getActions: ({ row }) => [
      //     <GridActionsCellItem
      //     // key={actionMode ? "print-item" : "edit-item"}
      //     // icon={actionMode ? <PrintIcon /> : <EditIcon />}
      //     // label={actionMode ? "Print" : "Edit"}
      //     // onClick={
      //     //   actionMode
      //     //     ? () =>
      //     //         window.open(
      //     //           `/print/pickups/${row._id}/${row.rxNumber}`,
      //     //           "_blank"
      //     //         )
      //     //     : //
      //     //       undefined
      //     // }
      //     />,
      //   ],
      //   rowSpanValueGetter: (v, r) => r._id,
      // },
    ],
    []
  );

  return (
    <PageContainer
      breadcrumbs={[{ title: "Deliveries" }]}
      title={section}
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
          <AppButton children={<CreateNewFolderIcon />} onClick={() => {}} />
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
