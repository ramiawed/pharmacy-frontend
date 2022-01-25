import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

// components
import SectionHomePage from "../../components/section-home-page/section-home-page.component";
import Loader from "../../components/loader/loader.component";
import SearchHome from "../../components/search-home/search-home.component";
import AdvertisementHomePage from "../../components/advertisement-home-page/advertisement-home-page.component";
import SectionHomePageFlex from "../../components/section-home-page-flex/section-home-page-flex.component";

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

import {
  getAllAdvertisements,
  selectAdvertisements,
} from "../../redux/advertisements/advertisementsSlice";

// styles
import styles from "./home-page.module.scss";

function HomePage({ onSelectedChange }) {
  const dispatch = useDispatch();

  // selectors
  const { user, token } = useSelector(selectUserData);

  const { companiesSectionOne, companiesSectionOneStatus } = useSelector(
    selectCompaniesSectionOne
  );
  const { companiesSectionTwo, companiesSectionTwoStatus } = useSelector(
    selectCompaniesSectionTwo
  );
  const { warehousesSectionOne, warehousesSectionOneStatus } = useSelector(
    selectWarehousesSectionOne
  );
  const { itemsSectionOne, itemsSectionOneStatus } = useSelector(
    selectItemsSectionOne
  );
  const { itemsSectionTwo, itemsSectionTwoStatus } = useSelector(
    selectItemsSectionTwo
  );
  const { itemsSectionThree, itemsSectionThreeStatus } = useSelector(
    selectItemsSectionThree
  );

  const { advertisements } = useSelector(selectAdvertisements);
  const { settings } = useSelector(selectSettings);

  useEffect(() => {
    if (settings.companiesSectionOne.show)
      dispatch(getCompaniesSectionOne({ token }));

    if (settings.companiesSectionTwo.show)
      dispatch(getCompaniesSectionTwo({ token }));

    if (settings.warehousesSectionOne.show)
      dispatch(getWarehousesSectionOne({ token }));

    if (settings.itemsSectionOne.show) dispatch(getItemsSectionOne({ token }));

    if (settings.itemsSectionTwo.show) dispatch(getItemsSectionTwo({ token }));

    if (settings.itemsSectionThree.show)
      dispatch(getItemsSectionThree({ token }));
    dispatch(getAllAdvertisements({ token }));

    onSelectedChange();
  }, []);

  return user ? (
    <div>
      <SearchHome />

      {settings.showAdvertisements && (
        <AdvertisementHomePage data={advertisements} />
      )}

      <div className={styles.advertisement_container}>
        {settings.companiesSectionOne.show &&
          companiesSectionOneStatus === "loading" && (
            <div
              className={styles.container}
              style={{
                background: "#1a535c",
                order: settings.companiesSectionOne?.order,
              }}
            >
              <Loader color="#fff" />
            </div>
          )}

        {/* {settings.companiesSectionOne.show &&
          companiesSectionOne.length > 0 && (
            <SectionHomePage
              data={companiesSectionOne}
              containerBackground="#1a535c"
              headerFlex={settings.companiesSectionOne?.titleRight ? 1 : 2}
              headerBackground="#083137"
              sliderFlex={settings.companiesSectionOne?.titleRight ? 2 : 1}
              header={settings.companiesSectionOne?.title}
              description={settings.companiesSectionOne?.description}
              order={settings.companiesSectionOne?.order}
            />
          )} */}

        {settings.companiesSectionOne.show &&
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
          )}

        {settings.companiesSectionTwo.show &&
          companiesSectionTwoStatus === "loading" && (
            <div
              className={styles.container}
              style={{
                background: "#6D597A",
                order: settings.companiesSectionTwo.order,
              }}
            >
              <Loader color="#fff" />
            </div>
          )}

        {/* {settings.companiesSectionTwo?.show &&
          companiesSectionTwo.length > 0 && (
            <SectionHomePage
              data={companiesSectionTwo}
              containerBackground="#6D597A"
              headerFlex={settings.companiesSectionTwo?.titleRight ? 1 : 2}
              headerBackground="#5A4E63"
              sliderFlex={settings.companiesSectionTwo?.titleRight ? 2 : 1}
              header={settings.companiesSectionTwo?.title}
              description={settings.companiesSectionTwo?.description}
              order={settings.companiesSectionTwo?.order}
            />
          )} */}

        {settings.companiesSectionTwo?.show &&
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
          )}

        {settings.companiesSectionOne?.show &&
          warehousesSectionOneStatus === "loading" && (
            <div
              className={styles.container}
              style={{
                background: "#0B86B2",
                order: settings.companiesSectionOne?.order,
              }}
            >
              <Loader color="#fff" />
            </div>
          )}

        {/* {settings.warehousesSectionOne?.show &&
          warehousesSectionOne.length > 0 && (
            <SectionHomePage
              data={warehousesSectionOne}
              containerBackground="#0B86B2"
              headerFlex={settings.warehousesSectionOne?.titleRight ? 1 : 2}
              headerBackground="#205D73"
              sliderFlex={settings.warehousesSectionOne?.titleRight ? 2 : 1}
              header={settings.warehousesSectionOne?.title}
              description={settings.warehousesSectionOne?.description}
              order={settings.warehousesSectionOne?.order}
            />
          )} */}

        {settings.warehousesSectionOne?.show &&
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
          )}

        {settings.itemsSectionOne?.show && itemsSectionOneStatus === "loading" && (
          <div
            className={styles.container}
            style={{
              background: "#3D5A80",
              order: settings.itemsSectionOne?.order,
            }}
          >
            <Loader color="#fff" />
          </div>
        )}

        {/* {settings.itemsSectionOne?.show && itemsSectionOne.length > 0 && (
          <SectionHomePage
            data={itemsSectionOne}
            containerBackground="#3D5A80"
            headerFlex={settings.itemsSectionOne?.titleRight ? 1 : 2}
            headerBackground="#374569"
            sliderFlex={settings.itemsSectionOne?.titleRight ? 2 : 1}
            header={settings.itemsSectionOne?.title}
            description={settings.itemsSectionOne?.description}
            order={settings.itemsSectionOne?.order}
            type="item"
          />
        )} */}

        {settings.itemsSectionOne?.show && itemsSectionOne.length > 0 && (
          <SectionHomePageFlex
            data={itemsSectionOne}
            containerBackground="#3D5A80"
            headerFlex={settings.itemsSectionOne?.titleRight ? 1 : 2}
            headerBackground="#374569"
            sliderFlex={settings.itemsSectionOne?.titleRight ? 2 : 1}
            header={settings.itemsSectionOne?.title}
            description={settings.itemsSectionOne?.description}
            order={settings.itemsSectionOne?.order}
            type="item"
          />
        )}

        {settings.itemsSectionTwo?.show && itemsSectionTwoStatus === "loading" && (
          <div
            className={styles.container}
            style={{
              background: "#E56B6F",
              order: settings.itemsSectionTwo?.order,
            }}
          >
            <Loader color="#fff" />
          </div>
        )}

        {/* {settings.itemsSectionTwo?.show && itemsSectionTwo.length > 0 && (
          <SectionHomePage
            data={itemsSectionTwo}
            containerBackground="#E56B6F"
            headerFlex={settings.itemsSectionTwo?.titleRight ? 1 : 2}
            headerBackground="#B54A58"
            sliderFlex={settings.itemsSectionTwo?.titleRight ? 2 : 1}
            header={settings.itemsSectionTwo?.title}
            description={settings.itemsSectionTwo?.description}
            order={settings.itemsSectionTwo?.order}
            type="item"
          />
        )} */}

        {settings.itemsSectionTwo?.show && itemsSectionTwo.length > 0 && (
          <SectionHomePageFlex
            data={itemsSectionTwo}
            containerBackground="#E56B6F"
            headerFlex={settings.itemsSectionTwo?.titleRight ? 1 : 2}
            headerBackground="#B54A58"
            sliderFlex={settings.itemsSectionTwo?.titleRight ? 2 : 1}
            header={settings.itemsSectionTwo?.title}
            description={settings.itemsSectionTwo?.description}
            order={settings.itemsSectionTwo?.order}
            type="item"
          />
        )}

        {settings.itemsSectionThree?.show &&
          itemsSectionThreeStatus === "loading" && (
            <div
              className={styles.container}
              style={{
                background: "#ffe66d",
                order: settings.itemsSectionThree?.order,
              }}
            >
              <Loader color="#fff" />
            </div>
          )}

        {/* {settings.itemsSectionThree?.show && itemsSectionThree.length > 0 && (
          <SectionHomePage
            data={itemsSectionThree}
            containerBackground="#ffe66d"
            headerFlex={settings.itemsSectionThree?.titleRight ? 1 : 2}
            headerBackground="#baa437"
            sliderFlex={settings.itemsSectionThree?.titleRight ? 2 : 1}
            header={settings.itemsSectionThree?.title}
            description={settings.itemsSectionThree?.description}
            order={settings.itemsSectionThree?.order}
            type="item"
          />
        )} */}

        {settings.itemsSectionThree?.show && itemsSectionThree.length > 0 && (
          <SectionHomePageFlex
            data={itemsSectionThree}
            containerBackground="#baa46d"
            headerFlex={settings.itemsSectionThree?.titleRight ? 1 : 2}
            headerBackground="#baa437"
            sliderFlex={settings.itemsSectionThree?.titleRight ? 2 : 1}
            header={settings.itemsSectionThree?.title}
            description={settings.itemsSectionThree?.description}
            order={settings.itemsSectionThree?.order}
            type="item"
          />
        )}
      </div>
    </div>
  ) : (
    <Redirect to="/signin" />
  );
}

export default HomePage;
