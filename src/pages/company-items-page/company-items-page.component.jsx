import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import CompanyItems from "../../components/company-items/company-items.component";
import Item from "../../components/item/item.component";
import ItemsFromExcel from "../../components/items-from-excel/items-from-excel.component";
// styles
import styles from "./company-items-page.module.scss";

function CompanyItemsPage() {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState("search");
  return (
    <div>
      <div className={styles.tabs}>
        <label
          onClick={() => setSelectedTab("search")}
          className={selectedTab === "search" ? styles.selected : ""}
        >
          {t("search")}
        </label>
        <label
          onClick={() => setSelectedTab("single")}
          className={selectedTab === "single" ? styles.selected : ""}
        >
          {t("single-item")}
        </label>
        <label
          onClick={() => setSelectedTab("excel")}
          className={selectedTab === "excel" ? styles.selected : ""}
        >
          {t("items-from-excel")}
        </label>
      </div>
      {selectedTab === "search" && <CompanyItems />}
      {selectedTab === "single" && <Item />}
      {selectedTab === "excel" && <ItemsFromExcel />}
    </div>
  );
}

export default CompanyItemsPage;
