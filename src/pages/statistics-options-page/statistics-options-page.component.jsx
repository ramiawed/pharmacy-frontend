import React from "react";
import { useTranslation } from "react-i18next";
import StatisticsCard from "../../components/statistics-card/statistics-card.component";

// styles
import generalStyles from "../../style.module.scss";

function StatisticsOptionsPage() {
  const { t } = useTranslation();

  return (
    <div className={[generalStyles.flex_container].join(" ")}>
      <StatisticsCard
        title={t("statistics-sign-in")}
        field="signinDates"
        type="users"
      />
      <StatisticsCard
        title={t("statistics-selected-company")}
        field="selectedDates"
        type="users"
      />
      <StatisticsCard
        title={t("statistics-selected-item")}
        field="selectedDates"
        type="items"
      />
      <StatisticsCard
        title={t("statistics-item-added-to-card")}
        field="addedToCartDates"
        type="items"
      />
      <StatisticsCard
        title={t("statistics-user-order")}
        field="orderDates"
        type="users"
      />
      <StatisticsCard
        title={t("statistics-user-added-to-favorite")}
        field="addedToFavoriteDates"
        type="users"
      />
      <StatisticsCard
        title={t("statistics-item-added-to-favorite")}
        field="addedToFavoriteDates"
        type="items"
      />
    </div>
  );
}

export default StatisticsOptionsPage;
