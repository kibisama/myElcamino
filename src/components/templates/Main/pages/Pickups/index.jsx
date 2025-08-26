import * as React from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import RefreshIcon from "@mui/icons-material/Refresh";
import BarcodeReaderIcon from "@mui/icons-material/BarcodeReader";
import EditIcon from "@mui/icons-material/Edit";
// import { useDialogs } from '../hooks/useDialogs/useDialogs';
// import useNotifications from '../hooks/useNotifications/useNotifications';
// import {
//   deleteOne as deleteEmployee,
//   getMany as getEmployees,
// } from '../data/employees';
import PageContainer from "../PageContainer";
import AppButton from "../AppButton";

// const INITIAL_PAGE_SIZE = 10;

export default function Pickups() {
  // const dialogs = useDialogs();
  // const notifications = useNotifications();

  const [paginationModel, setPaginationModel] = React.useState({
    // page: searchParams.get("page") ? Number(searchParams.get("page")) : 0,
    // pageSize: searchParams.get("pageSize")
    //   ? Number(searchParams.get("pageSize"))
    //   : INITIAL_PAGE_SIZE,
  });
  const [filterModel, setFilterModel] = React
    .useState
    // searchParams.get("filter")
    //   ? JSON.parse(searchParams.get("filter") ?? "")
    //   : { items: [] }
    ();
  const [sortModel, setSortModel] = React
    .useState
    // searchParams.get("sort") ? JSON.parse(searchParams.get("sort") ?? "") : []
    ();

  const [rowsState, setRowsState] = React.useState({
    rows: [],
    rowCount: 0,
  });

  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const handlePaginationModelChange = React.useCallback(
    (model) => {
      setPaginationModel(model);

      // searchParams.set("page", String(model.page));
      // searchParams.set("pageSize", String(model.pageSize));

      // const newSearchParamsString = searchParams.toString();

      // navigate(
      //   `${pathname}${newSearchParamsString ? "?" : ""}${newSearchParamsString}`
      // );
    }
    // [navigate, pathname, searchParams]
  );

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

  // const handleSortModelChange = React.useCallback(
  //   (model) => {
  //     setSortModel(model);

  //     if (model.length > 0) {
  //       searchParams.set("sort", JSON.stringify(model));
  //     } else {
  //       searchParams.delete("sort");
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

  // const handleRowClick = React.useCallback(
  //   ({ row }) => {
  //     navigate(`/employees/${row.id}`);
  //   },
  //   [navigate]
  // );

  // const handleCreateClick = React.useCallback(() => {
  //   navigate("/employees/new");
  // }, [navigate]);

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

  // const initialState = React.useMemo(
  //   () => ({
  //     pagination: { paginationModel: { pageSize: INITIAL_PAGE_SIZE } },
  //   }),
  //   []
  // );

  const columns = React.useMemo(
    () => [
      { field: "rxNumber", headerName: "Rx Number", width: 140 },
      {
        field: "deliveryDate",
        headerName: "Delivery Date",
        type: "date",
        width: 160,
      },
      {
        field: "signature",
        headerName: "Signature",
        width: 280,
        sortable: false,
      },
      {
        field: "relation",
        headerName: "Relation",
        // valueGetter: (v) => v,
        valueOptions: ["Self"],
        width: 120,
        sortable: false,
      },
      {
        field: "notes",
        headerName: "Notes",
        width: 180,
        sortable: false,
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
      },
    ],
    [
      // handleRowEdit,
      // handleRowDelete
    ]
  );

  return (
    <PageContainer
      title="Pickups"
      actions={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Tooltip title="Reload data" placement="right" enterDelay={1000}>
            <div>
              <IconButton
                size="small"
                aria-label="refresh"
                // onClick={handleRefresh}
              >
                <RefreshIcon />
              </IconButton>
            </div>
          </Tooltip>
          <AppButton app="Pickup" children={<BarcodeReaderIcon />} />
          {/* <Button
            variant="contained"
            onClick={() => {
              dispatch(setApp("Pickup"));
            }}
            startIcon={<AddIcon />}
          >
            Create
          </Button> */}
        </Stack>
      }
    >
      <Box sx={{ flex: 1, width: "100%" }}>
        {/* {error ? (
          <Box sx={{ flexGrow: 1 }}>
            <Alert severity="error">{error.message}</Alert>
          </Box>
        ) : (
          <DataGrid
            rows={rowsState.rows}
            rowCount={rowsState.rowCount}
            columns={columns}
            pagination
            sortingMode="server"
            filterMode="server"
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
            sortModel={sortModel}
            // onSortModelChange={handleSortModelChange}
            filterModel={filterModel}
            // onFilterModelChange={handleFilterModelChange}
            disableRowSelectionOnClick
            // onRowClick={handleRowClick}
            loading={isLoading}
            initialState={initialState}
            showToolbar
            pageSizeOptions={[5, INITIAL_PAGE_SIZE, 25]}
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
        )} */}
        <DataGrid
          columns={columns}
          // rows={rowsState.rows}
          // rowCount={rowsState.rowCount}

          disableColumnMenu
          // pagination
          // sortingMode="server"
          // filterMode="server"
          // paginationMode="server"
          // paginationModel={paginationModel}
          // onPaginationModelChange={handlePaginationModelChange}
          // sortModel={sortModel}
          // onSortModelChange={handleSortModelChange}
          // filterModel={filterModel}
          // onFilterModelChange={handleFilterModelChange}
          // disableRowSelectionOnClick
          // onRowClick={handleRowClick}
          loading={isLoading}
          // initialState={initialState}
          // showToolbar
          // pageSizeOptions={[5, INITIAL_PAGE_SIZE, 25]}
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
