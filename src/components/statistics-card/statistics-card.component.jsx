import React from "react";
import { Link } from "react-router-dom";

import styles from "./statistics-card.module.scss";
import generalStyles from "../../style.module.scss";
import rowStyles from "../row.module.scss";
import { useDispatch } from "react-redux";
import { statisticsSliceSignOut } from "../../redux/statistics/statisticsSlice";

function StatisticsCard({ title, field, type }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.card}>
      <Link
        onClick={() => {
          dispatch(statisticsSliceSignOut());
        }}
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
