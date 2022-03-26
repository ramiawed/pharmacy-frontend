import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// react-icons
import { VscSettings } from "react-icons/vsc";

// styles
import styles from "./search-container.module.scss";
import generalStyles from "../../style.module.scss";
import Icon from "../action-icon/action-icon.component";

function SearchContainer({ children, searchAction }) {
  const { t } = useTranslation();

  let childrenArray = React.Children.toArray(children);
  const [moreSearchOptions, setMoreSearchOptions] = useState(false);

  return (
    <div
      className={[
        styles.search_container,
        styles.expanded,
        moreSearchOptions ? styles.expanded_with_options : "",
      ].join(" ")}
    >
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
                  onClick={() => {
                    searchAction();
                    setMoreSearchOptions(false);
                  }}
                  style={{
                    marginBlockStart: "4px",
                    marginInline: "auto",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "50%",
                  }}
                  className={[
                    generalStyles.button,
                    generalStyles.bg_main,
                    generalStyles.fc_white,
                    generalStyles.block,
                    generalStyles.padding_v_6,
                    generalStyles.padding_h_8,
                  ].join(" ")}
                >
                  {t("search")}
                </button>
              )}
            </div>

            {childrenArray.length > 1 && (
              <div
                style={{
                  marginInline: "4px",
                  marginLeft: "4px",
                  marginRight: "4px",
                }}
              >
                <Icon
                  onclick={() => setMoreSearchOptions(!moreSearchOptions)}
                  icon={() => <VscSettings />}
                />
              </div>
            )}

            {childrenArray.length === 1 && (
              <div
                className={[generalStyles.icon, generalStyles.margin_h_4].join(
                  " "
                )}
                onClick={() => {
                  searchAction();
                  setMoreSearchOptions(false);
                }}
              >
                <button
                  className={[
                    generalStyles.button,
                    generalStyles.bg_secondary,
                    generalStyles.fc_white,
                    generalStyles.block,
                    generalStyles.padding_v_6,
                    generalStyles.padding_h_8,
                  ].join(" ")}
                >
                  {t("search")}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SearchContainer;
