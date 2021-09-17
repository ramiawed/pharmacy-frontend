import React from "react";
import { useTranslation } from "react-i18next";
import CardInfo from "../card-info/card-info.component";

function MostOrderItems() {
  const { t } = useTranslation();

  return <CardInfo headerTitle={t("most-order-items")} />;
}

export default MostOrderItems;
