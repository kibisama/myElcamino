import CustomTableCell from "../../../customs/CustomTableCell";
import Pkg from "../../../tooltips/DailyOrder/Pkg";
import PsPackage from "../../../tooltips/DailyOrder/PsPackage";
import PsAlternative from "../../../tooltips/DailyOrder/PsAlternative";
import CardinalProduct from "../../../tooltips/DailyOrder/CardinalProduct";

// const isSameOrCheaper = (a, b) => {
//   return (
//     Number(b.replaceAll(/[^0-9.]+/g, "")) >=
//     Number(a.replaceAll(/[^0-9.]+/g, ""))
//   );
// };
// const cardinalProduct = (_tooltip, time) => {
//   const { contract, stockStatus, rebateEligible, returnable, lastSFDCDate } =
//     _tooltip.data;
//   const _lastUpdated = dayjs(_tooltip.lastUpdated);
//   const lastUpdated = dayjs().isSame(_lastUpdated, "day")
//     ? "Today " + _lastUpdated.format("HH:mm:ss")
//     : _lastUpdated.format("MM/DD/YYYY HH:mm:ss");
//   const option = {
//     _contract: contract === "NO CONTRACT" ? { color: "error.main" } : undefined,
//     _stockStatus:
//       stockStatus === "OUT OF STOCK"
//         ? { color: "error.main" }
//         : stockStatus === "LOW STOCK"
//         ? { color: "warning.main" }
//         : undefined,
//     _rebateEligible: rebateEligible
//       ? { color: "warning.main" }
//       : { color: "text.disabled" },
//     _returnable: returnable ? undefined : { color: "error.main" },
//     _lastSFDCDate:
//       lastSFDCDate !== ENUM.CAH_NO_DATA
//         ? dayjs(time).isAfter(
//             dayjs(lastSFDCDate, "MM/DD/YYYY").add(3, "month")
//           ) && { color: "warning.main" }
//         : undefined,
//   };
//   return (
//     <CardinalProduct
//       data={_tooltip.data}
//       lastUpdated={lastUpdated}
//       option={option}
//     />
//   );
// };

const handleOnClickPs = (data) =>
  data?.ndc &&
  window.open(
    `https://pharmsaver.net/Pharmacy/Order.aspx?q=${data.ndc.replaceAll(
      "-",
      ""
    )}`,
    "_blank"
  );
const handleOnClickCah = (data) =>
  data?.cin &&
  window.open(
    `https://vantus.cardinalhealth.com/product/${data.cin}?tab=more-details`,
    "_blank"
  );

const formats = {
  date: (v) => {
    return <CustomTableCell data={v.date} />;
  },
  package: (v) => {
    console.log(v);
    const pkg = v.package;
    const data = pkg.data;
    const cahPrd = v.cahPrd;
    return (
      <CustomTableCell
        data={pkg}
        tooltip={
          data && (
            <Pkg
              data={data}
              url={
                cahPrd &&
                `${process.env.REACT_APP_CLIENT_API_ADDRESS}/cah/img/${cahPrd.cin}`
              }
            />
          )
        }
      />
    );
  },
  qty: (v) => {
    return <CustomTableCell data={v.qty} />;
  },
  cahPrd: (v) => {
    const cahPrd = v.cahPrd;
    const data = cahPrd.data;
    return (
      <CustomTableCell
        data={cahPrd}
        tooltip={
          data && (
            <CardinalProduct data={data.data} lastUpdated={data.lastUpdated} />
          )
        }
        onClickTooltip={() => handleOnClickCah(data.data)}
        placement={"left"}
      />
    );
  },
  cahSrc: (v) => {
    const cahSrc = v.cahSrc;
    const data = cahSrc.data;
    return (
      <CustomTableCell
        data={cahSrc}
        tooltip={
          data && (
            <CardinalProduct data={data.data} lastUpdated={data.lastUpdated} />
          )
        }
        onClickTooltip={() => handleOnClickCah(data.data)}
        placement={"left"}
      />
    );
  },
  psPkg: (v) => {
    const psPkg = v.psPkg;
    const data = psPkg.data;
    return (
      <CustomTableCell
        data={psPkg}
        tooltip={
          data && <PsPackage data={data.data} lastUpdated={data.lastUpdated} />
        }
        onClickTooltip={() => handleOnClickPs(data.data)}
        placement={"left"}
      />
    );
  },
  psAlt: (v) => {
    const psAlt = v.psAlt;
    const data = psAlt.data;
    return (
      <CustomTableCell
        data={psAlt}
        tooltip={
          data && (
            <PsAlternative
              data={data.data}
              packageData={v.package.data?.data}
              lastUpdated={data.lastUpdated}
            />
          )
        }
        placement={"left"}
      />
    );
  },
  // cahProduct: (v) => {
  //   const cahProduct = v.cahProduct;
  //   // const estNetCost = v.cahProduct.title;
  //   // const pkgPrice = v.psItem.title;
  //   const textStyle =
  //     v.cahSource.subtitle && cahProduct.tooltip?.data.contract !== ENUM.BRAND
  //       ? { color: "text.disabled" }
  //       : // : estNetCost && pkgPrice && isSameOrCheaper(estNetCost, pkgPrice)
  //         // ? { color: "primary.main", fontWeight: 600 }
  //         undefined;
  //   const _tooltip = cahProduct.tooltip;
  //   let tooltip;
  //   let onClickTooltip;
  //   if (_tooltip) {
  //     tooltip = cardinalProduct(_tooltip, v.time);
  //     onClickTooltip = () => {
  //       const cin = _tooltip.data.cin;
  //       if (cin) {
  //         window.open(
  //           `https://vantus.cardinalhealth.com/product/${cin}?tab=more-details`,
  //           "_blank"
  //         );
  //       }
  //     };
  //   }
  //   return (
  //     <CustomTableCell
  //       data={cahProduct}
  //       textStyle={textStyle}
  //       tooltip={tooltip}
  //       onClickTooltip={onClickTooltip}
  //     />
  //   );
  // },
  // cahSource: (v) => {
  //   const cahSource = v.cahSource;
  //   const textStyle = !!cahSource.subtitle
  //     ? undefined
  //     : cahSource.title === "NA*"
  //     ? { color: "text.disabled" }
  //     : { color: "primary.main", fontWeight: 800 };
  //   let tooltip;
  //   let onClickTooltip;
  //   const _tooltip = cahSource.tooltip;
  //   if (_tooltip) {
  //     tooltip = cardinalProduct(_tooltip, v.time);
  //     onClickTooltip = () => {
  //       const cin = _tooltip.data.cin;
  //       if (cin) {
  //         window.open(
  //           `https://vantus.cardinalhealth.com/product/${cin}?tab=more-details`,
  //           "_blank"
  //         );
  //       }
  //     };
  //   }
  //   return (
  //     <CustomTableCell
  //       data={cahSource}
  //       textStyle={textStyle}
  //       tooltip={tooltip}
  //       onClickTooltip={onClickTooltip}
  //     />
  //   );
  // },
};

export default formats;
