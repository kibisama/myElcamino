import dayjs from "dayjs";
import { CardinalProduct, PsItem } from "../../../tooltips/DailyOrder";
import TableCell from "../../../customs/TableCell";

const cahNoData = "— —";
const isSameOrCheaper = (a, b) => {
  return (
    Number(b.replaceAll(/[^0-9.]+/g, "")) >=
    Number(a.replaceAll(/[^0-9.]+/g, ""))
  );
};
const cardinalProduct = (_tooltip, time) => {
  const { contract, stockStatus, rebateEligible, returnable, lastSFDCDate } =
    _tooltip.data;
  const _lastUpdated = dayjs(_tooltip.lastUpdated);
  const lastUpdated = dayjs().isSame(_lastUpdated, "day")
    ? "Today " + _lastUpdated.format("HH:mm:ss")
    : _lastUpdated.format("MM/DD/YYYY HH:mm:ss");
  const option = {
    _contract: contract === "NO CONTRACT" ? { color: "error.main" } : undefined,
    _stockStatus:
      stockStatus === "OUT OF STOCK"
        ? { color: "error.main" }
        : stockStatus === "LOW STOCK"
        ? { color: "warning.main" }
        : undefined,
    _rebateEligible: rebateEligible
      ? { color: "warning.main" }
      : { color: "text.disabled" },
    _returnable: returnable ? undefined : { color: "error.main" },
    _lastSFDCDate:
      lastSFDCDate !== cahNoData
        ? dayjs(time).isAfter(
            dayjs(lastSFDCDate, "MM/DD/YYYY").add(3, "month")
          ) && { color: "warning.main" }
        : undefined,
  };
  return (
    <CardinalProduct
      data={_tooltip.data}
      lastUpdated={lastUpdated}
      option={option}
    />
  );
};

const formats = {
  time: (v) => {
    const data = { title: dayjs(v.time).format("hh:mm A") };
    return <TableCell data={data} />;
  },
  package: (v) => {
    return <TableCell data={v.package} />;
  },
  qty: (v) => {
    return <TableCell data={v.qty} />;
  },
  cahProduct: (v) => {
    const estNetCost = v.cahProduct.title;
    const pkgPrice = v.psItem.title;
    const textStyle = v.cahSource.subtitle
      ? { color: "text.disabled" }
      : estNetCost && pkgPrice && isSameOrCheaper(estNetCost, pkgPrice)
      ? { color: "primary.main", fontWeight: 600 }
      : undefined;
    const _tooltip = v.cahProduct.tooltip;
    let tooltip;
    let onClickTooltip;
    if (_tooltip) {
      tooltip = cardinalProduct(_tooltip, v.time);
      onClickTooltip = () => {
        const cin = _tooltip.data.cin;
        if (cin) {
          window.open(
            `https://vantus.cardinalhealth.com/product/${cin}?tab=more-details`,
            "_blank"
          );
        }
      };
    }
    return (
      <TableCell
        data={v.cahProduct}
        textStyle={textStyle}
        tooltip={tooltip}
        onClickTooltip={onClickTooltip}
      />
    );
  },
  cahSource: (v) => {
    const cahSource = v.cahSource;
    const textStyle = !!cahSource.subtitle
      ? undefined
      : cahSource.title === "NA*"
      ? { color: "text.disabled" }
      : { color: "primary.main", fontWeight: 800 };
    let tooltip;
    let onClickTooltip;
    const _tooltip = cahSource.tooltip;
    if (_tooltip) {
      tooltip = cardinalProduct(_tooltip, v.time);
      onClickTooltip = () => {
        const cin = _tooltip.data.cin;
        if (cin) {
          window.open(
            `https://vantus.cardinalhealth.com/product/${cin}?tab=more-details`,
            "_blank"
          );
        }
      };
    }
    return (
      <TableCell
        data={cahSource}
        textStyle={textStyle}
        tooltip={tooltip}
        onClickTooltip={onClickTooltip}
      />
    );
  },
  psItem: (v) => {
    const psItem = v.psItem;
    const _tooltip = psItem.tooltip;
    let tooltip;
    let onClickTooltip;
    if (_tooltip) {
      const data = _tooltip.data;
      const time = dayjs(v.time);
      const _lastUpdated = dayjs(_tooltip.lastUpdated);
      const lastUpdated = time.isSame(_lastUpdated, "day")
        ? "Today " + _lastUpdated.format("HH:mm:ss")
        : _lastUpdated.format("MM/DD/YYYY HH:mm:ss");
      const option = {
        shortDated: time
          .add(11, "month")
          .isAfter(dayjs(data.lotExpDate, "MM/YY")),
      };
      onClickTooltip = () =>
        window.open(
          `https://pharmsaver.net/Pharmacy/Order.aspx?q=${data.ndc.replaceAll(
            "-",
            ""
          )}`,
          "_blank"
        );
      tooltip = (
        <PsItem data={data} lastUpdated={lastUpdated} option={option} />
      );
    }
    return (
      <TableCell
        data={psItem}
        tooltip={tooltip}
        onClickTooltip={onClickTooltip}
      />
    );
  },
  psSearch: (v) => {
    return <TableCell data={v.psSearch} />;
  },
};

export default formats;
