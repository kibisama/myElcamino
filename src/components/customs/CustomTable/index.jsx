import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import CustomCheckbox from "../CustomCheckbox";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 600,
    fontSize: 14,
    backgroundColor: theme.palette.divider,
  },
  paddingTop: 0,
  paddingBottom: 0,
  borderColor: theme.palette.divider,
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    // backgroundColor:
    //   theme.palette.mode === "dark"
    //     ? theme.palette.grey[900]
    //     : theme.palette.grey[100],
  },
  "&:last-child td, &:last-child th": {
    border: "none",
  },
}));
const StyledBox = styled(Box)(({ theme }) => ({
  borderRadius: 8,
  border: "1px solid",
  borderColor: theme.palette.divider,
}));

const CustomTable = ({
  checkbox = true,
  heads = [],
  keys = [],
  rows = [],
  formats = {},
  rowStyles,
  rowOnClick,
  cellStyles = {},
  tableStyle = {},
  aligns = {},
  hover = false,
}) => {
  return (
    <TableContainer sx={tableStyle} component={StyledBox}>
      <Table>
        <TableHead>
          <StyledTableRow>
            {checkbox && (
              <StyledTableCell padding="checkbox">
                <CustomCheckbox disableRipple />
              </StyledTableCell>
            )}
            {keys.map((v, i) => (
              <StyledTableCell
                sx={{ height: 36 }}
                key={i}
                align={aligns[v] ?? "center"}
              >
                {heads[i]}
              </StyledTableCell>
            ))}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.map((v, i) => {
            const style =
              rowStyles instanceof Function ? rowStyles(v) : undefined;
            const _rowOnClick = rowOnClick
              ? (e) => {
                  if (e.target.tagName !== "INPUT") {
                    e.preventDefault();
                    rowOnClick(v);
                  }
                }
              : undefined;
            return (
              <StyledTableRow
                key={i}
                sx={style}
                onClick={_rowOnClick}
                hover={hover}
              >
                {checkbox && (
                  <StyledTableCell padding="checkbox">
                    <CustomCheckbox disableRipple />
                  </StyledTableCell>
                )}
                {keys.map((y, j) => {
                  const value = formats[y] ? formats[y](v) : rows[i][y];
                  const style = cellStyles[y] ? cellStyles[y](v) : undefined;
                  return (
                    <StyledTableCell
                      key={j}
                      sx={style}
                      align={aligns[y] ?? "center"}
                    >
                      {value}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
