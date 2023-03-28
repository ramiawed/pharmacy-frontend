import { useTranslation } from "react-i18next";
import React from "react";

// constants
import { OfferTypes } from "../../utils/constants";

// styles
import styles from "./offer-details-row.module.scss";

const OfferDetailsRow = ({ offer, offerMode }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.offer}>
      <p>
        <label>{t("quantity")}</label>
        <label className={[styles.value].join(" ")}>{offer.qty}</label>
      </p>
      <p>
        <label>
          {offerMode === OfferTypes.PIECES
            ? t("bonus quantity")
            : t("bonus percentage")}
        </label>
        <label className={styles.value}>{offer.bonus}</label>
        <label>
          {offerMode === OfferTypes.PIECES ? t("piece") : t("percentage")}
        </label>
      </p>
    </div>
  );
};

export default OfferDetailsRow;
