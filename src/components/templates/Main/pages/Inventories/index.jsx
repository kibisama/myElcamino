import * as React from "react";
import dayjs from "dayjs";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import BarcodeReaderIcon from "@mui/icons-material/BarcodeReader";
import RefreshIcon from "@mui/icons-material/Refresh";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
// import { useDialogs } from '../hooks/useDialogs/useDialogs';
import AppButton from "../AppButton";
import PageContainer from "../PageContainer";
import { enqueueSnackbar } from "notistack";
import { getInventories } from "../../../../../lib/api/client";
import Autocomplete from "./Autocomplete";

const rowHeight = 42;

export default function Inventories() {
  // const dialogs = useDialogs();

  const [_id, set_Id] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [refreshAutocomplete, setRefreshAutocomplete] = React.useState(false);
  const [sort, setSort] = React.useState("dateReceived");

  const columns = React.useMemo(
    () => [
      {
        field: "lot",
        headerName: "Lot",
        width: 120,
        sortable: false,

        colSpan: (value, row) => (row.label ? 10 : undefined),
      },
      {
        field: "sn",
        headerName: "Serial Number",
        flex: 1,
        sortable: false,
      },
      {
        field: "source",
        headerName: "Source",
        width: 72,
        valueFormatter: (v) =>
          v === "CARDINAL" ? "CaHlth" : v === "SECONDARY" ? "2ND" : "",
        sortable: false,
      },
      {
        field: "invoiceRef",
        headerName: "Invoice",
        width: 120,
        sortable: false,
      },
      { field: "cost", headerName: "Cost", width: 120, sortable: false },
      {
        field: "exp",
        headerName: "Exp. Date",
        type: "date",
        headerAlign: "center",
        align: "center",
        valueGetter: (v) => v && new Date(v),
        valueFormatter: (v) => v && dayjs(v).format("M. D. YYYY"),
        sortable: false,
      },
      {
        field: "dateReceived",
        headerName: "Received",
        type: "date",
        headerAlign: "center",
        align: "center",
        valueGetter: (v) => v && new Date(v),
        valueFormatter: (v) => v && dayjs(v).format("M. D. YYYY"),
        sortable: false,
      },
      {
        field: "dateFilled",
        headerName: "Filled",
        type: "date",
        headerAlign: "center",
        align: "center",
        valueGetter: (v) => v && new Date(v),
        valueFormatter: (v) => v && dayjs(v).format("M. D. YYYY"),
        sortable: false,
      },
      {
        field: "dateReturned",
        headerName: "Returned",
        type: "date",
        headerAlign: "center",
        align: "center",
        valueGetter: (v) => v && new Date(v),
        valueFormatter: (v) => v && dayjs(v).format("M. D. YYYY"),
        sortable: false,
      },
      {
        field: "actions",
        type: "actions",
        width: 96,
        align: "center",
        resizable: false,
        getActions: ({ row }) => [
          <GridActionsCellItem
            key="receive-item"
            icon={<UnarchiveIcon />}
            label="Receive"
            onClick={() => {}}
          />,
        ],
      },
    ],
    []
  );
  const search = React.useCallback((_id, checked, sort) => {
    setIsLoading(true);
    (async () => {
      try {
        const { data } = await getInventories({ _id, filled: checked, sort });
        setRows(data.data);
      } catch (e) {
        console.error(e);
        const { status } = e;
        if (status !== 404) {
          enqueueSnackbar(e.response?.data.message || e.message, {
            variant: "error",
          });
        }
        setRows({ rows: [], count: 0 });
      }
      setIsLoading(false);
    })();
  }, []);
  const handleChange = React.useCallback(
    (e, value) => {
      if (value) {
        const { _id } = value;
        search(_id, checked, sort);
        return set_Id(_id);
      } else {
        return set_Id("");
      }
    },
    [checked, sort, search]
  );
  const handleCheckbox = React.useCallback(() => {
    setChecked((prev) => {
      let _sort = sort;
      if (prev && _sort === "dateFilled") {
        _sort = "dateReceived";
        setSort("dateReceived");
      }
      _id && search(_id, !prev, _sort);
      return !prev;
    });
  }, [_id, sort, search]);
  const handleSort = React.useCallback(
    (e) => {
      setSort(() => {
        const { value } = e.target;
        _id && search(_id, checked, value);
        return value;
      });
    },
    [_id, checked, search]
  );

  return (
    <PageContainer
      title="Inventories"
      actions={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Tooltip title="Reload data" placement="right" enterDelay={1000}>
            <div>
              <IconButton
                size="small"
                aria-label="refresh"
                onClick={() => {
                  setRefreshAutocomplete((prev) => !prev);
                  _id && search(_id, checked, sort);
                }}
              >
                <RefreshIcon />
              </IconButton>
            </div>
          </Tooltip>
          <AppButton app={"ScanInv"}>
            <BarcodeReaderIcon />
          </AppButton>
        </Stack>
      }
      extraActions={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Autocomplete refresh={refreshAutocomplete} onChange={handleChange} />
          <Select
            value={sort}
            onChange={handleSort}
            labelId="sort-label"
            name="sort"
            sx={{ width: "22ch" }}
          >
            <MenuItem value="dateReceived">Sort by received</MenuItem>
            {checked && <MenuItem value="dateFilled">Sort by filled</MenuItem>}
            {checked && (
              <MenuItem value="dateReturned">Sort by returned</MenuItem>
            )}
            <MenuItem value="exp">Sort by exp.</MenuItem>
          </Select>
          <FormControlLabel
            control={
              <Checkbox
                onChange={handleCheckbox}
                sx={{ height: 28, width: 28 }}
                checked={checked}
              />
            }
            label="Show all"
          />
        </Stack>
      }
    >
      <Box sx={{ flex: 1, width: "100%" }}>
        <DataGrid
          rowHeight={rowHeight}
          sx={{
            maxHeight: rowHeight * 100,
            "& .filled": { color: "text.disabled" },
            "& .label": { fontWeight: 600 },
          }}
          autoPageSize
          columns={columns}
          rows={rows}
          showCellVerticalBorder
          disableColumnMenu
          disableRowSelectionOnClick
          loading={isLoading}
          pageSizeOptions={[]}
          getRowClassName={(params) => {
            switch (true) {
              case !!params.row.dateFilled:
                return "filled";
              case !!params.row.label:
                return "label";
              default:
            }
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
