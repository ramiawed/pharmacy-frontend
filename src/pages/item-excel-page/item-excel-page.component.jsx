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
  const [fileName, setFileName] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [failedMsg, setFailedMsg] = useState("");

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
          company: companyId,
          isActive: true,
        };

        if (!d.price) {
          obj = {
            ...obj,
            price: 0,
          };
        }

        if (!d.customer_price) {
          obj = {
            ...obj,
            customer_price: 0,
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
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    let rightItem = [];
    let wrongItems = [];
    for (let item of items) {
      if (!item.name || !item.price || !item.customer_price) {
        wrongItems.push(item);
      } else {
        rightItem.push(item);
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
          setItems(wrongItems);
          dispatch(resetStatus());
        })
        .catch((rejectedValueOrSerializedError) => {});
    } else {
    }
  };

  const handleInsertFiftyItems = () => {
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    let rightItem = [];
    let wrongItems = [];
    for (let i = 0; i < 50; i++) {
      if (!items[i]) {
        break;
      }

      if (!items[i].name || !items[i].price || !items[i].customer_price) {
        wrongItems.push(items[i]);
      } else {
        rightItem.push(items[i]);
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
          setItems([...wrongItems, ...items.slice(50)]);
          dispatch(resetStatus());
        })
        .catch((rejectedValueOrSerializedError) => {});
    } else {
    }
  };

  const handleInputChange = (e, index) => {
    const updatedItems = items.map((item, i) => {
      if (index === i) {
        return {
          ...item,
          [e.target.id]: e.target.value,
        };
      } else {
        return {
          ...item,
        };
      }
    });

    setItems(updatedItems);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((item, i) => index !== i);
    setItems(updatedItems);
  };

  return user && companyId !== 0 ? (
    <div className={generalStyles.container}>
      <div className={styles.actions}>
        {items.length > 0 ? (
          <>
            <label>
              {t("file-name")}: {fileName}
            </label>
            <label>
              {t("items-count")}: {items.length}
            </label>

            <Button
              action={() =>
                withUpdate ? handleInsertFiftyItems() : handleInsertItems()
              }
              text={t("add-items")}
              bgColor={Colors.SECONDARY_COLOR}
            />

            <InputFile small={true} fileChangedHandler={fileChanged} />
            <div
              className={generalStyles.flex_container}
              style={{ marginInlineStart: "10px" }}
            >
              <input
                type="checkbox"
                value={withUpdate}
                checked={withUpdate}
                onChange={() => setWithUpdate(!withUpdate)}
              />
              <label>{t("add-or-update-items")}</label>
            </div>
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
        <ExcelTableHeader deleteAllItem={() => setItems([])} />
      ) : null}

      {items.length > 0 &&
        items.map((item, index) => (
          <ItemExcelRow
            onDelete={() => handleDeleteItem(index)}
            onchange={handleInputChange}
            key={index}
            item={item}
            index={index}
          />
        ))}

      {showModal && (
        <Modal
          header="add-items"
          cancelLabel="cancel-label"
          okLabel="ok-label"
          okModal={() => setShowModal(false)}
          closeModal={() => setShowModal(false)}
        >
          <p>{successMsg}</p>
          <p>{failedMsg}</p>
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
