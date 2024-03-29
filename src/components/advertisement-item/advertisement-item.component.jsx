import React from "react";
import { useHistory } from "react-router-dom";
import Logo from "../../assets/transparent_logo.png";

// components

// redux-stuff
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser } from "../../redux/auth/authSlice";
import { addStatistics } from "../../redux/statistics/statisticsSlice";

// styles
import styles from "./advertisement-item.module.scss";

// constants and utils
import { SERVER_URL, UserTypeConstants } from "../../utils/constants";

function AdvertisementItem({ item }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const dispatchStatisticsHandler = () => {
    if (
      user.type === UserTypeConstants.PHARMACY ||
      user.type === UserTypeConstants.GUEST
    ) {
      dispatch(
        addStatistics({
          obj: {
            sourceUser: user._id,
            targetItem: item._id,
            action: "item-added-to-favorite",
          },
          token,
        })
      );
    }
  };

  return (
    <div
      className={styles.partner_container}
      onClick={() => {
        dispatchStatisticsHandler();
        history.push("/item", {
          from: user.type,
          type: "info",
          allowAction: false,

          itemId: item._id,
          companyId: item.company._id,
          warehouseId:
            user.type === UserTypeConstants.WAREHOUSE ? user._id : null,
        });
      }}
    >
      <div className={styles.logo_div}>
        {item.logo_url && item.logo_url !== "" ? (
          <img
            src={`${SERVER_URL}/items/${item.logo_url}`}
            className={styles.logo}
            alt="thumb"
          />
        ) : (
          <img src={Logo} className={styles.logo} alt="thumb" />
        )}
      </div>

      <div>
        <label className={styles.content}>{item.name}</label>
      </div>
    </div>
  );
}

export default AdvertisementItem;
