import React, { lazy, memo, Suspense } from "react";
import { useTranslation } from "react-i18next";

// react-icons
import { GoSignOut } from "react-icons/go";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/auth/authSlice";

// components
import CustomLink from "../custom-link/custom-link.component";

// constants
import { UserTypeConstants } from "../../utils/constants";

const SideNavAdmin = lazy(() =>
  import("../side-nav-admin/side-nav-admin.component")
);
const SideNavCompany = lazy(() =>
  import("../side-nav-company/side-nav-company.component")
);
const SideNavGuest = lazy(() =>
  import("../side-nav-guest/side-nav-guest.component")
);
const SideNavPharmacy = lazy(() =>
  import("../side-nav-pharmacy/side-nav-pharmacy.component")
);
const SideNavWarehouse = lazy(() =>
  import("../side-nav-warehouse/side-nav-warehouse.component")
);

function SideNav({ hideMenu }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // selectors
  const { user } = useSelector(selectUserData);

  const handleSignOut = () => {
    dispatch({
      type: "SIGNOUT_REQUEST",
    });

    localStorage.removeItem("token");
  };

  return (
    <>
      <Suspense fallback={<></>}>
        {user.type === UserTypeConstants.ADMIN && (
          <SideNavAdmin hideMenu={hideMenu} />
        )}
        {user.type === UserTypeConstants.COMPANY && (
          <SideNavCompany hideMenu={hideMenu} />
        )}
        {user.type === UserTypeConstants.WAREHOUSE && (
          <SideNavWarehouse hideMenu={hideMenu} />
        )}
        {user.type === UserTypeConstants.PHARMACY && (
          <SideNavPharmacy hideMenu={hideMenu} />
        )}
        {user.type === UserTypeConstants.GUEST && (
          <SideNavGuest hideMenu={hideMenu} />
        )}
      </Suspense>

      <CustomLink
        icon={() => <GoSignOut size={24} />}
        to="/"
        text={t("sign out")}
        onClickHandler={() => handleSignOut()}
      />
    </>
  );
}

export default memo(SideNav);
