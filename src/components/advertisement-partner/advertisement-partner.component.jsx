import React from "react";
import { useHistory } from "react-router-dom";
import DefaultLogo from "../../logo.png";

// redux-stuff
import { useDispatch, useSelector } from "react-redux";

import { selectToken, selectUser } from "../../redux/auth/authSlice";
import { addStatistics } from "../../redux/statistics/statisticsSlice";
import {
  resetMedicines,
  setSearchCompanyName,
  setSearchWarehouseName,
} from "../../redux/medicines/medicinesSlices";

// styles
import styles from "./advertisement-partner.module.scss";

// constants and utils
import { SERVER_URL, UserTypeConstants } from "../../utils/constants.js";

function AdvertisementPartner({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const token = useSelector(selectToken);
  const loggedUser = useSelector(selectUser);

  const dispatchCompanySelectedHandler = () => {
    // if the user type is pharmacy or normal, change the selectedCount
    // and selectedDates for this company
    if (
      (loggedUser.type === UserTypeConstants.PHARMACY ||
        loggedUser.type === UserTypeConstants.GUEST) &&
      user.type === UserTypeConstants.COMPANY
    ) {
      dispatch(
        addStatistics({
          obj: {
            sourceUser: loggedUser._id,
            targetUser: user._id,
            action: "choose-company",
          },
          token,
        })
      );
    }

    dispatch(resetMedicines());
    if (user.type === UserTypeConstants.COMPANY) {
      dispatch(setSearchCompanyName(user.name));
    }

    if (user.type === UserTypeConstants.WAREHOUSE) {
      dispatch(setSearchWarehouseName(user.name));
    }
  };

  return (
    <div
      className={styles.partner_container}
      onClick={() => {
        dispatchCompanySelectedHandler();
        history.push("/medicines", {
          companyId: user.type === UserTypeConstants.COMPANY ? user._id : null,
          warehouseId:
            user.type === UserTypeConstants.WAREHOUSE ? user._id : null,
        });
      }}
    >
      <div className={styles.logo_div}>
        <img
          src={
            user.logo_url.length > 0
              ? `${SERVER_URL}profiles/${user.logo_url}`
              : `${DefaultLogo}`
          }
          alt="thumb"
        />
      </div>

      <label className={styles.content}>{user.name}</label>
    </div>
  );
}

export default AdvertisementPartner;
