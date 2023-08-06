import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import SelectPartnerModal from "../../modals/select-partner-modal/select-partner-modal.component";
import SettingSectionHeader from "../setting-section-header/setting-section-header.component";
import CenterContainer from "../center-container/center-container.component";
import SettingRow from "../setting-row/setting-row.component";
import CardInfo from "../card-info/card-info.component";
import Loader from "../loader/loader.component";
import Button from "../button/button.component";
import Toast from "../toast/toast.component";

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
import { selectWarehouses } from "../../redux/warehouse/warehousesSlice";

// constants
import { Colors } from "../../utils/constants";
import CustomButton from "../custom-button/custom-button.component";
import { useTheme } from "../../contexts/themeContext";

function WarehousesSectionOneSettings() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  // selectors
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
  } = useSelector(selectSettings);
  const { warehouses } = useSelector(selectWarehouses);

  // own states
  const [showChooseModal, setShowChooseModal] = useState(false);

  // handlers
  const removeFromSectionOneHandler = (id) => {
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
        header={t("section one warehouses")}
        checkboxLabel="show section in home page"
        updateAction={updateSettings}
        field="warehousesSectionOne"
      />

      <CardInfo headerTitle={t("section one warehouses")}>
        {warehousesSectionOneStatus === "loading" ? (
          <Loader />
        ) : (
          <div className="p-2">
            <CenterContainer>
              {warehousesSectionOne.map((warehouse) => (
                <SettingRow
                  data={warehouse}
                  key={warehouse._id}
                  action={removeFromSectionOneHandler}
                />
              ))}
            </CenterContainer>

            <div className="max-w-fit mx-auto">
              <CustomButton
                text={t("add")}
                onClickHandler={() => {
                  setShowChooseModal(true);
                }}
                classname={`${
                  theme === "light"
                    ? "bg-green text-white"
                    : "d-primary500-mixed300"
                }`}
              />
            </div>
          </div>
        )}
      </CardInfo>

      {showChooseModal && (
        <SelectPartnerModal
          close={() => setShowChooseModal(false)}
          chooseAction={(data) => {
            dispatch(addWarehouseToSectionOne({ token, id: data._id }));
          }}
          placeholder={`${"enter warehouse name"}`}
          data={warehouses}
        />
      )}

      {addWarehouseToSectionOneStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("warehouse added")}
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
          toastText={t("warehouse removed")}
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
