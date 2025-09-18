import * as React from "react";
import dayjs from "dayjs";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import PageContainer from "../PageContainer";
import AppButton from "../AppButton";
import useScanDetection from "../../../../../hooks/useScanDetection";
import { useSelector, useDispatch } from "react-redux";
import { getDeliveryLogs, postDRxQR } from "../../../../../lib/api/client";
import { enqueueSnackbar } from "notistack";
import DatePickerSm from "../../../../inputs/DatePickerSm";
import { asyncGetDeliveryStations } from "../../../../../reduxjs@toolkit/mainSlice";

const rowHeight = 52;

export default function Deliveries({ section }) {
  const dispatch = useDispatch();
  const { activeApp, deliveries } = useSelector((s) => s.main);
  const getStation_id = React.useCallback(() => {
    for (let i = 0; i < deliveries.length; i++) {
      if (deliveries[i].displayName === section) {
        return deliveries[i]._id;
      }
    }
  }, [deliveries, section]);
  const [rows, setRows] = React.useState([]);
  const [date, setDate] = React.useState(dayjs());
  const [session, setSession] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const getLogs = React.useCallback(() => {
    (async () => {
      try {
        const { data } = await getDeliveryLogs({
          section,
          date: date.format("MMDDYYYY"),
          session,
        });
        console.log(data);
        setRows(data.data);
      } catch (e) {
        console.error(e);
        setRows([]);
      }
    })();
  }, [date, section, session]);
  React.useEffect(() => {
    getLogs();
  }, [getLogs]);
  const onComplete = React.useCallback(
    (data) => {
      (async function () {
        try {
          const station = getStation_id();
          if (!station) {
            return dispatch(asyncGetDeliveryStations());
          }
          const delimiter = "|";
          if (data.split(delimiter).length !== 11) {
            return enqueueSnackbar("Invalid barcode reading", {
              variant: "error",
            });
          }
          await postDRxQR({ data, delimiter, station });
        } catch (e) {
          console.error(e);
        }
      })();
    },
    [dispatch, getStation_id]
  );
  useScanDetection({ onComplete, disabled: activeApp });
  const columns = React.useMemo(
    () => [
      {
        field: "time",
        headerName: "",
        type: "date",
        headerAlign: "center",
        align: "center",
        valueGetter: (v) => v && new Date(v),
        valueFormatter: (v) => v && dayjs(v).format("hh:mm A"),
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
        field: "rxDate",
        headerName: "Rx Date",
        type: "date",
        headerAlign: "center",
        align: "center",
        valueGetter: (v) => v && new Date(v),
        valueFormatter: (v) => v && dayjs(v).format("M. DD. YY"),
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
      {
        field: "actions",
        type: "actions",
        width: 160,
        align: "center",
        getActions: ({ row }) => [
          <GridActionsCellItem
            key={"delete-item"}
            icon={<DeleteIcon />}
            label={"Delete"}
            onClick={() => {}}
          />,
        ],
      },
    ],
    []
  );
  const handleChangeDate = React.useCallback((date, context) => {
    if (!context.validationError) {
      if (date) {
        const day = dayjs(date);
        setDate(day);
        //   search(day.format("MMDDYYYY"));
      } else {
        setDate(null);
      }
    }
  }, []);
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
      extraActions={
        <Stack direction="row" alignItems="center" spacing={1}>
          <DatePickerSm value={date} onChange={handleChangeDate} />
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
