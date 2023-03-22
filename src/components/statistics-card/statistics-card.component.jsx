import React from "react";
import { Link } from "react-router-dom";

// redux stuff
import { useDispatch } from "react-redux";
import {
  setActionType,
  statisticsSliceSignOut,
} from "../../redux/statistics/statisticsSlice";

// styles
import styles from "./statistics-card.module.scss";
import rowStyles from "../row.module.scss";

function StatisticsCard({ title, actionType, backgroundColor }) {
  const dispatch = useDispatch();

  return (
    <div
      className={[styles.card, "flex_center_container"].join(" ")}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <Link
        onClick={() => {
          dispatch(statisticsSliceSignOut());
          dispatch(setActionType(actionType));
        }}
        className={["fc_white", rowStyles.hover_underline, "center"].join(" ")}
        to={{
          pathname: "/admin/statistics/option",
          state: {
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
