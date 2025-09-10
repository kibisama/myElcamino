// todo: send length of rxNumbers and if length = 1, both print and edit icons

import * as React from "react";
import dayjs from "dayjs";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import RefreshIcon from "@mui/icons-material/Refresh";
import BarcodeReaderIcon from "@mui/icons-material/BarcodeReader";
import PrintIcon from "@mui/icons-material/Print";
import EditIcon from "@mui/icons-material/Edit";
import PageContainer from "../PageContainer";
import AppButton from "../AppButton";
import Search from "../../../../inputs/Search";
import DatePickerSm from "../../../../inputs/DatePickerSm";
import { searchPickup } from "../../../../../lib/api/client";
import { enqueueSnackbar } from "notistack";
import NumericFormat from "../../apps/Pickup/NumericFormat";

const PrintAction = ({ row }) => (
  <GridActionsCellItem
    key="print-item"
    icon={<PrintIcon />}
    label={"Print"}
    onClick={() =>
      window.open(`/print/pickups/${row._id}/${row.rxNumber}`, "_blank")
    }
  />
);
const EditAction = ({ row }) => (
  <GridActionsCellItem
    key="edit-item"
    icon={<EditIcon />}
    label={"Edit"}
    onClick={() => {}}
  />
);

const rowHeight = 88;

export default function Pickups() {
  const [rowState, setRowState] = React.useState({ rows: [], filtered: [] });
  const [isLoading, setIsLoading] = React.useState(false);
  const [rxNumber, setRxNumber] = React.useState("");
  const [date, setDate] = React.useState(null);
  const [filtered, setFiltered] = React.useState(false);
  const [lastQuery, setLastQuery] = React.useState({
    rxNumber: "",
    date: null,
  });
  const [rowSpanning, setRowSpanning] = React.useState(true);
  const columns = React.useMemo(
    () => [
      {
        field: "rxNumber",
        headerName: "Rx Number",
        type: "number",
        width: 120,
        headerAlign: "center",
        align: "center",
        sortable: false,
        rowSpanValueGetter: (v, r) => null,
      },
      {
        field: "deliveryDate",
        headerName: "Delivery Date",
        type: "date",
        width: 160,
        headerAlign: "center",
        align: "center",
        valueGetter: (v) => new Date(v),
        valueFormatter: (v) => dayjs(v).format("M. D. YYYY HH:mm"),
        rowSpanValueGetter: (v, r) => r._id,
      },
      {
        field: "_id",
        headerName: "Signature",
        width: 256,
        headerAlign: "center",
        align: "center",
        sortable: false,
        renderCell: (params) => (
          <img
            style={{ borderRadius: "4px", height: "72px" }}
            src={
              process.env.REACT_APP_CLIENT_API_ADDRESS +
              `/apps/pickup/png/${params.value}`
            }
          />
        ),
        rowSpanValueGetter: (v, r) => r._id,
      },
      {
        field: "relation",
        headerName: "Relation",
        width: 160,
        headerAlign: "center",
        align: "center",
        sortable: false,
        rowSpanValueGetter: (v, r) => r._id,
      },
      {
        field: "notes",
        headerName: "Notes",
        flex: 1,
        sortable: false,
        rowSpanValueGetter: (v, r) => r._id,
      },
      {
        field: "actions",
        type: "actions",
        width: 96,
        align: "center",
        resizable: false,
        getActions: ({ row }) => {
          const actions = [];
          (!(filtered && lastQuery.rxNumber) || row.length === 1) &&
            actions.push(<EditAction row={row} />);
          ((filtered && lastQuery.rxNumber) || row.length === 1) &&
            actions.push(<PrintAction row={row} />);
          return actions;
        },
        rowSpanValueGetter: (v, r) => r._id,
      },
    ],
    [filtered, lastQuery]
  );
  const search = React.useCallback((date, _rxNumber = "") => {
    const rxNumber = _rxNumber.trim();
    setIsLoading(true);
    setRowSpanning(false);
    setRowState({ rows: [], filtered: [] });
    setLastQuery({
      rxNumber,
      date,
    });
    (async () => {
      try {
        const { data } = await searchPickup({
          rxNumber,
          date,
        });
        const rows = data.data;
        setRowState({
          rows,
          filtered: rxNumber
            ? rows.filter((v) => v.rxNumber === rxNumber)
            : rows,
        });
      } catch (e) {
        const { status } = e;
        if (status !== 404) {
          enqueueSnackbar(e.response?.data.message || e.message, {
            variant: "error",
          });
        }
      }
      setRowSpanning(true);
      setIsLoading(false);
    })();
  }, []);
  const handleChangeDate = React.useCallback(
    (date, context) => {
      if (!context.validationError) {
        setDate(date);
        (date || rxNumber) && search(date, rxNumber);
      }
    },
    [search, rxNumber]
  );
  const handleChangeRxNumber = React.useCallback((e) => {
    setRxNumber(e.target.value);
  }, []);
  const handleChangeFiltered = React.useCallback(() => {
    setFiltered((prev) => {
      if (prev) {
        setRowSpanning(true);
      } else if (lastQuery.rxNumber) {
        setRowSpanning(false);
      }
      return !prev;
    });
  }, [lastQuery]);
  const handleKeyDown = React.useCallback(
    (e) => {
      if (e.key === "Enter" && (date || rxNumber)) {
        search(date, rxNumber);
      }
    },
    [search, date, rxNumber]
  );
  const handleRefresh = React.useCallback(() => {
    if (!isLoading) {
      const { rxNumber, date } = lastQuery;
      (rxNumber || date) && search(date, rxNumber);
    }
  }, [isLoading, lastQuery, search]);

  return (
    <PageContainer
      title="Pickups"
      actions={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Tooltip title="Reload data" placement="right" enterDelay={1000}>
            <div>
              <IconButton
                size="small"
                aria-label="refresh"
                onClick={handleRefresh}
              >
                <RefreshIcon />
              </IconButton>
            </div>
          </Tooltip>
          <AppButton app="Pickup" children={<BarcodeReaderIcon />} />
        </Stack>
      }
      extraActions={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Search
            slotProps={{ input: { inputComponent: NumericFormat } }}
            placeholder="Search Rx…"
            width="18ch"
            onChange={handleChangeRxNumber}
            onKeyDown={handleKeyDown}
          />
          <DatePickerSm value={date} onChange={handleChangeDate} />
          <IconButton onClick={handleChangeFiltered} size="small">
            {filtered ? <ViewHeadlineIcon /> : <SplitscreenIcon />}
          </IconButton>
        </Stack>
      }
    >
      <Box sx={{ flex: 1, width: "100%" }}>
        <DataGrid
          rowHeight={rowHeight}
          autoPageSize
          columns={columns}
          rows={filtered ? rowState.filtered : rowState.rows}
          rowSpanning={rowSpanning}
          showCellVerticalBorder
          disableColumnMenu
          disableRowSelectionOnClick
          loading={isLoading}
          pageSizeOptions={[]}
          sx={{
            maxHeight: rowHeight * 100,
            [`& .${gridClasses.cell}`]: {
              display: "flex",
              alignItems: "center",
            },
            [`& .${gridClasses.row}:hover`]: {
              backgroundColor: "inherit",
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
