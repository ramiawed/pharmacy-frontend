import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

// redux stuff
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import {
  cancelOperation,
  changeAllOrdersSelection,
  getOrders,
  selectBasketOrders,
  setPage,
  updateOrders,
} from "../../redux/basketOrdersSlice/basketOrdersSlice";

// icons
import { FaSearch } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  RiMailUnreadLine,
  RiRefreshLine,
  RiSendPlaneFill,
} from "react-icons/ri";
import { BsCheckAll } from "react-icons/bs";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineIndeterminateCheckBox,
  MdOutlineLocalShipping,
  MdRemoveDone,
} from "react-icons/md";

// components
import Icon from "../../components/icon/icon.component";
import SearchContainer from "../../components/search-container/search-container.component";
import SearchInput from "../../components/search-input/search-input.component";
import OrderRow from "../../components/order-row/order-row.component";

// constants and utils
import { Colors, UserTypeConstants } from "../../utils/constants";

// styles
import generalStyles from "../../style.module.scss";
import styles from "./ordered-baskets-page.module.scss";

let timer = null;

// return the count of selected orders
const calculateSelectedOrdersCount = (orders) => {
  let count = 0;
  orders.forEach((o) => {
    count += o.selected ? 1 : 0;
  });
  return count;
};

const OrderedBasketsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, token } = useSelector(selectUserData);
  const {
    status,
    error,
    count,
    basketOrders,
    refresh,
    pageState,
    forceRefresh,
  } = useSelector(selectBasketOrders);

  const selectedOrdersCount = calculateSelectedOrdersCount(basketOrders);

  const [searchValue, setSearchValue] = useState("");
  const [searchValue1, setSearchValue1] = useState("");

  const markOrdersAs = (verb) => {
    const ids = basketOrders
      .filter(
        (o) =>
          o.selected &&
          ((user.type === UserTypeConstants.PHARMACY &&
            o.pharmacyStatus !== verb) ||
            (user.type === UserTypeConstants.WAREHOUSE &&
              o.warehouseStatus !== verb))
      )
      .map((o) => o._id);

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
      )
        .then(unwrapResult)
        .then(() => {
          // dispatch(getUnreadOrders({ token }));
        });
    }
  };

  const keyUpHandler = (e) => {
    cancelOperation();

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      handleSearch();
    }, 200);
  };

  const handleSearch = (page) => {
    dispatch(setPage(page));

    dispatch(
      getOrders({
        obj: {
          page,
        },
        token,
      })
    );
  };

  const handlePageClick = (e) => {
    const { selected } = e;

    handleSearch(selected + 1);

    window.scrollTo(0, 0);
  };

  const handleEnterPress = () => {
    handleSearch(1);
  };

  const changeOrdersSelection = () => {
    dispatch(
      selectedOrdersCount === basketOrders.length
        ? changeAllOrdersSelection(false)
        : changeAllOrdersSelection(true)
    );
  };

  useEffect(() => {
    if (refresh || forceRefresh) {
      handleSearch(1);
    }
  }, [forceRefresh]);

  return (
    <div className={generalStyles.container}>
      <SearchContainer searchAction={handleEnterPress}>
        <SearchInput
          label="pharmacy-name"
          id="pharmacy-name"
          type="text"
          value={searchValue}
          onchange={(e) => {
            setSearchValue(e.target.value);
          }}
          icon={<FaSearch />}
          placeholder="enter pharmacy name-placeholder"
          onEnterPress={handleEnterPress}
          resetField={() => {
            setSearchValue("");
          }}
          onkeyup={keyUpHandler}
        />
        <SearchInput
          label="warehouse-name"
          id="warehouse-name"
          type="text"
          value={searchValue1}
          onchange={(e) => {
            setSearchValue1(e.target.value);
          }}
          icon={<FaSearch />}
          placeholder="enter warehouse name-placeholder"
          onEnterPress={handleEnterPress}
          resetField={() => {
            setSearchValue1("");
          }}
          onkeyup={keyUpHandler}
        />
      </SearchContainer>
      <div className={generalStyles.actions}>
        <Icon
          foreColor={Colors.MAIN_COLOR}
          selected={false}
          icon={() => <RiRefreshLine />}
          tooltip={t("refresh-tooltip")}
          onclick={() => {}}
          withBackground={true}
        />

        <Icon
          onclick={() => {
            history.goBack();
          }}
          icon={() => <IoMdArrowRoundBack />}
          foreColor={Colors.MAIN_COLOR}
          withBackground={true}
        />
      </div>
      <div
        style={{
          maxWidth: "600px",
          margin: "auto",
        }}
      >
        {basketOrders.length > 0 && (
          <div className={styles.action_highlight_container}>
            <div className={styles.highlight}>
              <RiMailUnreadLine color={Colors.LIGHT_COLOR} />
              <label>{t("unread")}</label>
              <BsCheckAll color={Colors.SUCCEEDED_COLOR} />
              <label>{t("received")}</label>
              <MdOutlineLocalShipping color={Colors.SUCCEEDED_COLOR} />
              <label>{t("shipped")}</label>
              <RiSendPlaneFill color={Colors.SUCCEEDED_COLOR} />
              <label>{t("sent")}</label>
              <MdRemoveDone color={Colors.FAILED_COLOR} />
              <label>{t("will-dont-serve")}</label>
            </div>
            <div className={styles.actions_div}>
              {user.type === UserTypeConstants.PHARMACY &&
                selectedOrdersCount > 0 && (
                  <Icon
                    selected={false}
                    foreColor={Colors.SUCCEEDED_COLOR}
                    tooltip={t("mark-as-received")}
                    icon={() => <BsCheckAll />}
                    onclick={() => markOrdersAs("received")}
                    withBackground={true}
                  />
                )}

              {user.type === UserTypeConstants.PHARMACY &&
                selectedOrdersCount > 0 && (
                  <Icon
                    selected={false}
                    foreColor={Colors.SUCCEEDED_COLOR}
                    tooltip={t("mark-as-sent")}
                    icon={() => <RiSendPlaneFill />}
                    onclick={() => markOrdersAs("sent")}
                    withBackground={true}
                  />
                )}

              {user.type === UserTypeConstants.WAREHOUSE &&
                selectedOrdersCount > 0 && (
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
          </div>
        )}

        {count > 0 && (
          <div
            style={{
              maxWidth: "600px",
              margin: "auto",
            }}
          >
            {user.type !== UserTypeConstants.ADMIN && (
              <div onClick={changeOrdersSelection} className={styles.selection}>
                {selectedOrdersCount === basketOrders.length && (
                  <MdOutlineCheckBox size={24} color={Colors.MAIN_COLOR} />
                )}
                {selectedOrdersCount === 0 && (
                  <MdOutlineCheckBoxOutlineBlank
                    size={24}
                    color={Colors.MAIN_COLOR}
                  />
                )}
                {selectedOrdersCount < basketOrders.length &&
                  selectedOrdersCount !== 0 && (
                    <MdOutlineIndeterminateCheckBox
                      size={24}
                      color={Colors.MAIN_COLOR}
                    />
                  )}
                <label
                  style={{
                    marginRight: "5px",
                    fontSize: "16px",
                    color: Colors.MAIN_COLOR,
                  }}
                >
                  {t("selection")}
                </label>
              </div>
            )}

            {basketOrders?.map((order) => (
              <OrderRow key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderedBasketsPage;
