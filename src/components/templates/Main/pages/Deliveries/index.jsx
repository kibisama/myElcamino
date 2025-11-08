import * as React from "react";
import dayjs from "dayjs";
import { Box, Button, IconButton, Stack, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem, useGridApiRef } from "@mui/x-data-grid";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PrintIcon from "@mui/icons-material/Print";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import PageContainer from "../PageContainer";
import AppButton from "../AppButton";
import useScanDetection from "../../../../../hooks/useScanDetection";
import { useSelector } from "react-redux";
import {
  getDeliveryLogItems,
  getDeliverySessions,
  postDeliveryQR,
  postDeliveryLog,
  unsetDeliveryStation,
  reverseDelivery,
} from "../../../../../lib/api/client";
import { enqueueSnackbar } from "notistack";
import DatePickerSm from "../../../../inputs/DatePickerSm";

const rowHeight = 52;

export default function Deliveries({ section }) {
  const apiRef = useGridApiRef();
  const { activeApp } = useSelector((s) => s.main);
  const [rows, setRows] = React.useState([]);
  const [date, setDate] = React.useState(dayjs());
  const [sessions, setSessions] = React.useState([]);
  const [session, setSession] = React.useState("0");
  const [isLoading, setIsLoading] = React.useState(false);
  const handlePrint = React.useCallback(
    (section, date, session) =>
      window.open(
        `/print/deliveries/${section}/${date.format("MMDDYYYY")}/${session}`,
        "_blank"
      ),
    []
  );
  const postLog = React.useCallback(() => {
    setIsLoading(true);
    (async function () {
      try {
        const { data } = await postDeliveryLog(section);
        const session = data.data?.session;
        setSessions((prev) => [...prev, session]);
        setSession(session);
        setIsLoading(false);
        handlePrint(section, date, session);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    })();
  }, [section, date, handlePrint]);
  const getLogs = React.useCallback(
    (date, session) => {
      setIsLoading(true);
      (async () => {
        try {
          const { data } = await getDeliveryLogItems(
            section,
            date.format("MMDDYYYY"),
            session
          );
          setRows(data.data);
          setIsLoading(false);
        } catch (e) {
          console.error(e);
          setRows([]);
          setIsLoading(false);
        }
      })();
    },
    [section]
  );
  const getSessions = React.useCallback(() => {
    (async () => {
      try {
        const { data } = await getDeliverySessions(
          section,
          date.format("MMDDYYYY")
        );
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
  }, [section]);
  React.useEffect(() => {
    getSessions();
    getLogs(date, session);
  }, [date, session, getLogs, getSessions]);
  React.useEffect(() => {
    setSession("0");
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
      (async function () {
        try {
          const result = await postDeliveryQR(section, {
            data,
            delimiter,
          });
          apiRef.current?.updateRows([result.data.data]);
          enqueueSnackbar("The Rx has been updated successfully.", {
            variant: "success",
          });
        } catch (e) {
          console.error(e);
          enqueueSnackbar(e.response?.data.message || e.message, {
            variant: "error",
          });
        }
      })();
    },
    [section, apiRef]
  );
  useScanDetection({ onComplete, disabled: activeApp });

  const handleRefresh = React.useCallback(
    () => getLogs(date, session),
    [getLogs, date, session]
  );

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
            disabled={row.log && row.returnDate}
            icon={row.log ? <AssignmentReturnIcon /> : <DeleteIcon />}
            label={"Delete"}
            onClick={
              row.log
                ? () =>
                    (async function () {
                      const id = row.id;
                      try {
                        await reverseDelivery(id);
                        const { data } = await reverseDelivery(id);
                        apiRef.current?.updateRows([
                          { id, returnDate: data.data.returnDate },
                        ]);
                        enqueueSnackbar(
                          "The Rx has been returned successfully.",
                          {
                            variant: "success",
                          }
                        );
                      } catch (e) {
                        console.error(e);
                        enqueueSnackbar(e.response?.data.message || e.message, {
                          variant: "error",
                        });
                      }
                    })()
                : () =>
                    (async function () {
                      const id = row.id;
                      try {
                        await unsetDeliveryStation(id);
                        apiRef.current?.updateRows([{ id, _action: "delete" }]);
                      } catch (e) {
                        console.error(e);
                        enqueueSnackbar(e.response?.data.message || e.message, {
                          variant: "error",
                        });
                      }
                    })()
            }
          />,
        ],
      },
    ],
    [apiRef]
  );
  const handleChangeDate = React.useCallback(
    (date, context) => {
      if (!context.validationError) {
        if (date) {
          const day = dayjs(date);
          setDate(day);
          getLogs(day, session);
        } else {
          setDate(null);
        }
      }
    },
    [getLogs, session]
  );

  return (
    <PageContainer
      breadcrumbs={[{ title: "Deliveries" }, { title: "" }]}
      title={section}
      actions={
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            disabled={isLoading || session === "0"}
            size="small"
            aria-label="print"
            onClick={() => handlePrint(section, date, session)}
          >
            <PrintIcon />
          </IconButton>
          <Tooltip title="Reload data" placement="right" enterDelay={1000}>
            <div>
              <IconButton
                disabled={isLoading}
                size="small"
                aria-label="refresh"
                onClick={handleRefresh}
              >
                <RefreshIcon />
              </IconButton>
            </div>
          </Tooltip>
          <AppButton children={<NoteAddIcon />} onClick={postLog} />
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
            "& .returned": { textDecoration: "line-through" },
          }}
          getRowClassName={(params) =>
            params.row.returnDate && session !== "0" && "returned"
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
