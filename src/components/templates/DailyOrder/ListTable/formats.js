import dayjs from "dayjs";
import CardinalProduct from "../../../tooltips/CardinalProduct";
import CardinalAlt from "../../../tooltips/CardinalAlt";
import PsDetails from "../../../tooltips/PsDetails";
import PsAlts from "../../../tooltips/PsAlts";
import TableCell from "../../../customs/TableCell";

const formats = {
  package: (v) => {
    let title = "";
    let subtitle = "";
    const pkg = v.package;
    if (pkg) {
      if (pkg.brand_name) {
        if (pkg.brand_name.length > 20) {
          title += pkg.brand_name.substring(0, pkg.brand_name.indexOf(" "));
        } else {
          title += pkg.brand_name;
        }
        if (pkg.strength) {
          title += " " + pkg.strength;
        }
        if (pkg.size) {
          title += " (" + pkg.size + ")";
        }
        const manufacturer_name = pkg.manufacturer_name;
        if (manufacturer_name) {
          if (manufacturer_name.length > 10) {
            const indexOfSpace = manufacturer_name.indexOf(" ");
            if (indexOfSpace > 4) {
              subtitle += manufacturer_name.substring(0, indexOfSpace);
            } else {
              subtitle += manufacturer_name.substring(
                0,
                manufacturer_name.indexOf(" ", 4)
              );
            }
          } else {
            subtitle += manufacturer_name;
          }
        }
      }
    } else {
      // gtin 없을수 있음 현재
      title = v.gtin;
    }
    return <TableCell title={title} subtitle={subtitle} />;
  },
  item: (v) => <TableCell title={v.item.cost ?? "UNKNOWN"} />,
  qty: (v) => <TableCell title={v.item.length} />,

  cardinalProduct: (v) => {
    let title = "";
    let subtitle = "";
    let badge;
    const cardinalProduct = v.cardinalProduct;
    const lastUpdated = cardinalProduct?.lastUpdated;
    if (lastUpdated) {
      const estNetCost = cardinalProduct.estNetCost;
      if (estNetCost) {
        title += estNetCost;
        subtitle += cardinalProduct.netUoiCost;
        if (!cardinalProduct.contract) {
          badge = "warning";
        } else if (!cardinalProduct.lastOrdered) {
          badge = "warning";
        }
      } else {
        title += "N/A";
      }
    }
    return (
      <TableCell
        title={title}
        subtitle={subtitle}
        badge={badge}
        tooltip={
          subtitle ? (
            <CardinalProduct
              data={v.cardinalProduct}
              barChartData={v.cardinalProductAnalysis.shipQty}
              lineChartData={v.cardinalProductAnalysis.maxUnitCost.map((v) =>
                Number(v.replaceAll(/[^0-9.]+/g, ""))
              )}
            />
          ) : null
        }
      />
    );
  },
  cardinalAlt: (v) => {
    let title = "";
    let subtitle = "";
    const lastUpdated = v.cardinalProduct?.lastUpdated;
    if (lastUpdated) {
      const estNetCost = v.cardinalAlt?.estNetCost;
      if (estNetCost) {
        title += estNetCost;
        subtitle += v.cardinalAlt.netUoiCost;
      } else {
        title += "N/A";
      }
    }
    return (
      <TableCell
        title={title}
        subtitle={subtitle}
        tooltip={
          subtitle ? (
            <CardinalAlt data={v.cardinalAlt} lastUpdated={lastUpdated} />
          ) : null
        }
      />
    );
  },
  psDetails: (v) => {
    let title = "";
    let subtitle = "";
    let shortDated = false;
    const pkgPrice = v.psDetails?.pkgPrice;
    if (pkgPrice) {
      title += pkgPrice;
      if (pkgPrice !== "N/A") {
        subtitle += v.psDetails.unitPrice;
      }
      const shortDate = dayjs().add(11, "month");
      const expDate = dayjs(v.psDetails.lotExpDate, "MM/YY");
      if (expDate.isBefore(shortDate)) {
        shortDated = true;
      }
    }
    return (
      <TableCell
        title={title}
        subtitle={subtitle}
        badge={shortDated ? "warning" : ""}
        tooltip={
          subtitle ? (
            <PsDetails
              data={v.psDetails}
              lastUpdated={v.psLastUpdated}
              shortDated={shortDated}
            />
          ) : null
        }
      />
    );
  },
  psAlts: (v) => {
    let title = "";
    let subtitle = "";
    let badge;
    const alt = v.psAlts[0];
    if (alt) {
      const pkgPrice = alt.pkgPrice;
      title += pkgPrice;
      if (pkgPrice !== "N/A") {
        subtitle += alt.unitPrice;
        const shortDate = dayjs().add(11, "month");
        const expDate = dayjs(alt.lotExpDate, "MM/YY");
        if (expDate.isBefore(shortDate)) {
          badge = "warning";
        }
      }
    }
    return (
      <TableCell
        title={title}
        subtitle={subtitle}
        badge={badge}
        tooltip={subtitle ? <PsAlts data={v.psAlts} /> : null}
      />
    );
  },

  status: (v) => <TableCell title={v.status} />,
};

export default formats;
