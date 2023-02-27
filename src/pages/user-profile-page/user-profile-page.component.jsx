// libraries
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Logo from "../../logo.png";

// components
import UserProfileNotifications from "../../components/user-profile-notifications/user-profile-notifications.component";
import MainContentContainer from "../../components/main-content-container/main-content-container.component";
import ChangePassword from "../../components/change-password/change-password.component";
import EditableCity from "../../components/editable-city/editable-city.component";
import Loader from "../../components/action-loader/action-loader.component";
import CardInfo from "../../components/card-info/card-info.component";
import DeleteMe from "../../components/delete-me/delete-me.component";
import InfoRow from "../../components/info-row/info-row.component";
import Header from "../../components/header/header.component";
import Button from "../../components/button/button.component";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  changeLogoURL,
  selectUserData,
  updateUserInfo,
} from "../../redux/auth/authSlice";
import {
  changeOnlineMsg,
  selectOnlineStatus,
} from "../../redux/online/onlineSlice";

// styles
import styles from "./user-profile-page.module.scss";
import rowStyles from "../../components/row.module.scss";
import generalStyles from "../../style.module.scss";

// constants, and utile
import {
  UserTypeConstants,
  Colors,
  SERVER_URL,
  BASEURL,
} from "../../utils/constants";
import ButtonWithIcon from "../../components/button-with-icon/button-with-icon.component";
import { BsImageAlt } from "react-icons/bs";
import Toast from "../../components/toast/toast.component";

function UserProfilePage({ onSelectedChange }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputFileRef = React.useRef(null);

  // selectors
  const isOnline = useSelector(selectOnlineStatus);
  const { token, user } = useSelector(selectUserData);

  // own state
  const [userObj, setUserObj] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageSizeWarningMsg, setImageSizeWarningMsg] = useState("");

  const handleClick = () => {
    inputFileRef.current.click();
  };

  const fileSelectedHandler = (event) => {
    if (event.target.files[0]) {
      if (parseFloat(event.target.files[0].size / 1024).toFixed(2) < 512) {
        setLoading(true);
        // setSelectedFile(event.target.files[0]);
        let formData = new FormData();
        formData.append("file", event.target.files[0]);

        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        };

        axios.post(`${BASEURL}/users/upload`, formData, config).then((res) => {
          dispatch(changeLogoURL(res.data.data.name));
          getMyInfo();
          setLoading(false);
        });
      } else {
        setImageSizeWarningMsg("image-size-must-be-less-than");
      }
    }
  };

  const handleInputChange = (field, val) => {
    setUserObj({
      ...userObj,
      [field]: val,
    });
  };

  const handleCityChange = (val) => {
    setUserObj({
      ...userObj,
      city: val,
    });
  };

  const updateFieldHandler = (field) => {
    // check the internet connection
    if (!isOnline) {
      dispatch(changeOnlineMsg());
      return;
    }

    // dispatch updateUserInfo
    return dispatch(
      updateUserInfo({ obj: { [field]: userObj[field] }, token: token })
    );
  };

  const getMyInfo = () => {
    axios
      .get(`${BASEURL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserObj(response.data.data.user);
      });
  };

  useEffect(() => {
    getMyInfo();
    window.scrollTo(0, 0);
    onSelectedChange();
  }, []);

  return user ? (
    <>
      <Header title="nav-profile" />

      <MainContentContainer>
        <div className={styles.content}>
          <div
            className={[
              generalStyles.flex_center_container,
              generalStyles.flex_column,
              generalStyles.padding_v_6,
              generalStyles.padding_h_12,
            ].join(" ")}
          >
            <div className={styles.logo}>
              <img
                src={
                  userObj.logo_url && userObj.logo_url !== ""
                    ? `${SERVER_URL}/profiles/${userObj.logo_url}`
                    : Logo
                }
                alt="thumb"
              />
            </div>

            <div className={styles.hide}>
              <form encType="multipart/form-data">
                <div>
                  <input
                    type="file"
                    name="file"
                    onChange={fileSelectedHandler}
                    ref={inputFileRef}
                    stye={{ display: "none" }}
                    accept="image/png, image/gif, image/jpeg"
                  />
                </div>
              </form>
            </div>

            <div>
              <ButtonWithIcon
                text={t("change-logo")}
                action={handleClick}
                bgColor={Colors.MAIN_COLOR}
                icon={() => <BsImageAlt />}
              />
            </div>
          </div>

          <div className={styles.info}>
            <CardInfo headerTitle={t("personal-info")}>
              <InfoRow
                editable={true}
                field="name"
                labelText={t("user-name")}
                value={userObj.name}
                onInputChange={handleInputChange}
                action={() => updateFieldHandler("name")}
              />
              <InfoRow
                editable={true}
                field="username"
                labelText={t("user-username")}
                value={userObj.username}
                onInputChange={handleInputChange}
                action={() => updateFieldHandler("username")}
              />
              <InfoRow
                editable={false}
                labelText={t("user-type")}
                value={t(userObj.type)}
                onInputChange={handleInputChange}
              />
            </CardInfo>

            <CardInfo headerTitle={t("communication-info")}>
              <InfoRow
                editable={true}
                field="phone"
                labelText={t("user-phone")}
                value={userObj.phone}
                onInputChange={handleInputChange}
                action={() => updateFieldHandler("phone")}
              />
              <InfoRow
                editable={true}
                field="mobile"
                labelText={t("user-mobile")}
                value={userObj.mobile}
                onInputChange={handleInputChange}
                action={() => updateFieldHandler("mobile")}
              />
              <InfoRow
                editable={true}
                field="email"
                labelText={t("user-email")}
                value={userObj.email}
                onInputChange={handleInputChange}
                action={() => updateFieldHandler("email")}
              />
            </CardInfo>

            <CardInfo headerTitle={t("address-info")}>
              <EditableCity
                editable={true}
                field="city"
                labelText={t("user-city")}
                value={{
                  value: userObj.city,
                  label: t(userObj.city),
                }}
                onInputChange={handleCityChange}
                action={() => updateFieldHandler("city")}
              />

              <InfoRow
                editable={true}
                field="addressDetails"
                labelText={t("user-address-details")}
                value={userObj.addressDetails}
                onInputChange={handleInputChange}
                action={() => updateFieldHandler("addressDetails")}
              />
            </CardInfo>

            {user.type === UserTypeConstants.PHARMACY ||
            user.type === UserTypeConstants.WAREHOUSE ? (
              <CardInfo headerTitle={t("additional-info")}>
                <InfoRow
                  editable={true}
                  field="employeeName"
                  labelText={t("user-employee-name")}
                  value={userObj.employeeName}
                  onInputChange={handleInputChange}
                  action={() => updateFieldHandler("employeeName")}
                />
                <InfoRow
                  editable={true}
                  field="certificateName"
                  labelText={t("user-certificate-name")}
                  value={userObj.certificateName}
                  onInputChange={handleInputChange}
                  action={() => updateFieldHandler("certificateName")}
                />
              </CardInfo>
            ) : (
              <></>
            )}

            {user.type === UserTypeConstants.GUEST ? (
              <CardInfo headerTitle={t("additional-info")}>
                <InfoRow
                  editable={true}
                  field="guestDetails.job"
                  labelText={t("user-job")}
                  value={t(userObj.guestDetails?.job)}
                  onInputChange={handleInputChange}
                  action={() => updateFieldHandler("guestDetails.job")}
                />
                <InfoRow
                  editable={true}
                  field="guestDetails.companyName"
                  labelText={t("user-company-name")}
                  value={userObj.guestDetails?.companyName}
                  onInputChange={handleInputChange}
                  action={() => updateFieldHandler("guestDetails.companyName")}
                />
              </CardInfo>
            ) : (
              <></>
            )}

            <CardInfo headerTitle={t("change-password")}>
              <ChangePassword />
            </CardInfo>

            {(user.type === UserTypeConstants.COMPANY ||
              user.type === UserTypeConstants.WAREHOUSE) && (
              <CardInfo
                headerTitle={t("admin-permission")}
                bgColor={Colors.FAILED_COLOR}
              >
                <div
                  className={[
                    rowStyles.container,
                    rowStyles.without_box_shadow,
                    generalStyles.padding_h_12,
                  ].join(" ")}
                >
                  <input
                    type="checkbox"
                    value={userObj.allowAdmin}
                    onChange={(e) =>
                      handleInputChange("allowAdmin", !userObj.allowAdmin)
                    }
                    checked={userObj.allowAdmin}
                  />
                  <label
                    className={[generalStyles.right].join(" ")}
                    style={{ flex: "1" }}
                  >
                    {t("admin-permission-label")}
                  </label>
                  <Button
                    text="update-label"
                    action={() => updateFieldHandler("allowAdmin")}
                    bgColor={Colors.SUCCEEDED_COLOR}
                  />
                </div>
              </CardInfo>
            )}

            <CardInfo
              headerTitle={t("delete-account")}
              bgColor={Colors.FAILED_COLOR}
              type="warning"
            >
              <DeleteMe />
            </CardInfo>
          </div>
        </div>

        {imageSizeWarningMsg && (
          <Toast
            bgColor={Colors.FAILED_COLOR}
            foreColor="#fff"
            actionAfterTimeout={() => {
              setImageSizeWarningMsg("");
            }}
          >
            <p>{t("image-size-must-be-less-than")}</p>
          </Toast>
        )}

        <UserProfileNotifications />
      </MainContentContainer>
      {loading && <Loader />}
    </>
  ) : (
    <Redirect to="/" />
  );
}

export default UserProfilePage;
