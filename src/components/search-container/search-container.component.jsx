import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// react-icons
import { FaFilter } from "react-icons/fa";

// components
import Icon from "../action-icon/action-icon.component";

// styles
import styles from "./search-container.module.scss";

function SearchContainer({ children, searchAction }) {
  const { t } = useTranslation();

  let childrenArray = React.Children.toArray(children);
  const [moreSearchOptions, setMoreSearchOptions] = useState(false);

  return (
    <div className={[styles.search_container, styles.expanded].join(" ")}>
      <div className={styles.expanded_div}>
        {true && (
          <>
            <div style={{ flex: 1 }}>
              {childrenArray[0]}
              {moreSearchOptions && childrenArray.length > 1
                ? childrenArray.map((child, index) => {
                    if (index > 0) return child;
                    return null;
                  })
                : null}

              {moreSearchOptions && (
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

            {childrenArray.length > 1 && (
              <div
                style={{
                  paddingRight: "4px",
                  paddingLight: "4px",
                }}
              >
                <Icon
                  onclick={() => setMoreSearchOptions(!moreSearchOptions)}
                  icon={() => <FaFilter size={24} />}
                />
              </div>
            )}

            {childrenArray.length === 1 && (
              <button
                className={[
                  styles.search_button,
                  styles.small_search_button,
                ].join(" ")}
                onClick={() => {
                  searchAction();
                  setMoreSearchOptions(false);
                }}
              >
                {t("search")}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SearchContainer;
