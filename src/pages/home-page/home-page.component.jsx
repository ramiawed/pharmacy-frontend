import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";

// components
import AdvertisementSideNav from "../../components/advertisement-side-nav/advertisement-side-nav.component";
import AdvertisementsHomePage from "../../components/advertisements-home-page/advertisements-home-page.component";
import IntroduceUs from "../../components/introduce-us/introduce-us.component";
import SectionsIntroduce from "../../components/pharmacy-introduce/sections-introduce.component";

// icons
import { GiMedicinePills, GiMedicines } from "react-icons/gi";
import { RiMedicineBottleFill } from "react-icons/ri";
import { FaWarehouse } from "react-icons/fa";
import { AiFillGolden, AiFillProfile } from "react-icons/ai";

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

// styles
import styles from "./home-page.module.scss";

// constants
import { AdditionalColors } from "../../utils/constants";

function HomePage({ onSelectedChange }) {
  const { t } = useTranslation();
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
      <div className={styles.favorite_nav}>
        {settings.companiesSectionOne.show && (
          <div
            className={styles.favorite_nav_icon}
            style={{
              backgroundColor: AdditionalColors[0],
            }}
            onClick={showCompaniesSectionOneSideNavHandler}
          >
            <AiFillGolden size={24} />
            <p className={styles.favorite_nav_tooltip}>
              {t(settings.companiesSectionOne?.title)}
            </p>
          </div>
        )}

        {settings.companiesSectionTwo.show && (
          <div
            className={styles.favorite_nav_icon}
            style={{
              backgroundColor: AdditionalColors[1],
            }}
            onClick={showCompaniesSectionTwoSideNavHandler}
          >
            <AiFillProfile size={24} />
            <p className={styles.favorite_nav_tooltip}>
              {t(settings.companiesSectionTwo?.title)}
            </p>
          </div>
        )}

        {settings.warehousesSectionOne.show && (
          <div
            className={styles.favorite_nav_icon}
            style={{
              backgroundColor: AdditionalColors[2],
            }}
            onClick={showWarehouseSectionOneSideNavHandler}
          >
            <FaWarehouse size={24} />
            <p className={styles.favorite_nav_tooltip}>
              {t(settings.warehousesSectionOne?.title)}
            </p>
          </div>
        )}

        {settings.itemsSectionOne.show && (
          <div
            className={styles.favorite_nav_icon}
            style={{
              backgroundColor: AdditionalColors[3],
            }}
            onClick={showItemsSectionOneSideNavHandler}
          >
            <GiMedicinePills size={24} />
            <p className={styles.favorite_nav_tooltip}>
              {t(settings.itemsSectionOne?.title)}
            </p>
          </div>
        )}

        {settings.itemsSectionTwo.show && (
          <div
            className={styles.favorite_nav_icon}
            style={{
              backgroundColor: AdditionalColors[4],
            }}
            onClick={showItemsSectionTwoSideNavHandler}
          >
            <GiMedicines size={24} />
            <p className={styles.favorite_nav_tooltip}>
              {t(settings.itemsSectionTwo?.title)}
            </p>
          </div>
        )}

        {settings.itemsSectionThree.show && (
          <div
            className={styles.favorite_nav_icon}
            style={{
              backgroundColor: AdditionalColors[5],
            }}
            onClick={showItemsSectionThreeSideNavHandler}
          >
            <RiMedicineBottleFill size={24} />
            <p className={styles.favorite_nav_tooltip}>
              {t(settings.itemsSectionThree?.title)}
            </p>
          </div>
        )}
      </div>

      <div className={styles.header_adv_div}>
        {/* <div className={styles.header_with_slogn_container}>
          <HeaderWithSlogn bgColor={Colors.LIGHT_GREY_COLOR} />
        </div> */}
        <AdvertisementsHomePage advertisements={advertisements} />
      </div>

      <IntroduceUs />
      <SectionsIntroduce />
      {/* <WarehouseIntroduce /> */}
      {/* <GuestIntroduce /> */}

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
