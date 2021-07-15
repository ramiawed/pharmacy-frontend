import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// react-icons
import { FaSearch } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";

// styles
import styles from "./search-container.module.scss";
import generalStyles from "../../style.module.scss";

function SearchContainer({ children, searchAction }) {
  const { t } = useTranslation();

  let childrenArray = React.Children.toArray(children);
  const [expanded, setExpanded] = useState(false);
  const [moreSearchOptions, setMoreSearchOptions] = useState(false);

  return (
    <div
      className={[
        styles.search_container,
        expanded ? styles.expanded : "",
        moreSearchOptions ? styles.expanded_with_options : "",
      ].join(" ")}
    >
      <div className={styles.expanded_div}>
        <div
          className={[
            generalStyles.icon,
            expanded ? generalStyles.minus_top_margin : "",
          ].join(" ")}
          onClick={() => {
            setExpanded(!expanded);
            setMoreSearchOptions(false);
          }}
        >
          <FaSearch />
        </div>

        {expanded && (
          <>
            <div style={{ flex: 1 }}>
              {childrenArray[0]}
              {moreSearchOptions && childrenArray.length > 1
                ? childrenArray.map((child, index) => {
                    if (index > 0) return child;
                    return null;
                  })
                : null}
            </div>

            {childrenArray.length > 1 && (
              <div
                className={[
                  generalStyles.icon,
                  expanded ? generalStyles.minus_top_margin : "",
                ].join(" ")}
                onClick={() => setMoreSearchOptions(!moreSearchOptions)}
              >
                <VscSettings />
              </div>
            )}
            <button
              onClick={searchAction}
              className={[
                generalStyles.button,
                generalStyles.bg_secondary,
                generalStyles.fc_white,
                generalStyles.margin_h_auto,
                generalStyles.block,
                generalStyles.padding_v_6,
                generalStyles.padding_h_8,
              ].join(" ")}
            >
              {t("search")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SearchContainer;
