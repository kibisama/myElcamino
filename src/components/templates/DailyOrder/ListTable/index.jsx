import CustomTable from "../../../customs/CustomTable";
import formats from "./formats";

const heads = [
  "",
  "ITEM",
  "QTY",
  "CARDINAL",
  "CONTRACT",
  "PHARMSAVER",
  "DEALS",
  "RECOMMENDATION",
  // "ORDERED",
];
const keys = [
  "time",
  "package",
  "qty",
  "cahProduct",
  "cahSource",
  "psItem",
  "psSearch",
  "",
  // "",
];
const cellStyles = {
  //
  time: () => {
    return { width: 90 };
  },
  qty: () => {
    return { width: 63 };
  },
  cahProduct: () => {
    return { width: 133 };
  },
  cahSource: () => {
    return { width: 133 };
  },
  psItem: () => {
    return { width: 133 };
  },
  psSearch: () => {
    return { width: 133 };
  },
};

const ListTable = ({ rows }) => {
  return (
    <CustomTable
      heads={heads}
      keys={keys}
      rows={rows}
      formats={formats}
      cellStyles={cellStyles}
      rowOnClick={(v) => {
        // const ndc11 = v.package.ndc11;
        // if (ndc11) {
        //   window.navigator.clipboard.writeText(ndc11);
        // }
      }}
      hover
    />
  );
};

export default ListTable;
