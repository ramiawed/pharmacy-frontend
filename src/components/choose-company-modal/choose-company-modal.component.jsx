import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

// redux stuff
import { useSelector } from "react-redux";
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

// constants
import { Colors } from "../../utils/constants";

function ChooseCompanyModal({ close, chooseAction, url }) {
  const { t } = useTranslation();
  const token = useSelector(selectToken);

  // const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [data, setData] = useState([]);

  const keyDownHandler = (event) => {
    if (event.code === "Enter") {
      getCompanies();
    }

    if (event.code !== "Escape") event.stopPropagation();
  };

  const getCompanies = async () => {
    try {
      // setLoading(true);
      // setData([]);
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
      // setLoading(false);
    } catch (err) {
      console.log(err.response);
    }
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
            <div key={d._id} className={styles.company_row}>
              <p className={styles.company_name}>{d.name}</p>
              <Icon
                icon={() => <GrAddCircle />}
                foreColor={Colors.SECONDARY_COLOR}
                onclick={() => chooseAction(d._id)}
              />
            </div>
          ))}
        {data.length === 0 && searchName.length === 0 && (
          <NoContent msg={t("search-for-company")} />
        )}
        {data.length === 0 && searchName.length !== 0 && (
          <NoContent msg={t("search-empty")} />
        )}
      </div>
    </Modal>
  );
}

export default ChooseCompanyModal;
