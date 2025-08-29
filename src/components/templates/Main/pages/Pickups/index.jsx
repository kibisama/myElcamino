import * as React from "react";
import dayjs from "dayjs";
import Alert from "@mui/material/Alert";
import { Box, IconButton, Stack, ToggleButton } from "@mui/material";
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import FilterList from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import BarcodeReaderIcon from "@mui/icons-material/BarcodeReader";
import PrintIcon from "@mui/icons-material/Print";
import EditIcon from "@mui/icons-material/Edit";
// import { useDialogs } from '../hooks/useDialogs/useDialogs';
// import useNotifications from '../hooks/useNotifications/useNotifications';
import PageContainer from "../PageContainer";
import AppButton from "../AppButton";
import Search from "../../../../inputs/Search";
import DatePickerSm from "../../../../inputs/DatePickerSm";
import { searchPickup } from "../../../../../lib/api/client";

const INITIAL_PAGE_SIZE = 10;

export default function Pickups() {
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
  const [rxNumber, setRxNumber] = React.useState("");
  const [date, setDate] = React.useState(null);
  const [filtered, setFiltered] = React.useState(false);
  const disableSearchButton = !rxNumber && !date;
  const actionMode = filtered && rowState.rows !== rowState.filtered;
  const handleChangeDate = React.useCallback((date, context) => {
    if (!context.validationError) {
      if (date) {
        setDate(dayjs(date));
      } else {
        setDate(null);
      }
    }
  }, []);
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
        rowSpanValueGetter: () => null,
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
        width: 188,
        headerAlign: "center",
        align: "center",
        sortable: false,
        renderCell: (params) => (
          <Box sx={{ display: "flex", height: "50px", alignItems: "center" }}>
            <img
              alt={`${params.value}.png`}
              style={{ borderRadius: "4px", height: "48px" }}
              src={
                process.env.REACT_APP_CLIENT_API_ADDRESS +
                `/apps/pickup/png/${params.value}`
              }
            />
          </Box>
        ),
        // resizable: false,
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
        width: 80,
        align: "center",
        getActions: ({ row }) => [
          <GridActionsCellItem
            key={actionMode ? "print-item" : "edit-item"}
            icon={actionMode ? <PrintIcon /> : <EditIcon />}
            label={actionMode ? "Print" : "Edit"}
            onClick={
              actionMode
                ? () =>
                    window.open(
                      `/print/pickups/${row._id}/${row.rxNumber}`,
                      "_blank"
                    )
                : //
                  undefined
            }
          />,
        ],
        rowSpanValueGetter: (v, r) => r._id,
      },
    ],
    [actionMode]
  );
  const search = React.useCallback(() => {
    setError(null);
    setIsLoading(true);
    (async () => {
      try {
        const { data } = await searchPickup({
          rxNumber: rxNumber.trim(),
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
          setError(e);
        }
        setRowState({ rows: [], filtered: [] });
      }
      setIsLoading(false);
    })();
  }, [date, rxNumber]);
  const handleChangeRxNumber = React.useCallback((e) => {
    setRxNumber(e.target.value);
  }, []);
  const handleKeyDown = React.useCallback(
    (e) => {
      if (e.key === "Enter" && !disableSearchButton) {
        search();
      }
    },
    [search, disableSearchButton]
  );

  return (
    <PageContainer
      title="Pickups"
      actions={<AppButton app="Pickup" children={<BarcodeReaderIcon />} />}
      extraActions={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Search
            placeholder="Search Rx…"
            width="18ch"
            onChange={handleChangeRxNumber}
            onKeyDown={handleKeyDown}
          />
          <DatePickerSm value={date} onChange={handleChangeDate} />
          <ToggleButton
            sx={{
              borderRadius: 1,
              width: "2.25rem",
              height: "2.25rem",
              padding: "0.25rem",
            }}
            selected={filtered}
            onChange={() => {
              setFiltered((prev) => !prev);
            }}
          >
            <FilterList />
          </ToggleButton>
          <IconButton
            onClick={search}
            disabled={disableSearchButton}
            size="small"
          >
            <SearchIcon />
          </IconButton>
        </Stack>
      }
    >
      <Box sx={{ flex: 1, width: "100%" }}>
        <DataGrid
          autoPageSize
          columns={columns}
          rows={filtered ? rowState.filtered : rowState.rows}
          rowSpanning={!actionMode}
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
