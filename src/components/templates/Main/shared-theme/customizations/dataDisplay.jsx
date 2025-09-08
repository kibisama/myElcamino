import { alpha } from "@mui/material/styles";
import { svgIconClasses } from "@mui/material/SvgIcon";
import { typographyClasses } from "@mui/material/Typography";
import { buttonBaseClasses } from "@mui/material/ButtonBase";
import { chipClasses } from "@mui/material/Chip";
import { iconButtonClasses } from "@mui/material/IconButton";
import { gridClasses } from "@mui/x-data-grid";
import { gray, red, green } from "../themePrimitives";

/* eslint-disable import/prefer-default-export */
export const dataDisplayCustomizations = {
  MuiList: {
    styleOverrides: {
      root: {
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        gap: 0,
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        [`& .${svgIconClasses.root}`]: {
          width: "1rem",
          height: "1rem",
          color: (theme.vars || theme).palette.text.secondary,
        },
        [`& .${typographyClasses.root}`]: {
          fontWeight: 500,
        },
        [`& .${buttonBaseClasses.root}`]: {
          display: "flex",
          gap: 8,
          padding: "2px 8px",
          borderRadius: (theme.vars || theme).shape.borderRadius,
          opacity: 0.7,
          "&.Mui-selected": {
            opacity: 1,
            backgroundColor: alpha(theme.palette.action.selected, 0.3),
            [`& .${svgIconClasses.root}`]: {
              color: (theme.vars || theme).palette.primary.main,
            },
            "&:focus-visible": {
              backgroundColor: alpha(theme.palette.action.selected, 0.3),
            },
            "&:hover": {
              backgroundColor: alpha(theme.palette.action.selected, 0.5),
            },
          },
          "&:focus-visible": {
            backgroundColor: "transparent",
          },
        },
      }),
    },
  },
  MuiListItemText: {
    styleOverrides: {
      primary: ({ theme }) => ({
        fontSize: theme.typography.body2.fontSize,
        fontWeight: 500,
        lineHeight: theme.typography.body2.lineHeight,
      }),
      secondary: ({ theme }) => ({
        fontSize: theme.typography.caption.fontSize,
        lineHeight: theme.typography.caption.lineHeight,
      }),
    },
  },
  MuiListSubheader: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: "transparent",
        padding: "4px 8px",
        fontSize: theme.typography.caption.fontSize,
        fontWeight: 500,
        lineHeight: theme.typography.caption.lineHeight,
      }),
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: 0,
      },
    },
  },
  MuiChip: {
    defaultProps: {
      size: "small",
    },
    styleOverrides: {
      root: ({ theme }) => ({
        border: "1px solid",
        borderRadius: "999px",
        [`& .${chipClasses.label}`]: {
          fontWeight: 600,
        },
        variants: [
          {
            props: {
              color: "default",
            },
            style: {
              borderColor: gray[200],
              backgroundColor: gray[100],
              [`& .${chipClasses.label}`]: {
                color: gray[500],
              },
              [`& .${chipClasses.icon}`]: {
                color: gray[500],
              },
              ...theme.applyStyles("dark", {
                borderColor: gray[700],
                backgroundColor: gray[800],
                [`& .${chipClasses.label}`]: {
                  color: gray[300],
                },
                [`& .${chipClasses.icon}`]: {
                  color: gray[300],
                },
              }),
            },
          },
          {
            props: {
              color: "success",
            },
            style: {
              borderColor: green[200],
              backgroundColor: green[50],
              [`& .${chipClasses.label}`]: {
                color: green[500],
              },
              [`& .${chipClasses.icon}`]: {
                color: green[500],
              },
              ...theme.applyStyles("dark", {
                borderColor: green[800],
                backgroundColor: green[900],
                [`& .${chipClasses.label}`]: {
                  color: green[300],
                },
                [`& .${chipClasses.icon}`]: {
                  color: green[300],
                },
              }),
            },
          },
          {
            props: {
              color: "error",
            },
            style: {
              borderColor: red[100],
              backgroundColor: red[50],
              [`& .${chipClasses.label}`]: {
                color: red[500],
              },
              [`& .${chipClasses.icon}`]: {
                color: red[500],
              },
              ...theme.applyStyles("dark", {
                borderColor: red[800],
                backgroundColor: red[900],
                [`& .${chipClasses.label}`]: {
                  color: red[200],
                },
                [`& .${chipClasses.icon}`]: {
                  color: red[300],
                },
              }),
            },
          },
          {
            props: { size: "small" },
            style: {
              maxHeight: 20,
              [`& .${chipClasses.label}`]: {
                fontSize: theme.typography.caption.fontSize,
              },
              [`& .${svgIconClasses.root}`]: {
                fontSize: theme.typography.caption.fontSize,
              },
            },
          },
          {
            props: { size: "medium" },
            style: {
              [`& .${chipClasses.label}`]: {
                fontSize: theme.typography.caption.fontSize,
              },
            },
          },
        ],
      }),
    },
  },
  MuiTablePagination: {
    styleOverrides: {
      actions: {
        display: "flex",
        gap: 8,
        marginRight: 6,
        [`& .${iconButtonClasses.root}`]: {
          minWidth: 0,
          width: 36,
          height: 36,
        },
      },
    },
  },
  MuiIcon: {
    defaultProps: {
      fontSize: "small",
    },
    styleOverrides: {
      root: {
        variants: [
          {
            props: {
              fontSize: "small",
            },
            style: {
              fontSize: "1rem",
            },
          },
        ],
      },
    },
  },
  MuiDataGrid: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderColor: (theme.vars || theme).palette.divider,
        backgroundColor: (theme.vars || theme).palette.background.default,
        [`& .${gridClasses.columnHeader}`]: {
          backgroundColor: (theme.vars || theme).palette.background.paper,
        },
        [`& .${gridClasses.footerContainer}`]: {
          backgroundColor: (theme.vars || theme).palette.background.paper,
        },
        [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
          {
            outline: "none",
          },
        ".MuiDataGrid-sortButton": {
          ml: 1,
        },
      }),
      cell: ({ theme }) => ({
        borderTopColor: (theme.vars || theme).palette.divider,
      }),
      row: ({ theme }) => ({
        "&:last-of-type": {
          borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
        },
        "&:hover": {
          backgroundColor: (theme.vars || theme).palette.action.hover,
        },
        "&.Mui-selected": {
          background: (theme.vars || theme).palette.action.selected,
          "&:hover": {
            backgroundColor: (theme.vars || theme).palette.action.hover,
          },
        },
      }),
      // iconButtonContainer: ({ theme }) => ({
      //   [`& .${iconButtonClasses.root}`]: {
      //     border: "none",
      //     backgroundColor: "transparent",
      //     "&:hover": {
      //       backgroundColor: alpha(theme.palette.action.selected, 0.3),
      //     },
      //     "&:active": {
      //       backgroundColor: gray[200],
      //     },
      //     ...theme.applyStyles("dark", {
      //       color: gray[50],
      //       "&:hover": {
      //         backgroundColor: gray[800],
      //       },
      //       "&:active": {
      //         backgroundColor: gray[900],
      //       },
      //     }),
      //   },
      // }),
      // menuIconButton: ({ theme }) => ({
      //   border: "none",
      //   backgroundColor: "transparent",
      //   "&:hover": {
      //     backgroundColor: gray[100],
      //   },
      //   "&:active": {
      //     backgroundColor: gray[200],
      //   },
      //   ...theme.applyStyles("dark", {
      //     color: gray[50],
      //     "&:hover": {
      //       backgroundColor: gray[800],
      //     },
      //     "&:active": {
      //       backgroundColor: gray[900],
      //     },
      //   }),
      // }),
      // filterForm: ({ theme }) => ({
      //   gap: theme.spacing(1),
      //   alignItems: "flex-end",
      // }),
      // columnsManagementHeader: ({ theme }) => ({
      //   paddingRight: theme.spacing(3),
      //   paddingLeft: theme.spacing(3),
      // }),
      columnHeaderTitleContainer: {
        flexGrow: 1,
        justifyContent: "space-between",
      },
      columnHeaderDraggableContainer: { paddingRight: 2 },
    },
  },
};
