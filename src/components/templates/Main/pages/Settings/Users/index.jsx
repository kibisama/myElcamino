import * as React from "react";
import {
  Box,
  IconButton,
  Stack,
  Button,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { api, getClient } from "../../../../../../lib/api";
import AppButton from "../../AppButton";
import { enqueueSnackbar } from "notistack";

function FormDialog({ handleSubmit, handleCancel }) {
  const [password, setPassword] = React.useState("");

  return (
    <Dialog open>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent sx={{ width: 400, mt: 4, mb: 2 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const password = data.get("password");
            handleSubmit({ password });
            handleCancel();
          }}
          id="subscription-form"
        >
          <OutlinedInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ borderColor: "text.secondary" }}
            autoFocus
            required
            id="password"
            name="password"
            placeholder="New Password"
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "text.secondary" }} onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          disabled={!password.trim()}
          type="submit"
          form="subscription-form"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const rowHeight = 52;

export default function Users({ handleModeChange }) {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState(null);

  const {
    data: rows,
    isLoading,
    error,
    mutate: refreshUsers,
  } = useSWR("/users", getClient);
  const { trigger: deleteUser } = useSWRMutation(
    "/user",
    (url, { arg }) => api.delete(`/client${url}/${arg}`),
    {
      throwOnError: false,
      onSuccess: () => {
        refreshUsers();
        enqueueSnackbar("The user has been deleted successfully.", {
          variant: "success",
        });
      },
    },
  );
  const { trigger: resetPassword } = useSWRMutation(
    username ? `/client/user/${username}` : null,
    (url, { arg }) => api.put(url, arg),
    {
      throwOnError: false,
      onSuccess: () => {
        refreshUsers();
        enqueueSnackbar("The password has been changed successfully.", {
          variant: "success",
        });
      },
    },
  );

  const handleCancel = React.useCallback(() => {
    setOpen(false);
    setUsername(null);
  }, []);

  const columns = React.useMemo(
    () => [
      {
        field: "id",
        headerName: "Username",
        flex: 1,
      },
      {
        field: "stationCodes",
        headerName: "Roles",
        flex: 3,
        valueFormatter: (a) => a.join(", "),
      },
      {
        field: "actions",
        type: "actions",
        width: 96,
        align: "center",
        getActions: ({ row }) => [
          <GridActionsCellItem
            key={"edit-user"}
            icon={<EditIcon />}
            label={"Edit"}
            onClick={() => {
              setUsername(row.id);
              setOpen(true);
            }}
          />,
          <GridActionsCellItem
            key={"delete-user"}
            icon={<DeleteIcon />}
            label={"Delete"}
            onClick={() => deleteUser(row.id)}
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
        <IconButton onClick={refreshUsers} size="small">
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
      {open && (
        <FormDialog handleCancel={handleCancel} handleSubmit={resetPassword} />
      )}
    </Box>
  );
}
