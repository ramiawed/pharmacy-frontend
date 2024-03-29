import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect, useLocation } from "react-router-dom";
import * as XLSX from "xlsx";

// components
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import ExcelFileCriteria from "../../components/excel-file-criteria/excel-file-criteria.component";
import ItemExcelCard from "../../components/item-excel-card/item-excel-card.component";
import LabelValueRow from "../../components/label-value-row/label-value-row.component";
import Loader from "../../components/action-loader/action-loader.component";
import ActionBar from "../../components/action-bar/action-bar.component";
import InputFile from "../../components/input-file/input-file.component";
import Separator from "../../components/separator/separator.component";
import Header from "../../components/header/header.component";
import Toast from "../../components/toast/toast.component";
import Modal from "../../modals/modal/modal.component";
import Icon from "../../components/icon/icon.component";

// icons
import {
  MdEditNote,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineIndeterminateCheckBox,
} from "react-icons/md";
import { RiPlayListAddFill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";

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

// constants
import { Colors, toEnglishNumber } from "../../utils/constants";

function ItemExcelPage() {
  const user = useSelector(selectUser);

  const location = useLocation();
  const { companyId = 0 } = location.state ? location.state : {};

  const { t } = useTranslation();

  const dispatch = useDispatch();

  // selectors
  const token = useSelector(selectToken);
  const { addError, addStatus } = useSelector(selectItems);
  const isOnline = useSelector(selectOnlineStatus);

  // own state
  const [withUpdate, setWithUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [failedMsg, setFailedMsg] = useState("");
  const [itemsSelectValue, setItemsSelectValue] = useState("all");
  const [correctItemsCount, setCorrectItemsCount] = useState(0);
  const [wrongItemsCount, setWrongItemsCount] = useState(0);
  const [selectedItemsCount, setSelectedItemsCount] = useState(0);

  const calculateCounts = () => {
    let correctCount = 0;
    let wrongCount = 0;
    let selectedCount = 0;

    for (let i = 0; i < items.length; i++) {
      if (items[i].selected) {
        selectedCount += 1;
      }

      if (
        !items[i].name ||
        !items[i].price ||
        items[i].price * 1 === 0 ||
        !items[i].customer_price ||
        items[i].customer_price * 1 === 0 ||
        (withUpdate && !items[i]._id)
      ) {
        wrongCount += 1;
      } else {
        correctCount += 1;
      }
    }

    setCorrectItemsCount(correctCount);
    setWrongItemsCount(wrongCount);
    setSelectedItemsCount(selectedCount);
  };

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
          _id: d._id ? d._id : null,
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

        if (!d.nameAr) {
          obj = {
            ...obj,
            nameAr: "",
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

        if (!d.barcodeTwo) {
          obj = {
            ...obj,
            barcodeTwo: "",
          };
        }

        if (!d.indication) {
          obj = {
            ...obj,
            indication: "",
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
    calculateCounts();
  };

  const addOrUpdateHandler = () => {
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
        if (
          !item.name ||
          !item.price ||
          !item.customer_price ||
          (withUpdate && !item._id)
        ) {
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
          setSuccessMsg(`${t("inserted items")}: ${rightItem.length}`);
          setFailedMsg(`${t("wrong items")}: ${wrongItems.length}`);
          setShowModal(true);
          setItems([...wrongItems, ...unSelectedItems]);
          checkItemsSelectionStatus([...wrongItems, ...unSelectedItems]);
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
          [e.target.id]:
            e.target.id === "price" || e.target.id === "customer_price"
              ? toEnglishNumber(e.target.value)
              : e.target.value,
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

    calculateCounts();
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
    calculateCounts();
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
        return {
          ...item,
          selected: true,
        };
      });

      setItems(updatedItems);

      checkItemsSelectionStatus(updatedItems);
    }

    calculateCounts();
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((item, i) => index !== i);
    setItems(updatedItems);
    calculateCounts();
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

    calculateCounts();
  };

  useEffect(() => {
    calculateCounts();
  }, [items]);

  return user && companyId !== 0 ? (
    <>
      <Header
        title={
          items.length === 0
            ? t("add or update items")
            : withUpdate
            ? t("update items")
            : t("add items")
        }
      />

      <MainContentContainer>
        {items.length > 0 ? (
          <>
            <ActionBar>
              <Icon
                selected={false}
                foreColor={Colors.MAIN_COLOR}
                tooltip={t("")}
                onclick={itemsSelectionChangeHandler}
                icon={() => {
                  if (itemsSelectValue === "all")
                    return (
                      <MdOutlineCheckBox size={24} color={Colors.MAIN_COLOR} />
                    );
                  if (itemsSelectValue === "none")
                    return <MdOutlineCheckBoxOutlineBlank size={24} />;
                  if (itemsSelectValue === "some")
                    return <MdOutlineIndeterminateCheckBox size={24} />;
                }}
                withBackground={true}
              />

              {withUpdate ? (
                <Icon
                  selected={false}
                  foreColor={Colors.MAIN_COLOR}
                  tooltip={t("update items")}
                  onclick={() => {
                    setShowConfirmModal(true);
                  }}
                  icon={() => <MdEditNote />}
                  withBackground={true}
                />
              ) : (
                <Icon
                  selected={false}
                  foreColor={Colors.MAIN_COLOR}
                  tooltip={t("add items")}
                  onclick={() => {
                    setShowConfirmModal(true);
                  }}
                  icon={() => <RiPlayListAddFill />}
                  withBackground={true}
                />
              )}

              <InputFile small={true} fileChangedHandler={fileChanged} />
              <Icon
                selected={false}
                foreColor={Colors.FAILED_COLOR}
                tooltip={t("delete all rows")}
                onclick={() => setItems([])}
                icon={() => <AiFillDelete size={24} />}
                withBackground={true}
              />
            </ActionBar>
            <div>
              <LabelValueRow
                label="file name"
                value={fileName}
                withLargeLabel={true}
              />

              <LabelValueRow
                label="items count"
                value={items.length}
                withLargeLabel={true}
              />

              <LabelValueRow
                label="correct items count"
                value={correctItemsCount}
                withLargeLabel={true}
              />

              <LabelValueRow
                label="wrong items count"
                value={wrongItemsCount}
                withLargeLabel={true}
              />

              <LabelValueRow
                label="selected items count"
                value={selectedItemsCount}
                withLargeLabel={true}
              />
            </div>
          </>
        ) : null}
        {/* </div> */}

        {loading && <Loader allowCancel={false} />}

        {items.length === 0 && (
          <>
            <InputFile
              fileChangedHandler={(file) => {
                setWithUpdate(false);
                fileChanged(file);
              }}
              label="choose file to add items"
              action={false}
            />

            <ExcelFileCriteria action="add" />

            <Separator />

            <InputFile
              fileChangedHandler={(file) => {
                setWithUpdate(true);
                fileChanged(file);
              }}
              label="choose file to update items"
              action={true}
            />
            <ExcelFileCriteria action="update" />
          </>
        )}

        {items.length > 0 &&
          items.map((item, index) => (
            <div key={index}>
              <ItemExcelCard
                onDelete={() => handleDeleteItem(index)}
                onchange={handleInputChange}
                onSelectedChanged={selectedChangeHandler}
                key={index}
                item={item}
                index={index}
                withUpdate={withUpdate}
              />
            </div>
          ))}

        {showModal && (
          <Modal
            header="add items"
            cancelLabel="close"
            closeModal={() => setShowModal(false)}
            small={true}
          >
            <p>{successMsg}</p>
            <p>{failedMsg}</p>
          </Modal>
        )}

        {showConfirmModal && (
          <Modal
            header="add items"
            cancelLabel="cancel"
            okLabel="ok"
            okModal={() => addOrUpdateHandler()}
            closeModal={() => setShowConfirmModal(false)}
            small={true}
          >
            {withUpdate ? (
              <p>{t("insert update items msg")}</p>
            ) : (
              <p>{t("insert items msg")}</p>
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
      </MainContentContainer>
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default ItemExcelPage;
