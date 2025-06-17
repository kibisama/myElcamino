import CustomIconButton from "../../../customs/CustomIconButton";
import CustomTable from "../../../customs/CustomTable";
import PrintIcon from "@mui/icons-material/Print";

const heads = ["Delivery Date", "Rx Number", "", "Notes", ""];
const keys = ["deliveryDate", "rxNumber", "png", "notes", "action"];
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
