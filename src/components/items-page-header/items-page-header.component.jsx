import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// components
import Header from "../header/header.component";
import SearchContainer from "../search-container/search-container.component";
import SearchInput from "../search-input/search-input.component";

// redux stuff
import { useDispatch } from "react-redux";
import {
  setSearchName,
  setSearchCompanyName,
  setSearchWarehouse,
  setSearchDeletedItems,
  setSearchActiveItems,
  setSearchInWarehouse,
  setSearchOutWarehouse,
} from "../../redux/items/itemsSlices";

// icons
import { RiAddCircleFill, RiRefreshLine } from "react-icons/ri";
import { SiMicrosoftexcel } from "react-icons/si";

// constants and utils
import { Colors, UserTypeConstants } from "../../utils/constants";

// styles
import generalStyles from "../../style.module.scss";
import searchContainerStyles from "../search-container/search-container.module.scss";
import Icon from "../action-icon/action-icon.component";

function ItemsPageHeader({
  user,
  role,
  warehouse,
  count,
  company,
  pageState,
  search,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Header>
      {user.type === UserTypeConstants.WAREHOUSE ||
      (user.type === UserTypeConstants.ADMIN &&
        role === UserTypeConstants.WAREHOUSE) ? (
        <>
          <h2>
            {t("medicines")} <span>{count}</span>
          </h2>
          <p
            className={[
              generalStyles.center,
              generalStyles.fc_secondary,
              generalStyles.margin_v_4,
            ].join(" ")}
          >
            {t("medicines-in-warehouse")} {warehouse.name}
          </p>
        </>
      ) : null}

      {user.type === UserTypeConstants.COMPANY ||
      (user.type === UserTypeConstants.ADMIN &&
        role === UserTypeConstants.COMPANY) ? (
        <>
          <h2>
            {t("medicines")} <span>{count}</span>
          </h2>
          <p
            className={[
              generalStyles.center,
              generalStyles.fc_secondary,
              generalStyles.margin_v_4,
            ].join(" ")}
          >
            {t("medicines-in-company")} {company.name}
          </p>
        </>
      ) : null}

      {user.type === UserTypeConstants.ADMIN &&
      role === UserTypeConstants.ADMIN ? (
        <h2>
          {t("medicines")} <span>{count}</span>
        </h2>
      ) : null}

      <div style={{ position: "relative", height: "50px" }}>
        <SearchContainer searchAction={search}>
          <SearchInput
            label="item-name"
            id="item-name"
            type="text"
            value={pageState.searchName}
            onchange={(e) => dispatch(setSearchName(e.target.value))}
            placeholder="search"
            onEnterPress={search}
            resetField={() => {
              dispatch(setSearchName(""));
            }}
          />

          {user.type !== UserTypeConstants.COMPANY && (
            <SearchInput
              label="item-company"
              id="item-company"
              type="text"
              value={pageState.searchCompanyName}
              onchange={(e) => dispatch(setSearchCompanyName(e.target.value))}
              placeholder="search"
              onEnterPress={search}
              resetField={() => {
                dispatch(setSearchCompanyName(""));
              }}
            />
          )}

          {user.type !== UserTypeConstants.WAREHOUSE && (
            <SearchInput
              label="item-warehouse"
              id="item-warehouse"
              type="text"
              value={pageState.searchWarehouse}
              onchange={(e) => dispatch(setSearchWarehouse(e.target.value))}
              placeholder="search"
              onEnterPress={search}
              resetField={() => {
                dispatch(setSearchWarehouse(""));
              }}
            />
          )}

          <div className={searchContainerStyles.checkbox_div}>
            <input
              type="checkbox"
              checked={pageState.searchDeletedItems}
              onChange={() => {
                dispatch(setSearchDeletedItems(!pageState.searchDeletedItems));
                dispatch(setSearchActiveItems(false));
              }}
            />
            <label>{t("deleted-items")}</label>
          </div>

          <div className={searchContainerStyles.checkbox_div}>
            <input
              type="checkbox"
              checked={pageState.searchActiveItems}
              onChange={() => {
                dispatch(setSearchDeletedItems(false));
                dispatch(setSearchActiveItems(!pageState.searchActiveItems));
              }}
            />
            <label>{t("active-items")}</label>
          </div>

          {user.type !== UserTypeConstants.WAREHOUSE && (
            <>
              <div className={searchContainerStyles.checkbox_div}>
                <input
                  type="checkbox"
                  checked={pageState.searchInWarehouse}
                  onChange={() => {
                    dispatch(
                      setSearchInWarehouse(!pageState.searchInWarehouse)
                    );
                    dispatch(setSearchOutWarehouse(false));
                  }}
                />
                <label>{t("warehouse-in-warehouse")}</label>
              </div>

              <div className={searchContainerStyles.checkbox_div}>
                <input
                  type="checkbox"
                  checked={pageState.searchOutWarehouse}
                  onChange={() => {
                    dispatch(setSearchInWarehouse(false));
                    dispatch(
                      setSearchOutWarehouse(!pageState.searchOutWarehouse)
                    );
                  }}
                />
                <label>{t("warehouse-out-warehouse")}</label>
              </div>
            </>
          )}
        </SearchContainer>
      </div>
      <div className={generalStyles.actions}>
        <Icon
          foreColor={Colors.SECONDARY_COLOR}
          selected={false}
          icon={() => <RiRefreshLine />}
          tooltip={t("refresh-tooltip")}
          onclick={search}
        />
        {user.type === UserTypeConstants.COMPANY ||
        (user.type === UserTypeConstants.ADMIN &&
          company !== null &&
          company.allowAdmin) ? (
          <>
            <div
              className={[generalStyles.icon, generalStyles.fc_secondary].join(
                " "
              )}
            >
              <Link
                style={{
                  paddingTop: "3px",
                }}
                className={[generalStyles.fc_secondary].join(" ")}
                to={{
                  pathname: "/item",
                  state: {
                    from: user.type,
                    type: "new",
                    allowAction: true,
                    itemId: null,
                    companyId:
                      user.type === UserTypeConstants.COMPANY
                        ? user._id
                        : company._id,
                    warehouseId: null,
                  },
                }}
              >
                <RiAddCircleFill size={20} />
              </Link>

              <div className={generalStyles.tooltip}>{t("add-item")}</div>
            </div>

            <div
              className={[generalStyles.icon, generalStyles.fc_secondary].join(
                " "
              )}
            >
              <Link
                style={{ paddingTop: "3px" }}
                className={generalStyles.fc_secondary}
                to={{
                  pathname: "/items-from-excel",
                  state: {
                    companyId:
                      user.type === UserTypeConstants.COMPANY
                        ? user._id
                        : company._id,
                  },
                }}
              >
                <SiMicrosoftexcel size={20} />
                <div className={generalStyles.tooltip}>
                  {t("items-from-excel")}
                </div>
              </Link>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </Header>
  );
}

export default ItemsPageHeader;
