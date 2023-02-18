import { unwrapResult } from "@reduxjs/toolkit";
import {
  addCompanyToOurCompanies,
  removeCompanyFromOurCompanies,
} from "../redux/auth/authSlice";
import { addFavorite, removeFavorite } from "../redux/favorites/favoritesSlice";
import {
  resetMedicines,
  setSearchCompanyId,
  setSearchWarehouseId,
} from "../redux/medicines/medicinesSlices";
import { changeOnlineMsg } from "../redux/online/onlineSlice";
import { addStatistics } from "../redux/statistics/statisticsSlice";

import axios from "axios";

// constants
import { BASEURL, UserTypeConstants } from "./constants";

export const addPartnerToFavoriteHandler = (
  partner,
  isOnline,
  dispatch,
  token,
  user
) => {
  // check the internet connection
  if (!isOnline) {
    dispatch(changeOnlineMsg());
    return;
  }

  dispatch(addFavorite({ obj: { favoriteId: partner._id }, token }))
    .then(unwrapResult)
    .then(() => {
      dispatch(
        addStatistics({
          obj: {
            sourceUser: user._id,
            targetUser: partner._id,
            action: "user-added-to-favorite",
          },
          token,
        })
      );
    })
    .catch(() => {});
};

export const addCompanyToOurCompaniesHandler = (
  partner,
  isOnline,
  dispatch,
  token
) => {
  // check the internet connection
  if (!isOnline) {
    dispatch(changeOnlineMsg());
    return;
  }

  dispatch(addCompanyToOurCompanies({ companyId: partner._id, token }))
    .then(unwrapResult)
    .then(() => {})
    .catch(() => {});
};

export const removeCompanyFromOurCompaniesHandler = (
  partner,
  isOnline,
  dispatch,
  token
) => {
  // check the internet connection
  if (!isOnline) {
    dispatch(changeOnlineMsg());
    return;
  }

  dispatch(removeCompanyFromOurCompanies({ companyId: partner._id, token }))
    .then(unwrapResult)
    .then(() => {})
    .catch(() => {});
};

export const removePartnerFromFavoriteHandler = (
  partner,
  isOnline,
  dispatch,
  token
) => {
  // check the internet connection
  if (!isOnline) {
    dispatch(changeOnlineMsg());
    return;
  }

  dispatch(removeFavorite({ obj: { favoriteId: partner._id }, token }))
    .then(unwrapResult)
    .then(() => {})
    .catch(() => {});
};

export const partnerRowClickHandler = (
  partner,
  allowShowingWarehouseMedicines,
  user,
  dispatch,
  token,
  history
) => {
  // if (onSelectAction) {
  //   onSelectAction();
  // }

  if (
    partner.type === UserTypeConstants.WAREHOUSE &&
    (user.type === UserTypeConstants.WAREHOUSE ||
      user.type === UserTypeConstants.COMPANY ||
      user.type === UserTypeConstants.GUEST)
  ) {
    return;
  }

  if (allowShowingWarehouseMedicines) {
    // if the partner type is pharmacy or normal, change the selectedCount
    // and selectedDates for this company
    if (user.type === UserTypeConstants.PHARMACY) {
      dispatch(
        addStatistics({
          obj: {
            sourceUser: user._id,
            targetUser: partner._id,
            action: "choose-company",
          },
          token,
        })
      );
    }
    dispatch(resetMedicines());

    if (partner.type === UserTypeConstants.COMPANY) {
      dispatch(setSearchCompanyId(partner._id));
    }

    if (partner.type === UserTypeConstants.WAREHOUSE) {
      dispatch(setSearchWarehouseId(partner._id));
    }

    history.push({
      pathname: "/medicines",
      state: { myCompanies: partner.ourCompanies },
    });
  }
};

export const deleteImage = async (obj, token) => {
  if (obj) {
    const response = await axios.post(`${BASEURL}/users/delete-image`, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};
