import React, { useEffect, useState, lazy, Suspense, useCallback } from "react";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "react-error-boundary";

// redux stuff
import { resetStatus, selectUserData } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../../redux/favorites/favoritesSlice";
import { getUnreadNotification } from "../../redux/userNotifications/userNotificationsSlice";
import { selectSettings } from "../../redux/settings/settingsSlice";
import { getUnreadOrders } from "../../redux/orders/ordersSlice";
import {
  changeNavSettings,
  selectNavigationSlice,
} from "../../redux/navs/navigationSlice";
import { selectAdvertisements } from "../../redux/advertisements/advertisementsSlice";
import { getSavedItems } from "../../redux/savedItems/savedItemsSlice";

// components
import TopNav from "../../components/top-nav/top-nav.component";
import SideNav from "../../components/side-nav/side-nav.component";
import Footer from "../../components/footer/footer.component";
import ErrorFallback from "../../components/error-fall-back/error-fall-back.component";
import HomePageLoader from "../../components/home-page-loader/home-page-loader.component";
import SocketObserver from "../../components/socket-orbserver/socket-observer.component";

// react-icons
import { GiHamburgerMenu } from "react-icons/gi";
import { FaArrowAltCircleUp } from "react-icons/fa";

// style
import styles from "./main-page.module.scss";

// constants
import { UserTypeConstants } from "../../utils/constants";

const CompanyRoutes = lazy(() =>
  import("../../routes/company-routes/company-routes.component")
);
const WarehouseRoutes = lazy(() =>
  import("../../routes/warehouse-routes/warehouse-routes.component")
);
const GuestRoutes = lazy(() =>
  import("../../routes/guest-routes/guest-routes.component")
);
const PharmacyRoutes = lazy(() =>
  import("../../routes/pharmacy-routes/pharmacy-routes.component")
);
const AdminRoutes = lazy(() =>
  import("../../routes/admin-routes/admin-routes.component")
);

// MainPage
// you have to sign in first
function MainPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  // selectors
  // get the user and the token from redux-store-auth
  const { user, token } = useSelector(selectUserData);
  const { status: settingsStatus } = useSelector(selectSettings);

  const [toTopVisible, setToTopVisible] = useState(false);

  const {
    setting: {
      selectedTopNavOption,
      collapsedSideNavOption,
      selectedSideNavOption,
      showTopNav,
      showSearchBar,
    },
  } = useSelector(selectNavigationSlice);
  const { status: advertisementsStatus } = useSelector(selectAdvertisements);

  const dispatchProperties = useCallback(() => {
    if (user) {
      dispatch(resetStatus());
      dispatch(getFavorites({ token }));
      dispatch(getUnreadNotification({ token }));
      if (
        user.type === UserTypeConstants.ADMIN ||
        user.type === UserTypeConstants.WAREHOUSE
      ) {
        dispatch(getUnreadOrders({ token }));
      }
      if (user.type === UserTypeConstants.PHARMACY) {
        dispatch(getSavedItems({ token }));
      }
    }
  }, [dispatch, token, user]);

  // for first render reset the auth status and error
  // get the favorite for login user
  useEffect(() => {
    dispatchProperties();

    // show toTop button after scroll more than 500
    const toggleToTopVisible = () => {
      if (window.pageYOffset > 500) {
        setToTopVisible(true);
      } else {
        setToTopVisible(false);
      }
    };

    window.addEventListener("scroll", toggleToTopVisible);
    window.scrollTo(0, 0);

    return () => {
      window.removeEventListener("scroll", toggleToTopVisible);
    };
  }, [dispatchProperties]);

  const changeNavigationSettingHandler = (obj) => {
    dispatch(changeNavSettings(obj));
  };

  return user ? (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        history.push("/");
      }}
    >
      {settingsStatus === "loading" || advertisementsStatus === "loading" ? (
        <HomePageLoader />
      ) : (
        <>
          <SocketObserver />
          <div className={styles.container}>
            <div className={styles.hamburger_menu}>
              <p className={styles.selectedOption}>
                {t(selectedTopNavOption)}
                {t(selectedSideNavOption)}
              </p>
              <GiHamburgerMenu
                color="white"
                size={32}
                style={{
                  padding: "4px",
                }}
                onClick={(e) => {
                  changeNavigationSettingHandler({
                    collapsedSideNavOption: true,
                    showTopNav: !showTopNav,
                    showSearchBar: false,
                  });

                  e.stopPropagation();
                }}
              />
            </div>

            <TopNav
              selectedOption={selectedTopNavOption}
              onSelectedChange={(val) => {
                changeNavigationSettingHandler({
                  selectedTopNavOption: val,
                  collapsedSideNavOption: true,
                  selectedSideNavOption: "",
                  searchNavShow: false,
                  showSearchBar: false,
                });
              }}
            />

            <SideNav
              collapsed={collapsedSideNavOption}
              onCollapsedChange={() => {
                changeNavigationSettingHandler({
                  collapsedSideNavOption: !collapsedSideNavOption,
                  showTopNav: false,
                });
              }}
              selectedOption={selectedSideNavOption}
              onSelectedChange={(val) => {
                changeNavigationSettingHandler({
                  selectedSideNavOption: val,
                  selectedTopNavOption: "",
                  collapsedSideNavOption: true,
                  showSearchBar: false,
                });
              }}
              showSearchBar={showSearchBar}
            />

            <div className={styles.content_area}>
              <Suspense fallback={<HomePageLoader />}>
                {user.type === UserTypeConstants.COMPANY && (
                  <CompanyRoutes
                    changeOptionHandler={changeNavigationSettingHandler}
                  />
                )}
                {user.type === UserTypeConstants.WAREHOUSE && (
                  <WarehouseRoutes
                    changeOptionHandler={changeNavigationSettingHandler}
                  />
                )}
                {user.type === UserTypeConstants.GUEST && (
                  <GuestRoutes
                    changeOptionHandler={changeNavigationSettingHandler}
                  />
                )}

                {user.type === UserTypeConstants.PHARMACY && (
                  <PharmacyRoutes
                    changeOptionHandler={changeNavigationSettingHandler}
                  />
                )}

                {user.type === UserTypeConstants.ADMIN && (
                  <AdminRoutes
                    changeOptionHandler={changeNavigationSettingHandler}
                  />
                )}
              </Suspense>
            </div>
            <Footer />

            {toTopVisible && (
              <FaArrowAltCircleUp
                className={styles.toTop}
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              />
            )}
          </div>
        </>
      )}
    </ErrorBoundary>
  ) : (
    // direct access to this page without sign in
    // redirect the use to sign in first
    <Redirect to="/signin" />
  );
}

export default MainPage;
