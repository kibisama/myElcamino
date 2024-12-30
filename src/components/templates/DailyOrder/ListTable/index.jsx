import CustomTable from "../../../customs/CustomTable";
import formats from "./formats";

const heads = [
  "ITEM",
  "COST",
  "QTY",
  "CH PRICE",
  "CH ALT",
  "PS PRICE",
  "PS ALT",
  "STATUS",
];
const keys = [
  "package",
  "item",
  "qty",
  "cardinalProduct",
  "cardinalAlt",
  "psDetails",
  "psAlts",
  "status",
];

const cellStyles = {
  package: () => {
    return { width: "25%" };
  },
  qty: () => {
    return { width: "5%" };
  },
};

const ListTable = ({ rows }) => {
  console.log(rows);
  return (
    <CustomTable
      heads={heads}
      keys={keys}
      rows={rows}
      formats={formats}
      //   cellStyles={cellStyles}
      rowOnClick={(v) => {
        const ndc11 = v.package.ndc11;
        if (ndc11) {
          window.navigator.clipboard.writeText(ndc11);
        }
      }}
      hover
    />
  );
};

export default ListTable;
