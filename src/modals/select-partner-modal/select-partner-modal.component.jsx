import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

// redux stuff
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/authSlice";

// components
import Modal from "../modal/modal.component";
import Button from "../../components/button/button.component";
import Icon from "../../components/action-icon/action-icon.component";
import NoContent from "../../components/no-content/no-content.component";
import Loader from "../../components/loader/loader.component";

// icons
import { IoIosSearch } from "react-icons/io";
import { GrAddCircle } from "react-icons/gr";

// styles
import styles from "./select-partner-modal.module.scss";
import generalStyles from "../../style.module.scss";

// constants
import { Colors } from "../../utils/constants";

function SelectPartnerModal({ close, chooseAction, url, header, placeholder }) {
  const { t } = useTranslation();
  const token = useSelector(selectToken);

  // own state
  const [searchName, setSearchName] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const keyDownHandler = (event) => {
    if (event.code === "Enter") {
      getCompanies(1);
    }

    if (event.code !== "Escape") event.stopPropagation();
  };

  const getCompanies = useCallback(
    (p) => {
      try {
        setLoading(true);
        let nameCondition = "";

        if (searchName.trim().length > 0) {
          nameCondition = `&name=${searchName.trim()}`;
        }

        axios
          .get(`${url}&page=${p}${nameCondition}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (p === 1) {
              setData(response.data.data.users);
            } else {
              setData([...data, ...response.data.data.users]);
            }
            setCount(response.data.count);
            setLoading(false);
            setPage(p + 1);
          });
      } catch (err) {}
    },
    [data, searchName, token, url]
  );

  const select = (data) => {
    chooseAction(data);
    close();
  };

  useEffect(() => {
    getCompanies(1);
  }, []);

  return (
    <Modal
      header={t(header)}
      cancelLabel="cancel-label"
      closeModal={close}
      small={true}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className={[
              styles.search_container,
              generalStyles.flex_center_container,
            ].join(" ")}
          >
            <IoIosSearch color={Colors.SECONDARY_COLOR} size={24} />
            <input
              className={styles.search_input}
              placeholder={t(placeholder)}
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              onKeyDown={keyDownHandler}
            />
            <Button
              text="search"
              action={() => {
                getCompanies(1);
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
              data.map((d) => <Row key={d._id} data={d} select={select} />)}

            {data.length === 0 && searchName.length === 0 && (
              <NoContent msg={t("search-for-company")} />
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
                  getCompanies(page);
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

const Row = ({ data, select }) => {
  const selectPartner = () => {
    select(data);
  };

  return (
    <div className={styles.company_row}>
      <p className={styles.company_name}>{data.name}</p>

      <Icon
        icon={() => <GrAddCircle />}
        foreColor={Colors.SUCCEEDED_COLOR}
        onclick={selectPartner}
      />
    </div>
  );
};

export default SelectPartnerModal;
