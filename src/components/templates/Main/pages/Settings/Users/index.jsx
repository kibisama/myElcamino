import * as React from "react";
import dayjs from "dayjs";
import { Box, Button, IconButton, Stack, Tooltip } from "@mui/material";
import { DataGrid, GridActionsCellItem, useGridApiRef } from "@mui/x-data-grid";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useSWR from "swr";
import { enqueueSnackbar } from "notistack";

const rowHeight = 52;

export default function Users() {
  const apiRef = useGridApiRef();
  const [rows, setRows] = React.useState([]);
  const { data, isLoading, error, mutate } = useSWR("");
  React.useEffect(
    function handleData() {
      if (error) {
        if (error.status !== 404) {
          enqueueSnackbar(error.message, { variant: "error" });
        }
        setRows([]);
      } else if (data) {
        setRows(data);
      }
    },
    [data, error]
  );
  const columns = React.useMemo(
    () => [
      {
        field: "id",
        headerName: "Username",
        flex: 1,
      },
      {
        field: "invoiceCodes",
        headerName: "Roles",
        flex: 1,
      },
      {
        field: "actions",
        type: "actions",
        width: 96,
        align: "center",
        getActions: ({ row }) => [
          <GridActionsCellItem
            key={"edit-user"}
            icon={<DeleteIcon />}
            label={"Edit"}
            onClick={() => {}}
          />,
          <GridActionsCellItem
            key={"delete-user"}
            icon={<DeleteIcon />}
            label={"Delete"}
            onClick={() => {}}
          />,
        ],
      },
    ],
    []
  );

  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
        pt: 1,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Stack sx={{ alignSelf: "flex-end" }}>
        <IconButton size="small">
          <RefreshIcon />
        </IconButton>
      </Stack>
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
  );
}
