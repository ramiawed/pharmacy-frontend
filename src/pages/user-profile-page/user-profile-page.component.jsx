// libraries
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// components
import Header from "../../components/header/header.component";
import CardInfo from "../../components/card-info/card-info.component";
import InfoRow from "../../components/info-row/info-row.component";
import ActionButton from "../../components/action-button/action-button.component";
import Toast from "../../components/toast/toast.component";
import InputFileImage from "../../components/input-file-image/input-file-image.component";
import ActionLoader from "../../components/action-loader/action-loader.component";
import ChangePassword from "../../components/change-password/change-password.component";
import DeleteMe from "../../components/delete-me/delete-me.component";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserData,
  updateUserInfo,
  resetPasswordError,
  cancelOperation,
  resetUpdateStatus,
  resetUpdateError,
  resetChangeLogoError,
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
import { UserTypeConstants, Colors } from "../../utils/constants";

function UserProfilePage() {
  const { t } = useTranslation();
  const isOnline = useSelector(selectOnlineStatus);
  const dispatch = useDispatch();
  const {
    user,
    token,
    passwordError,
    updateStatus,
    updateError,
    changeLogoStatus,
    changeLogoError,
  } = useSelector(selectUserData);

  const [userObj, setUserObj] = useState(user);

  const handleInputChange = (field, val) => {
    setUserObj({
      ...userObj,
      [field]: val,
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.content}>
      <Header>
        <h2>{t("nav-profile")}</h2>
      </Header>

      <div
        className={[
          generalStyles.flex_center_container,
          generalStyles.flex_column,
          generalStyles.padding_v_6,
          generalStyles.padding_h_12,
        ].join(" ")}
      >
        <div
          className={styles.logo}
          style={{
            backgroundImage:
              user.logo_url && user.logo_url !== ""
                ? `url("http://localhost:8000/${user.logo_url}`
                : `url("http://localhost:8000/avatar01.png`,
          }}
        ></div>

        <div>
          <InputFileImage type="partner" />
        </div>
      </div>

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
          value={userObj.type}
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
        <InfoRow
          editable={true}
          field="city"
          labelText={t("user-city")}
          value={userObj.city}
          onInputChange={handleInputChange}
          action={() => updateFieldHandler("city")}
        />
        <InfoRow
          editable={true}
          field="district"
          labelText={t("user-district")}
          value={userObj.district}
          onInputChange={handleInputChange}
          action={() => updateFieldHandler("district")}
        />
        <InfoRow
          editable={true}
          field="street"
          labelText={t("user-street")}
          value={userObj.street}
          onInputChange={handleInputChange}
          action={() => updateFieldHandler("street")}
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

      {user.type === UserTypeConstants.NORMAL ? (
        <CardInfo headerTitle={t("additional-info")}>
          <InfoRow
            editable={true}
            field="guestDetails.job"
            labelText={t("user-job")}
            value={userObj.guestDetails.job}
            onInputChange={handleInputChange}
            action={() => updateFieldHandler("guestDetails.job")}
          />
          <InfoRow
            editable={true}
            field="guestDetails.companyName"
            labelText={t("user-company-name")}
            value={userObj.guestDetails.companyName}
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

      {user.type !== UserTypeConstants.ADMIN && (
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
              className={[generalStyles.right, generalStyles.padding_h_8].join(
                " "
              )}
              style={{ flex: "1" }}
            >
              {t("admin-permission-label")}
            </label>
            <ActionButton
              text="update-label"
              action={() => updateFieldHandler("allowAdmin")}
              color={Colors.SUCCEEDED_COLOR}
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

      {passwordError && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => dispatch(resetPasswordError())}
        >
          {passwordError.split("_").map((err, index) => (
            <p key={index}>{t(err)}</p>
          ))}
        </Toast>
      )}

      {changeLogoError && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => dispatch(resetChangeLogoError())}
        >
          <p>{t(changeLogoError)}</p>
        </Toast>
      )}

      {updateStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => {
            dispatch(resetUpdateStatus());
          }}
        >
          <p>{t("update-succeeded")}</p>
        </Toast>
      )}

      {updateStatus === "failed" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          actionAfterTimeout={() => {
            dispatch(resetUpdateError());
          }}
        >
          <p>{t(updateError)}</p>
        </Toast>
      )}

      {changeLogoStatus === "loading" && (
        <ActionLoader
          allowCancel={true}
          onclick={() => {
            cancelOperation();
          }}
        />
      )}
    </div>
  );
}

export default UserProfilePage;
