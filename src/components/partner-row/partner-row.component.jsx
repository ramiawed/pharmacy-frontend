import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import FastDeliverLogo from "../../smal-logo.png";

// react icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaHandshake, FaHandshakeSlash } from "react-icons/fa";

// components
import ChangeQuantityModal from "../../modals/change-quantity-modal/change-quantity-modal.component";
import CustomCheckbox from "../custom-checkbox/custom-checkbox.component";
import Separator from "../separator/separator.component";
import Icon from "../icon/icon.component";

// redux-stuff
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/warehouse/warehousesSlice";
import {
  selectFavoritesPartners,
  selectFavoritesError,
} from "../../redux/favorites/favoritesSlice";
import { selectUserData } from "../../redux/auth/authSlice";
import { selectSettings } from "../../redux/settings/settingsSlice";

// styles
import styles from "./partner-row.module.scss";

// constants and utils
import { Colors, UserTypeConstants } from "../../utils/constants.js";

function PartnerRow({
  partner,
  fullWidth,
  withoutBoxShadow,
  withoutDeliverOption,
  onSelectAction,
  addPartnerToFavoriteHandler,
  addCompanyToOurCompaniesHandler,
  removePartnerFromFavoriteHandler,
  removeCompanyFromOurCompaniesHandler,
  partnerRowClickHandler,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const {
    settings: { showWarehouseItem },
  } = useSelector(selectSettings);
  const favorites = useSelector(selectFavoritesPartners);
  const favoritesError = useSelector(selectFavoritesError);
  const { user, token } = useSelector(selectUserData);

  const [showChangeDeliverCostModal, setShowChangeDeliverCostModal] =
    useState(false);

  const [
    showChangeMinimumInvoiceValueModal,
    setShowChangeMinimumInvoiceValueModal,
  ] = useState(false);

  // determine if the partner can see the medicines in specific warehouse
  const allowShowingWarehouseMedicines =
    user.type === UserTypeConstants.ADMIN ||
    partner.type === UserTypeConstants.COMPANY ||
    (partner.type === UserTypeConstants.WAREHOUSE &&
      showWarehouseItem &&
      partner.allowShowingMedicines);

  const clickHandler = (allow) => {
    if (allow) {
      if (onSelectAction) onSelectAction();
      partnerRowClickHandler(allowShowingWarehouseMedicines);
    }
  };

  const changeQuantityHandler = (value) => {
    if (value < 0 || value > 1) {
      return;
    }

    dispatch(
      updateUser({
        body: {
          costOfDeliver: value,
        },
        userId: partner._id,
        token,
      })
    );

    setShowChangeDeliverCostModal(false);
  };

  const changeMinimumInvoiceValueHandler = (value) => {
    if (value < 0) {
      return;
    }

    dispatch(
      updateUser({
        body: {
          invoiceMinTotal: value,
        },
        userId: partner._id,
        token,
      })
    );

    setShowChangeMinimumInvoiceValueModal(false);
  };

  const changeFastDeliverHanlder = () => {
    dispatch(
      updateUser({
        body: {
          fastDeliver: !partner.fastDeliver,
        },
        userId: partner._id,
        token,
      })
    );
  };

  return (
    <>
      <div
        className={[
          fullWidth ? styles.full_width_container : styles.container,
          withoutBoxShadow ? styles.without_box_shadow : "",
        ].join(" ")}
        // onClick={() => clickHandler(user.type !== UserTypeConstants.ADMIN)}
      >
        <div className={styles.content}>
          <label className={styles.name} onClick={() => clickHandler(true)}>
            {partner.name}
          </label>

          {user.type === UserTypeConstants.ADMIN &&
            partner.type === UserTypeConstants.WAREHOUSE &&
            !withoutDeliverOption && (
              <>
                <Separator />
                <div className={styles.label_with_input_div}>
                  <label className={styles.small_label}>
                    {t("deliver-cost")}
                  </label>
                  <button
                    onClick={() => setShowChangeDeliverCostModal(true)}
                    className={styles.btn}
                  >
                    {partner.costOfDeliver}
                  </button>
                </div>
                <Separator />
                <div className={styles.label_with_input_div}>
                  <label className={styles.small_label}>
                    {t("minimum-invoice-cost")}
                  </label>
                  <button
                    className={styles.btn}
                    onClick={() => setShowChangeMinimumInvoiceValueModal(true)}
                  >
                    {partner.invoiceMinTotal}
                  </button>
                </div>
                <Separator />

                <CustomCheckbox
                  label={t("fast-deliver")}
                  value={partner.fastDeliver}
                  changeHandler={() => changeFastDeliverHanlder()}
                />
              </>
            )}

          {partner.type === UserTypeConstants.WAREHOUSE &&
            user.type === UserTypeConstants.PHARMACY &&
            partner.fastDeliver && (
              <div
                className={styles.fast_deliver_div}
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src={FastDeliverLogo}
                  alt="tumb"
                  style={{ width: "32px", height: "32px" }}
                />
                <label>{t("fast-deliver")}</label>
              </div>
            )}
        </div>

        <div className={styles.actions_div}>
          {user.type === UserTypeConstants.WAREHOUSE &&
          partner.type === UserTypeConstants.COMPANY ? (
            <div>
              {user.ourCompanies.includes(partner._id) ? (
                <Icon
                  icon={() => <FaHandshakeSlash size={24} />}
                  onclick={removeCompanyFromOurCompaniesHandler}
                  foreColor={Colors.FAILED_COLOR}
                  tooltip={t("remove-company-from-warehouse-tooltip")}
                />
              ) : (
                <Icon
                  icon={() => <FaHandshake size={24} />}
                  onclick={addCompanyToOurCompaniesHandler}
                  foreColor={Colors.SUCCEEDED_COLOR}
                  tooltip={t("add-company-to-warehouse-tooltip")}
                />
              )}
            </div>
          ) : (
            <></>
          )}

          <div>
            {favoritesError === "" ? (
              favorites &&
              favorites
                .map((favorite) => favorite._id)
                .includes(partner._id) ? (
                <Icon
                  icon={() => <AiFillStar size={24} />}
                  onclick={removePartnerFromFavoriteHandler}
                  foreColor={Colors.YELLOW_COLOR}
                  tooltip={t("remove-from-favorite-tooltip")}
                />
              ) : (
                <Icon
                  icon={() => <AiOutlineStar size={24} />}
                  onclick={addPartnerToFavoriteHandler}
                  foreColor={Colors.YELLOW_COLOR}
                  tooltip={t("add-to-favorite-tooltip")}
                />
              )
            ) : null}
          </div>
        </div>
      </div>

      {showChangeDeliverCostModal && (
        <ChangeQuantityModal
          closeModal={() => setShowChangeDeliverCostModal(false)}
          value={partner.costOfDeliver}
          min={0.0}
          max={1.0}
          step={0.1}
          okModal={(value) => changeQuantityHandler(value)}
        />
      )}

      {showChangeMinimumInvoiceValueModal && (
        <ChangeQuantityModal
          closeModal={() => setShowChangeMinimumInvoiceValueModal(false)}
          value={partner.invoiceMinTotal}
          min={0}
          max={1000000}
          step={1000}
          okModal={(value) => changeMinimumInvoiceValueHandler(value)}
        />
      )}
    </>
  );
}

export default PartnerRow;
