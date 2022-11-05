import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

// react-redux stuff
import { addStatistics } from "../../redux/statistics/statisticsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";

// components
import AddToCartOfferModal from "../../modals/add-to-cart-offer-modal/add-to-cart-offer-modal.component";
import Icon from "../action-icon/action-icon.component";
import Toast from "../toast/toast.component";

// react icons
import { GiShoppingCart } from "react-icons/gi";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

// styles
import styles from "./item-offer-row.module.scss";

// constants and utils
import { Colors, OfferTypes, UserTypeConstants } from "../../utils/constants";
import ItemNames from "../item-names/item-names.component";
import FullWidthLabel from "../full-width-label/full-width-label.component";
import ItemPrices from "../item-prices/item-prices.component";
import Separator from "../separator/separator.component";
import OfferDetailsRow from "../offer-details-row/offer-details-row.component";

function ItemOfferRow({ item }) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  // selectors
  const { user, token } = useSelector(selectUserData);

  // own state
  const [showModal, setShowModal] = useState(false);
  const [addItemToCart, setAddItemToCart] = useState("");
  const [expanded, setExpanded] = useState(false);

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
    history.push("/item", {
      from: user.type,
      type: "info",
      allowAction: false,
      itemId: item._id,
      companyId: item.company._id,
      warehouseId: user.type === UserTypeConstants.WAREHOUSE ? user._id : null,
    });
  };

  // render method
  return (
    <>
      <div className={styles.item_row} onClick={rowClickHandler}>
        <div className={styles.first_row}>
          <label className={[styles.item_name].join(" ")}>
            <label
              className={styles.icon}
              onClick={(e) => {
                setExpanded(!expanded);
                e.stopPropagation();
              }}
            >
              {expanded ? <MdExpandLess /> : <MdExpandMore />}
            </label>
            <ItemNames name={item.name} arName={item.nameAr} />
          </label>

          {user.type === UserTypeConstants.PHARMACY && (
            <Icon
              text={t("add-to-cart")}
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
            userType={user.type}
            price={item.price}
            customerPrice={item.customer_price}
          />
        </div>

        {expanded && (
          <>
            <Separator />
            {item.warehouses.offer.offers.map((o, index) => (
              <OfferDetailsRow
                offer={o}
                offerMode={item.warehouses.offer.mode}
                key={index}
              />
            ))}
          </>
        )}
      </div>

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
