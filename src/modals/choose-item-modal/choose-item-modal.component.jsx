import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import ReactLoading from "react-loading";
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
import Button from "../../components/button/button.component";
import Icon from "../../components/icon/icon.component";
import NoContent from "../../components/no-content/no-content.component";
import CenterContainer from "../../components/center-container/center-container.component";

// icons
import { IoIosSearch } from "react-icons/io";
import { GrAddCircle } from "react-icons/gr";
import { VscLoading } from "react-icons/vsc";

// styles
import styles from "./choose-item-modal.module.scss";

// constants
import { BASEURL, Colors } from "../../utils/constants";

function ChooseItemModal({
  close,
  chooseAction,
  setBaskItems,
  index,
  basketItems,
}) {
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

      const response = await axios.get(
        `${BASEURL}/items?limit=15&isActive=true&page=${p}${nameCondition}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    if (index !== null) {
      setBaskItems(
        basketItems.map((i, ind) => {
          if (ind === index) {
            return {
              ...i,
              item: data.filter((d) => d._id === id)[0],
            };
          } else {
            return i;
          }
        })
      );
      close();
    } else {
      dispatch(chooseAction({ id, token }))
        .then(unwrapResult)
        .then(() => {
          setData(data.filter((d) => d._id !== id));
        });
    }
  };

  useEffect(() => {
    getItems(1);
  }, []);

  return (
    <Modal
      header="choose item"
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
            placeholder={t("search by name composition barcode")}
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            onKeyDown={keyDownHandler}
          />
          <Button
            text="search"
            action={() => {
              getItems(1);
            }}
            classStyle="bg_green"
          />
        </div>

        <div
          style={{
            maxHeight: "300px",
            overflow: "auto",
          }}
        >
          {data?.length > 0 &&
            data.map((d) => <Row key={d._id} data={d} addAction={addAction} />)}

          {data.length === 0 && searchName.length === 0 && (
            <NoContent msg={t("search for item")} />
          )}

          {data.length === 0 && searchName.length !== 0 && (
            <NoContent msg={t("no results found")} />
          )}
        </div>

        {loading ? (
          <CenterContainer>
            <ReactLoading color={Colors.LIGHT_COLOR} type="cylon" />
          </CenterContainer>
        ) : (
          data.length < count && (
            <div className={styles.actions_div}>
              <Button
                text="more"
                action={() => {
                  getItems(page);
                }}
                classStyle="bg_green"
              />
            </div>
          )
        )}
      </>
    </Modal>
  );
}

const Row = ({ data, addAction }) => {
  const { t } = useTranslation();
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
      <div className={styles.item_details}>
        <div className={styles.row}>
          <label>{t("item name")}</label>
          <p>{data.name}</p>
        </div>
        <div className={styles.row}>
          <label>{t("caliber")}</label>
          <p>{data.caliber}</p>
        </div>
        <div className={styles.row}>
          <label>{t("packing")}</label>
          <p>{data.packing}</p>
        </div>
      </div>

      {loading ? (
        <Icon
          icon={() => (
            <VscLoading
              className="loading"
              size={24}
              color={Colors.SUCCEEDED_COLOR}
            />
          )}
          onclick={() => {}}
          foreColor={Colors.SUCCEEDED_COLOR}
        />
      ) : (
        <Icon
          icon={() => <GrAddCircle color={Colors.SUCCEEDED_COLOR} />}
          foreColor={Colors.SUCCEEDED_COLOR}
          onclick={addToFavorites}
        />
      )}
    </div>
  );
};

export default ChooseItemModal;
