import React, { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";

// components
import Loader from "../../components/loader/loader.component";
import AdvertisementHomePage from "../../components/advertisement-home-page/advertisement-home-page.component";
import SectionHomePageFlex from "../../components/section-home-page-flex/section-home-page-flex.component";
import HomePageDescribeSection from "../../components/home-page-describe-section/home-page-describe-section.component";

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
import { SERVER_URL } from "../../utils/constants";

function HomePage({ onSelectedChange }) {
  const dispatch = useDispatch();

  // selectors
  const { user, token } = useSelector(selectUserData);

  const {
    companiesSectionOne,
    companiesSectionOneStatus,
    refresh: companiesOneRefresh,
  } = useSelector(selectCompaniesSectionOne);

  const {
    companiesSectionTwo,
    companiesSectionTwoStatus,
    refresh: companiesTwoRefresh,
  } = useSelector(selectCompaniesSectionTwo);

  const {
    warehousesSectionOne,
    warehousesSectionOneStatus,
    refresh: warehouseOneRefresh,
  } = useSelector(selectWarehousesSectionOne);
  const {
    itemsSectionOne,
    itemsSectionOneStatus,
    refresh: itemsOneRefresh,
  } = useSelector(selectItemsSectionOne);
  const {
    itemsSectionTwo,
    itemsSectionTwoStatus,
    refresh: itemsTwoRefresh,
  } = useSelector(selectItemsSectionTwo);
  const {
    itemsSectionThree,
    itemsSectionThreeStatus,
    refresh: itemsThreeRefresh,
  } = useSelector(selectItemsSectionThree);

  const { advertisements } = useSelector(selectAdvertisements);
  const [backgroundImages, setBackgroundImages] = useState(
    advertisements.map((a) => a.logo_url)[0]
  );
  const { settings } = useSelector(selectSettings);
  const currentImage = useRef(0);

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

    // if (settings.showAdvertisements) {
    //   dispatch(getAllAdvertisements({ token }));
    // }

    const timer = setInterval(() => {
      if (currentImage.current === advertisements.length - 1) {
        currentImage.current = 0;
      } else {
        currentImage.current = currentImage.current + 1;
      }

      setBackgroundImages(
        advertisements.map((a) => a.logo_url)[currentImage.current]
      );
    }, 10000);

    onSelectedChange();

    return () => {
      clearInterval(timer);
    };
  }, [settings]);

  return user ? (
    <div
      style={{
        overflow: "hidden",
        paddingInlineStart: "35px",
      }}
    >
      <div
        className={styles.main_container}
        style={{
          backgroundImage: `url('${SERVER_URL}/images/${backgroundImages}')`,
        }}
      >
        {/* {settings.showAdvertisements && (
          <AdvertisementHomePage data={advertisements} />
        )} */}
        {/* <HomePageDescribeSection
          header="who-we-are"
          describe="who-we-are-describe"
        /> */}
      </div>

      <div className={styles.advertisement_container}>
        {settings.companiesSectionOne.show &&
          (companiesSectionOneStatus === "loading" ? (
            <div
              className={styles.container}
              style={{
                background: "#1a535c",
                order: settings.companiesSectionOne?.order,
              }}
            >
              <Loader color="#fff" />
            </div>
          ) : (
            companiesSectionOne.length > 0 && (
              <SectionHomePageFlex
                data={companiesSectionOne}
                containerBackground="#1a535c"
                headerFlex={settings.companiesSectionOne?.titleRight ? 1 : 2}
                headerBackground="#083137"
                sliderFlex={settings.companiesSectionOne?.titleRight ? 2 : 1}
                header={settings.companiesSectionOne?.title}
                description={settings.companiesSectionOne?.description}
                order={settings.companiesSectionOne?.order}
              />
            )
          ))}

        {settings.companiesSectionTwo.show &&
          (companiesSectionTwoStatus === "loading" ? (
            <div
              className={styles.container}
              style={{
                background: "#6D597A",
                order: settings.companiesSectionTwo?.order,
              }}
            >
              <Loader color="#fff" />
            </div>
          ) : (
            companiesSectionTwo.length > 0 && (
              <SectionHomePageFlex
                data={companiesSectionTwo}
                containerBackground="#6D597A"
                headerFlex={settings.companiesSectionTwo?.titleRight ? 1 : 2}
                headerBackground="#5A4E63"
                sliderFlex={settings.companiesSectionTwo?.titleRight ? 2 : 1}
                header={settings.companiesSectionTwo?.title}
                description={settings.companiesSectionTwo?.description}
                order={settings.companiesSectionTwo?.order}
              />
            )
          ))}

        {settings.warehousesSectionOne.show &&
          (warehousesSectionOneStatus === "loading" ? (
            <div
              className={styles.container}
              style={{
                background: "#0B86B2",
                order: settings.warehousesSectionOne?.order,
              }}
            >
              <Loader color="#fff" />
            </div>
          ) : (
            warehousesSectionOne.length > 0 && (
              <SectionHomePageFlex
                data={warehousesSectionOne}
                containerBackground="#0B86B2"
                headerFlex={settings.warehousesSectionOne?.titleRight ? 1 : 2}
                headerBackground="#205D73"
                sliderFlex={settings.warehousesSectionOne?.titleRight ? 2 : 1}
                header={settings.warehousesSectionOne?.title}
                description={settings.warehousesSectionOne?.description}
                order={settings.warehousesSectionOne?.order}
              />
            )
          ))}

        {settings.itemsSectionOne.show &&
          (itemsSectionOneStatus === "loading" ? (
            <div
              className={styles.container}
              style={{
                background: "#3D5A80",
                order: settings.itemsSectionOne?.order,
              }}
            >
              <Loader color="#fff" />
            </div>
          ) : (
            itemsSectionOne.length > 0 && (
              <SectionHomePageFlex
                data={itemsSectionOne}
                containerBackground="#3D5A80"
                headerFlex={settings.itemsSectionOne?.titleRight ? 1 : 2}
                headerBackground="#374569"
                sliderFlex={settings.itemsSectionOne?.titleRight ? 2 : 1}
                header={settings.itemsSectionOne?.title}
                description={settings.itemsSectionOne?.description}
                order={settings.itemsSectionOne?.order}
              />
            )
          ))}

        {settings.itemsSectionTwo.show &&
          (itemsSectionTwoStatus === "loading" ? (
            <div
              className={styles.container}
              style={{
                background: "#E56B6F",
                order: settings.itemsSectionTwo?.order,
              }}
            >
              <Loader color="#fff" />
            </div>
          ) : (
            itemsSectionTwo.length > 0 && (
              <SectionHomePageFlex
                data={itemsSectionTwo}
                containerBackground="#E56B6F"
                headerFlex={settings.itemsSectionTwo?.titleRight ? 1 : 2}
                headerBackground="#B54A58"
                sliderFlex={settings.itemsSectionTwo?.titleRight ? 2 : 1}
                header={settings.itemsSectionTwo?.title}
                description={settings.itemsSectionTwo?.description}
                order={settings.itemsSectionTwo?.order}
              />
            )
          ))}

        {settings.itemsSectionThree.show &&
          (itemsSectionThreeStatus === "loading" ? (
            <div
              className={styles.container}
              style={{
                background: "#baa437",
                order: settings.itemsSectionThree?.order,
              }}
            >
              <Loader color="#fff" />
            </div>
          ) : (
            itemsSectionThree.length > 0 && (
              <SectionHomePageFlex
                data={itemsSectionThree}
                containerBackground="#baa437"
                headerBackground="#baa437"
                header={settings.itemsSectionThree?.title}
                description={settings.itemsSectionThree?.description}
                order={settings.itemsSectionThree?.order}
              />
            )
          ))}
      </div>
    </div>
  ) : (
    <Redirect to="/signin" />
  );
}

export default HomePage;
