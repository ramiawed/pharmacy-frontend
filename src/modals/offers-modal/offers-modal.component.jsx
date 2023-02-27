import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

// redux stuff
import { useDispatch } from "react-redux";
import { changeItemWarehouseOffer } from "../../redux/items/itemsSlices";

// components
import CustomCheckbox from "../../components/custom-checkbox/custom-checkbox.component";
import MultiValue from "../../components/multi-value/multi-value.component";
import Modal from "../modal/modal.component";

// react-icons
import { MdErrorOutline } from "react-icons/md";

// styles
import styles from "./offers-modal.module.scss";
import generalStyles from "../../style.module.scss";

// constants
import { Colors, OfferTypes, toEnglishNumber } from "../../utils/constants";

function OffersModal({ item, warehouseId, close, token, allowEdit }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { offer } = item.warehouses.find(
    (w) => w.warehouse._id === warehouseId
  );

  const [offerTypeError, setOfferTypeError] = useState(false);
  const [quantityOfferType, setQuantityOfferType] = useState(
    offer.mode === OfferTypes.PIECES ? true : false
  );

  const [percentageOfferType, setPercentageOfferType] = useState(
    offer.mode === OfferTypes.PERCENTAGE ? true : false
  );

  const [values, setValues] = useState(
    offer.offers?.length > 0
      ? offer.offers.map((o) => {
          return { value: { qty: o.qty, bonus: o.bonus }, key: o._id };
        })
      : []
  );

  // add a new offer to the offer array
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
    if (!quantityOfferType && !percentageOfferType) {
      setOfferTypeError(true);
      return;
    }

    const offers = values
      .filter((v) => v.value.bonus !== 0 || v.value.qty)
      .sort((a, b) => {
        if (a.value.qty > b.value.qty) return -1;
        if (a.value.qty < b.value.qty) return 1;
        return 0;
      })
      .map((v) => {
        return { qty: v.value.qty, bonus: v.value.bonus };
      });

    const offerObj = {
      mode:
        offers.length === 0
          ? null
          : quantityOfferType
          ? OfferTypes.PIECES
          : OfferTypes.PERCENTAGE,
      offers,
    };

    dispatch(
      changeItemWarehouseOffer({
        obj: {
          itemId: item._id,
          warehouseId: warehouseId,
          offer: offerObj,
        },
        token,
      })
    );

    close();
  };

  return (
    <Modal
      header="nav-offers"
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
      {allowEdit && values.length > 0 && (
        <div className={styles.checkboxes_div}>
          <div className={styles.offer_type_checkbox}>
            <CustomCheckbox
              label={t(OfferTypes.PIECES)}
              value={quantityOfferType}
              changeHandler={() => {
                setQuantityOfferType(!quantityOfferType);
                setPercentageOfferType(false);
                setOfferTypeError(false);
              }}
            />
          </div>

          <div className={styles.offer_type_checkbox}>
            <CustomCheckbox
              label={t(OfferTypes.PERCENTAGE)}
              value={percentageOfferType}
              changeHandler={() => {
                setPercentageOfferType(!percentageOfferType);
                setQuantityOfferType(false);
                setOfferTypeError(false);
              }}
            />
          </div>

          {offerTypeError && (
            <MdErrorOutline color={Colors.FAILED_COLOR} size={24} />
          )}
        </div>
      )}

      {values.length === 0 && (
        <p
          className={[generalStyles.center, generalStyles.fc_secondary].join(
            " "
          )}
        >
          {t("no-offers")}
        </p>
      )}

      <MultiValue
        allowEdit={allowEdit}
        values={values}
        addHandler={addHandler}
        deleteHandler={deleteHandler}
        changeHandler={changeHandler}
        quantityLabel={t("quantity-label")}
        bonusLabel={
          quantityOfferType
            ? t("bonus-quantity-label")
            : percentageOfferType
            ? t("bonus-percentage-label")
            : null
        }
        afterQuantityLabel={t("after-quantity-label")}
        afterBonusLabel={
          quantityOfferType
            ? t("after-bonus-quantity-label")
            : percentageOfferType
            ? t("after-bonus-percentage-label")
            : null
        }
      />
    </Modal>
  );
}

export default OffersModal;
