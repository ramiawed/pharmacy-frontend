import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";

// components
import StatisticsCard from "../../components/statistics-card/statistics-card.component";

// redux stuff
import { selectUser } from "../../redux/auth/authSlice";
import { useSelector } from "react-redux";

// styles
import generalStyles from "../../style.module.scss";

// constants
import { UserTypeConstants } from "../../utils/constants";

function StatisticsOptionsPage({ onSelectedChange }) {
  const { t } = useTranslation();
  const user = useSelector(selectUser);

  useEffect(() => {
    onSelectedChange();
  }, []);

  return user && user.type === UserTypeConstants.ADMIN ? (
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
  ) : (
    <Redirect to="/signin" />
  );
}

export default StatisticsOptionsPage;
