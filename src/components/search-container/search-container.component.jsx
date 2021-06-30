import React, { useState } from "react";

import { FaSearch } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";

import styles from "./search-container.module.scss";

function SearchContainer({ children }) {
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
        <div>
          <FaSearch
            className={styles.icon}
            onClick={() => {
              setExpanded(!expanded);
              setMoreSearchOptions(false);
            }}
          />
        </div>

        {expanded && (
          <>
            <div style={{ flex: 1 }}>{childrenArray[0]}</div>

            {childrenArray.length > 1 && (
              <div>
                <VscSettings
                  style={{
                    transform: "rotate(90deg)",
                  }}
                  className={styles.icon}
                  onClick={() => setMoreSearchOptions(!moreSearchOptions)}
                />
              </div>
            )}
          </>
        )}
      </div>

      {moreSearchOptions && childrenArray.length > 1 && (
        <div
          style={{
            paddingRight: "16px",
            paddingLeft: "16px",
          }}
        >
          {childrenArray[1]}
        </div>
      )}
    </div>
  );
}

export default SearchContainer;
