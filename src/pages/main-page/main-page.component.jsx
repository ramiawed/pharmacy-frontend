import React, { useEffect, useState, lazy, Suspense, useCallback } from "react";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

// redux stuff
import { resetStatus, selectUserData } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../../redux/favorites/favoritesSlice";
import { getUnreadNotification } from "../../redux/userNotifications/userNotificationsSlice";
import { selectSettings } from "../../redux/settings/settingsSlice";
import { selectAdvertisements } from "../../redux/advertisements/advertisementsSlice";
import { getSavedItems } from "../../redux/savedItems/savedItemsSlice";
import { getCompanies } from "../../redux/company/companySlice";
import { getWarehouses } from "../../redux/warehouse/warehousesSlice";

// components
import TopNav from "../../components/top-nav/top-nav.component";
import Footer from "../../components/footer/footer.component";
import ErrorFallback from "../../components/error-fall-back/error-fall-back.component";
import HomePageLoader from "../../components/home-page-loader/home-page-loader.component";
import SocketObserver from "../../components/socket-orbserver/socket-observer.component";

// react-icons
import { FaArrowAltCircleUp } from "react-icons/fa";

// style
import styles from "./main-page.module.scss";

// constants
import { UserTypeConstants } from "../../utils/constants";
import FilterItemsModal from "../../modals/filter-items-modal/filter-items-modal.component";
import { useTheme } from "../../contexts/themeContext";

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
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();

  // selectors
  // get the user and the token from redux-store-auth
  const { user, token } = useSelector(selectUserData);
  const { status: settingsStatus } = useSelector(selectSettings);
  const { status: advertisementsStatus } = useSelector(selectAdvertisements);

  const [toTopVisible, setToTopVisible] = useState(false);
  const [showTopSearchBar, setShowTopSearchBar] = useState(false);

  const dispatchProperties = useCallback(() => {
    if (user) {
      dispatch(resetStatus());
      dispatch(getFavorites({ token }));
      dispatch(getUnreadNotification({ token }));
      if (
        user.type === UserTypeConstants.ADMIN ||
        user.type === UserTypeConstants.WAREHOUSE
      ) {
        dispatch(getCompanies({ token }));
        dispatch(getWarehouses({ token }));
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
      if (window.scrollY > 500) {
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
    // dispatch(changeNavSettings(obj));
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
        <div
          style={{
            backgroundColor:
              theme === "light" ? "rgb(255, 255, 255)" : "rgb(51, 65, 85)",
            backgroundImage:
              theme === "light"
                ? "radial-gradient(at 31% 21%, rgb(224, 231, 255) 0, transparent 23%), radial-gradient(at 73% 24%, rgb(254, 249, 195) 0, transparent 16%), radial-gradient(at 89% 39%, rgb(191, 219, 254) 0, transparent 38%), radial-gradient(at 31% 90%, rgb(241, 245, 249) 0, transparent 15%), radial-gradient(at 73% 100%, rgb(224, 231, 255) 0, transparent 36%), radial-gradient(at 3% 73%, rgb(229, 229, 229) 0, transparent 56%)"
                : "radial-gradient(at 2% 27%, rgb(51, 65, 85) 0, transparent 53%), radial-gradient(at 0% 100%, rgb(51, 65, 85) 0, transparent 41%), radial-gradient(at 100% 0%, rgb(18, 18, 18) 0, transparent 46%)",
          }}
          // style={{
          //   backgroundColor: "rgb(23, 23, 23)",
          //   backgroundImage:
          //     "radial-gradient(at 2% 27%, rgb(51, 65, 85) 0, transparent 53%), radial-gradient(at 0% 100%, rgb(46, 46, 51) 0, transparent 41%), radial-gradient(at 100% 0%, rgb(18, 18, 18) 0, transparent 46%)",
          // }}
        >
          <SocketObserver />
          <TopNav
            userType={user.type}
            showSearchHandler={setShowTopSearchBar}
          />

          <div style={{ minHeight: "calc(100vh - 60px)" }}>
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
              size={48}
              className={styles.toTop}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            />
          )}

          {showTopSearchBar && (
            <FilterItemsModal close={() => setShowTopSearchBar(false)} />
          )}
        </div>
      )}
    </ErrorBoundary>
  ) : (
    // direct access to this page without sign in
    // redirect the use to sign in first
    <Redirect to="/signin" />
  );
}

export default MainPage;
