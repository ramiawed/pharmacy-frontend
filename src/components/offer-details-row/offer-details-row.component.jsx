import { useTranslation } from "react-i18next";
import React from "react";
import { OfferTypes } from "../../utils/constants";

import styles from "./offer-details-row.module.scss";

const OfferDetailsRow = ({ offer, offerMode }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.offer}>
      <p>
        <label>{t("quantity-label")}</label>
        <label className={[styles.value].join(" ")}>{offer.qty}</label>
        <label className={styles.left_padding}>
          {t("after-quantity-label")}
        </label>
      </p>
      <p>
        <label>
          {offerMode === OfferTypes.PIECES
            ? t("bonus-quantity-label")
            : t("bonus-percentage-label")}
        </label>
        <label className={styles.value}>{offer.bonus}</label>
        <label>
          {offerMode === OfferTypes.PIECES
            ? t("after-bonus-quantity-label")
            : t("after-bonus-percentage-label")}
        </label>
      </p>
    </div>
  );
};

export default OfferDetailsRow;
