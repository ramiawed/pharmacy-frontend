import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

// redux stuff
import { useDispatch } from "react-redux";
import { changeItemWarehousePoints } from "../../redux/items/itemsSlices";

// components
import MultiValue from "../../components/multi-value/multi-value.component";
import NoContent from "../../components/no-content/no-content.component";
import Modal from "../modal/modal.component";

// constants
import { toEnglishNumber } from "../../utils/constants";

function PointsModal({ item, warehouseId, close, token, allowEdit }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { points } = item.warehouses.find(
    (w) => w.warehouse._id === warehouseId
  );

  const [values, setValues] = useState(
    points?.length > 0
      ? points.map((p) => {
          return { value: { qty: p.qty, bonus: p.bonus }, key: p._id };
        })
      : []
  );

  // add a new point to the points array
  const addHandler = () =>
    setValues([...values, { value: { qty: 0, bonus: 0 }, key: uuidv4() }]);

  const deleteHandler = (key) => {
    const updatedValues = values.filter((value) => value.key !== key);
    setValues(updatedValues);
  };

  const changeHandler = (prop, val, id) => {
    const updatedValues = values.map((value) => {
      if (value.key === id) {
        return {
          ...value,
          value: {
            ...value.value,
            [prop === "bonus" ? "bonus" : "qty"]: toEnglishNumber(val) * 1,
          },
        };
      } else {
        return value;
      }
    });

    setValues(updatedValues);
  };

  const handleOkButton = () => {
    const points = values
      .filter((v) => v.value.point !== 0 || v.value.qty)
      .sort((a, b) => {
        if (a.value.qty > b.value.qty) return -1;
        if (a.value.qty < b.value.qty) return 1;
        return 0;
      })
      .map((v) => {
        return { qty: v.value.qty, bonus: v.value.bonus };
      });

    dispatch(
      changeItemWarehousePoints({
        obj: {
          itemId: item._id,
          warehouseId: warehouseId,
          points: points,
        },
        token,
      })
    );

    close();
  };

  return (
    <Modal
      header="points"
      cancelLabel="close-label"
      okLabel="add-label"
      closeModal={close}
      okModal={
        allowEdit
          ? () => {
              handleOkButton();
            }
          : null
      }
      small={true}
    >
      {values.length === 0 && <NoContent msg={t("no-points-offers")} />}

      <MultiValue
        allowEdit={allowEdit}
        values={values}
        addHandler={addHandler}
        deleteHandler={deleteHandler}
        changeHandler={changeHandler}
        quantityLabel={t("quantity-label")}
        bonusLabel={t("after-quantity-label")}
        afterQuantityLabel={t("after-quantity-label")}
        afterBonusLabel={t("point")}
      />
    </Modal>
  );
}

export default PointsModal;
