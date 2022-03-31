// button component

// Props
// action: handler to execute when click the button
// text: label of the button
// bgColor: button's background color
// tooltip: text to show when hover over the button
// loading: boolean to indicates if the loading icon show or not
// icon

import React, { useState } from "react";
import { Colors } from "../../utils/constants";

// styles
import styles from "./button-with-icon.module.scss";

// constants

function ButtonWithIcon({ action, text, bgColor, icon, smallText }) {
  const [hover, setHover] = useState(false);

  const toggleHover = () => {
    setHover(!hover);
  };

  return (
    <div
      className={styles.button}
      onClick={action}
      style={{
        border: `1px solid ${bgColor}`,
        backgroundColor: hover ? bgColor : Colors.WHITE_COLOR,
        color: hover ? Colors.WHITE_COLOR : bgColor,
      }}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <p>{text}</p>
      {icon && icon()}
    </div>
  );
}

export default ButtonWithIcon;
