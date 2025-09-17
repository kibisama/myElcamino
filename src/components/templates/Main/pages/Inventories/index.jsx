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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DataGrid, GridActionsCellItem, useGridApiRef } from "@mui/x-data-grid";
import BarcodeReaderIcon from "@mui/icons-material/BarcodeReader";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import ForwardIcon from "@mui/icons-material/Forward";
import AppButton from "../AppButton";
import PageContainer from "../PageContainer";
import { enqueueSnackbar } from "notistack";
import { getInventories, postScanInv } from "../../../../../lib/api/client";
import Autocomplete from "./Autocomplete";

const rowHeight = 42;

export default function Inventories() {
  const apiRef = useGridApiRef();
  const theme = useTheme();
  const isOverMdViewport = useMediaQuery(theme.breakpoints.up("md"));
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
        getActions: ({ row }) => {
          const actions = [];
          const handleActions = async (mode) => {
            try {
              const { data } = await postScanInv({
                mode,
                method: "EDIT",
                gtin: row.gtin,
                lot: row.lot,
                sn: row.sn,
                exp: dayjs(row.exp).format("YYMMDD"),
              });
              const { data: item, code, message } = data;
              enqueueSnackbar(message, {
                variant:
                  code === 200 ? "success" : code === 208 ? "info" : "warning",
              });
              apiRef.current?.updateRows([
                {
                  id: row.id,
                  dateFilled: item.dateFilled,
                  dateReturned: item.dateReturned,
                },
              ]);
            } catch (e) {
              console.error(e);
              enqueueSnackbar(e.response?.data.message || e.message, {
                variant: "error",
              });
            }
          };

          row.dateFilled || row.dateReturned
            ? actions.push(
                <Tooltip
                  title="Reverse"
                  arrow
                  placement="right"
                  enterDelay={1000}
                >
                  <GridActionsCellItem
                    key="reverse-item"
                    icon={<ArchiveIcon />}
                    label="Reverse"
                    onClick={() => handleActions("REVERSE")}
                  />
                </Tooltip>
              )
            : actions.push(
                <Tooltip title="Fill" arrow placement="left" enterDelay={1000}>
                  <GridActionsCellItem
                    key="fill-item"
                    icon={<UnarchiveIcon />}
                    label="Fill"
                    onClick={() => handleActions("FILL")}
                  />
                </Tooltip>,
                <Tooltip
                  title="Return"
                  arrow
                  placement="right"
                  enterDelay={1000}
                >
                  <GridActionsCellItem
                    key="return-item"
                    icon={<ForwardIcon />}
                    label="Return"
                    onClick={() => handleActions("RETURN")}
                  />
                </Tooltip>
              );
          return actions;
        },
      },
    ],
    [apiRef]
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
          <Tooltip
            title="Reload data"
            arrow
            placement="bottom"
            enterDelay={1000}
          >
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
        <Stack
          direction={isOverMdViewport ? "row" : "column"}
          alignItems={isOverMdViewport ? "center" : "flex-start"}
          spacing={1}
        >
          <Autocomplete refresh={refreshAutocomplete} onChange={handleChange} />
          <Select
            size="small"
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
          apiRef={apiRef}
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
              case !!params.row.dateFilled || !!params.row.dateReturned:
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
