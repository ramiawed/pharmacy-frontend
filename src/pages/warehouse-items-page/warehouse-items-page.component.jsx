import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/authSlice";
import {
  getWarehouseItems,
  removeItemFromWarehouse,
  selectWarehouseItems,
  resetRemoveFromWarehouseStatus,
  changeItemWarehouseMaxQty,
} from "../../redux/warehouseItems/warehouseItemsSlices";

// components
import CardInfo from "../../components/card-info/card-info.component";
import Input from "../../components/input/input.component";
import TableHeader from "../../components/table-header/table-header.component";
import ReactPaginate from "react-paginate";
import paginationStyles from "../../components/pagination.module.scss";
import WarehouseItemRow from "../../components/warehouse-item-row/warehouse-item-row.component";
import Toast from "../../components/toast/toast.component";
import RowWith2Children from "../../components/row-with-two-children/row-with-two-children.component";

// react-icons
import { FaSearch } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";

// styles
import tableStyles from "../../components/table.module.scss";
import { Colors } from "../../utils/constants";
import { unwrapResult } from "@reduxjs/toolkit";

function WarehouseItemsPage() {
  const { t } = useTranslation();
  const [searchName, setSearchName] = useState("");
  const [searchCompanyName, setSearchCompanyName] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const { warehouseItems, count, removeFromWarehouseStatus } =
    useSelector(selectWarehouseItems);
  const [initialPage, setInitialPage] = useState(0);

  // handle for page change in the paginate component
  const handlePageClick = (e) => {
    const { selected } = e;
    handleSearch(selected + 1);
    setInitialPage(selected);
    window.scrollTo(0, 0);
  };

  const handleEnterPress = () => {
    handleSearch(1);
  };

  const handleSearch = (page) => {
    const queryString = {};

    queryString.page = page;

    if (searchName.trim().length !== 0) {
      queryString.name = searchName.trim();
    }

    if (searchCompanyName.trim().length !== 0) {
      queryString.companyName = searchCompanyName.trim();
    }

    dispatch(getWarehouseItems({ queryString, token }));
    setInitialPage(page - 1);
  };

  const deleteItem = (obj) => {
    dispatch(removeItemFromWarehouse({ obj, token }))
      .then(unwrapResult)
      .then((originalPromiseResult) => {
        handleSearch(initialPage + 1);
      })
      .catch((rejectedValueOrSerializedError) => {});
  };

  const changeItemMaxQty = (obj) => {
    dispatch(changeItemWarehouseMaxQty({ obj, token }))
      .then(unwrapResult)
      .then((originalPromiseResult) => {
        handleSearch(initialPage + 1);
      })
      .catch((rejectedValueOrSerializedError) => {});
  };

  useEffect(() => {
    handleSearch(1);
  }, []);

  return (
    <>
      <CardInfo headerTitle={t("search-engines")}>
        <RowWith2Children>
          <div>
            <Input
              label="item-name"
              id="search-name"
              type="text"
              value={searchName}
              onchange={(e) => {
                setSearchName(e.target.value);
              }}
              icon={<FaSearch />}
              placeholder="search"
              onEnterPress={handleEnterPress}
              resetField={() => setSearchName("")}
            />
          </div>

          <div>
            <Input
              label="user-company-name"
              id="search-company-name"
              type="text"
              value={searchCompanyName}
              onchange={(e) => {
                setSearchCompanyName(e.target.value);
              }}
              icon={<FaSearch />}
              placeholder="search"
              onEnterPress={handleEnterPress}
              resetField={() => setSearchCompanyName("")}
            />
          </div>
        </RowWith2Children>
      </CardInfo>

      {count > 0 ? (
        <>
          <TableHeader>
            <label className={tableStyles.label_medium}>
              {t("item-trade-name")}
            </label>

            <label className={tableStyles.label_medium}>
              {t("user-company-name")}
            </label>
            <label className={tableStyles.label_small}>
              {t("item-formula")}
            </label>
            <label className={tableStyles.label_small}>
              {t("item-caliber")}
            </label>
            <label className={tableStyles.label_small}>
              {t("item-packing")}
            </label>
            <label className={tableStyles.label_small}>{t("item-price")}</label>
            <label className={tableStyles.label_small}>
              {t("item-customer-price")}
            </label>
            <label className={tableStyles.label_small}>
              {t("item-max-qty")}
            </label>
            <label className={tableStyles.label_small}>
              {t("delete-item")}
            </label>
            {/* <label className={tableStyles.label_xsmall}></label> */}
          </TableHeader>

          {warehouseItems.map((item, index) => (
            <WarehouseItemRow
              key={item._id}
              item={item}
              index={index}
              // onSelect={onSelect}
              deleteItem={deleteItem}
              changeItemMaxQty={changeItemMaxQty}
            />
          ))}

          <div style={{ height: "10px" }}></div>
          <ReactPaginate
            previousLabel={t("previous")}
            nextLabel={t("next")}
            pageCount={Math.ceil(count / 9)}
            forcePage={initialPage}
            onPageChange={handlePageClick}
            containerClassName={paginationStyles.pagination}
            previousLinkClassName={paginationStyles.pagination_link}
            nextLinkClassName={paginationStyles.pagination_link}
            disabledClassName={paginationStyles.pagination_link_disabled}
            activeClassName={paginationStyles.pagination_link_active}
          />
        </>
      ) : (
        <>
          <div
            style={{
              textAlign: "center",
              padding: "16px",
              color: Colors.SECONDARY_COLOR,
            }}
          >
            <GiMedicines size={200} style={{ opacity: "0.4" }} />
            <p>{t("no-items-found")}</p>
          </div>
        </>
      )}

      {removeFromWarehouseStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("item-operation-complete")}
          actionAfterTimeout={() => dispatch(resetRemoveFromWarehouseStatus())}
        />
      )}
    </>
  );
}

export default WarehouseItemsPage;
