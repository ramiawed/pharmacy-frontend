import React from "react";
import { useTranslation } from "react-i18next";

// components
import Icon from "../icon/icon.component";

// icons
import { MdDelete, MdSearch } from "react-icons/md";

// styles
import styles from "./basket-item-row.module.scss";

// constants and utils
import { Colors, formatNumber } from "../../utils/constants";

const BasketItemRow = ({
  index,
  setSelectedIndex,
  setShowChooseModal,
  changeIsFree,
  changeQty,
  item,
  deleteItem,
  changeBonus,
  allowEdit,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.item_row} key={index}>
      <div className={styles.content_div}>
        <div className={styles.name_div}>
          {allowEdit && (
            <Icon
              selected={false}
              foreColor={Colors.SUCCEEDED_COLOR}
              tooltip={t("add-item")}
              onclick={() => {
                setSelectedIndex(index);
                setShowChooseModal(true);
              }}
              icon={() => <MdSearch size={24} />}
              withBackground={true}
            />
          )}

          <label>{item.item?.name}</label>
        </div>

        <div className={styles.content_details}>
          <div className={styles.cell}>
            <label>{t("item-price-small")}</label>
            <label>{formatNumber(item.item?.price)}</label>
          </div>

          <div className={styles.cell}>
            <label>{t("basket-free-item")}</label>
            <input
              type="checkbox"
              value={item.isFree}
              checked={item.isFree}
              onChange={(e) => changeIsFree(e, index)}
              style={{
                position: "relative",
                top: "6px",
                width: "18px",
                height: "18px",
              }}
              disabled={!allowEdit}
            />
          </div>
          <div className={styles.cell}>
            <label>{t("quantity-label")}</label>
            {allowEdit ? (
              <input
                value={item.qty}
                type="number"
                min={0}
                max={100}
                onChange={(e) => changeQty(e, index)}
                disabled={!allowEdit}
              />
            ) : (
              <label>{item.qty}</label>
            )}
          </div>

          <div className={styles.cell}>
            <label>{t("pieces")}</label>
            {allowEdit ? (
              <input
                value={item.bonus}
                type="number"
                min={0}
                max={100}
                onChange={(e) => changeBonus(e, index)}
                disabled={!allowEdit}
              />
            ) : (
              <label>{item.bonus}</label>
            )}
          </div>

          <div className={styles.cell}>
            <label>{t("total-price-small")}</label>
            <label>
              {item.item
                ? item.isFree
                  ? 0
                  : formatNumber(item.item.price * item.qty)
                : 0}
            </label>
          </div>
        </div>
      </div>

      {allowEdit && (
        <div className={styles.delete_div}>
          <Icon
            selected={false}
            foreColor={Colors.FAILED_COLOR}
            tooltip={t("delete-item")}
            onclick={() => {
              deleteItem(index);
            }}
            icon={() => <MdDelete size={24} />}
            withBackground={true}
          />
        </div>
      )}
    </div>
  );
};

export default BasketItemRow;
