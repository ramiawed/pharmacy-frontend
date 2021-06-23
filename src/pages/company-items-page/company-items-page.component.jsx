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

  const [selectedItem, setSelectedItem] = useState(null);

  const onSelect = (item) => {
    setSelectedItem(item);
    setSelectedTab("single");
  };

  return (
    <div>
      <div className={styles.tabs}>
        <label
          onClick={() => {
            setSelectedItem(null);
            setSelectedTab("search");
          }}
          className={selectedTab === "search" ? styles.selected : ""}
        >
          {t("search")}
        </label>
        <label
          onClick={() => {
            setSelectedItem(null);
            setSelectedTab("single");
          }}
          className={selectedTab === "single" ? styles.selected : ""}
        >
          {t("single-item")}
        </label>
        <label
          onClick={() => {
            setSelectedItem(null);
            setSelectedTab("excel");
          }}
          className={selectedTab === "excel" ? styles.selected : ""}
        >
          {t("items-from-excel")}
        </label>
      </div>
      {selectedTab === "search" && (
        <CompanyItems onSelect={(item) => onSelect(item)} />
      )}
      {selectedTab === "single" && <Item selectedItem={selectedItem} />}
      {selectedTab === "excel" && <ItemsFromExcel />}
    </div>
  );
}

export default CompanyItemsPage;
