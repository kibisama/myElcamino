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
    let sfdcOutdated = false;
    const cardinalProduct = v.cardinalProduct;
    const lastUpdated = cardinalProduct?.lastUpdated;
    if (lastUpdated) {
      const estNetCost = cardinalProduct.estNetCost;
      if (estNetCost) {
        title += estNetCost;
        subtitle += cardinalProduct.netUoiCost;
        const analysis = v.cardinalProductAnalysis;
        switch (true) {
          case cardinalProduct.brandName !== "— —":
            break;
          case !cardinalProduct.contract:
            badge = "error";
            break;
          case cardinalProduct.stockStatus !== "IN STOCK":
            badge = "warning";
            break;
          case !analysis:
            badge = "warning";
            break;
          case dayjs()
            .subtract(2, "month")
            .isAfter(dayjs(analysis.lastSFDCdate)):
            badge = "warning";
            sfdcOutdated = true;
            break;
          default:
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
              analysisData={v.cardinalProductAnalysis}
              sfdcOutdated={sfdcOutdated}
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
