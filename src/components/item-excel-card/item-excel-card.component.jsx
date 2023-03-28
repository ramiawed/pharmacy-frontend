import React from "react";
import { useTranslation } from "react-i18next";

// icons
import { AiFillDelete } from "react-icons/ai";

// styles
import styles from "./item-excel-card.module.scss";

// constants
import { Colors, onKeyPressForNumberInput } from "../../utils/constants";

// components
import Icon from "../icon/icon.component";

function ItemExcelCard({
  item,
  index,
  onchange,
  onDelete,
  onSelectedChanged,
  withUpdate,
}) {
  const { t } = useTranslation();

  const error =
    item.name === "" ||
    item.price * 1 === 0 ||
    item.customer_price * 1 === 0 ||
    (withUpdate === true && item._id === null);

  return (
    <div
      className={[styles.card_container, error ? styles.error : ""].join(" ")}
    >
      <div className={styles.namesActionsDiv}>
        <div className={styles.centerDiv}>
          <input
            type="checkbox"
            value={item.selected}
            checked={item.selected}
            onChange={() => onSelectedChanged(index)}
          />
        </div>

        <div className={styles.namesDiv}>
          <input
            id="name"
            type="text"
            value={item.name}
            onChange={(e) => onchange(e, index)}
          />
          <input
            id="nameAr"
            type="text"
            value={item.nameAr}
            onChange={(e) => onchange(e, index)}
          />
        </div>

        <Icon
          selected={false}
          foreColor={Colors.FAILED_COLOR}
          tooltip={t("delete")}
          onclick={onDelete}
          icon={() => <AiFillDelete size={24} />}
        />
      </div>
      <div className={styles.row_column}>
        <div className={styles.row}>
          <label>{t("formula")}:</label>
          <input
            id="formula"
            type="text"
            value={item.formula}
            onChange={(e) => onchange(e, index)}
          />
        </div>

        <div className={styles.row}>
          <label>{t("caliber")}:</label>
          <input
            id="caliber"
            type="text"
            value={item.caliber}
            onChange={(e) => onchange(e, index)}
          />
        </div>
      </div>

      <div className={styles.row_column}>
        <div className={styles.row}>
          <label>{t("price")}:</label>
          <input
            id="price"
            onKeyPress={onKeyPressForNumberInput}
            value={item.price}
            onChange={(e) => onchange(e, index)}
          />
        </div>
        <div className={styles.row}>
          <label>{t("customer price")}:</label>
          <input
            id="customer_price"
            onKeyPress={onKeyPressForNumberInput}
            value={item.customer_price}
            onChange={(e) => onchange(e, index)}
          />
        </div>
      </div>

      <div className={styles.row_column}>
        <div className={styles.row}>
          <label>{t("barcode")}:</label>
          <input
            id="barcode"
            type="text"
            value={item.barcode}
            onChange={(e) => onchange(e, index)}
          />
        </div>
        <div className={styles.row}>
          <label>{t("barcode")} 2:</label>
          <input
            id="barcodeTwo"
            type="text"
            value={item.barcodeTwo}
            onChange={(e) => onchange(e, index)}
          />
        </div>
      </div>

      <div className={styles.row}>
        <label>{t("indication")}:</label>
        <textarea
          id="indication"
          value={item.indication}
          onChange={(e) => onchange(e, index)}
          rows={1}
        />
      </div>

      <div className={styles.row}>
        <label>{t("composition")}:</label>
        <textarea
          id="composition"
          value={item.composition}
          onChange={(e) => onchange(e, index)}
          rows={1}
        />
      </div>
    </div>
  );
}

export default ItemExcelCard;
