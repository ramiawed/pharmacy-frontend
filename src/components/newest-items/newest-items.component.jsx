import React from "react";
import { useTranslation } from "react-i18next";
import CardInfo from "../card-info/card-info.component";

function NewestItems() {
  const { t } = useTranslation();

  return <CardInfo headerTitle={t("newest-items")} />;
}

export default NewestItems;
