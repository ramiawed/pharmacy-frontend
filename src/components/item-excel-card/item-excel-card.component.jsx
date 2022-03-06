import React from "react";
import { useTranslation } from "react-i18next";

// icons
import { AiFillDelete } from "react-icons/ai";

// styles
import styles from "./item-excel-card.module.scss";

// constants
import { Colors, onKeyPressForNumberInput } from "../../utils/constants";
import Icon from "../action-icon/action-icon.component";

function ItemExcelRow({
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
      <div className={styles.actions}>
        <input
          type="checkbox"
          value={item.selected}
          checked={item.selected}
          // disabled={error}
          onChange={() => onSelectedChanged(index)}
        />
        <Icon
          selected={false}
          foreColor={Colors.FAILED_COLOR}
          tooltip={t("delete-row")}
          onclick={onDelete}
          icon={() => <AiFillDelete size={16} />}
        />
      </div>

      <div className={styles.row}>
        <label>{t("item-name")}:</label>
        <input
          id="name"
          type="text"
          value={item.name}
          onChange={(e) => onchange(e, index)}
        />
      </div>

      <div className={styles.row}>
        <label>{t("item-formula")}:</label>
        <input
          id="formula"
          type="text"
          value={item.formula}
          onChange={(e) => onchange(e, index)}
        />
        <label>{t("item-caliber")}:</label>
        <input
          id="caliber"
          type="text"
          value={item.caliber}
          onChange={(e) => onchange(e, index)}
        />
      </div>

      <div className={styles.row}>
        <label>{t("item-price")}:</label>
        <input
          id="price"
          onKeyPress={onKeyPressForNumberInput}
          value={item.price}
          onChange={(e) => onchange(e, index)}
        />
        <label>{t("item-customer-price")}:</label>
        <input
          id="price"
          onKeyPress={onKeyPressForNumberInput}
          value={item.customer_price}
          onChange={(e) => onchange(e, index)}
        />
      </div>

      <div className={styles.row}>
        <label>{t("item-barcode")}:</label>
        <input
          id="barcode"
          type="text"
          value={item.barcode}
          onChange={(e) => onchange(e, index)}
        />
      </div>

      <div className={styles.row}>
        <label>{t("item-indication")}:</label>
        <textarea
          id="indication"
          value={item.indication}
          onChange={(e) => onchange(e, index)}
        />
      </div>

      <div className={styles.row}>
        <label>{t("item-composition")}:</label>
        <textarea
          id="composition"
          value={item.composition}
          onChange={(e) => onchange(e, index)}
        />
      </div>
    </div>
  );
}

export default ItemExcelRow;
