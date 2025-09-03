import * as React from "react";
import dayjs from "dayjs";
import {
  Autocomplete,
  Box,
  IconButton,
  Stack,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import BarcodeReaderIcon from "@mui/icons-material/BarcodeReader";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
// import { useDialogs } from '../hooks/useDialogs/useDialogs';
import AppButton from "../AppButton";
import Search from "../../../../inputs/Search";
import PageContainer from "../PageContainer";
import { enqueueSnackbar } from "notistack";
import {
  getAutocompleteOptions,
  getInventories,
} from "../../../../../lib/api/client";

const INITIAL_PAGE_SIZE = 10;

export default function Drugs() {
  // const dialogs = useDialogs();
  const theme = useTheme();
  const isOverSmViewport = useMediaQuery(theme.breakpoints.up("sm"));
  const [options, setOptions] = React.useState([]);
  const [_id, set_Id] = React.useState("");
  const [checked, setChecked] = React.useState(false);
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
      // {
      //   field: "name",
      //   headerName: "",
      //   // for colspanning: include gtins here
      //   // flex: 1,
      // },
      { field: "lot", headerName: "Lot", width: 140, sortable: false },
      {
        field: "sn",
        headerName: "Serial Number",
        width: 280,
        sortable: false,
      },
      { field: "source", headerName: "Source", width: 120, sortable: false },
      {
        field: "exp",
        headerName: "Exp. Date",
        type: "date",
        valueGetter: (v) => v && new Date(v),
        valueFormatter: (v) => v && dayjs(v).format("M. D. YYYY"),
        sortable: false,
      },
      {
        field: "dateReceived",
        headerName: "Received",
        type: "date",
        valueGetter: (v) => v && new Date(v),
        valueFormatter: (v) => v && dayjs(v).format("M. D. YYYY"),
        sortable: false,
      },
      {
        field: "dateFilled",
        headerName: "Filled",
        type: "date",
        valueGetter: (v) => v && new Date(v),
        valueFormatter: (v) => v && dayjs(v).format("M. D. YYYY"),
        sortable: false,
      },
      {
        field: "dateReturned",
        headerName: "Returned",
        type: "date",
        valueGetter: (v) => v && new Date(v),
        valueFormatter: (v) => v && dayjs(v).format("M. D. YYYY"),
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
  const search = React.useCallback((_id) => {
    setIsLoading(true);
    set_Id(_id);
    (async () => {
      try {
        const { data } = await getInventories({ _id });
        setRows(data.data);
      } catch (e) {
        console.error(e);
        enqueueSnackbar(e.response?.data.message || e.message, {
          variant: "error",
        });
        setRows([]);
      }
      setIsLoading(false);
    })();
  }, []);
  const handleChange = React.useCallback(
    (e, value) => {
      value && search(value._id);
    },
    [search]
  );

  const getOptions = React.useCallback(() => {
    (async () => {
      try {
        const { data } = await getAutocompleteOptions();
        setOptions(data.data);
      } catch (e) {
        console.error(e);
        const { status } = e;
        if (status !== 404) {
          enqueueSnackbar(e.response?.data.message || e.message, {
            variant: "error",
          });
        }
        setOptions([]);
      }
    })();
  }, []);
  React.useEffect(() => {
    getOptions();
  }, [getOptions]);

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
                // onClick={}
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
          <Autocomplete
            onChange={handleChange}
            disablePortal
            options={options}
            renderInput={(params) => (
              <Search
                {...params}
                ref={params.InputProps.ref}
                width={isOverSmViewport ? "64ch" : "30ch"}
                size="small"
              />
            )}
          />
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
