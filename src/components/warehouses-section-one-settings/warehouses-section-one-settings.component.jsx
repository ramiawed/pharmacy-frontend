import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import ChooseWarehouseModal from "../choose-company-modal/choose-company-modal.component";
import CardInfo from "../card-info/card-info.component";
import Button from "../button/button.component";
import Toast from "../toast/toast.component";
import SettingRow from "../setting-row/setting-row.component";
import SettingSectionHeader from "../setting-section-header/setting-section-header.component";
import Loader from "../loader/loader.component";
import { default as ActionLoader } from "../action-loader/action-loader.component";

// redux stuff
import { useSelector, useDispatch } from "react-redux";
import {
  selectSettings,
  updateSettings,
} from "../../redux/settings/settingsSlice";
import {
  addWarehouseToSectionOne,
  resetAddWarehouseToSectionOneStatus,
  resetRemoveWarehouseFromSectionOneStatus,
  selectWarehousesSectionOne,
  removeWarehouseFromSectionOne,
} from "../../redux/advertisements/warehousesSectionOneSlice";
import { selectToken } from "../../redux/auth/authSlice.js";

// styles
import generalStyles from "../../style.module.scss";

// constants
import { BASEURL, Colors } from "../../utils/constants";

function WarehousesSectionOneSettings() {
  const { t } = useTranslation();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const {
    warehousesSectionOne,
    warehousesSectionOneStatus,
    addWarehouseToSectionOneStatus,
    removeWarehouseFromSectionOneStatus,
    addWarehouseToSectionOneError,
    removeWarehouseFromSectionOneError,
  } = useSelector(selectWarehousesSectionOne);

  const {
    settings: {
      warehousesSectionOne: { show, title, description, order, titleRight },
    },
    status,
  } = useSelector(selectSettings);

  const [showChooseModal, setShowChooseModal] = useState(false);

  const removeFromSectionOne = (id) => {
    dispatch(removeWarehouseFromSectionOne({ id: id, token }));
  };

  return (
    <>
      <SettingSectionHeader
        show={show}
        title={title}
        description={description}
        order={order}
        titleRight={titleRight}
        header="القسم الاول / مستودعات /"
        checkboxLabel="show-section-one-warehouse-in-home-page"
        updateAction={updateSettings}
        field="warehousesSectionOne"
      />

      <CardInfo headerTitle={t("section-one-warehouses")}>
        {warehousesSectionOneStatus === "loading" ? (
          <Loader />
        ) : (
          <>
            <div>
              {warehousesSectionOne.map((warehouse) => (
                <SettingRow
                  data={warehouse}
                  key={warehouse._id}
                  // tooltip="remove-warehouse-from-favorites-advertisement"
                  action={removeFromSectionOne}
                />
              ))}

              <div className={generalStyles.padding_v_6}>
                <Button
                  text="add-label"
                  action={() => {
                    setShowChooseModal(true);
                  }}
                  bgColor={Colors.SUCCEEDED_COLOR}
                />
              </div>
            </div>
          </>
        )}
      </CardInfo>

      {showChooseModal && (
        <ChooseWarehouseModal
          close={() => setShowChooseModal(false)}
          chooseAction={addWarehouseToSectionOne}
          url={`${BASEURL}/users?limit=9&isActive=true&type=warehouse&inSectionOne=false`}
        />
      )}

      {status === "loading" && <ActionLoader />}

      {addWarehouseToSectionOneStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("company-added")}
          actionAfterTimeout={() =>
            dispatch(resetAddWarehouseToSectionOneStatus())
          }
        />
      )}

      {addWarehouseToSectionOneStatus === "failed" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(addWarehouseToSectionOneError)}
          actionAfterTimeout={() =>
            dispatch(resetAddWarehouseToSectionOneStatus())
          }
        />
      )}

      {removeWarehouseFromSectionOneStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("company-removed")}
          actionAfterTimeout={() =>
            dispatch(resetRemoveWarehouseFromSectionOneStatus())
          }
        />
      )}

      {removeWarehouseFromSectionOneStatus === "failed" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(removeWarehouseFromSectionOneError)}
          actionAfterTimeout={() =>
            dispatch(resetRemoveWarehouseFromSectionOneStatus())
          }
        />
      )}
    </>
  );
}

export default WarehousesSectionOneSettings;
