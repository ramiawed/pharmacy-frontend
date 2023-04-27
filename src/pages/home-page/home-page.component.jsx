import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

// components
import AdvertisementSideNav from "../../components/advertisement-side-nav/advertisement-side-nav.component";
import AdvertisementsHomePage from "../../components/advertisements-home-page/advertisements-home-page.component";
import IntroduceUs from "../../components/introduce-us/introduce-us.component";
import SectionsIntroduce from "../../components/pharmacy-introduce/sections-introduce.component";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";
import { selectSettings } from "../../redux/settings/settingsSlice";
import {
  getCompaniesSectionOne,
  selectCompaniesSectionOne,
} from "../../redux/advertisements/companiesSectionOneSlice";
import {
  getCompaniesSectionTwo,
  selectCompaniesSectionTwo,
} from "../../redux/advertisements/companiesSectionTwoSlice";
import {
  getWarehousesSectionOne,
  selectWarehousesSectionOne,
} from "../../redux/advertisements/warehousesSectionOneSlice";
import {
  getItemsSectionOne,
  selectItemsSectionOne,
} from "../../redux/advertisements/itemsSectionOneSlice";
import {
  getItemsSectionTwo,
  selectItemsSectionTwo,
} from "../../redux/advertisements/itemsSectionTwoSlice";
import {
  getItemsSectionThree,
  selectItemsSectionThree,
} from "../../redux/advertisements/itemsSectionThreeSlice";
import { selectAdvertisements } from "../../redux/advertisements/advertisementsSlice";

function HomePage({ onSelectedChange }) {
  const dispatch = useDispatch();
  const [showCompaniesSectionOneSideNav, setShowCompaniesSectionOneSideNav] =
    useState(false);
  const [showCompaniesSectionTwoSideNav, setShowCompaniesSectionTwoSideNav] =
    useState(false);
  const [showWarehouseSectionOneSideNav, setShowWarehouseSectionOneSideNav] =
    useState(false);
  const [showItemsSectionOneSideNav, setShowItemsSectionOneSideNav] =
    useState(false);
  const [showItemsSectionTwoSideNav, setShowItemsSectionTwoSideNav] =
    useState(false);
  const [showItemsSectionThreeSideNav, setShowItemsSectionThreeSideNav] =
    useState(false);

  // selectors
  const { user, token } = useSelector(selectUserData);

  const { companiesSectionOne, refresh: companiesOneRefresh } = useSelector(
    selectCompaniesSectionOne
  );

  const { companiesSectionTwo, refresh: companiesTwoRefresh } = useSelector(
    selectCompaniesSectionTwo
  );

  const { warehousesSectionOne, refresh: warehouseOneRefresh } = useSelector(
    selectWarehousesSectionOne
  );
  const { itemsSectionOne, refresh: itemsOneRefresh } = useSelector(
    selectItemsSectionOne
  );
  const { itemsSectionTwo, refresh: itemsTwoRefresh } = useSelector(
    selectItemsSectionTwo
  );
  const { itemsSectionThree, refresh: itemsThreeRefresh } = useSelector(
    selectItemsSectionThree
  );

  const { advertisements } = useSelector(selectAdvertisements);
  const { settings } = useSelector(selectSettings);

  useEffect(() => {
    if (settings.companiesSectionOne.show && companiesOneRefresh)
      dispatch(getCompaniesSectionOne({ token }));

    if (settings.companiesSectionTwo.show && companiesTwoRefresh)
      dispatch(getCompaniesSectionTwo({ token }));

    if (settings.warehousesSectionOne.show && warehouseOneRefresh)
      dispatch(getWarehousesSectionOne({ token }));

    if (settings.itemsSectionOne.show && itemsOneRefresh)
      dispatch(getItemsSectionOne({ token }));

    if (settings.itemsSectionTwo.show && itemsTwoRefresh)
      dispatch(getItemsSectionTwo({ token }));

    if (settings.itemsSectionThree.show && itemsThreeRefresh)
      dispatch(getItemsSectionThree({ token }));

    onSelectedChange();
  }, [settings]);

  const showCompaniesSectionOneSideNavHandler = () => {
    setShowCompaniesSectionOneSideNav(true);
    setShowCompaniesSectionTwoSideNav(false);
    setShowWarehouseSectionOneSideNav(false);
    setShowItemsSectionOneSideNav(false);
    setShowItemsSectionTwoSideNav(false);
    setShowItemsSectionThreeSideNav(false);
  };

  const showCompaniesSectionTwoSideNavHandler = () => {
    setShowCompaniesSectionOneSideNav(false);
    setShowCompaniesSectionTwoSideNav(true);
    setShowWarehouseSectionOneSideNav(false);
    setShowItemsSectionOneSideNav(false);
    setShowItemsSectionTwoSideNav(false);
    setShowItemsSectionThreeSideNav(false);
  };

  const showWarehouseSectionOneSideNavHandler = () => {
    setShowCompaniesSectionOneSideNav(false);
    setShowCompaniesSectionTwoSideNav(false);
    setShowWarehouseSectionOneSideNav(true);
    setShowItemsSectionOneSideNav(false);
    setShowItemsSectionTwoSideNav(false);
    setShowItemsSectionThreeSideNav(false);
  };

  const showItemsSectionOneSideNavHandler = () => {
    setShowCompaniesSectionOneSideNav(false);
    setShowCompaniesSectionTwoSideNav(false);
    setShowWarehouseSectionOneSideNav(false);
    setShowItemsSectionOneSideNav(true);
    setShowItemsSectionTwoSideNav(false);
    setShowItemsSectionThreeSideNav(false);
  };

  const showItemsSectionTwoSideNavHandler = () => {
    setShowCompaniesSectionOneSideNav(false);
    setShowCompaniesSectionTwoSideNav(false);
    setShowWarehouseSectionOneSideNav(false);
    setShowItemsSectionOneSideNav(false);
    setShowItemsSectionTwoSideNav(true);
    setShowItemsSectionThreeSideNav(false);
  };

  const showItemsSectionThreeSideNavHandler = () => {
    setShowCompaniesSectionOneSideNav(false);
    setShowCompaniesSectionTwoSideNav(false);
    setShowWarehouseSectionOneSideNav(false);
    setShowItemsSectionOneSideNav(false);
    setShowItemsSectionTwoSideNav(false);
    setShowItemsSectionThreeSideNav(true);
  };

  return user ? (
    <div
      style={{
        overflow: "hidden",
        paddingInlineStart: "35px",
        position: "relative",
      }}
    >
      {advertisements.length > 0 && (
        <AdvertisementsHomePage advertisements={advertisements} />
      )}

      <IntroduceUs />

      <SectionsIntroduce />

      {showCompaniesSectionOneSideNav && (
        <AdvertisementSideNav
          header={settings.companiesSectionOne.title}
          description={settings.companiesSectionOne.description}
          data={companiesSectionOne}
          closeAction={() => {
            setShowCompaniesSectionOneSideNav(false);
          }}
          type="partner"
        />
      )}

      {showCompaniesSectionTwoSideNav && (
        <AdvertisementSideNav
          header={settings.companiesSectionTwo.title}
          description={settings.companiesSectionTwo.description}
          data={companiesSectionTwo}
          closeAction={() => {
            setShowCompaniesSectionTwoSideNav(false);
          }}
          type="partner"
        />
      )}

      {showWarehouseSectionOneSideNav && (
        <AdvertisementSideNav
          header={settings.warehousesSectionOne.title}
          description={settings.warehousesSectionOne.description}
          data={warehousesSectionOne}
          closeAction={() => {
            setShowWarehouseSectionOneSideNav(false);
          }}
          type="partner"
        />
      )}

      {showItemsSectionOneSideNav && (
        <AdvertisementSideNav
          header={settings.itemsSectionOne.title}
          description={settings.itemsSectionOne.description}
          data={itemsSectionOne}
          closeAction={() => {
            setShowItemsSectionOneSideNav(false);
          }}
          type="item"
        />
      )}

      {showItemsSectionTwoSideNav && (
        <AdvertisementSideNav
          header={settings.itemsSectionTwo.title}
          description={settings.itemsSectionTwo.description}
          data={itemsSectionTwo}
          closeAction={() => {
            setShowItemsSectionTwoSideNav(false);
          }}
          type="item"
        />
      )}

      {showItemsSectionThreeSideNav && (
        <AdvertisementSideNav
          header={settings.itemsSectionThree.title}
          description={settings.itemsSectionThree.description}
          data={itemsSectionThree}
          closeAction={() => {
            setShowItemsSectionThreeSideNav(false);
          }}
          type="item"
        />
      )}
    </div>
  ) : (
    <Redirect to="/signin" />
  );
}

export default HomePage;
