import * as React from "react";
import dayjs from "dayjs";
import {
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
  Tooltip,
} from "@mui/material";
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import RefreshIcon from "@mui/icons-material/Refresh";
// import { useDialogs } from '../hooks/useDialogs/useDialogs';
import DatePickerSm from "../../../../inputs/DatePickerSm";
import PageContainer from "../PageContainer";
import { enqueueSnackbar, closeSnackbar } from "notistack";
import { getInventoryUsage } from "../../../../../lib/api/client";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

import { io } from "socket.io-client";

const URL = process.env.REACT_APP_CLIENT_API_ADDRESS + "/invUsage";
let socket;

const getStockStatus = (cah_stockStatus) => {
  let color, variant;
  switch (cah_stockStatus) {
    case "IN STOCK":
      color = "success";
      break;
    case "OUT OF STOCK":
      color = "error";
      break;
    case "LOW STOCK":
      color = "warning";
      variant = "outlined";
      break;
    default:
      return;
  }
  return <Chip label="In Stock" color={color} variant={variant} />;
};
const stringToNumber = (string) => {
  return Number(string.replaceAll(/[^0-9.-]+/g, ""));
};
const getPriceMatched = (
  cah_lastSFDCDate,
  cah_lastSFDCCost,
  cah_estNetCost
) => {
  let color, variant;
  switch (true) {
    case !cah_lastSFDCDate:
      return;
    case stringToNumber(cah_estNetCost) > stringToNumber(cah_lastSFDCCost):
      color = "error";
      break;
    case dayjs(cah_lastSFDCDate, "MM/DD/YYYY").isBefore(
      dayjs().subtract(90, "d")
    ):
      color = "warning";
      variant = "outlined";
      break;
    default:
      color = "success";
  }
  return <Chip label="Matched" color={color} variant={variant} />;
};

const CustomCell = ({ title, subtitle, onClick }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <Box
      sx={onClick && { cursor: "pointer" }}
      onMouseEnter={onClick && (() => setHover(true))}
      onMouseLeave={onClick && (() => setHover(false))}
      onClick={onClick}
    >
      <Typography
        sx={
          subtitle && {
            fontSize: 14,
            color: onClick && hover ? "primary.main" : "text.primary",
          }
        }
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          className="subtitle"
          sx={{
            fontSize: 11,
            color: onClick && hover ? "primary.dark" : "text.secondary",
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

const rowHeight = 64;

const Page = ({ socket }) => {
  // const dialogs = useDialogs();
  const [date, setDate] = React.useState(dayjs());
  const [rows, setRows] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [checkState, setCheckState] = React.useState({});

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
        width: 80,
      },
      {
        field: "name",
        headerName: "Item",
        flex: 1,
        cellClassName: "layered",
        renderCell: (params) => (
          <CustomCell title={params.row.name} subtitle={params.row.mfr} />
        ),
      },
      {
        field: "qty",
        headerName: "Qty",
        type: "number",
        width: 52,
        headerAlign: "center",
        align: "center",
        sortable: false,
      },
      {
        field: "row.cah_estNetCost",
        headerName: "@CaH",
        sortable: false,
        cellClassName: "layered",
        renderCell: (params) => (
          <React.Fragment>
            {params.row.cah_status === "ACTIVE" ? (
              <CustomCell
                title={params.row.cah_estNetCost}
                subtitle={params.row.cah_netUoiCost}
                onClick={() => {
                  params.row.cah_cin &&
                    window.open(
                      `https://vantus.cardinalhealth.com/product/${params.row.cah_cin}?tab=more-details`,
                      "_blank"
                    );
                }}
              />
            ) : params.row.cah_status === "PENDING" ? (
              <div className="pending">
                <CircularProgress size={24} />
              </div>
            ) : params.row.cah_status === "NA" ? (
              <span className="na">NA</span>
            ) : null}
          </React.Fragment>
        ),
      },
      {
        field: "ps_status",
        headerName: "@Ps",
        sortable: false,
        cellClassName: "layered",
        renderCell: (params) => (
          <React.Fragment>
            {params.row.cah_status === "ACTIVE" ? (
              <CustomCell
                title={params.row.ps_pkgPrice}
                subtitle={params.row.ps_unitPrice}
                onClick={() => {
                  params.row.ps_ndc &&
                    window.open(
                      `https://pharmsaver.net/Pharmacy/Order.aspx?q=${params.row.ps_ndc}`,
                      "_blank"
                    );
                }}
              />
            ) : params.row.cah_status === "PENDING" ? (
              <div className="pending">
                <CircularProgress size={24} />
              </div>
            ) : params.row.cah_status === "NA" ? (
              <span className="na">NA</span>
            ) : null}
          </React.Fragment>
        ),
      },
      {
        field: "psAlt",
        headerName: "Ps Deal",
        sortable: false,
      },
      {
        field: "cah_stockStatus",
        headerName: "",
        headerAlign: "center",
        align: "center",
        sortable: false,
        resizable: false,
        width: 158,
        cellClassName: "layered",
        renderCell: (params) =>
          params.row.cah_status === "ACTIVE" && (
            <Stack direction="row" spacing={1}>
              {getStockStatus(params.row.cah_stockStatus)}
              {getPriceMatched(
                params.row.cah_lastSFDCDate,
                params.row.cah_lastSFDCCost,
                params.row.cah_estNetCost
              )}
            </Stack>
          ),
      },
      {
        field: "actions",
        type: "actions",
        width: 96,
        align: "center",
        resizable: false,
        getActions: ({ row }) => [
          <GridActionsCellItem
            key="copy-ndc"
            icon={<ContentCopyIcon />}
            label="Copy"
            onClick={(e) => {
              if (row.ndc) {
                const textArea = document.createElement("textarea");
                textArea.value = row.ndc;
                document.body.appendChild(textArea);
                textArea.focus({ preventScroll: true });
                textArea.select();
                try {
                  document.execCommand("copy");
                  enqueueSnackbar(
                    "The item NDC has been copied to the clipboard.",
                    { variant: "success" }
                  );
                } catch (err) {
                  console.error("Unable to copy to clipboard", err);
                }
                document.body.removeChild(textArea);
              }
            }}
          />,
          <GridActionsCellItem
            key="check-item"
            icon={<CheckIcon />}
            label="Check"
            onClick={() => {
              socket.emit(
                "check",
                dayjs(row.time).format("MMDDYYYY"),
                row.gtin
              );
            }}
          />,
        ],
      },
    ],
    [socket]
  );
  const search = React.useCallback(
    (date) => {
      (async () => {
        setIsLoading(true);
        try {
          const { data } = await getInventoryUsage(date);
          socket.emit("refresh", date);
          setRows(data.data);
        } catch (e) {
          console.error(e);
          const { status } = e;
          if (status !== 404) {
            enqueueSnackbar(e.response?.data.message || e.message, {
              variant: "error",
            });
          }
          setRows([]);
        }
        setIsLoading(false);
      })();
    },
    [socket]
  );

  const handleChangeDate = React.useCallback(
    (date, context) => {
      if (!context.validationError) {
        if (date) {
          const day = dayjs(date);
          setDate(day);
          search(day.format("MMDDYYYY"));
        } else {
          setDate(null);
        }
      }
    },
    [search]
  );
  React.useEffect(() => {
    const date = dayjs().format("MMDDYYYY");
    search(date);
  }, [search]);
  React.useEffect(() => {
    function onRefresh(data) {
      setCheckState(data);
    }

    socket.on("refresh", onRefresh);
    return () => {
      socket.off("refresh", onRefresh);
    };
  }, [socket]);
  return (
    <PageContainer
      title="Usage Report"
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
          rowHeight={rowHeight}
          sx={{
            maxHeight: rowHeight * 100,
            "& .na": { color: "text.disabled" },
            "& .done": { textDecoration: "line-through" },
            "& .layered": { display: "flex", alignItems: "center" },
            "& .pending": {
              display: "flex",
              width: "inherit",
              justifyContent: "center",
            },
            [`& .${gridClasses.row}:hover`]: {
              backgroundColor: "inherit",
            },
          }}
          getRowClassName={(params) => checkState?.[params.row.gtin] && "done"}
          autoPageSize
          columns={columns}
          rows={rows}
          showCellVerticalBorder
          disableColumnMenu
          disableRowSelectionOnClick
          loading={isLoading}
          pageSizeOptions={[]}
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
};

export default function UsageReport() {
  if (!socket) {
    socket = io(URL);
  } else {
    socket.connect();
  }
  React.useEffect(() => {
    const key = "APPS_PICKUP_CONNECT_ERROR";
    socket.on("connect_error", (e) => {
      enqueueSnackbar("Unable to connect to the server.", {
        persist: true,
        variant: "error",
        key,
        preventDuplicate: true,
      });
    });
    socket.on("connect", () => {
      closeSnackbar(key);
    });

    return () => {
      socket.disconnect();
      closeSnackbar(key);
    };
  }, []);
  return <Page socket={socket} />;
}
