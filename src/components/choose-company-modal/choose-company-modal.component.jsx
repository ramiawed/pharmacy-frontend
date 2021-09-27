import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import ReactLoading from "react-loading";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/authSlice";

// components
import Modal from "../modal/modal.component";
import Button from "../button/button.component";
import Icon from "../action-icon/action-icon.component";
import NoContent from "../../components/no-content/no-content.component";

// icons
import { IoIosSearch } from "react-icons/io";
import { GrAddCircle } from "react-icons/gr";

// styles
import styles from "./choose-company-modal.module.scss";
import generalStyles from "../../style.module.scss";

// constants
import { Colors } from "../../utils/constants";
import { unwrapResult } from "@reduxjs/toolkit";
import { VscLoading } from "react-icons/vsc";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";
import Loader from "../loader/loader.component";

function ChooseCompanyModal({ close, chooseAction, url }) {
  const { t } = useTranslation();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const [searchName, setSearchName] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const keyDownHandler = (event) => {
    if (event.code === "Enter") {
      getCompanies();
    }

    if (event.code !== "Escape") event.stopPropagation();
  };

  const getCompanies = async () => {
    try {
      setLoading(true);
      let nameCondition = "";
      if (searchName.trim().length > 0) {
        nameCondition = `&name=${searchName.trim()}`;
      }

      const response = await axios.get(`${url}${nameCondition}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.data.users);
      setLoading(false);
    } catch (err) {}
  };

  const addToFavoritesCompanies = (id) => {
    dispatch(chooseAction({ id, token }))
      .then(unwrapResult)
      .then(() => {
        setData(data.filter((d) => d._id !== id));
      });
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <Modal
      header="choose-company"
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
              placeholder={t("enter-company-name")}
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              onKeyDown={keyDownHandler}
            />
            <Button
              text="search"
              action={() => {
                getCompanies();
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
                <Row
                  key={d._id}
                  data={d}
                  addToFavoritesCompanies={addToFavoritesCompanies}
                />
              ))}

            {data.length === 0 && searchName.length === 0 && (
              <NoContent msg={t("search-for-company")} />
            )}

            {data.length === 0 && searchName.length !== 0 && (
              <NoContent msg={t("search-empty")} />
            )}
          </div>
        </>
      )}
    </Modal>
  );
}

const Row = ({ data, addToFavoritesCompanies }) => {
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
    addToFavoritesCompanies(data._id);

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
    <div className={styles.company_row}>
      <p className={styles.company_name}>{data.name}</p>
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

export default ChooseCompanyModal;
