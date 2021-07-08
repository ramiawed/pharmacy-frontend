import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { FaSearch } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import { Colors } from "../../utils/constants";
import ActionButton from "../action-button/action-button.component";

import styles from "./search-container.module.scss";

function SearchContainer({ children, searchAction }) {
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
        <div className={styles.icon_div}>
          <FaSearch
            onClick={() => {
              setExpanded(!expanded);
              setMoreSearchOptions(false);
            }}
          />
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
              <div className={styles.icon_div}>
                <VscSettings
                  onClick={() => setMoreSearchOptions(!moreSearchOptions)}
                />
              </div>
            )}
            <ActionButton
              text="search"
              color={Colors.SECONDARY_COLOR}
              action={() => searchAction()}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default SearchContainer;
