import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

// redux stuff
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/authSlice";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";

// components
import Modal from "../modal/modal.component";
import Button from "../button/button.component";
import Icon from "../action-icon/action-icon.component";
import NoContent from "../no-content/no-content.component";
import Loader from "../loader/loader.component";

// icons
import { IoIosSearch } from "react-icons/io";
import { GrAddCircle } from "react-icons/gr";
import { VscLoading } from "react-icons/vsc";

// styles
import styles from "./choose-item-modal.module.scss";
import generalStyles from "../../style.module.scss";

// constants
import { Colors } from "../../utils/constants";

function ChooseItemModal({ close, chooseAction, url }) {
  const { t } = useTranslation();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

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

  const getItems = async (p) => {
    try {
      setLoading(true);
      let nameCondition = "";

      if (searchName.trim().length > 0) {
        nameCondition = `&itemName=${searchName.trim()}`;
      }

      const response = await axios.get(`${url}&page=${p}${nameCondition}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (p === 1) {
        setData(response.data.data.items);
      } else {
        setData([...data, ...response.data.data.items]);
      }
      setCount(response.data.count);
      setLoading(false);
      setPage(p + 1);
    } catch (err) {}
  };

  const addAction = (id) => {
    dispatch(chooseAction({ id, token }))
      .then(unwrapResult)
      .then(() => {
        setData(data.filter((d) => d._id !== id));
      });
  };

  useEffect(() => {
    getItems(1);
  }, []);

  return (
    <Modal
      header="choose-item"
      cancelLabel="cancel-label"
      closeModal={close}
      small={true}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.search_container}>
            <IoIosSearch color={Colors.SECONDARY_COLOR} size={24} />
            <input
              className={styles.search_input}
              placeholder={t("enter-item-trade-name")}
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              onKeyDown={keyDownHandler}
            />
            <Button
              text="search"
              action={() => {
                getItems(1);
              }}
              bgColor={Colors.SECONDARY_COLOR}
            />
          </div>

          <div
            style={{
              maxHeight: "300px",
              overflow: "auto",
            }}
          >
            {data?.length > 0 &&
              data.map((d) => (
                <Row key={d._id} data={d} addAction={addAction} />
              ))}

            {data.length === 0 && searchName.length === 0 && (
              <NoContent msg={t("search-for-item")} />
            )}

            {data.length === 0 && searchName.length !== 0 && (
              <NoContent msg={t("search-empty")} />
            )}
          </div>

          {data.length < count && (
            <div className={generalStyles.padding_v_6}>
              <Button
                text="more"
                action={() => {
                  getItems(page);
                }}
                bgColor={Colors.SECONDARY_COLOR}
              />
            </div>
          )}
        </>
      )}
    </Modal>
  );
}

const Row = ({ data, addAction }) => {
  let timer = useRef();

  const dispatch = useDispatch();
  const isOnline = useSelector(selectOnlineStatus);

  const [loading, setLoading] = useState(false);

  const addToFavorites = () => {
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }
    setLoading(true);
    addAction(data._id);

    timer = setTimeout(() => {
      setLoading(false);
    }, 15000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={styles.item_row}>
      <p className={styles.item_name}>{data.name}</p>
      <p className={[styles.small].join(" ")}>{data.caliber}</p>
      <p className={[styles.small].join(" ")}>{data.packing}</p>
      {loading ? (
        <Icon
          icon={() => (
            <VscLoading className={generalStyles.loading} size={24} />
          )}
          onclick={() => {}}
          foreColor={Colors.SECONDARY_COLOR}
        />
      ) : (
        <Icon
          icon={() => <GrAddCircle />}
          foreColor={Colors.SUCCEEDED_COLOR}
          onclick={addToFavorites}
        />
      )}
    </div>
  );
};

export default ChooseItemModal;