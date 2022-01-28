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
import { AdditionalColors, UserTypeConstants } from "../../utils/constants";

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
        backgroundColor={AdditionalColors[0]}
      />
      <StatisticsCard
        title={t("statistics-selected-company")}
        field="selectedDates"
        type="users"
        backgroundColor={AdditionalColors[1]}
      />
      <StatisticsCard
        title={t("statistics-selected-item")}
        field="selectedDates"
        type="items"
        backgroundColor={AdditionalColors[2]}
      />
      <StatisticsCard
        title={t("statistics-item-added-to-card")}
        field="addedToCartDates"
        type="items"
        backgroundColor={AdditionalColors[3]}
      />
      <StatisticsCard
        title={t("statistics-user-order")}
        field="orderDates"
        type="users"
        backgroundColor={AdditionalColors[4]}
      />
      <StatisticsCard
        title={t("statistics-user-added-to-favorite")}
        field="addedToFavoriteDates"
        type="users"
        backgroundColor={AdditionalColors[5]}
      />
      <StatisticsCard
        title={t("statistics-item-added-to-favorite")}
        field="addedToFavoriteDates"
        type="items"
        backgroundColor={AdditionalColors[0]}
      />
    </div>
  ) : (
    <Redirect to="/signin" />
  );
}

export default StatisticsOptionsPage;
