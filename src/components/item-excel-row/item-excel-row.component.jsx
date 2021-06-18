import React from "react";

// icons
import { AiFillDelete } from "react-icons/ai";

// components
import ActionButton from "../action-button/action-button.component";

// constants
import { Colors } from "../../utils/constants";

// styles
import styles from "./item-excel-row.module.scss";
import tableStyles from "../table.module.scss";

function ItemExcelRow({ item, index, onchange, onDelete }) {
  const error =
    item.name === "" || item.price === 0 || item.customer_price === 0;

  return (
    <div
      className={[
        styles.row,
        index % 2 === 0 ? styles.odd : styles.even,
        error ? styles.error : "",
      ].join(" ")}
    >
      <div className={tableStyles.label_medium}>
        <input
          id="name"
          type="text"
          value={item.name}
          onChange={(e) => onchange(e, index)}
        />
      </div>

      <div className={tableStyles.label_small}>
        <input
          id="formula"
          type="text"
          value={item.formula}
          onChange={(e) => onchange(e, index)}
        />
      </div>
      <div className={tableStyles.label_small}>
        <input
          id="caliber"
          type="text"
          value={item.caliber}
          onChange={(e) => onchange(e, index)}
        />
      </div>

      <div className={tableStyles.label_small}>
        <input
          id="packing"
          type="text"
          value={item.packing}
          onChange={(e) => onchange(e, index)}
        />
      </div>

      <div className={tableStyles.label_small}>
        <input
          id="price"
          min="0"
          type="number"
          value={item.price}
          onChange={(e) => onchange(e, index)}
        />
      </div>

      <div className={tableStyles.label_small}>
        <input
          id="customer_price"
          type="number"
          value={item.customer_price}
          onChange={(e) => onchange(e, index)}
        />
      </div>

      <div className={tableStyles.label_large}>
        <input
          id="composition"
          style={{ overflow: "none" }}
          value={item.composition}
          onChange={(e) => onchange(e, index)}
        />
      </div>

      <label className={tableStyles.label_xsmall}>
        <ActionButton
          icon={() => <AiFillDelete />}
          color={Colors.FAILED_COLOR}
          tooltip="delete-item"
          action={onDelete}
        />
      </label>
    </div>
  );
}

export default ItemExcelRow;
