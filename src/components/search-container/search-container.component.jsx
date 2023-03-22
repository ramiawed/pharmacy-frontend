import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// react-icons
import { FaFilter, FaSearch } from "react-icons/fa";

// constants
import { Colors } from "../../utils/constants";

// components
import Icon from "../icon/icon.component";

// styles
import styles from "./search-container.module.scss";

function SearchContainer({ children, searchAction, searchEngineAlert }) {
  const { t } = useTranslation();

  let childrenArray = React.Children.toArray(children);
  const [moreSearchOptions, setMoreSearchOptions] = useState(false);

  return (
    <div className={[styles.search_container, styles.expanded].join(" ")}>
      <div className={styles.options_container}>
        {childrenArray[0]}
        {moreSearchOptions && childrenArray.length > 1
          ? childrenArray.map((child, index) => {
              if (index > 0) return child;
              return null;
            })
          : null}

        {moreSearchOptions && searchAction && (
          <button
            className={styles.search_button}
            onClick={() => {
              searchAction();
              setMoreSearchOptions(false);
            }}
          >
            {t("search")}
          </button>
        )}
      </div>

      <div className={styles.icon_container}>
        {childrenArray.length > 1 ? (
          <Icon
            onclick={() => setMoreSearchOptions(!moreSearchOptions)}
            icon={() => <FaFilter size={24} color={Colors.WHITE_COLOR} />}
            withAlertIcon={searchEngineAlert}
          />
        ) : searchAction ? (
          <Icon
            onclick={() => {
              searchAction();
              setMoreSearchOptions(false);
            }}
            icon={() => <FaSearch size={24} color={Colors.WHITE_COLOR} />}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default SearchContainer;
