import * as React from "react";
import dayjs from "dayjs";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import RefreshIcon from "@mui/icons-material/Refresh";
import PageContainer from "../PageContainer";
import Search from "../../../../inputs/Search";
import { searchDeliveries } from "../../../../../lib/api/client";
import { enqueueSnackbar } from "notistack";
import NumericFormat from "../../apps/Pickup/NumericFormat";

const rowHeight = 42;

export default function SearchDelivery() {
  const [rows, setRows] = React.useState([]);
  const [rxNumber, setRxNumber] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const columns = React.useMemo(
    () => [
      {
        field: "rxID",
        headerName: "ID",
        type: "number",
        width: 120,
      },
      {
        field: "rxNumber",
        headerName: "Rx Number",
        type: "number",
        width: 120,
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
        field: "drugName",
        headerName: "Drug Name",
        flex: 1,
      },
      {
        field: "stationDisplayName",
        headerName: "Station",
        width: 120,
      },
      {
        field: "date",
        headerName: "Log Date",
        width: 84,
      },
      {
        field: "session",
        headerName: "Session",
        width: 120,
      },
    ],
    []
  );
  const search = React.useCallback((rxNumber) => {
    setIsLoading(true);
    (async () => {
      try {
        const { data } = await searchDeliveries(rxNumber);
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
  const handleChangeRxNumber = React.useCallback((e) => {
    setRxNumber(e.target.value);
  }, []);
  const handleKeyDown = React.useCallback(
    (e) => {
      if (e.key === "Enter" && rxNumber) {
        search(rxNumber);
      }
    },
    [search, rxNumber]
  );

  return (
    <PageContainer
      title="Search Deliveries"
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
