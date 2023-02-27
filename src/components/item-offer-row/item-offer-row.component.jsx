import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// react-redux stuff
import { addStatistics } from "../../redux/statistics/statisticsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";

// components
import AddToCartOfferModal from "../../modals/add-to-cart-offer-modal/add-to-cart-offer-modal.component";
import OfferDetailsRow from "../offer-details-row/offer-details-row.component";
import PointDetailsRow from "../point-details-row/point-details-row.component";
import FullWidthLabel from "../full-width-label/full-width-label.component";
import RowContainer from "../row-container/row-container.component";
import ItemPrices from "../item-prices/item-prices.component";
import ItemNames from "../item-names/item-names.component";
import Toast from "../toast/toast.component";
import Icon from "../icon/icon.component";

// react icons
import { GiShoppingCart } from "react-icons/gi";

// styles
import styles from "./item-offer-row.module.scss";

// constants and utils
import { Colors, UserTypeConstants } from "../../utils/constants";
import LabelValueRow from "../label-value-row/label-value-row.component";

function ItemOfferRow({ item, index, searchString, type }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const { user, token } = useSelector(selectUserData);

  // own state
  const [showModal, setShowModal] = useState(false);
  const [addItemToCart, setAddItemToCart] = useState("");

  const rowClickHandler = () => {
    if (user.type === UserTypeConstants.PHARMACY) {
      dispatch(
        addStatistics({
          obj: {
            sourceUser: user._id,
            targetItem: item._id,
            action: "choose-item",
          },
          token,
        })
      );
    }
  };

  // render method
  return (
    <>
      <RowContainer isEven={index % 2}>
        <div className={styles.item_row}>
          <div className={styles.first_row}>
            <label className={[styles.item_name].join(" ")}>
              <ItemNames
                item={item}
                on_click={rowClickHandler}
                searchString={searchString}
              />
            </label>

            {user.type === UserTypeConstants.PHARMACY && (
              <Icon
                tooltip={t("add-to-cart")}
                onclick={() => setShowModal(true)}
                foreColor={Colors.SUCCEEDED_COLOR}
                icon={() => <GiShoppingCart size={24} />}
              />
            )}
          </div>

          <div className={styles.second_row}>
            <FullWidthLabel
              value={`${item.company[0].name} - ${item.warehouses.warehouse[0].name}`}
              color={Colors.SUCCEEDED_COLOR}
            />
            <ItemPrices
              showCustomerPrice={true}
              showPrice={user.type !== UserTypeConstants.GUEST}
              price={item.price}
              customerPrice={item.customer_price}
            />
          </div>

          <div className={styles.second_row}>
            <LabelValueRow
              searchString={searchString}
              value={item.composition}
              label="item-composition"
            />
          </div>

          {type === "offer" ? (
            item.warehouses.offer.offers.map((o, index) => (
              <OfferDetailsRow
                offer={o}
                offerMode={item.warehouses.offer.mode}
                key={index}
              />
            ))
          ) : (
            <></>
          )}

          {type === "points" ? (
            item.warehouses.points.map((o, index) => (
              <PointDetailsRow point={o} key={index} />
            ))
          ) : (
            <></>
          )}
        </div>
      </RowContainer>

      {showModal && (
        <AddToCartOfferModal
          item={item}
          close={() => setShowModal(false)}
          setAddItemToCartMsg={setAddItemToCart}
        />
      )}

      {addItemToCart.length > 0 && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t(addItemToCart)}
          actionAfterTimeout={() => setAddItemToCart("")}
        />
      )}
    </>
  );
}

export default ItemOfferRow;
