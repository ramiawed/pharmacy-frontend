import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";

// components
import NoContent from "../../components/no-content/no-content.component";
import Icon from "../../components/icon/icon.component";
import Modal from "../modal/modal.component";

// icons
import { IoIosSearch } from "react-icons/io";
import { MdAddCircle } from "react-icons/md";

// styles
import styles from "./select-partner-modal.module.scss";
import generalStyles from "../../style.module.scss";

// constants
import { Colors } from "../../utils/constants";

function SelectPartnerModal({
  close,
  chooseAction,
  header,
  placeholder,
  data,
}) {
  const { t } = useTranslation();
  // const token = useSelector(selectToken);
  const searchInputRef = useRef();

  // own state
  const [searchName, setSearchName] = useState("");
  let filteredData = data.filter((d) => {
    if (searchName.trim().length > 0) {
      return d.name.includes(searchName.trim());
    }
    return true;
  });

  const select = (data) => {
    chooseAction(data);
    close();
  };

  useEffect(() => {
    // getData(1);
    searchInputRef.current.focus();
  }, []);

  return (
    <Modal
      header={t(header)}
      cancelLabel="cancel-label"
      closeModal={close}
      small={true}
    >
      <>
        <div
          className={[
            styles.search_container,
            generalStyles.flex_center_container,
          ].join(" ")}
        >
          <IoIosSearch color={Colors.LIGHT_COLOR} size={24} />
          <input
            className={styles.search_input}
            placeholder={t(placeholder)}
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            // onKeyDown={keyDownHandler}
            // onKeyUp={keyUpHandler}
            ref={searchInputRef}
          />
        </div>

        <div
          style={{
            maxHeight: "300px",
            overflow: "auto",
          }}
        >
          {filteredData?.length > 0 &&
            filteredData.map((d) => (
              <Row key={d._id} data={d} select={select} />
            ))}

          {filteredData.length === 0 && searchName.length === 0 && (
            <NoContent msg={t("search-for-company")} />
          )}

          {filteredData.length === 0 && searchName.length !== 0 && (
            <NoContent msg={t("search-empty")} />
          )}
        </div>
      </>
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
        icon={() => <MdAddCircle size={24} />}
        foreColor={Colors.SUCCEEDED_COLOR}
        onclick={selectPartner}
        // withBackground={true}
        selected={false}
      />
    </div>
  );
};

export default SelectPartnerModal;
