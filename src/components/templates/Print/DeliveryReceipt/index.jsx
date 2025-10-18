import React from "react";
import dayjs from "dayjs";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StoreInfoHeader from "../StoreInfoHeader";
import PortraitContainer from "../PortraitContainer";
import { getDeliveryLogItems } from "../../../../lib/api/client";

const TableCellHeader = ({ children, sx, ...props }) => (
  <TableCell
    sx={{ p: 0, border: "1px solid", ...sx }}
    align="center"
    {...props}
  >
    <Typography
      sx={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: 0,
      }}
    >
      {children}
    </Typography>
  </TableCell>
);
const TableCellBody = ({ children, sx, ...props }) => (
  <TableCell
    sx={{ py: "1px", px: "4px", border: "none", ...sx }}
    align="right"
    {...props}
  >
    <Typography
      sx={{
        fontSize: 11,
        letterSpacing: 0,
      }}
    >
      {children}
    </Typography>
  </TableCell>
);
const KeyValueTable = ({ keys, values = [] }) => (
  <React.Fragment>
    {keys.map((v, i) => (
      <div style={{ display: "flex" }}>
        <Box
          key={i}
          sx={{
            border: "1px solid",
            minWidth: "84px",
            maxWidth: "84px",
            ...(i !== 0 && { borderTop: "0" }),
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              letterSpacing: 0,
            }}
          >
            {v}
          </Typography>
        </Box>
        <Box
          key={i}
          sx={{
            border: "1px solid",
            borderLeft: "0",
            minWidth: "100px",
            maxWidth: "100px",
            ...(i !== 0 && { borderTop: "0" }),
          }}
        >
          <Typography>{values[i]}</Typography>
        </Box>
      </div>
    ))}
  </React.Fragment>
);

export default function DeliveryReceipt() {
  const { section, date, session } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    async function get() {
      try {
        const { data } = await getDeliveryLogItems(section, date, session);
        setData(data.data);
      } catch (e) {
        console.error(e);
      }
    }
    get();
  }, []);

  if (data.length === 0) {
    return;
  }
  console.log(data);

  return (
    <React.Fragment>
      <PortraitContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <StoreInfoHeader />
            {/* <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Typography
                sx={{
                  fontSize: 11,
                  letterSpacing: 0,
                }}
              >
                PAGE {} OF {}
              </Typography>
              <KeyValueTable keys={["DATE", "SESSION"]} />
            </Box> */}
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 0,
                textDecoration: "underline",
              }}
            >
              DELIVER TO
            </Typography>
          </Box>
          <div style={{ height: "720px" }}>
            <TableContainer component="div">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCellHeader sx={{ width: "72px" }}>
                      Rx Number
                    </TableCellHeader>
                    <TableCellHeader sx={{ width: "72px" }}>
                      Rx Date
                    </TableCellHeader>
                    <TableCellHeader sx={{ width: "216px" }}>
                      Patient
                    </TableCellHeader>
                    <TableCellHeader>Description</TableCellHeader>
                    <TableCellHeader sx={{ width: "48px" }}>
                      Qty
                    </TableCellHeader>
                    <TableCellHeader sx={{ width: "64px" }}>
                      Due
                    </TableCellHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((v) => (
                    <TableRow key={v.id}>
                      <TableCellBody>{v.rxNumber}</TableCellBody>
                      <TableCellBody>
                        {dayjs(v.rxDate).format("M/D/YYYY")}
                      </TableCellBody>
                      <TableCellBody align="left">{v.patient}</TableCellBody>
                      <TableCellBody align="left">{v.drugName}</TableCellBody>
                      <TableCellBody>{v.rxQty}</TableCellBody>
                      <TableCellBody>{v.patPay}</TableCellBody>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Box>
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "60px",
                border: "1px solid",
              }}
            >
              <div
                style={{
                  width: "37.5%",
                  borderRight: "1px solid",
                  height: "60px",
                }}
              >
                <Typography sx={{ pl: 0.5, fontSize: 9 }}>
                  RECIPIENT NAME
                </Typography>
              </div>
              <div
                style={{
                  width: "37.5%",
                  borderRight: "1px solid",
                  height: "60px",
                }}
              >
                <Typography sx={{ pl: 0.5, fontSize: 9 }}>SIGNATURE</Typography>
              </div>
              <Typography sx={{ pl: 0.5, fontSize: 9 }}>DATE</Typography>
            </div>
            <Typography sx={{ fontSize: 11, letterSpacing: 0 }}>
              You have the right to a consultation with our pharmacist. Call {}
            </Typography>
          </Box>
        </div>
      </PortraitContainer>
    </React.Fragment>
  );
}
