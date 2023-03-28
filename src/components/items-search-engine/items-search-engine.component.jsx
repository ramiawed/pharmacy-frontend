import React from "react";
import { useTranslation } from "react-i18next";

// components
import SearchPartnerContainer from "../search-partner-container/search-partner-container.component";
import SearchContainer from "../search-container/search-container.component";
import CustomCheckbox from "../custom-checkbox/custom-checkbox.component";
import SearchInput from "../search-input/search-input.component";

// redux stuff
import { useDispatch } from "react-redux";
import {
  addIdToCompaniesIds,
  removeIdFromCompaniesId,
  addIdToWarehousesIds,
  removeIdFromWarehousesId,
  setPageState,
} from "../../redux/items/itemsSlices";

// constants and utils
import { UserTypeConstants } from "../../utils/constants";

// styles
import searchContainerStyles from "../search-container/search-container.module.scss";

function ItemsSearchEngine({ user, pageState, search, keyUpHandler }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const isThereSearch =
    pageState.searchName.trim().length > 0 ||
    pageState.searchCompaniesIds.length > 0 ||
    pageState.searchWarehousesIds.length > 0 ||
    pageState.searchDeletedItems ||
    pageState.searchActiveItems ||
    pageState.searchInWarehouse ||
    pageState.searchOutWarehouse;

  return (
    <SearchContainer searchAction={search} searchEngineAlert={isThereSearch}>
      <SearchInput
        label="item name"
        id="item-name"
        type="text"
        value={pageState.searchName}
        onchange={(e) => dispatch(setPageState({ searchName: e.target.value }))}
        placeholder="search by name composition barcode"
        onEnterPress={search}
        resetField={() => {
          dispatch(setPageState({ searchName: "" }));
        }}
        onkeyup={keyUpHandler}
      />

      {(user.type === UserTypeConstants.WAREHOUSE ||
        (user.type === UserTypeConstants.ADMIN &&
          pageState.role !== UserTypeConstants.COMPANY)) && (
        <SearchPartnerContainer
          label={t("company")}
          partners={pageState?.searchCompaniesIds}
          addId={addIdToCompaniesIds}
          removeId={removeIdFromCompaniesId}
          partnerType={UserTypeConstants.COMPANY}
          action={search}
        />
      )}

      {user.type === UserTypeConstants.ADMIN &&
        pageState.role !== UserTypeConstants.WAREHOUSE && (
          <SearchPartnerContainer
            label={t("warehouse")}
            partners={pageState?.searchWarehousesIds}
            addId={addIdToWarehousesIds}
            removeId={removeIdFromWarehousesId}
            partnerType={UserTypeConstants.WAREHOUSE}
            action={search}
          />
        )}

      <div className={searchContainerStyles.checkbox_div}>
        <CustomCheckbox
          label={t("items not in company")}
          value={pageState.searchDeletedItems}
          changeHandler={() => {
            dispatch(
              setPageState({
                searchDeletedItems: !pageState.searchDeletedItems,
                searchActiveItems: false,
              })
            );
            keyUpHandler();
          }}
        />
      </div>

      <div className={searchContainerStyles.checkbox_div}>
        <CustomCheckbox
          label={t("items in company")}
          value={pageState.searchActiveItems}
          changeHandler={() => {
            dispatch(
              setPageState({
                searchDeletedItems: false,
                searchActiveItems: !pageState.searchActiveItems,
              })
            );
            keyUpHandler();
          }}
        />
      </div>

      {user.type === UserTypeConstants.ADMIN &&
        !pageState.company &&
        !pageState.warehouse && (
          <>
            <div className={searchContainerStyles.checkbox_div}>
              <CustomCheckbox
                label={t("in warehouse")}
                value={pageState.searchInWarehouse}
                changeHandler={() => {
                  dispatch(
                    setPageState({
                      searchOutWarehouse: false,
                      searchInWarehouse: !pageState.searchInWarehouse,
                    })
                  );
                  keyUpHandler();
                }}
              />
            </div>

            <div className={searchContainerStyles.checkbox_div}>
              <CustomCheckbox
                label={t("not in warehouse")}
                value={pageState.searchOutWarehouse}
                changeHandler={() => {
                  dispatch(
                    setPageState({
                      searchInWarehouse: false,
                      searchOutWarehouse: !pageState.searchOutWarehouse,
                    })
                  );
                  keyUpHandler();
                }}
              />
            </div>
          </>
        )}
    </SearchContainer>
  );
}

export default ItemsSearchEngine;
