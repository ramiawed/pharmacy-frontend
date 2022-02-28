import React from "react";
import { useTranslation } from "react-i18next";

// icons
import { AiFillDelete } from "react-icons/ai";

// styles
import generalStyles from "../../style.module.scss";
import tableStyles from "../table.module.scss";
import rowStyles from "../row.module.scss";
import { onKeyPressForNumberInput } from "../../utils/constants";

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
      className={[rowStyles.container, error ? rowStyles.error : ""].join(" ")}
    >
      <div
        className={[
          tableStyles.label_xsmall,
          generalStyles.flex_center_container,
        ].join(" ")}
      >
        <input
          type="checkbox"
          value={item.selected}
          checked={item.selected}
          // disabled={error}
          onChange={() => onSelectedChanged(index)}
        />
      </div>
      <div className={tableStyles.label_medium}>
        <input
          className={rowStyles.input}
          id="name"
          type="text"
          value={item.name}
          onChange={(e) => onchange(e, index)}
        />
      </div>

      <div className={tableStyles.label_medium}>
        <input
          className={rowStyles.input}
          id="formula"
          type="text"
          value={item.formula}
          onChange={(e) => onchange(e, index)}
        />
      </div>
      <div className={tableStyles.label_small}>
        <input
          className={rowStyles.input}
          id="caliber"
          type="text"
          value={item.caliber}
          onChange={(e) => onchange(e, index)}
        />
      </div>

      <div className={tableStyles.label_small}>
        <input
          className={rowStyles.input}
          id="packing"
          type="text"
          value={item.packing}
          onChange={(e) => onchange(e, index)}
        />
      </div>

      <div className={tableStyles.label_medium}>
        <input
          className={rowStyles.input}
          id="price"
          onKeyPress={onKeyPressForNumberInput}
          value={item.price}
          onChange={(e) => onchange(e, index)}
        />
      </div>

      <div className={tableStyles.label_medium}>
        <input
          className={rowStyles.input}
          id="customer_price"
          onKeyPress={onKeyPressForNumberInput}
          value={item.customer_price}
          onChange={(e) => onchange(e, index)}
        />
      </div>

      <div className={tableStyles.label_medium}>
        <input
          className={rowStyles.input}
          id="barcode"
          type="text"
          value={item.barcode}
          onChange={(e) => onchange(e, index)}
        />
      </div>

      <div className={tableStyles.label_large}>
        <input
          className={rowStyles.input}
          id="indication"
          style={{ overflow: "none", fontSize: "0.7rem" }}
          value={item.indication}
          onChange={(e) => onchange(e, index)}
        />
      </div>

      <div className={tableStyles.label_large}>
        <input
          className={rowStyles.input}
          id="composition"
          style={{ overflow: "none", fontSize: "0.7rem" }}
          value={item.composition}
          onChange={(e) => onchange(e, index)}
        />
      </div>

      <label className={tableStyles.label_xsmall}>
        <div
          className={[
            generalStyles.icon,
            generalStyles.fc_red,
            generalStyles.margin_h_auto,
          ].join(" ")}
          onClick={() => onDelete()}
        >
          <AiFillDelete size={16} />
          <p className={generalStyles.tooltip}>{t("delete-row")}</p>
        </div>
      </label>
    </div>
  );
}

export default ItemExcelRow;
