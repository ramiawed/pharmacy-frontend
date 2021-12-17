import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect, useLocation } from "react-router-dom";
import * as XLSX from "xlsx";

// components
import InputFile from "../../components/input-file/input-file.component";
import ItemExcelRow from "../../components/item-excel-row/item-excel-row.component";
import Modal from "../../components/modal/modal.component";
import Toast from "../../components/toast/toast.component";
import ExcelTableHeader from "../../components/excel-table-header/excel-table-header.component";
import Button from "../../components/button/button.component";
import Loader from "../../components/action-loader/action-loader.component";

// redux stuff
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser } from "../../redux/auth/authSlice";
import {
  addItems,
  resetAddStatus,
  resetStatus,
  selectItems,
} from "../../redux/items/itemsSlices";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";

// styles
import styles from "./item-excel-page.module.scss";
import generalStyles from "../../style.module.scss";

// constants
import { Colors } from "../../utils/constants";

function ItemExcelPage() {
  const user = useSelector(selectUser);

  const location = useLocation();
  const { companyId = 0 } = location.state ? location.state : {};

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const { addError, addStatus } = useSelector(selectItems);
  const isOnline = useSelector(selectOnlineStatus);
  const [withUpdate, setWithUpdate] = useState(false);

  // own state
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [failedMsg, setFailedMsg] = useState("");
  const [itemsSelectValue, setItemsSelectValue] = useState("all");

  const fileChanged = (file) => {
    // if file is null
    if (!file) return;

    setLoading(true);

    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e) => {
      const bstr = e.target.result;

      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });

      const wsname = wb.SheetNames[0];

      const ws = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws);

      const completeData = data.map((d) => {
        let obj = {
          ...d,
          selected: true,
          company: companyId,
          isActive: true,
        };

        if (!d.name) {
          obj = {
            ...obj,
            name: "",
            selected: false,
          };
        }

        if (!d.price) {
          obj = {
            ...obj,
            price: 0,
            selected: false,
          };
        }

        if (!d.customer_price) {
          obj = {
            ...obj,
            customer_price: 0,
            selected: false,
          };
        }

        if (!d.caliber) {
          obj = {
            ...obj,
            caliber: "",
          };
        }

        if (!d.packing) {
          obj = {
            ...obj,
            packing: "",
          };
        }

        if (!d.composition) {
          obj = {
            ...obj,
            composition: "",
          };
        }

        if (!d.barcode) {
          obj = {
            ...obj,
            barcode: "",
          };
        }

        return obj;
      });

      setItems(completeData);
      setFileName(file.name.split(".")[0]);
    };

    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);

    setLoading(false);
  };

  const handleInsertItems = () => {
    setShowConfirmModal(false);
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    let rightItem = [];
    let wrongItems = [];
    let unSelectedItems = [];

    for (let item of items) {
      if (item.selected) {
        if (!item.name || !item.price || !item.customer_price) {
          wrongItems.push(item);
        } else {
          rightItem.push(item);
        }
      } else {
        unSelectedItems.push(item);
      }
    }

    if (rightItem.length > 0) {
      dispatch(
        addItems({
          obj: rightItem,
          token,
          withUpdate: withUpdate ? "addUpdate" : "add",
        })
      )
        .then(unwrapResult)
        .then(() => {
          setSuccessMsg(`${t("inserted-items")}: ${rightItem.length}`);
          setFailedMsg(`${t("wrong-items")}: ${wrongItems.length}`);
          setShowModal(true);
          setItems([...wrongItems, ...unSelectedItems]);
          checkItemsSelectionStatus([...wrongItems, ...unSelectedItems]);
          dispatch(resetStatus());
        })
        .catch(() => {});
    } else {
    }
  };

  const handleInsertTenItems = () => {
    setShowConfirmModal(false);
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    let count = 0;
    let index = 0;

    let rightItem = [];
    let wrongItems = [];
    let unselectedItems = [];

    while (count < 10 && items[index]) {
      if (items[index].selected) {
        if (
          !items[index].name ||
          !items[index].price ||
          !items[index].customer_price
        ) {
          wrongItems.push(items[index]);
        } else {
          rightItem.push(items[index]);
          count++;
        }
      } else {
        unselectedItems.push(items[index]);
      }
      index++;
    }

    if (rightItem.length > 0) {
      dispatch(
        addItems({
          obj: rightItem,
          token,
          withUpdate: withUpdate ? "addUpdate" : "add",
        })
      )
        .then(unwrapResult)
        .then(() => {
          setSuccessMsg(`${t("inserted-items")}: ${rightItem.length}`);
          setFailedMsg(`${t("wrong-items")}: ${wrongItems.length}`);
          setShowModal(true);
          setItems([...wrongItems, ...items.slice(index), ...unselectedItems]);
          checkItemsSelectionStatus([
            ...wrongItems,
            ...items.slice(index),
            ...unselectedItems,
          ]);
          dispatch(resetStatus());
        })
        .catch(() => {});
    } else {
    }
  };

  const handleInputChange = (e, index) => {
    const updatedItems = items.map((item, i) => {
      if (index === i) {
        // if there is an error set the selection of the item to false
        let newSelection = item.selected;
        if (item.selected) {
          newSelection =
            item.name === "" ||
            item.price * 1 === 0 ||
            item.customer_price * 1 === 0;
        }

        return {
          ...item,
          [e.target.id]: e.target.value,
          selected: newSelection,
        };
      } else {
        return {
          ...item,
        };
      }
    });

    setItems(updatedItems);

    checkItemsSelectionStatus(updatedItems);
  };

  const selectedChangeHandler = (index) => {
    const updatedItems = items.map((item, i) => {
      if (index === i) {
        return {
          ...item,
          selected: !item.selected,
        };
      } else {
        return {
          ...item,
        };
      }
    });

    setItems(updatedItems);
    checkItemsSelectionStatus(updatedItems);
  };

  const itemsSelectionChangeHandler = () => {
    if (itemsSelectValue === "all") {
      setItemsSelectValue("none");
      const updatedItems = items.map((item) => {
        return {
          ...item,
          selected: false,
        };
      });

      setItems(updatedItems);
    }

    if (itemsSelectValue === "none" || itemsSelectValue === "some") {
      setItemsSelectValue("all");

      const updatedItems = items.map((item) => {
        if (
          item.name === "" ||
          item.price * 1 === 0 ||
          item.customer_price * 1 === 0
        ) {
          return {
            ...item,
          };
        } else
          return {
            ...item,
            selected: true,
          };
      });

      setItems(updatedItems);

      checkItemsSelectionStatus(updatedItems);
    }
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((item, i) => index !== i);
    setItems(updatedItems);
  };

  const withUpdateChangeHandler = () => {
    setWithUpdate(!withUpdate);
  };

  const checkItemsSelectionStatus = (updatedItems) => {
    let itemsSelectedCount = 0;

    updatedItems.forEach((item) => {
      if (item.selected === true) {
        itemsSelectedCount++;
      }
    });

    if (itemsSelectedCount === updatedItems.length) setItemsSelectValue("all");
    else if (itemsSelectedCount === 0) setItemsSelectValue("none");
    else setItemsSelectValue("some");
  };

  return user && companyId !== 0 ? (
    <div className={generalStyles.container}>
      <div className={styles.actions}>
        {items.length > 0 ? (
          <>
            <label>
              <span className={styles.label}>{t("file-name")}:</span>
              <span className={styles.value}>{fileName}</span>
            </label>
            <label>
              <span className={styles.label}>{t("items-count")}:</span>
              <span className={styles.value}>{items.length}</span>
            </label>

            <div
              className={generalStyles.flex_container}
              style={{ marginInlineStart: "10px" }}
            >
              <input
                type="checkbox"
                value={withUpdate}
                checked={withUpdate}
                onChange={withUpdateChangeHandler}
              />
              <label>{t("add-or-update-items")}</label>
            </div>
            <Button
              action={() =>
                withUpdate
                  ? setShowConfirmModal(true)
                  : setShowConfirmModal(true)
              }
              text={t("add-items")}
              bgColor={Colors.SECONDARY_COLOR}
            />
            <InputFile small={true} fileChangedHandler={fileChanged} />
          </>
        ) : null}
      </div>

      {loading && <Loader allowCancel={false} />}

      {items.length === 0 && (
        <InputFile
          btnLabel={t("choose-file")}
          fileChangedHandler={fileChanged}
        />
      )}

      {items.length > 0 ? (
        <ExcelTableHeader
          deleteAllItem={() => setItems([])}
          selectValue={itemsSelectValue}
          itemsSelectionChange={itemsSelectionChangeHandler}
        />
      ) : null}

      {items.length > 0 &&
        items.map((item, index) => (
          <ItemExcelRow
            onDelete={() => handleDeleteItem(index)}
            onchange={handleInputChange}
            onSelectedChanged={selectedChangeHandler}
            key={index}
            item={item}
            index={index}
          />
        ))}

      {showModal && (
        <Modal
          header="add-items"
          cancelLabel="close-label"
          closeModal={() => setShowModal(false)}
          small={true}
        >
          <p>{successMsg}</p>
          <p>{failedMsg}</p>
        </Modal>
      )}

      {showConfirmModal && (
        <Modal
          header="add-items"
          cancelLabel="cancel-label"
          okLabel="ok-label"
          okModal={() =>
            withUpdate ? handleInsertTenItems() : handleInsertItems()
          }
          closeModal={() => setShowConfirmModal(false)}
          small={true}
        >
          {withUpdate ? (
            <p>{t("insert-update-items-msg")}</p>
          ) : (
            <p>{t("insert-items-msg")}</p>
          )}
        </Modal>
      )}

      {addStatus === "loading" && <Loader allowCancel={false} />}

      {addError && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(addError)}
          actionAfterTimeout={() => {
            dispatch(resetAddStatus());
          }}
        />
      )}
    </div>
  ) : (
    <Redirect to="/signin" />
  );
}

export default ItemExcelPage;
