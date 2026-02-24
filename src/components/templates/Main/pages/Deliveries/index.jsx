import * as React from "react";
import dayjs from "dayjs";
import { Box, Button, IconButton, Stack, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PrintIcon from "@mui/icons-material/Print";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import PageContainer from "../PageContainer";
import AppButton from "../AppButton";
import useScanDetection from "../../../../../hooks/useScanDetection";
import { useSelector } from "react-redux";
import { client, get, post } from "../../../../../lib/api";
import { enqueueSnackbar } from "notistack";
import DatePickerSm from "../../../../inputs/DatePickerSm";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const rowHeight = 52;

export default function Deliveries({ section }) {
  // const apiRef = useGridApiRef();
  const { activeApp, deliveries } = useSelector((s) => s.main);
  const [date, setDate] = React.useState(dayjs());
  const [session, setSession] = React.useState("0");

  const station = deliveries[section];
  const {
    data: sessions,
    // isLoading: isLoadingSessions,
    error: sessionsError,
    mutate: refreshSessions,
  } = useSWR(
    station
      ? `/delivery/${station.invoiceCode}/${date.format("MMDDYYYY")}`
      : null,
    get,
  );

  const {
    data: rows,
    isLoading: isLoadingRows,
    error: rowsError,
    mutate: refreshRows,
  } = useSWR(
    station
      ? `/delivery/${station.invoiceCode}/${date.format("MMDDYYYY")}/${session === "0" ? "0" : session.session}`
      : null,
    get,
  );

  const { trigger: triggerPostQr } = useSWRMutation(
    station ? `/delivery/${station.invoiceCode}/qr` : null,
    post,
    {
      onSuccess: () => {
        refreshRows();
        enqueueSnackbar("The Rx has been updated successfully.", {
          variant: "success",
        });
      },
      onError: (e) => {
        enqueueSnackbar(e.response?.data.message || e.message, {
          variant: "error",
        });
      },
    },
  );

  const { trigger: triggerPostLog } = useSWRMutation(
    station ? `/delivery/${station.invoiceCode}` : null,
    post,
    // { onSuccess: refreshRows },
  );

  const handlePrint = React.useCallback(
    (section, date, session) =>
      window.open(
        `/print/deliveries/${section}/${date.format("MMDDYYYY")}/${session}`,
        "_blank",
      ),
    [],
  );

  const focusRef = React.useRef(null);
  React.useEffect(() => {
    setSession("0");
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, [section]);

  const onComplete = React.useCallback(
    (data) => {
      const delimiter = "|";
      const split = data.split(delimiter);
      if (split.length !== 12 || !split[0].match(/^\d{8,}$/)) {
        return enqueueSnackbar("Invalid barcode reading", {
          variant: "error",
        });
      }
      triggerPostQr({ data, delimiter });
    },
    [triggerPostQr],
  );

  const { trigger: triggerUnset } = useSWRMutation(
    station ? `/delivery/unset` : null,
    (url, { arg }) => client.get(`${url}/${arg.rxID}`),
    {
      onSuccess: () => {
        refreshRows();
        enqueueSnackbar("The Rx has been updated successfully.", {
          variant: "success",
        });
      },
      onError: (e) => {
        enqueueSnackbar(e.response?.data.message || e.message, {
          variant: "error",
        });
      },
    },
  );

  const { trigger: triggerReturn } = useSWRMutation(
    station ? `/delivery/return` : null,
    (url, { arg }) => client.get(`${url}/${arg.rxID}`),
    {
      onSuccess: () => {
        refreshRows();
        enqueueSnackbar("The Rx has been updated successfully.", {
          variant: "success",
        });
      },
      onError: (e) => {
        enqueueSnackbar(e.response?.data.message || e.message, {
          variant: "error",
        });
      },
    },
  );

  useScanDetection({ onComplete, disabled: activeApp });

  const handleRefresh = () => {
    refreshSessions();
    refreshRows();
  };

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
        headerName: "Rx #",
        type: "number",
        width: 84,
      },
      {
        field: "rxDate",
        headerName: "Rx Date",
        type: "date",
        valueGetter: (v) => v && new Date(v),
        valueFormatter: (v) => v && dayjs(v).format("M. DD. YY"),
        width: 84,
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
            disabled={
              session !== "0" && row.logHistory?.includes(session.logId)
            }
            icon={row.log ? <AssignmentReturnIcon /> : <DeleteIcon />}
            label={"Delete"}
            onClick={
              session === "0"
                ? () => triggerUnset({ rxID: row.id })
                : () => triggerReturn({ rxID: row.id })
            }
          />,
        ],
      },
    ],
    [session, triggerReturn, triggerUnset],
  );
  const handleChangeDate = React.useCallback(
    (date, context) => {
      if (!context.validationError) {
        if (date) {
          const day = dayjs(date);
          setDate(day);
          refreshRows();
        } else {
          setDate(null);
        }
      }
    },
    [refreshRows],
  );

  return (
    <PageContainer
      breadcrumbs={[{ title: "Deliveries" }, { title: "" }]}
      title={station.name}
      actions={
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            disabled={isLoadingRows || session === "0"}
            size="small"
            aria-label="print"
            onClick={() =>
              handlePrint(
                section,
                date,
                session === "0" ? "0" : session.session,
              )
            }
          >
            <PrintIcon />
          </IconButton>
          <Tooltip title="Reload data" placement="right" enterDelay={1000}>
            <div>
              <IconButton
                disabled={isLoadingRows}
                size="small"
                aria-label="refresh"
                onClick={handleRefresh}
              >
                <RefreshIcon />
              </IconButton>
            </div>
          </Tooltip>
          <AppButton
            children={<NoteAddIcon />}
            onClick={() => triggerPostLog()}
          />
        </Stack>
      }
      extraActions={
        <Stack direction="row" alignItems="center" spacing={1}>
          <DatePickerSm value={date} onChange={handleChangeDate} />
          {sessions?.map((v, i) => (
            <Button
              onClick={() => setSession(v)}
              size="small"
              sx={{
                width: 120,
                color:
                  session.logId && session.logId === v.logId
                    ? "primary.main"
                    : "text.secondary",
              }}
              children={v.session}
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
          autoPageSize
          columns={columns}
          rows={rowsError ? [] : rows}
          showCellVerticalBorder
          disableColumnMenu
          disableRowSelectionOnClick
          loading={isLoadingRows}
          pageSizeOptions={[]}
          sx={{
            maxHeight: rowHeight * 100,
            "& .returned": { textDecoration: "line-through" },
          }}
          getRowClassName={(params) =>
            session !== "0" &&
            params.row.logHistory?.includes(session.logId) &&
            "returned"
          }
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
