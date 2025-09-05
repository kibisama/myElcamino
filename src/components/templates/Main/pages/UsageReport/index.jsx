import * as React from "react";
import dayjs from "dayjs";
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import BarcodeReaderIcon from "@mui/icons-material/BarcodeReader";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
// import { useDialogs } from '../hooks/useDialogs/useDialogs';
import DatePickerSm from "../../../../inputs/DatePickerSm";
import PageContainer from "../PageContainer";
import { enqueueSnackbar } from "notistack";
import { getInventoryUsage } from "../../../../../lib/api/client";

const INITIAL_PAGE_SIZE = 10;

export default function UsageReport() {
  // const dialogs = useDialogs();
  const [date, setDate] = React.useState(dayjs());
  const [rows, setRows] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const initialState = React.useMemo(
    () => ({
      pagination: { paginationModel: { pageSize: INITIAL_PAGE_SIZE } },
    }),
    []
  );

  // row count wrong label present

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
      },
      {
        field: "name",
        headerName: "Item",
        width: 240,
      },
      {
        field: "qty",
        headerName: "Qty",
        type: "number",
        width: 80,
        sortable: false,
      },
      { field: "cahPrd", headerName: "Cah Cost", width: 120, sortable: false },
      {
        field: "cahSrc",
        headerName: "Cah Contract",
        width: 120,
        sortable: false,
      },
      {
        field: "psPkg",
        headerName: "Ps Cost",
        width: 120,
        sortable: false,
      },
      {
        field: "psAlt",
        headerName: "Ps Deal",
        width: 120,
        sortable: false,
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
  const search = React.useCallback((date) => {
    setIsLoading(true);
    (async () => {
      try {
        const { data } = await getInventoryUsage(date);
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
  }, []);

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
    search(dayjs().format("MMDDYYYY"));
  }, [search]);
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
