import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// react-icons
import { FaFilter, FaSearch } from "react-icons/fa";

// context
import { useTheme } from "../../contexts/themeContext";

function SearchContainer({ children, searchAction, searchEngineAlert }) {
  const { theme } = useTheme();
  const { t } = useTranslation();

  let childrenArray = React.Children.toArray(children);
  const [moreSearchOptions, setMoreSearchOptions] = useState(false);

  return (
    <div
      className={`${
        theme === "light"
          ? "bg-gray-50 border-b-[1px] border-light_grey"
          : "d-mixed300-primary300"
      }
       flex flex-row justify-around items-start sticky p-2 top-[74px] z-10 overflow-x-scroll`}
    >
      {/* border-b-[1px] border-color-surface-500 */}
      <div className="flex flex-col justify-start flex-1">
        {childrenArray[0]}
        {moreSearchOptions && childrenArray.length > 1
          ? childrenArray.map((child, index) => {
              if (index > 0) return child;
              return null;
            })
          : null}

        {moreSearchOptions && searchAction && (
          <button
            className=""
            onClick={() => {
              searchAction();
              setMoreSearchOptions(false);
            }}
          >
            {t("search")}
          </button>
        )}
      </div>

      <div className="flex items-center justify-center ms-1">
        {childrenArray.length > 1 ? (
          <div
            className={`h-9 w-7 flex items-center justify-center cursor-pointer relative ${
              theme === "light" ? "text-dark" : "text-color-primary-500"
            }`}
          >
            <FaFilter
              size={24}
              onClick={() => setMoreSearchOptions(!moreSearchOptions)}
            />
            {searchEngineAlert && (
              <div className="absolute top-0 end-0 w-3 h-3 rounded-full bg-red"></div>
            )}
          </div>
        ) : searchAction ? (
          <div
            className={`h-9 w-7 flex items-center justify-center cursor-pointer relative ${
              theme === "light" ? "text-dark" : "text-color-primary-500"
            }`}
          >
            <FaSearch
              size={24}
              onClick={() => {
                searchAction();
                setMoreSearchOptions(false);
              }}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default SearchContainer;
