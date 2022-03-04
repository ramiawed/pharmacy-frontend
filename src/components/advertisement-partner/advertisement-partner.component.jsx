import React from "react";
import { Link } from "react-router-dom";
import DefaultLogo from "../../logo01.png";

// components

// react icons

// redux-stuff
import { useDispatch, useSelector } from "react-redux";

import { selectToken, selectUser } from "../../redux/auth/authSlice";
import {
  addStatistics,
  statisticsCompanySelected,
} from "../../redux/statistics/statisticsSlice";
import {
  resetMedicines,
  setSearchCompanyName,
  setSearchWarehouseName,
} from "../../redux/medicines/medicinesSlices";

// styles
import styles from "./advertisement-partner.module.scss";

// constants and utils
import { SERVER_URL, UserTypeConstants } from "../../utils/constants.js";

function AdvertisementPartner({ user, contentColor }) {
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
        statisticsCompanySelected({
          obj: { companyId: user._id },
          token,
        })
      );
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
    <div className={styles.partner_container}>
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

      <Link
        className={styles.content}
        style={{
          color: contentColor,
        }}
        onClick={dispatchCompanySelectedHandler}
        to={{
          pathname: `/medicines`,
          state: {
            companyId:
              user.type === UserTypeConstants.COMPANY ? user._id : null,
            warehouseId:
              user.type === UserTypeConstants.WAREHOUSE ? user._id : null,
          },
        }}
      >
        {user.name}
      </Link>
    </div>
  );
}

export default AdvertisementPartner;
