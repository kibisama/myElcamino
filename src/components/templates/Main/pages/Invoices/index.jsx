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
import { DataGrid, GridActionsCellItem, useGridApiRef } from "@mui/x-data-grid";
import RefreshIcon from "@mui/icons-material/Refresh";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import EditIcon from "@mui/icons-material/Edit";
import AppButton from "../AppButton";
import PageContainer from "../PageContainer";
import { enqueueSnackbar } from "notistack";

const rowHeight = 42;

export default function Invoices() {
  const apiRef = useGridApiRef();
  const [station, setStation] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const columns = React.useMemo(
    () => [
      {
        field: "invoiceNumber",
        headerName: "Invoice #",
        // width: 120,
      },
      {
        field: "date",
        headerName: "Invoice Date",
        type: "date",
        valueGetter: (v) => v && new Date(v),
        valueFormatter: (v) => v && dayjs(v).format("M. DD. YY"),
        // width: 120,
      },
      {
        field: "stationDisplayName",
        headerName: "Station",
        // width: 104,
      },
      {
        field: "datePeriodStart",
        headerName: "Start Date",
        type: "date",
        valueGetter: (v) => v && new Date(v),
        valueFormatter: (v) => v && dayjs(v).format("M. DD. YY"),
        // width: 120,
      },
      {
        field: "datePeriodEnd",
        headerName: "End Date",
        type: "date",
        valueGetter: (v) => v && new Date(v),
        valueFormatter: (v) => v && dayjs(v).format("M. DD. YY"),
        // width: 120,
      },
      {
        field: "billingAddress",
        headerName: "Billing Address",
        flex: 1,
      },
      {
        field: "count",
        headerName: "Count",
        // type: "number",
        // width: 120,
      },
      {
        field: "due",
        headerName: "Total",
        // type: "number",
        // width: 120,
      },
      {
        field: "paid",
        headerName: "Status",
        // width: 104,
      },
      {
        field: "actions",
        type: "actions",
        width: 52,
        align: "center",
        getActions: ({ row }) => [
          <GridActionsCellItem
            key={"edit-invoice"}
            icon={<EditIcon />}
            label={"Edit"}
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
      //   try {
      //     const { data } = await getInventories({ _id, filled: checked, sort });
      //     setRows(data.data);
      //   } catch (e) {
      //     console.error(e);
      //     const { status } = e;
      //     if (status !== 404) {
      //       enqueueSnackbar(e.response?.data.message || e.message, {
      //         variant: "error",
      //       });
      //     }
      //     setRows({ rows: [], count: 0 });
      //   }
      setIsLoading(false);
    })();
  }, []);

  return (
    <PageContainer
      title="Invoices"
      actions={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Tooltip
            title="Reload data"
            arrow
            placement="bottom"
            enterDelay={1000}
          >
            <div>
              <IconButton size="small" aria-label="refresh" onClick={() => {}}>
                <RefreshIcon />
              </IconButton>
            </div>
          </Tooltip>
          <AppButton children={<NoteAddIcon />} onClick={() => {}} />
        </Stack>
      }
      extraActions={
        <Stack direction="row" alignItems="center" spacing={1}>
          {/* <Autocomplete refresh={refreshAutocomplete} onChange={handleChange} />
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
          /> */}
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
