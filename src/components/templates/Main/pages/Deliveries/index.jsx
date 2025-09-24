import * as React from "react";
import dayjs from "dayjs";
import { Box, Button, IconButton, Stack, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem, useGridApiRef } from "@mui/x-data-grid";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import PageContainer from "../PageContainer";
import AppButton from "../AppButton";
import useScanDetection from "../../../../../hooks/useScanDetection";
import { useSelector, useDispatch } from "react-redux";
import {
  getDeliveryLogs,
  getDeliverySessions,
  postDRxQR,
} from "../../../../../lib/api/client";
import { enqueueSnackbar } from "notistack";
import DatePickerSm from "../../../../inputs/DatePickerSm";
import { asyncGetDeliveryStations } from "../../../../../reduxjs@toolkit/mainSlice";

const rowHeight = 52;

export default function Deliveries({ section }) {
  const dispatch = useDispatch();
  const apiRef = useGridApiRef();
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
  const [sessions, setSessions] = React.useState([]);
  const [session, setSession] = React.useState("0");
  const [isLoading, setIsLoading] = React.useState(false);
  const getLogs = React.useCallback(() => {
    setIsLoading(true);
    (async () => {
      try {
        const { data } = await getDeliveryLogs({
          section,
          date: date.format("MMDDYYYY"),
          session,
        });
        setRows(data.data);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setRows([]);
        setIsLoading(false);
      }
    })();
  }, [date, section, session]);
  const getSessions = React.useCallback(() => {
    (async () => {
      try {
        const { data } = await getDeliverySessions({
          section,
          date: date.format("MMDDYYYY"),
        });
        setSessions(data.data);
      } catch (e) {
        console.error(e);
        setSessions([]);
      }
    })();
  }, [date, section]);
  const focusRef = React.useRef(null);
  React.useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, []);
  React.useEffect(() => {
    getLogs();
    getSessions();
  }, [getLogs, getSessions]);
  const onComplete = React.useCallback(
    (data) => {
      session === "0" &&
        (async function () {
          try {
            const station = getStation_id();
            if (!station) {
              return dispatch(asyncGetDeliveryStations());
            }
            const delimiter = "|";
            if (data.split(delimiter).length !== 12) {
              return enqueueSnackbar("Invalid barcode reading", {
                variant: "error",
              });
            }
            const result = await postDRxQR({
              data,
              delimiter,
              station,
            });
            apiRef.current?.updateRows([result.data.data]);
          } catch (e) {
            console.error(e);
          }
        })();
    },
    [session, apiRef, dispatch, getStation_id]
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
      },
      {
        field: "rxDate",
        headerName: "Rx Date",
        type: "date",
        valueGetter: (v) => v && new Date(v),
        valueFormatter: (v) => v && dayjs(v).format("M. DD. YY"),
        width: 80,
      },
      {
        field: "patient",
        headerName: "Patient",
        width: 180,
      },
      {
        field: "doctorName",
        headerName: "Prescriber",
        width: 180,
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
        width: 60,
      },
      {
        field: "plan",
        headerName: "Plan",
        width: 80,
      },
      {
        field: "patPay",
        headerName: "Copay",
        type: "number",
        width: 80,
      },
      {
        field: "actions",
        type: "actions",
        width: 52,
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
              <IconButton size="small" aria-label="refresh" onClick={getLogs}>
                <RefreshIcon />
              </IconButton>
            </div>
          </Tooltip>
          <AppButton children={<NoteAddIcon />} onClick={() => {}} />
        </Stack>
      }
      extraActions={
        <Stack direction="row" alignItems="center" spacing={1}>
          <DatePickerSm value={date} onChange={handleChangeDate} />
          {sessions.map((v, i) => (
            <Button
              onClick={() => setSession(v)}
              size="small"
              sx={{
                width: 120,
                color: session === v ? "primary.main" : "text.secondary",
              }}
              children={v}
              key={i}
            />
          ))}
          <Button
            onClick={() => setSession("0")}
            size="small"
            sx={{
              width: 120,
              color: session === "0" ? "primary.main" : "text.secondary",
            }}
            children={
              date.isSame(dayjs(), "d") ? "New Session" : "Not Delivered"
            }
          />
        </Stack>
      }
    >
      <Box sx={{ flex: 1, width: "100%" }}>
        <DataGrid
          apiRef={apiRef}
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
      <div tabIndex="-1" ref={focusRef} />
    </PageContainer>
  );
}
