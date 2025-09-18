import * as React from "react";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import PageContainer from "../PageContainer";
import AppButton from "../AppButton";
import useScanDetection from "../../../../../hooks/useScanDetection";

const rowHeight = 52;

export default function Deliveries({ section }) {
  const [isLoading, setIsLoading] = React.useState(false);
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
  //     const onComplete = useCallback((barcode) => {
  //     if (document.activeElement.tagName !== "INPUT") {
  //       const rxNumber = barcode.match(/\d+/g);
  //       rxNumber &&
  //         socket.emit("items", {
  //           action: "push",
  //           item: rxNumber.join(""),
  //         });
  //     }
  //   }, []);
  //   useScanDetection({ onComplete });
  const columns = React.useMemo(
    () => [
      {
        field: "time",
        headerName: "",
        // type: "date",
        headerAlign: "center",
        align: "center",
        // valueGetter: (v) => v && new Date(v),
        // valueFormatter: (v) => v && dayjs(v).format("hh:mm A"),
        width: 84,
      },
      {
        field: "rxNumber",
        headerName: "Rx Number",
        type: "number",
        width: 120,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "patientName",
        headerName: "Patient Name",
        width: 280,
      },
      {
        field: "drugName",
        headerName: "Drug Name",
        flex: 1,
      },
      {
        field: "rxQty",
        headerName: "Qty",
        type: "number",
      },
      {
        field: "patPay",
        headerName: "Copay",
        type: "number",
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
      breadcrumbs={[{ title: "Deliveries" }, { title: "" }]}
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
          rows={[]}
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
