import * as React from "react";
import { Box, IconButton, Stack } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useSWR from "swr";
import { getClient } from "../../../../../../lib/api";
import AppButton from "../../AppButton";

const rowHeight = 52;

export default function Users({ handleModeChange }) {
  const {
    data: rows,
    isLoading,
    error,
    mutate,
  } = useSWR("/admin/users", getClient);
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
    [],
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
      <Stack
        sx={{ py: 1, alignSelf: "flex-end" }}
        direction="row"
        alignItems="center"
        spacing={1}
      >
        <IconButton size="small">
          <RefreshIcon />
        </IconButton>
        <AppButton children={<PersonAddIcon />} onClick={handleModeChange} />
      </Stack>
      <DataGrid
        autoPageSize
        columns={columns}
        rows={rows || []}
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
