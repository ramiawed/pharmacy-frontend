// card component that can collapsed or expanded by pressing on the header

// props
// headerTitle: text to show in the header section
// children: array of component to show in the body of the card
// type: warning or normal to change to background color of the card

import React, { useState } from "react";

// react icon
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

// context
import { useTheme } from "../../contexts/themeContext";

function CardInfo({ headerTitle, children, type }) {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className={`w-[95%] mx-auto my-3 overflow-hidden rounded-lg border ${
        theme === "light" ? "border-dark" : "border-color-primary-300"
      }`}
    >
      <div
        onClick={() => setExpanded(!expanded)}
        className={`py-2 px-3 flex justify-between items-center ${
          theme === "light" ? "bg-dark text-white" : "d-mixed300-primary300"
        } ${type === "warning" ? "!bg-red !text-white" : ""}`}
      >
        <p className="bold text-lg">{headerTitle}</p>
        <label onClick={() => setExpanded(!expanded)}>
          {expanded ? (
            <BsFillCaretUpFill size={24} />
          ) : (
            <BsFillCaretDownFill size={24} />
          )}
        </label>
      </div>
      {expanded && <div>{children}</div>}
    </div>
  );
}

export default CardInfo;
