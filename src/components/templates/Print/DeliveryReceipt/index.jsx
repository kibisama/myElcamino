import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
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
import { getDeliveryReceipt, getSettings } from "../../../../lib/api/client";

dayjs.extend(customParseFormat);

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
  <div>
    {keys.map((v, i) => (
      <div key={i} style={{ display: "flex" }}>
        <div
          key={v}
          style={{
            border: "1px solid",
            height: "24px",
            minWidth: "104px",
            maxWidth: "104px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            ...(i !== 0 && { borderTop: "0" }),
          }}
        >
          <Typography
            sx={{
              pl: 0.5,
              fontSize: 13,
              letterSpacing: 0,
              fontWeight: 600,
            }}
          >
            {v}
          </Typography>
        </div>
        <div
          key={v + i}
          style={{
            border: "1px solid",
            borderLeft: "0",
            height: "24px",
            minWidth: "100px",
            maxWidth: "100px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            ...(i !== 0 && { borderTop: "0" }),
          }}
        >
          <Typography sx={{ pr: 0.5, fontSize: 13, letterSpacing: 0 }}>
            {values[i]}
          </Typography>
        </div>
      </div>
    ))}
  </div>
);

export default function DeliveryReceipt() {
  const { section, date, session } = useParams();
  const [data, setData] = useState(null);
  const [storeInfo, setStoreInfo] = useState(null);
  useEffect(() => {
    (async function () {
      try {
        const { data } = await getSettings();
        setStoreInfo(data.data);
      } catch (e) {
        console.error(e);
      }
    })();
    (async function () {
      try {
        const { data } = await getDeliveryReceipt(section, date, session);
        setData(data.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (!data || !data.items?.length || !storeInfo) {
    return;
  }
  const { station, items, pages, due, count } = data;
  return (
    <React.Fragment>
      {items.map((item, index) => (
        <PortraitContainer>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <StoreInfoHeader storeInfo={storeInfo} />
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: 24,
                  fontWeight: 600,
                  letterSpacing: 0,
                }}
              >
                Rx Delivery Receipt
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                height: "76px",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: 0,
                    lineHeight: "14px",
                    textDecoration: "underline",
                    mb: "2px",
                  }}
                >
                  DELIVER TO
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: 0,
                    lineHeight: "14px",
                  }}
                >
                  {station.name}
                </Typography>
                <Typography
                  sx={{ fontSize: 11, letterSpacing: 0, lineHeight: "12px" }}
                >
                  {station.address1}
                </Typography>
                <Typography
                  sx={{ fontSize: 11, letterSpacing: 0, lineHeight: "12px" }}
                >
                  {station.address2}
                </Typography>
                <Typography
                  sx={{ fontSize: 11, letterSpacing: 0, lineHeight: "12px" }}
                >
                  {station.phone}
                </Typography>
              </div>
              <div
                style={{
                  width: "438px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <KeyValueTable
                  keys={["PAGE", "TOTAL COUNT", "TOTAL DUE"]}
                  values={[`${index + 1} OF ${pages}`, count, due]}
                />
                <KeyValueTable
                  keys={["DATE", "SESSION", "STATION CODE"]}
                  values={[
                    dayjs(date, "MMDDYYYY").format("M. D. YYYY"),
                    session,
                    station.code,
                  ]}
                />
              </div>
            </div>
            <div style={{ height: "760px" }}>
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
                    {item.map((v) => (
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
            <div style={{ height: "112px" }}>
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
                  <Typography sx={{ pl: 0.5, fontSize: 9 }}>
                    SIGNATURE
                  </Typography>
                </div>
                <Typography sx={{ pl: 0.5, fontSize: 9 }}>DATE</Typography>
              </div>
              <Typography
                sx={{ fontSize: 11, fontStyle: "italic", letterSpacing: 0 }}
              >
                You are entitled to an oral consultation with our pharmacist.
                Please Call {storeInfo.storePhone}
              </Typography>
            </div>
          </div>
        </PortraitContainer>
      ))}
    </React.Fragment>
  );
}
