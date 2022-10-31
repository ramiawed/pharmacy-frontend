import React from "react";
import { useTranslation } from "react-i18next";

// components
import SearchContainer from "../search-container/search-container.component";
import SearchInput from "../search-input/search-input.component";

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

// constants and utils
import { UserTypeConstants } from "../../utils/constants";

// styles
import searchContainerStyles from "../search-container/search-container.module.scss";

function ItemsSearchEngine({ user, pageState, search, keyUpHandler }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

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

        {user.type === UserTypeConstants.ADMIN &&
          pageState.role !== UserTypeConstants.WAREHOUSE && (
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
            id="deletedItems"
            type="checkbox"
            checked={pageState.searchDeletedItems}
            onChange={() => {
              dispatch(setSearchDeletedItems(!pageState.searchDeletedItems));
              dispatch(setSearchActiveItems(false));
              keyUpHandler();
            }}
          />
          <label htmlFor="deletedItems">{t("deleted-items")}</label>
        </div>

        <div className={searchContainerStyles.checkbox_div}>
          <input
            id="activeItems"
            type="checkbox"
            checked={pageState.searchActiveItems}
            onChange={() => {
              dispatch(setSearchDeletedItems(false));
              dispatch(setSearchActiveItems(!pageState.searchActiveItems));
              keyUpHandler();
            }}
          />
          <label htmlFor="activeItems">{t("active-items")}</label>
        </div>

        {user.type === UserTypeConstants.ADMIN && (
          <>
            <div className={searchContainerStyles.checkbox_div}>
              <input
                id="inWarehouse"
                type="checkbox"
                checked={pageState.searchInWarehouse}
                onChange={() => {
                  dispatch(setSearchInWarehouse(!pageState.searchInWarehouse));
                  dispatch(setSearchOutWarehouse(false));
                  keyUpHandler();
                }}
              />
              <label htmlFor="inWarehouse">{t("warehouse-in-warehouse")}</label>
            </div>

            <div className={searchContainerStyles.checkbox_div}>
              <input
                id="outWarehouse"
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
              <label htmlFor="outWarehouse">
                {t("warehouse-out-warehouse")}
              </label>
            </div>
          </>
        )}
      </SearchContainer>
    </>
  );
}

export default ItemsSearchEngine;
