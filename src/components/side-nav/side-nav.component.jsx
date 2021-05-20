import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// styles
import styles from "./side-nav.module.scss";

function SideNav() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div
      className={[
        styles.side_nav_container,
        `${collapsed ? styles.collapsed : styles.showed}`,
      ].join(" ")}
    >
      <button onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? (
          <FaChevronLeft
            className={[
              styles.icon,
              `${collapsed ? styles.icon_collapsed : styles.icon_showed}`,
            ].join(" ")}
          />
        ) : (
          <FaChevronRight
            className={[
              styles.icon,
              `${collapsed ? styles.icon_collapsed : styles.icon_showed}`,
            ].join(" ")}
          />
        )}
      </button>
    </div>
  );
}

export default SideNav;
