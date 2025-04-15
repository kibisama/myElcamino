import TableCell from "../../../customs/TableCell";
import PsPackage from "../../../tooltips/DailyOrder/PsPackage";
import PsAlternative from "../../../tooltips/DailyOrder/PsAlternative";

// const ENUM = {
//   CAH_NO_DATA: "— —",
//   CAH_PRODUCT_TYPE_BRAND: "Branded Drug",
//   CAH_PRODUCT_TYPE_GENERIC: "Generic Drug",
//   PENDING: "PENDING",
//   NA: "NA",
//   BRAND: "BRAND",
//   NO_CONTRACT: "NO CONTRACT",
// };

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

const formats = {
  date: (v) => {
    return <TableCell data={v.date} />;
  },
  package: (v) => {
    return <TableCell data={v.package} />;
  },
  qty: (v) => {
    return <TableCell data={v.qty} />;
  },
  cahPrd: (v) => {
    return (
      <TableCell
        data={v.cahPrd}
        // tooltip={<CardinalProduct data={v.cahPrd.data} />}
      />
    );
  },
  cahSrc: (v) => {
    return (
      <TableCell
        data={v.cahSrc}
        // tooltip={<CardinalProduct data={v.cahSrc.data} />}
      />
    );
  },
  psPkg: (v) => {
    const psPkg = v.psPkg;
    const data = psPkg.data;
    return (
      <TableCell
        data={psPkg}
        tooltip={
          data && <PsPackage data={data.data} lastUpdated={data.lastUpdated} />
        }
        placement={"left"}
      />
    );
  },
  psAlt: (v) => {
    const psAlt = v.psAlt;
    const data = psAlt.data;
    return (
      <TableCell
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
  //     // tooltip 업데이트중 공백기간 텍스트적용 해제해야함 브랜드면 미리정보줘야함
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
  //     <TableCell
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
  //     <TableCell
  //       data={cahSource}
  //       textStyle={textStyle}
  //       tooltip={tooltip}
  //       onClickTooltip={onClickTooltip}
  //     />
  //   );
  // },
  // psItem: (v) => {
  //   const psItem = v.psItem;
  //   const _tooltip = psItem.tooltip;
  //   let tooltip;
  //   let onClickTooltip;
  //   if (_tooltip) {
  //     const data = _tooltip.data;
  //     const time = dayjs(v.time);
  //     const _lastUpdated = dayjs(_tooltip.lastUpdated);
  //     const lastUpdated = time.isSame(_lastUpdated, "day")
  //       ? "Today " + _lastUpdated.format("HH:mm:ss")
  //       : _lastUpdated.format("MM/DD/YYYY HH:mm:ss");
  //     const option = {
  //       shortDated: time
  //         .add(11, "month")
  //         .isAfter(dayjs(data.lotExpDate, "MM/YY")),
  //     };
  //     onClickTooltip = () =>
  //       window.open(
  //         `https://pharmsaver.net/Pharmacy/Order.aspx?q=${data.ndc.replaceAll(
  //           "-",
  //           ""
  //         )}`,
  //         "_blank"
  //       );
  //     tooltip = (
  //       <PsItem data={data} lastUpdated={lastUpdated} option={option} />
  //     );
  //   }
  //   return (
  //     <TableCell
  //       data={psItem}
  //       tooltip={tooltip}
  //       onClickTooltip={onClickTooltip}
  //     />
  //   );
  // },
  // psSearch: (v) => {
  //   const psSearch = v.psSearch;
  //   const _tooltip = psSearch.tooltip;
  //   let tooltip;
  //   let onClickTooltip;
  //   if (_tooltip) {
  //     // 중복 함수화
  //     const time = dayjs(v.time);
  //     const _lastUpdated = dayjs(_tooltip.lastUpdated);
  //     const lastUpdated = time.isSame(_lastUpdated, "day")
  //       ? "Today " + _lastUpdated.format("HH:mm:ss")
  //       : _lastUpdated.format("MM/DD/YYYY HH:mm:ss");
  //     tooltip = <PsSearch lastUpdated={lastUpdated} data={_tooltip.data} />;
  //   }
  //   return <TableCell data={psSearch} tooltip={tooltip} />;
  // },
};

export default formats;
