import React from "react";
import { useTranslation } from "react-i18next";

// constants
import { Colors } from "../../utils/constants";

// components
import RowContainer from "../../components/row-container/row-container.component";

function ExcelFileCriteria({ action }) {
  const { t } = useTranslation();
  return (
    <>
      <p
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          marginBottom: "6px",
          marginTop: "6px",
          color: Colors.FAILED_COLOR,
        }}
      >
        {t("excel-file-should-contains-this-columns")}
      </p>
      <RowContainer isHeader={true}>
        {action === "update" && <label style={{ flex: 1 }}>_id</label>}
        <label style={{ flex: 1 }}>name</label>
        <label style={{ flex: 1 }}>formula</label>
        <label style={{ flex: 1 }}>caliber</label>
        <label style={{ flex: 1 }}>packing</label>
        <label style={{ flex: 1 }}>price</label>
        <label style={{ flex: 1 }}>customer_price</label>
        <label style={{ flex: 1 }}>barcode</label>
        <label style={{ flex: 1 }}>indication</label>
        <label style={{ flex: 1 }}>composition</label>
      </RowContainer>
      <p>{t("excel-file-warning")}</p>
      <p
        style={{
          color: Colors.SUCCEEDED_COLOR,
          fontSize: "1.2rem",
        }}
      >
        {t("required-criteria")}
      </p>
      <ul
        style={{
          marginInlineStart: "30px",
        }}
      >
        {action === "update" && <li>{t("required-id-criteria")}</li>}
        <li>{t("required-name-criteria")}</li>
        <li>{t("required-price-criteria")}</li>
        <li>{t("required-customer-price-criteria")}</li>
      </ul>
    </>
  );
}

export default ExcelFileCriteria;
