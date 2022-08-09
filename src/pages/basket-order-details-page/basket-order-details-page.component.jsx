import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

// components
import Loader from "../../components/action-loader/action-loader.component";
import Header from "../../components/header/header.component";
import Icon from "../../components/action-icon/action-icon.component";
import NoContent from "../../components/no-content/no-content.component";
import CardInfo from "../../components/card-info/card-info.component";
import Basket from "../../components/basket/basket.component";

// icons
import { RiRefreshLine, RiSendPlaneFill } from "react-icons/ri";
import { BsCheckAll } from "react-icons/bs";
import { MdOutlineLocalShipping, MdRemoveDone } from "react-icons/md";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  selectBasketOrders,
  updateOrders,
} from "../../redux/basketOrdersSlice/basketOrdersSlice";

// constants and utils
import { BASEURL, Colors, UserTypeConstants } from "../../utils/constants";

//styles
import styles from "./basket-order-details-page.module.scss";
import generalStyles from "../../style.module.scss";
import { useLocation } from "react-router-dom";

const BasketOrderDetailsPage = ({ onSelectedChange }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const orderId = location?.search.slice(1);

  const dispatch = useDispatch();

  // selectors
  const { token, user } = useSelector(selectUserData);
  const { status } = useSelector(selectBasketOrders);

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
      .get(`${BASEURL}/ordered-baskets/details?id=${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.data.order === null) {
          setEmptyMsg("order-deleted");
        } else {
          setOrderDetails(response.data.data.basketOrder);
        }
      })
      .catch((err) => {
        setEmptyMsg("order-details-error");
      });

    setLoading(false);
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
                <div className={styles.container}>
                  <CardInfo headerTitle={t("order-details")}>
                    <div className={styles.basic_details_container}>
                      <div className={styles.row}>
                        <label className={styles.label}>
                          {t("pharmacy-name")}:
                        </label>
                        <label className={styles.name}>
                          {orderDetails.pharmacy.name}
                        </label>
                      </div>

                      <div className={styles.row}>
                        <label className={styles.label}>
                          {t("user-certificate-name")}:
                        </label>
                        <label className={styles.name}>
                          {orderDetails.pharmacy.certificateName}
                        </label>
                      </div>

                      <div className={styles.row}>
                        <label className={styles.label}>
                          {t("user-address-details")}:
                        </label>
                        <label className={styles.name}>
                          {orderDetails.pharmacy.addressDetails}
                        </label>
                      </div>

                      <div className={styles.row}>
                        <label className={styles.label}>
                          {t("user-mobile")}:
                        </label>
                        <label className={styles.name}>
                          {orderDetails.pharmacy.mobile}
                        </label>
                      </div>

                      <div className={styles.row}>
                        <label className={styles.label}>
                          {t("warehouse-name")}:
                        </label>
                        <label className={styles.name}>
                          {orderDetails.warehouse.name}
                        </label>
                      </div>

                      <div className={styles.row}>
                        <label className={styles.label}>
                          {t("date-label")}:
                        </label>
                        <label className={styles.name}>
                          {new Date(
                            orderDetails.createdAt
                          ).toLocaleDateString()}
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
                    </div>
                  </CardInfo>
                </div>

                <Basket
                  basket={orderDetails.basket}
                  editable={false}
                  forRead={true}
                />
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
};

export default BasketOrderDetailsPage;
