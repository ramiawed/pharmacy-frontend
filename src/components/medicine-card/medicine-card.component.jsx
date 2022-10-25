import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Logo from "../../logo.png";

// components
import AddToCartModal from "../../modals/add-to-cart-modal/add-to-cart-modal.component";
import Icon from "../action-icon/action-icon.component";

// react icons
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdAddCircle } from "react-icons/md";
import { GiShoppingCart } from "react-icons/gi";
import { VscLoading } from "react-icons/vsc";
import { BsFillBookmarkPlusFill, BsFillBookmarkDashFill } from "react-icons/bs";

// redux-stuff
import { useDispatch, useSelector } from "react-redux";
import { addStatistics } from "../../redux/statistics/statisticsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";
import {
  addItemToWarehouse,
  removeItemFromWarehouse,
} from "../../redux/medicines/medicinesSlices";

import {
  addFavoriteItem,
  removeFavoriteItem,
  selectFavoritesItems,
} from "../../redux/favorites/favoritesSlice";
import { selectUserData } from "../../redux/auth/authSlice";

// styles
import generalStyles from "../../style.module.scss";
import styles from "./medicine-card.module.scss";

// constants and utils
import {
  checkItemExistsInWarehouse,
  checkOffer,
  Colors,
  SERVER_URL,
  UserTypeConstants,
} from "../../utils/constants.js";
import {
  addSavedItem,
  removeSavedItem,
  selectSavedItems,
} from "../../redux/savedItems/savedItemsSlice";
import { BiListMinus, BiListPlus } from "react-icons/bi";

function MedicineCard({ companyItem }) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const isOnline = useSelector(selectOnlineStatus);
  const { user, token } = useSelector(selectUserData);
  const favorites = useSelector(selectFavoritesItems);
  const { savedItems } = useSelector(selectSavedItems);

  const [showModal, setShowModal] = useState(false);
  const [changeFavoriteLoading, setChangeFavoriteLoading] = useState(false);
  const [changeSaveItemLoading, setChangeSaveItemLoading] = useState(false);
  const [changeAddToWarehouseLoading, setChangeAddToWarehouseLoading] =
    useState(false);

  // method to handle add company to user's favorite
  const addItemToFavoriteItems = (e) => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setChangeFavoriteLoading(true);

    dispatch(
      addFavoriteItem({ obj: { favoriteItemId: companyItem._id }, token })
    )
      .then(unwrapResult)
      .then(() => {
        dispatch(
          addStatistics({
            obj: {
              sourceUser: user._id,
              targetItem: companyItem._id,
              action: "item-added-to-favorite",
            },
          })
        );
        setChangeFavoriteLoading(false);
      })
      .catch(() => {
        setChangeFavoriteLoading(false);
      });
  };

  // method to handle remove company from user's favorite
  const removeItemFromFavoritesItems = (e) => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setChangeFavoriteLoading(true);

    dispatch(
      removeFavoriteItem({ obj: { favoriteItemId: companyItem._id }, token })
    )
      .then(unwrapResult)
      .then(() => {
        setChangeFavoriteLoading(false);
      })
      .catch(() => {
        setChangeFavoriteLoading(false);
      });
  };

  // method to handle add item to warehouse
  const addItemToWarehouseHandler = (e) => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setChangeAddToWarehouseLoading(true);

    dispatch(
      addItemToWarehouse({
        obj: {
          itemId: companyItem._id,
          warehouseId: user._id,
        },
        token,
      })
    )
      .then(unwrapResult)
      .then(() => {
        setChangeAddToWarehouseLoading(false);
      })
      .catch(() => {
        setChangeAddToWarehouseLoading(false);
      });
  };

  // method to handle remove item from warehouse
  const removeItemFromWarehouseHandler = (e) => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setChangeAddToWarehouseLoading(true);

    dispatch(
      removeItemFromWarehouse({
        obj: {
          itemId: companyItem._id,
          warehouseId: user._id,
        },
        token,
      })
    )
      .then(unwrapResult)
      .then(() => {
        setChangeAddToWarehouseLoading(false);
      })
      .catch(() => {
        setChangeAddToWarehouseLoading(false);
      });

    e.stopPropagation();
  };

  // method to handle add item to user's savedItem
  const addItemToSavedItemsHandler = (e) => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setChangeSaveItemLoading(true);

    dispatch(addSavedItem({ obj: { savedItemId: companyItem._id }, token }))
      .then(unwrapResult)
      .then(() => {
        setChangeSaveItemLoading(false);
      })
      .catch(() => {
        setChangeSaveItemLoading(false);
      });
  };

  const removeItemFromSavedItemsHandler = (e) => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    setChangeSaveItemLoading(true);

    dispatch(removeSavedItem({ obj: { savedItemId: companyItem._id }, token }))
      .then(unwrapResult)
      .then(() => {
        setChangeSaveItemLoading(false);
      })
      .catch(() => {
        setChangeSaveItemLoading(false);
      });
  };

  const dispatchStatisticsHandler = () => {
    if (
      user.type === UserTypeConstants.PHARMACY ||
      user.type === UserTypeConstants.GUEST
    ) {
      dispatch(
        addStatistics({
          obj: {
            sourceUser: user._id,
            targetItem: companyItem._id,
            action: "choose-item",
          },
          token,
        })
      );
    }
  };

  return (
    <div
      className={[styles.partner_container].join(" ")}
      onClick={() => {
        dispatchStatisticsHandler();

        history.push("item", {
          from: user.type,
          type: "info",
          allowAction: false,
          itemId: companyItem._id,
          companyId: companyItem.company._id,
          warehouseId:
            user.type === UserTypeConstants.WAREHOUSE ? user._id : null,
        });
      }}
    >
      {checkOffer(companyItem, user) && (
        <div className={[styles.ribbon_2].join(" ")}>
          <span>{t("offer")}</span>
        </div>
      )}
      <div className={styles.company_name}>{companyItem.company.name}</div>
      <div
        style={{
          flex: 1,
        }}
      >
        <div className={styles.icons_div}>
          {changeAddToWarehouseLoading ? (
            <Icon
              icon={() => (
                <VscLoading className={generalStyles.loading} size={24} />
              )}
              onclick={() => {}}
              foreColor={Colors.SECONDARY_COLOR}
            />
          ) : (
            user.type === UserTypeConstants.WAREHOUSE &&
            (companyItem.warehouses
              .map((w) => w.warehouse._id)
              .includes(user._id) ? (
              <Icon
                icon={() => <RiDeleteBin5Fill size={24} />}
                onclick={removeItemFromWarehouseHandler}
                tooltip={t("remove-from-warehouse-tooltip")}
                foreColor={Colors.FAILED_COLOR}
              />
            ) : (
              <Icon
                icon={() => <MdAddCircle size={24} />}
                onclick={addItemToWarehouseHandler}
                tooltip={t("add-to-warehouse-tooltip")}
                foreColor={Colors.SUCCEEDED_COLOR}
              />
            ))
          )}

          {user.type === UserTypeConstants.PHARMACY ? (
            checkItemExistsInWarehouse(companyItem, user) ? (
              <Icon
                icon={() => <GiShoppingCart size={24} />}
                onclick={() => setShowModal(true)}
                foreColor={Colors.SUCCEEDED_COLOR}
              />
            ) : changeSaveItemLoading ? (
              <Icon
                text={t("")}
                onclick={() => {}}
                foreColor={Colors.YELLOW_COLOR}
                icon={() => <VscLoading className={styles.loading} />}
              />
            ) : savedItems.map((si) => si._id).includes(companyItem._id) ? (
              <Icon
                tooltip={t("remove-item-from-saved-items-tooltip")}
                onclick={removeItemFromSavedItemsHandler}
                foreColor={Colors.FAILED_COLOR}
                icon={() => <BsFillBookmarkDashFill size={24} />}
              />
            ) : (
              <Icon
                tooltip={t("add-item-to-saved-items-tooltip")}
                onclick={addItemToSavedItemsHandler}
                foreColor={Colors.SUCCEEDED_COLOR}
                icon={() => <BsFillBookmarkPlusFill size={24} />}
              />
            )
          ) : (
            <></>
          )}

          {changeFavoriteLoading ? (
            <Icon
              icon={() => (
                <VscLoading className={generalStyles.loading} size={24} />
              )}
              onclick={() => {}}
              foreColor={Colors.YELLOW_COLOR}
            />
          ) : favorites
              .map((favorite) => favorite._id)
              .includes(companyItem._id) ? (
            <Icon
              icon={() => <AiFillStar size={24} />}
              onclick={removeItemFromFavoritesItems}
              tooltip={t("remove-from-favorite-tooltip")}
              foreColor={Colors.YELLOW_COLOR}
            />
          ) : (
            <Icon
              icon={() => <AiOutlineStar size={24} />}
              onclick={addItemToFavoriteItems}
              tooltip={t("add-to-favorite-tooltip")}
              foreColor={Colors.YELLOW_COLOR}
            />
          )}
        </div>

        <div className={styles.logo_div}>
          {companyItem.logo_url && companyItem.logo_url !== "" ? (
            <img
              src={`${SERVER_URL}/items/${companyItem.logo_url}`}
              className={styles.logo}
              alt="thumb"
            />
          ) : (
            <img src={Logo} className={styles.logo} alt="thumb" />
          )}
        </div>

        <div className={styles.content}>
          <div className={[styles.showed_content].join(" ")}>
            <div className={styles.main_details}>
              <label className={styles.name}>{companyItem.name}</label>
              <div className={styles.secondRow}>
                <label className={styles.nameAr}>{companyItem.nameAr}</label>

                {user.type !== UserTypeConstants.GUEST && (
                  <div className={styles.price}>
                    <label>{companyItem.price}</label>
                  </div>
                )}
                <div className={styles.price}>
                  <label className={styles.customer_price}>
                    {companyItem.customer_price}
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.info}>
              <label className={styles.label}>{t("item-formula")}:</label>
              <label className={styles.value}>{companyItem.formula}</label>
            </div>

            <div className={styles.info}>
              <label className={styles.label}>{t("item-packing")}:</label>
              <label className={styles.value}>{companyItem.packing}</label>
            </div>

            <div className={styles.info}>
              <label className={styles.label}>{t("item-caliber")}:</label>
              <label className={styles.value}>{companyItem.caliber}</label>
            </div>

            <div className={styles.info}>
              <label className={styles.label}>{t("item-composition")}:</label>
              <label className={styles.value}>{companyItem.composition}</label>
            </div>
          </div>

          <div className={styles.behind_content}></div>
        </div>
      </div>

      {showModal && (
        <AddToCartModal item={companyItem} close={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default MedicineCard;
