import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import CompanyItems from "../../components/company-items/company-items.component";
import Item from "../../components/item/item.component";
import ItemsFromExcel from "../../components/items-from-excel/items-from-excel.component";
// styles
import styles from "./company-items-page.module.scss";

function CompanyItemsPage() {
  // const { t } = useTranslation();
  // const [selectedTab, setSelectedTab] = useState("search");

  // const [selectedItem, setSelectedItem] = useState(null);

  // const onSelect = (item) => {
  //   setSelectedItem(item);
  //   setSelectedTab("single");
  // };

  return (
    <>
      <CompanyItems />
    </>
  );
}

export default CompanyItemsPage;
