import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import FavoritesCompanies from "../../components/favorites-companies/favorites-companies.component";
import FavoritesItems from "../../components/favorites-items/favorites-items.component";
import MostOrderItems from "../../components/most-order-items/most-order-items.component";
import NewestCompanies from "../../components/newest-companies/newest-companies.component";
import NewestItems from "../../components/newest-items/newest-items.component";
import Loader from "../../components/action-loader/action-loader.component";
import {
  getFavoritesCompanies,
  selectAdvertisements,
} from "../../redux/advertisements/advertisementsSlice";

function SettingsPage() {
  const dispatch = useDispatch();
  const { advertisementStatus, advertisementError } =
    useSelector(selectAdvertisements);

  useEffect(() => {
    dispatch(getFavoritesCompanies({}));
  }, []);
  return (
    <>
      <FavoritesCompanies />
      <NewestCompanies />
      <FavoritesItems />
      <NewestItems />
      <MostOrderItems />

      {advertisementStatus === "loading" && <Loader allowCancel={false} />}
    </>
  );
}

export default SettingsPage;
