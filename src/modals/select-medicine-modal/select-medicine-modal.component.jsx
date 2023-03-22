import React, { useCallback, useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

// redux stuff
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/authSlice";

// components
import MedicineRow from "../../components/medicine-row/medicine-row.component";
import CylonLoader from "../../components/cylon-loader/cylon-loader.component";
import NoContent from "../../components/no-content/no-content.component";
import Icon from "../../components/icon/icon.component";
import Modal from "../modal/modal.component";

// icons
import { IoIosSearch } from "react-icons/io";
import { MdAddCircle } from "react-icons/md";

// styles
import styles from "./select-medicine-modal.module.scss";
import generalStyles from "../../style.module.scss";

// constants
import { Colors } from "../../utils/constants";

let CancelToken = null;
let source = null;

function SelectMedicineModal({ close, chooseAction, url }) {
  const { t } = useTranslation();
  const token = useSelector(selectToken);
  const searchInputRef = useRef();

  const [searchName, setSearchName] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const keyDownHandler = (event) => {
    if (event.code === "Enter") {
      getItems(1);
    }

    if (event.code !== "Escape") event.stopPropagation();
  };

  const keyUpHandler = () => {
    if (source !== null) {
      source.cancel("cancel");
    }
    getItems(1);
  };

  const getItems = useCallback(
    async (p) => {
      try {
        setLoading(true);
        let nameCondition = "";

        if (searchName.trim().length > 0) {
          nameCondition = `&itemName=${searchName.trim()}`;
        }

        CancelToken = axios.CancelToken;
        source = CancelToken.source();
        const response = await axios.get(`${url}&page=${p}${nameCondition}`, {
          cancelToken: source.token,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        CancelToken = null;
        source = null;

        if (p === 1) {
          setData(response.data.data.items);
        } else {
          setData([...data, ...response.data.data.items]);
        }
        setCount(response.data.count);
        setLoading(false);
        setPage(p + 1);
      } catch (err) {}
    },
    [data, searchName, token, url]
  );

  const select = (data) => {
    chooseAction(data);
    close();
  };

  useEffect(() => {
    getItems(1);

    searchInputRef.current.focus();
  }, []);

  return (
    <Modal
      header="choose-item"
      cancelLabel="cancel"
      closeModal={close}
      small={true}
    >
      <>
        <div
          className={[styles.search_container, "flex_center_container"].join(
            " "
          )}
        >
          <IoIosSearch color={Colors.LIGHT_COLOR} size={24} />
          <input
            className={styles.search_input}
            placeholder={t("enter-item-trade-name")}
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            onKeyDown={keyDownHandler}
            onKeyUp={keyUpHandler}
            ref={searchInputRef}
          />
        </div>

        <div
          style={{
            maxHeight: "300px",
            overflow: "auto",
          }}
        >
          {data?.length > 0 &&
            data.map((d, index) => (
              <Row key={d._id} data={d} select={select} index={index} />
            ))}

          {data.length === 0 && searchName.length === 0 && (
            <NoContent msg={t("search-for-item")} />
          )}

          {data.length === 0 && searchName.length !== 0 && (
            <NoContent msg={t("search-empty")} />
          )}
        </div>

        {data.length < count && (
          <button className={styles.more_btn} onClick={() => getItems(page)}>
            {t("more")}
          </button>
        )}

        {loading && <CylonLoader />}
      </>
    </Modal>
  );
}

const Row = ({ data, select, index }) => {
  const selectMedicine = () => {
    select(data);
  };

  return (
    <div className={styles.item_row}>
      <MedicineRow item={data} index={index} />

      <Icon
        icon={() => <MdAddCircle size={24} />}
        foreColor={Colors.SUCCEEDED_COLOR}
        onclick={selectMedicine}
        withBackground={true}
        selected={false}
      />
    </div>
  );
};

export default SelectMedicineModal;
