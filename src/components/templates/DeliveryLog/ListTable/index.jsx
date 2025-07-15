import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import CustomIconButton from "../../../customs/CustomIconButton";
import CustomTable from "../../../customs/CustomTable";
import PrintIcon from "@mui/icons-material/Print";
import EditIcon from "@mui/icons-material/Edit";

const heads = ["Delivery Date", "Rx Number", "", "Relation", "Notes", ""];
const keys = ["deliveryDate", "rxNumber", "png", "relation", "notes", "action"];
const cellStyles = {
  deliveryDate: () => {
    return { width: 180 };
  },
  rxNumber: () => {
    return { width: 120 };
  },
  png: () => {
    return { width: 632 };
  },
  relation: () => {
    return { width: 120 };
  },
  action: () => {
    return { width: 120 };
  },
};

const ListTable = ({ rows }) => {
  return (
    <CustomTable
      formats={{
        png: (v) => {
          return (
            <img
              src={
                process.env.REACT_APP_CLIENT_API_ADDRESS +
                `/apps/pickup/png/${v._id}`
              }
            />
          );
        },
        relation: (v) => {
          switch (v.relation) {
            case "self":
              return "Self";
            case "ff":
              return "Family/Friend";
            case "gc":
              return "Guardian/Caregiver";
            case "other":
              return "Other";
            default:
              return v.relation;
          }
        },
        action: (v) => {
          return (
            <Box
              sx={{
                width: 88,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <CustomIconButton children={<EditIcon />} />
              <Link
                to={`/print/deliveryProof/${v._id}/${v.rxNumber}`}
                target="_blank"
              >
                <CustomIconButton children={<PrintIcon />} />
              </Link>
            </Box>
          );
        },
      }}
      heads={heads}
      keys={keys}
      rows={rows}
      tableStyle={{ mb: 5 }}
      cellStyles={cellStyles}
      checkbox={false}
    />
  );
};

export default ListTable;
