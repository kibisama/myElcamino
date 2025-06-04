import CustomTable from "../../../customs/CustomTable";
import formats from "./formats";

const heads = [
  "",
  "ITEM",
  "QTY",
  "CARDINAL",
  "CONTRACT",
  // "MARK",
  "PHARMSAVER",
  "DEALS",
  // "ORDERED",
];
const keys = [
  "date",
  "package",
  "qty",
  "cahPrd",
  "cahSrc",
  "psPkg",
  "psAlt",
  // "",
];
const cellStyles = {
  date: () => {
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
      tableStyle={{ mb: 5 }}
      cellStyles={cellStyles}
      rowOnClick={(v) => {
        console.log(v);
        const ndc = v.package?.data?.data?.ndc11;
        if (ndc) {
          const textArea = document.createElement("textarea");
          textArea.value = ndc;
          document.body.appendChild(textArea);
          textArea.focus({ preventScroll: true });
          textArea.select();
          try {
            document.execCommand("copy");
          } catch (err) {
            console.error("Unable to copy to clipboard", err);
          }
          document.body.removeChild(textArea);
        }
      }}
      hover
    />
  );
};

export default ListTable;
