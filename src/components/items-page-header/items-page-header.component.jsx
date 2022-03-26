import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

// components
import SearchContainer from "../search-container/search-container.component";
import SearchInput from "../search-input/search-input.component";
import { ExportCSVFromURL } from "../export-csv-from-url/export-csv-from-url.component";
import Icon from "../action-icon/action-icon.component";

// redux stuff
import { useDispatch } from "react-redux";
import {
  setSearchName,
  setSearchCompanyName,
  setSearchDeletedItems,
  setSearchActiveItems,
  setSearchInWarehouse,
  setSearchOutWarehouse,
  setSearchWarehouseName,
} from "../../redux/items/itemsSlices";

// icons
import { RiAddCircleFill, RiRefreshLine } from "react-icons/ri";
import { SiMicrosoftexcel } from "react-icons/si";

// constants and utils
import { BASEURL, Colors, UserTypeConstants } from "../../utils/constants";

// styles
import generalStyles from "../../style.module.scss";
import searchContainerStyles from "../search-container/search-container.module.scss";
import { IoMdArrowRoundBack } from "react-icons/io";

function ItemsPageHeader({ user, company, pageState, search, keyUpHandler }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <SearchContainer searchAction={search}>
        <SearchInput
          label="item-name"
          id="item-name"
          type="text"
          value={pageState.searchName}
          onchange={(e) => dispatch(setSearchName(e.target.value))}
          placeholder="search-by-name-composition-barcode"
          onEnterPress={search}
          resetField={() => {
            dispatch(setSearchName(""));
          }}
          onkeyup={keyUpHandler}
        />

        {(user.type === UserTypeConstants.WAREHOUSE ||
          (user.type === UserTypeConstants.ADMIN &&
            pageState.role !== UserTypeConstants.COMPANY)) && (
          <SearchInput
            label="item-company"
            id="item-company"
            type="text"
            value={pageState.searchCompanyName}
            onchange={(e) => dispatch(setSearchCompanyName(e.target.value))}
            placeholder="search-by-company-name"
            onEnterPress={search}
            resetField={() => {
              dispatch(setSearchCompanyName(""));
            }}
            onkeyup={keyUpHandler}
          />
        )}

        {(user.type === UserTypeConstants.COMPANY ||
          (user.type === UserTypeConstants.ADMIN &&
            pageState.role !== UserTypeConstants.WAREHOUSE)) && (
          <SearchInput
            label="item-warehouse"
            id="item-warehouse"
            type="text"
            value={pageState.searchWarehouseName}
            onchange={(e) => dispatch(setSearchWarehouseName(e.target.value))}
            placeholder="search-by-warehouse-name"
            onEnterPress={search}
            resetField={() => {
              dispatch(setSearchWarehouseName(""));
            }}
            onkeyup={keyUpHandler}
          />
        )}

        <div className={searchContainerStyles.checkbox_div}>
          <input
            type="checkbox"
            checked={pageState.searchDeletedItems}
            onChange={() => {
              dispatch(setSearchDeletedItems(!pageState.searchDeletedItems));
              dispatch(setSearchActiveItems(false));
              keyUpHandler();
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
              keyUpHandler();
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
                  dispatch(setSearchInWarehouse(!pageState.searchInWarehouse));
                  dispatch(setSearchOutWarehouse(false));
                  keyUpHandler();
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
                  keyUpHandler();
                }}
              />
              <label>{t("warehouse-out-warehouse")}</label>
            </div>
          </>
        )}
      </SearchContainer>

      <div className={generalStyles.actions}>
        <Icon
          foreColor={Colors.MAIN_COLOR}
          selected={false}
          icon={() => <RiRefreshLine />}
          tooltip={t("refresh-tooltip")}
          onclick={search}
          withBackground={true}
        />
        {user.type === UserTypeConstants.COMPANY ||
        (user.type === UserTypeConstants.ADMIN &&
          company !== null &&
          company.allowAdmin) ? (
          <>
            <Icon
              foreColor={Colors.MAIN_COLOR}
              selected={false}
              icon={() => <RiAddCircleFill />}
              tooltip={t("add-item")}
              onclick={() => {
                history.push("/item", {
                  from: user.type,
                  type: "new",
                  allowAction: true,
                  itemId: null,
                  companyId:
                    user.type === UserTypeConstants.COMPANY
                      ? user._id
                      : company._id,
                  warehouseId: null,
                });
              }}
              withBackground={true}
            />

            <Icon
              foreColor={Colors.MAIN_COLOR}
              selected={false}
              icon={() => <SiMicrosoftexcel />}
              tooltip={t("items-from-excel")}
              onclick={() => {
                history.push("/items-from-excel", {
                  companyId:
                    user.type === UserTypeConstants.COMPANY
                      ? user._id
                      : company._id,
                });
              }}
              withBackground={true}
            />

            <ExportCSVFromURL
              url={`${BASEURL}/items/allItem/${
                user.type === UserTypeConstants.COMPANY ? user._id : company._id
              }`}
              fileName="filename"
            />
          </>
        ) : (
          <></>
        )}
        <Icon
          withBackground={true}
          tooltip={t("go-back")}
          onclick={() => {
            history.goBack();
          }}
          icon={() => <IoMdArrowRoundBack />}
          foreColor={Colors.MAIN_COLOR}
        />
      </div>
    </>
  );
}

export default ItemsPageHeader;
