import CustomIconButton from "../../../customs/CustomIconButton";
import CustomTable from "../../../customs/CustomTable";
import PrintIcon from "@mui/icons-material/Print";

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
    return { width: 532 };
  },
  relation: () => {
    return { width: 100 };
  },
  action: () => {
    return { width: 100 };
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
          return <CustomIconButton children={<PrintIcon />} />;
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
