import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router";
import axios from "axios";

// react icons
import { RiRefreshLine, RiSendPlaneFill } from "react-icons/ri";
import { BsCheckAll } from "react-icons/bs";
import { MdOutlineLocalShipping, MdRemoveDone } from "react-icons/md";

// components
import CartWarehouseTableHeader from "../../components/cart-warehouse-table-header/cart-warehouse-table-header.component";
import CartRow from "../../components/cart-row/cart-row.component";
import Loader from "../../components/action-loader/action-loader.component";
import NoContent from "../../components/no-content/no-content.component";
import Icon from "../../components/action-icon/action-icon.component";
import Header from "../../components/header/header.component";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import { selectOrders, updateOrders } from "../../redux/orders/ordersSlice";

// styles
import generalStyles from "../../style.module.scss";
import styles from "./order-details-page.module.scss";

// constants
import {
  BASEURL,
  Colors,
  OfferTypes,
  UserTypeConstants,
} from "../../utils/constants";
import { ExportCSV } from "../../components/export-csv/export-csv.component";

function OrderDetailsPage({ location, onSelectedChange }) {
  const { t } = useTranslation();

  const orderId = location?.search.slice(1);

  const dispatch = useDispatch();

  // selectors
  const { token, user } = useSelector(selectUserData);
  const { status } = useSelector(selectOrders);

  // own states
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emptyMsg, setEmptyMsg] = useState("");

  const markOrdersAs = (verb) => {
    const ids = [orderId];

    if (ids.length > 0) {
      let body = {};
      if (user.type === UserTypeConstants.PHARMACY) {
        body = {
          pharmacyStatus: verb,
        };
      }
      if (user.type === UserTypeConstants.WAREHOUSE) {
        body = {
          warehouseStatus: verb,
        };
      }
      dispatch(
        updateOrders({
          obj: {
            ids,
            body,
          },
          token,
        })
      );
    }
  };

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
        <>
          <Header>
            <h2>{t("order-details")}</h2>
            <div className={generalStyles.refresh_icon}>
              <Icon
                icon={() => <RiRefreshLine color={Colors.WHITE_COLOR} />}
                foreColor={Colors.SECONDARY_COLOR}
                tooltip={t("refresh-tooltip")}
                onclick={getOrderDetails}
              />
            </div>
          </Header>
          <div className={generalStyles.container_with_header}>
            {orderDetails ? (
              <>
                <div className={styles.basic_details_container}>
                  <div className={styles.row}>
                    <label className={styles.label}>
                      {t("pharmacy-name")}:{" "}
                    </label>
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

                <div className={styles.actions_div}>
                  {user.type === UserTypeConstants.PHARMACY && (
                    <Icon
                      selected={false}
                      foreColor={Colors.SUCCEEDED_COLOR}
                      tooltip={t("mark-as-received")}
                      icon={() => <BsCheckAll />}
                      onclick={() => markOrdersAs("received")}
                      withBackground={true}
                    />
                  )}

                  {user.type === UserTypeConstants.PHARMACY && (
                    <Icon
                      selected={false}
                      foreColor={Colors.SUCCEEDED_COLOR}
                      tooltip={t("mark-as-sent")}
                      icon={() => <RiSendPlaneFill />}
                      onclick={() => markOrdersAs("sent")}
                      withBackground={true}
                    />
                  )}

                  {user.type === UserTypeConstants.WAREHOUSE && (
                    <>
                      <Icon
                        selected={false}
                        foreColor={Colors.SUCCEEDED_COLOR}
                        tooltip={t("mark-as-shipped")}
                        icon={() => <MdOutlineLocalShipping />}
                        onclick={() => markOrdersAs("sent")}
                        withBackground={true}
                      />

                      <Icon
                        selected={false}
                        foreColor={Colors.SUCCEEDED_COLOR}
                        tooltip={t("mark-as-received")}
                        icon={() => <BsCheckAll />}
                        onclick={() => markOrdersAs("received")}
                        withBackground={true}
                      />

                      <Icon
                        selected={false}
                        foreColor={Colors.FAILED_COLOR}
                        tooltip={t("mark-as-will-dont-server")}
                        icon={() => <MdRemoveDone />}
                        onclick={() => markOrdersAs("dontServe")}
                        withBackground={true}
                      />
                    </>
                  )}

                  <ExportCSV
                    csvData={orderDetails.items}
                    fileName={
                      orderDetails.pharmacy.name +
                      "_" +
                      orderDetails.warehouse.name +
                      "_" +
                      new Date(orderDetails.orderDate).toLocaleDateString()
                    }
                  />
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
        </>
      )}
      {status === "loading" && <Loader allowCancel={false} />}
    </>
  );
}

export default withRouter(OrderDetailsPage);
