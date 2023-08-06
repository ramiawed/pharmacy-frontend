import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

// redux stuff
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";

// react icons
import { CgMoreVertical } from "react-icons/cg";
import { RiCloseLine } from "react-icons/ri";

// components
import NoMoreResult from "../../components/no-more-result/no-more-result.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import ResultsCount from "../../components/results-count/results-count.component";
import MedicineRow from "../../components/medicine-row/medicine-row.component";
import CylonLoader from "../../components/cylon-loader/cylon-loader.component";
import NoContent from "../../components/no-content/no-content.component";
import Modal from "../modal/modal.component";

// context
import { useTheme } from "../../contexts/themeContext";

// constants
import { BASEURL } from "../../utils/constants";

let CancelToken = null;
let source = null;

function FilterItemsModal({ close, selectedAction }) {
  const { theme } = useTheme();
  const { t } = useTranslation();

  // selectors
  const { token } = useSelector(selectUserData);

  const searchInputRef = useRef();

  // own states
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const searchHandler = async (reset, currentPage) => {
    if (searchName.trim().length === 0) {
      setLoading(false);
      return;
    }

    CancelToken = axios.CancelToken;
    source = CancelToken.source();

    setLoading(true);

    let buildUrl = `${BASEURL}`;
    buildUrl =
      buildUrl +
      `/items/filter?page=${currentPage}&limit=15&isActive=true&itemName=${searchName}`;

    try {
      const response = await axios.get(buildUrl, {
        cancelToken: source.token,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      CancelToken = null;
      source = null;

      const {
        data: { data, status, count },
      } = response;

      if (status === "success") {
        if (reset) {
          setItems(data.items);
        } else setItems([...items, ...data.items]);
        setCount(count);
      }

      setLoading(false);
    } catch (err) {
      setItems([]);
    }
  };

  const keyDownHandler = (event) => {
    if (event.code === "Enter") {
      searchHandler();
    }
  };

  const keyUpHandler = () => {
    if (source !== null) {
      source.cancel("cancel");
    }
    setPage(1);
    if (searchName.trim().length >= 3) {
      searchHandler(true, 1);
    } else setItems([]);
  };

  const clearResultHandler = () => {
    if (source) {
      source.cancel("operation canceled by user");
    }

    setSearchName("");
  };

  const moreDataHandler = () => {
    setPage(page + 1);
    searchHandler(false, page + 1);
  };

  useEffect(() => {
    searchInputRef.current.focus();
  });

  return (
    <Modal
      showHeader={false}
      closeHandler={close}
      cancelText="close"
      showFooter={true}
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
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
            placeholder={t("search by name composition barcode")}
            onKeyDown={keyDownHandler}
            onKeyUp={keyUpHandler}
            ref={searchInputRef}
          />

          {searchName.length > 0 && (
            <RiCloseLine size={24} onClick={clearResultHandler} />
          )}
        </div>

        {searchName.length >= 3 ? (
          <div
            className={`max-h-[400px] flex flex-col items-center justify-start overflow-scroll`}
          >
            {items.map((d, index) => (
              <MedicineRow
                key={d._id}
                item={d}
                index={index}
                showComposition={true}
                selectedAction={selectedAction}
                searchString={searchName}
              />
            ))}
            {loading && <CylonLoader />}

            {count > 0 && !loading && (
              <ResultsCount count={`${items.length} / ${count}`} />
            )}

            {items.length < count && !loading && (
              <CustomButton
                icon={() => <CgMoreVertical />}
                onClickHandler={moreDataHandler}
                classname={`${
                  theme === "light"
                    ? "bg-green text-white"
                    : "d-primary500-mixed300"
                }`}
                text={t("more")}
              />
            )}

            {items.length === count && !loading && count !== 0 && (
              <NoMoreResult msg={t("no more")} />
            )}

            {searchName.trim().length >= 3 && items.length === 0 && (
              <NoContent msg={t("no data found")} />
            )}
          </div>
        ) : (
          <p className={`bold text-center text-green my-2`}>
            {t("enter at least 3 characters")}
          </p>
        )}
      </div>
    </Modal>
  );
}

export default FilterItemsModal;
