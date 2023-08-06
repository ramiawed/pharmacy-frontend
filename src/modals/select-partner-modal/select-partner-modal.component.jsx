import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";

// components
import NoContent from "../../components/no-content/no-content.component";
import Modal from "../modal/modal.component";

// icons
import { MdAddCircle } from "react-icons/md";

// styles

// constants
import { useTheme } from "../../contexts/themeContext";
import { RiCloseLine } from "react-icons/ri";
import CustomButton from "../../components/custom-button/custom-button.component";

function SelectPartnerModal({ close, chooseAction, placeholder, data }) {
  const { theme } = useTheme();
  const { t } = useTranslation();
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
      showHeader={false}
      showFooter={true}
      cancelText="cancel"
      closeHandler={close}
    >
      <div className="flex flex-col relative rounded-xl">
        <div
          className={`flex flex-1 border-b items-center justify-center p-1 ${
            theme === "light" ? "text-dark" : "text-color-primary-300"
          }`}
        >
          <input
            className="bg-transparent flex-1 border-none outline-none"
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder={t(placeholder)}
            ref={searchInputRef}
          />

          {searchName.length > 0 && (
            <RiCloseLine size={24} onClick={() => setSearchName("")} />
          )}
        </div>
      </div>

      <div className="max-h-[300px] overflow-auto">
        {filteredData?.length > 0 &&
          filteredData.map((d) => (
            <Row key={d._id} data={d} select={select} t={t} theme={theme} />
          ))}

        {filteredData.length === 0 && searchName.length === 0 && (
          <NoContent msg={t("no result found")} />
        )}

        {filteredData.length === 0 && searchName.length !== 0 && (
          <NoContent msg={t("no result found")} />
        )}
      </div>
    </Modal>
  );
}

const Row = ({ data, select, t, theme }) => {
  const selectPartner = () => {
    select(data);
  };

  return (
    <div
      className={`flex flex-row group rounded-md cursor-pointer  transition-colors relative m-2 p-2 ${
        theme === "light"
          ? "border text-dark border-light_grey bg-white hover:border-light"
          : "d-mixed300-primary300 hover:border border-color-primary-100"
      }`}
      onClick={selectPartner}
    >
      <p className="bold text-md flex-1">{data.name}</p>

      <CustomButton
        onClickHandler={selectPartner}
        classname={`${
          theme === "light" ? "bg-green text-white" : "d-primary500-mixed300"
        }`}
        icon={() => <MdAddCircle />}
      />
    </div>
  );
};

export default SelectPartnerModal;
