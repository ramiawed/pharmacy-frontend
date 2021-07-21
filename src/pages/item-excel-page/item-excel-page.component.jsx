import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import * as XLSX from "xlsx";

// 3-party library
import ReactLoading from "react-loading";

// components
import ActionLoader from "../../components/action-loader/action-loader.component";
import TableHeader from "../../components/table-header/table-header.component";
import InputFile from "../../components/input-file/input-file.component";
import ItemExcelRow from "../../components/item-excel-row/item-excel-row.component";
import Modal from "../../components/modal/modal.component";
import Toast from "../../components/toast/toast.component";

// react-icons
import { AiFillDelete } from "react-icons/ai";

import { selectToken, selectUser } from "../../redux/auth/authSlice";
import {
  addItems,
  resetError,
  resetStatus,
  selectItems,
} from "../../redux/items/itemsSlices";

// styles
import generalStyles from "../../style.module.scss";
import styles from "./item-excel-page.module.scss";
import tableStyles from "../../components/table.module.scss";

// constants
import { Colors } from "../../utils/constants";

function ItemExcelPage() {
  const user = useSelector(selectUser);

  const location = useLocation();
  const { companyId } = location.state;

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const { error, status } = useSelector(selectItems);

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
      setLoading(false);
    };

    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

  const handleInsertItems = () => {
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
      dispatch(addItems({ obj: rightItem, token }))
        .then(unwrapResult)
        .then((originalPromiseResult) => {
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

  return user ? (
    <>
      {status === "loading" && (
        <ActionLoader
          foreColor={Colors.fc_secondary_COLOR}
          onclick={() => {}}
        />
      )}

      <div className={styles.actions}>
        {items.length > 0 ? (
          <>
            <label>
              {t("file-name")}: {fileName}
            </label>
            <label>
              {t("items-count")}: {items.length}
            </label>

            <button
              onClick={handleInsertItems}
              className={[
                generalStyles.button,
                generalStyles.bg_secondary,
                generalStyles.fc_white,
                generalStyles.padding_v_6,
                generalStyles.padding_h_12,
                generalStyles.margin_h_4,
              ].join(" ")}
            >
              {t("add-items")}
            </button>

            <InputFile small={true} fileChangedHandler={fileChanged} />
          </>
        ) : null}
      </div>

      {loading && (
        <div className={styles.loading}>
          <ReactLoading color="#8a7d85" type="bubbles" height={50} width={50} />
        </div>
      )}

      {items.length === 0 && (
        <InputFile
          btnLabel={t("choose-file")}
          fileChangedHandler={fileChanged}
        />
      )}

      {items.length > 0 ? (
        <TableHeader>
          <label className={tableStyles.label_medium}>
            {t("item-trade-name")}
          </label>
          <label className={tableStyles.label_small}>{t("item-formula")}</label>
          <label className={tableStyles.label_small}>{t("item-caliber")}</label>
          <label className={tableStyles.label_small}>{t("item-packing")}</label>
          <label className={tableStyles.label_small}>{t("item-price")}</label>
          <label className={tableStyles.label_small}>
            {t("item-customer-price")}
          </label>
          <label className={tableStyles.label_large}>
            {t("item-composition")}
          </label>
          <label className={tableStyles.label_xsmall}>
            <div
              className={[
                generalStyles.icon,
                generalStyles.fc_red,
                generalStyles.margin_h_auto,
              ].join(" ")}
              onClick={() => setItems([])}
            >
              <AiFillDelete size={16} />
              <div className={generalStyles.tooltip}>
                {t("delete-all-rows")}
              </div>
            </div>
          </label>
        </TableHeader>
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

      {error && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={error}
          actionAfterTimeout={() => {
            dispatch(resetError());
          }}
        />
      )}
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default ItemExcelPage;
