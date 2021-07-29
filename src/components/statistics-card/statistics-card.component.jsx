import React from "react";
import { Link } from "react-router-dom";

import styles from "./statistics-card.module.scss";
import generalStyles from "../../style.module.scss";
import rowStyles from "../row.module.scss";

function StatisticsCard({ title, field, type }) {
  return (
    <div className={styles.card}>
      <Link
        className={[
          generalStyles.fc_white,
          rowStyles.hover_underline,
          generalStyles.center,
        ].join(" ")}
        to={{
          pathname: "/admin/statistics/option",
          state: {
            field,
            type,
            title,
          },
        }}
      >
        {title}
      </Link>
    </div>
  );
}

export default StatisticsCard;
