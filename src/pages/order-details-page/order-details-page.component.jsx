import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router";
import axios from "axios";
import { BASEURL, Colors, OfferTypes } from "../../utils/constants";

// components
import CartWarehouseTableHeader from "../../components/cart-warehouse-table-header/cart-warehouse-table-header.component";
import CartRow from "../../components/cart-row/cart-row.component";
import Loader from "../../components/action-loader/action-loader.component";

// redux stuff
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/authSlice";

// styles
import generalStyles from "../../style.module.scss";
import styles from "./order-details-page.module.scss";
import Header from "../../components/header/header.component";
import Icon from "../../components/action-icon/action-icon.component";
import { RiRefreshLine } from "react-icons/ri";
import NoContent from "../../components/no-content/no-content.component";

function OrderDetailsPage({ location, onSelectedChange }) {
  const { t } = useTranslation();

  const orderId = location?.search.slice(1);

  // selectors
  const token = useSelector(selectToken);

  // own states
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emptyMsg, setEmptyMsg] = useState("");

  const getOrderDetails = async () => {
    setEmptyMsg("");
    setLoading(true);
    axios
      .get(`${BASEURL}/orders/details?id=${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.data.order === null) {
          setEmptyMsg("order-deleted");
        } else {
          setOrderDetails(response.data.data.order);
        }
      })
      .catch((err) => {
        setEmptyMsg("order-details-error");
      });

    setLoading(false);
  };

  const computeTotalPrice = () => {
    let total = 0;

    orderDetails.items.forEach((item) => {
      total =
        total +
        item.qty * item.price -
        (item.bonus && item.bonusType === OfferTypes.PERCENTAGE
          ? (item.qty * item.price * item.bonus) / 100
          : 0);
    });

    return total;
  };

  useEffect(() => {
    getOrderDetails();

    onSelectedChange();
  }, []);

  return (
    <>
      {loading ? (
        <Loader allowCancel={false} />
      ) : (
        <div className={generalStyles.container}>
          <Header>
            <h2>{t("order-details")}</h2>
            <div
              style={{
                position: "absolute",
                top: "16px",
                left: "42px",
              }}
            >
              <Icon
                icon={() => <RiRefreshLine />}
                foreColor={Colors.SECONDARY_COLOR}
                tooltip={t("refresh-tooltip")}
                onclick={getOrderDetails}
              />
            </div>
          </Header>
          {orderDetails ? (
            <>
              <div className={styles.basic_details_container}>
                <div className={styles.row}>
                  <label className={styles.label}>{t("pharmacy-name")}: </label>
                  <label className={styles.name}>
                    {orderDetails.pharmacy.name}
                  </label>
                </div>

                <div className={styles.row}>
                  <label className={styles.label}>
                    {t("warehouse-name")}:{" "}
                  </label>
                  <label className={styles.name}>
                    {orderDetails.warehouse.name}
                  </label>
                </div>

                <div className={styles.row}>
                  <label className={styles.label}>{t("date-label")}: </label>
                  <label className={styles.name}>
                    {new Date(orderDetails.orderDate).toLocaleDateString()}
                  </label>
                </div>
              </div>
              <CartWarehouseTableHeader withoutMaxQty={true} />

              {orderDetails.items.map((item, index) => (
                <CartRow key={index} cartItem={item} inOrderDetails={true} />
              ))}
              <p className={styles.total_price}>
                {t("total-invoice-price")} {computeTotalPrice()}
              </p>
            </>
          ) : (
            <NoContent msg={t(emptyMsg)} />
          )}
        </div>
      )}
    </>
  );
}

export default withRouter(OrderDetailsPage);
