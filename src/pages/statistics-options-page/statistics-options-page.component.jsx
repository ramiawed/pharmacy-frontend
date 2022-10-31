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
    <div
      className={[
        generalStyles.flex_container,
        generalStyles.container_with_header,
      ].join(" ")}
    >
      <StatisticsCard
        title={t("statistics-sign-in")}
        actionType="user-sign-in"
        backgroundColor={AdditionalColors[0]}
      />
      <StatisticsCard
        title={t("statistics-selected-company")}
        actionType="choose-company"
        backgroundColor={AdditionalColors[1]}
      />
      <StatisticsCard
        title={t("statistics-selected-item")}
        actionType="choose-item"
        backgroundColor={AdditionalColors[2]}
      />
      <StatisticsCard
        title={t("statistics-item-added-to-card")}
        actionType="item-added-to-cart"
        backgroundColor={AdditionalColors[3]}
      />
      <StatisticsCard
        title={t("statistics-user-order")}
        actionType="user-made-an-order"
        backgroundColor={AdditionalColors[4]}
      />
      <StatisticsCard
        title={t("statistics-user-added-to-favorite")}
        actionType="user-added-to-favorite"
        backgroundColor={AdditionalColors[5]}
      />
      <StatisticsCard
        title={t("statistics-item-added-to-favorite")}
        actionType="item-added-to-favorite"
        backgroundColor={AdditionalColors[0]}
      />
    </div>
  ) : (
    <Redirect to="/signin" />
  );
}

export default StatisticsOptionsPage;
