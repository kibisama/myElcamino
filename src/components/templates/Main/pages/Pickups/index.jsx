import * as React from "react";
import dayjs from "dayjs";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import BarcodeReaderIcon from "@mui/icons-material/BarcodeReader";
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

  const [filterModel, setFilterModel] = React
    .useState
    // searchParams.get("filter")
    //   ? JSON.parse(searchParams.get("filter") ?? "")
    //   : { items: [] }
    ();

  const [rows, setRows] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // const handleFilterModelChange = React.useCallback(
  //   (model) => {
  //     setFilterModel(model);

  //     if (
  //       model.items.length > 0 ||
  //       (model.quickFilterValues && model.quickFilterValues.length > 0)
  //     ) {
  //       searchParams.set("filter", JSON.stringify(model));
  //     } else {
  //       searchParams.delete("filter");
  //     }

  //     const newSearchParamsString = searchParams.toString();

  //     navigate(
  //       `${pathname}${newSearchParamsString ? "?" : ""}${newSearchParamsString}`
  //     );
  //   },
  //   [navigate, pathname, searchParams]
  // );

  // const loadData = React.useCallback(async () => {
  //   setError(null);
  //   setIsLoading(true);

  //   try {
  //     // const listData = await getEmployees({
  //     //   paginationModel,
  //     //   sortModel,
  //     //   filterModel,
  //     // });
  //     // setRowsState({
  //     //   rows: listData.items,
  //     //   rowCount: listData.itemCount,
  //     // });
  //   } catch (listDataError) {
  //     setError(listDataError);
  //   }

  //   setIsLoading(false);
  // }, [paginationModel, sortModel, filterModel]);

  // React.useEffect(() => {
  //   loadData();
  // }, [loadData]);

  // const handleRefresh = React.useCallback(() => {
  //   if (!isLoading) {
  //     loadData();
  //   }
  // }, [isLoading, loadData]);

  // const handleRowEdit = React.useCallback(
  //   (employee) => () => {
  //     navigate(`/employees/${employee.id}/edit`);
  //   },
  //   [navigate]
  // );

  // const handleRowDelete = React.useCallback(
  //   (employee) => async () => {
  //     const confirmed = await dialogs.confirm(
  //       `Do you wish to delete ${employee.name}?`,
  //       {
  //         title: `Delete employee?`,
  //         severity: 'error',
  //         okText: 'Delete',
  //         cancelText: 'Cancel',
  //       },
  //     );

  //     if (confirmed) {
  //       setIsLoading(true);
  //       try {
  //         await deleteEmployee(Number(employee.id));

  //         notifications.show('Employee deleted successfully.', {
  //           severity: 'success',
  //           autoHideDuration: 3000,
  //         });
  //         loadData();
  //       } catch (deleteError) {
  //         notifications.show(
  //           `Failed to delete employee. Reason:' ${deleteError.message}`,
  //           {
  //             severity: 'error',
  //             autoHideDuration: 3000,
  //           },
  //         );
  //       }
  //       setIsLoading(false);
  //     }
  //   },
  //   [dialogs, notifications, loadData],
  // );

  const initialState = React.useMemo(
    () => ({
      pagination: { paginationModel: { pageSize: INITIAL_PAGE_SIZE } },
    }),
    []
  );

  const columns = React.useMemo(
    () => [
      {
        field: "rxNumber",
        headerName: "Rx Number",
        type: "number",
        width: 160,
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
        valueGetter: (v) => new Date(v),
        valueFormatter: (v) => dayjs(v).format("M. D. YYYY HH:mm"),
        rowSpanValueGetter: (v, r) => r._id,
      },
      {
        field: "_id",
        headerName: "Signature",
        width: 188,
        sortable: false,
        renderCell: (params) => (
          <Box sx={{ display: "flex", height: "50px", alignItems: "center" }}>
            <img
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
        sortable: false,
        rowSpanValueGetter: (v, r) => r._id,
      },
      {
        field: "notes",
        headerName: "Notes",
        width: 180,
        sortable: false,
        rowSpanValueGetter: (v, r) => r._id,
      },
      {
        field: "actions",
        type: "actions",
        flex: 1,
        align: "right",
        getActions: ({ row }) => [
          // <GridActionsCellItem
          //   key="edit-item"
          //   icon={<EditIcon />}
          //   label="Edit"
          //   // onClick={handleRowEdit(row)}
          // />,
          // <GridActionsCellItem
          //   key="delete-item"
          //   icon={<DeleteIcon />}
          //   label="Delete"
          //   // onClick={handleRowDelete(row)}
          // />,
        ],
        rowSpanValueGetter: (v, r) => r._id,
      },
    ],
    [
      // handleRowEdit,
      // handleRowDelete
    ]
  );
  const [rxNumber, setRxNumber] = React.useState("");
  const [date, setDate] = React.useState(null);
  const [lastState, setLastState] = React.useState({
    rxNumber: "",
    date: null,
  });
  const disableSearchButton = !rxNumber && !date;
  const handleChangeDate = React.useCallback((date, context) => {
    if (!context.validationError) {
      if (date) {
        setDate(dayjs(date));
      } else {
        setDate(null);
      }
    }
  }, []);
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
        rows.forEach((v, i) => (v.id = i + 1));
        setRows(rows);
        setIsLoading(false);
      } catch (e) {
        const { status } = e;
        if (status === 404) {
          //
        } else {
          setError(e);
        }
        setRows([]);
        setIsLoading(false);
      }
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
          rows={rows}
          rowCount={rows.length}
          rowSpanning
          showCellVerticalBorder
          disableColumnMenu
          disableRowSelectionOnClick
          // filterMode="server"
          // filterModel={filterModel}
          // onFilterModelChange={handleFilterModelChange}
          loading={isLoading}
          initialState={initialState}
          showToolbar
          pageSizeOptions={[]}
          sx={{
            [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
              outline: "transparent",
            },
            [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
              {
                outline: "none",
              },
            [`& .${gridClasses.row}:hover`]: {
              cursor: "pointer",
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
