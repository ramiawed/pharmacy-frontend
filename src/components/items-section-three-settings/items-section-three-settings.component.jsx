import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import ChooseItemModal from "../../modals/choose-item-modal/choose-item-modal.component";
import CardInfo from "../card-info/card-info.component";
import Button from "../button/button.component";
import Toast from "../toast/toast.component";
import SettingRow from "../setting-row/setting-row.component";
import SettingSectionHeader from "../setting-section-header/setting-section-header.component";
import Loader from "../loader/loader.component";

// redux stuff
import { useSelector, useDispatch } from "react-redux";
import {
  selectSettings,
  updateSettings,
} from "../../redux/settings/settingsSlice";
import {
  addItemToSectionThree,
  resetAddItemToSectionThreeStatus,
  resetRemoveItemFromSectionThreeStatus,
  selectItemsSectionThree,
  removeItemFromSectionThree,
} from "../../redux/advertisements/itemsSectionThreeSlice";
import { selectToken } from "../../redux/auth/authSlice.js";

// styles
import generalStyles from "../../style.module.scss";

// constants
import { BASEURL, Colors } from "../../utils/constants";

function ItemsSectionThreeSettings() {
  const { t } = useTranslation();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const {
    itemsSectionThree,
    itemsSectionThreeStatus,
    addItemToSectionThreeStatus,
    removeItemFromSectionThreeStatus,
    addItemToSectionThreeError,
    removeItemFromSectionThreeError,
  } = useSelector(selectItemsSectionThree);

  const {
    settings: {
      itemsSectionThree: { show, title, description, order, titleRight },
    },
  } = useSelector(selectSettings);

  const [showChooseModal, setShowChooseModal] = useState(false);

  const removeFromSectionThree = (id) => {
    dispatch(removeItemFromSectionThree({ id: id, token }));
  };

  return (
    <>
      <SettingSectionHeader
        show={show}
        title={title}
        description={description}
        order={order}
        titleRight={titleRight}
        header="القسم الثالث / أدوية /"
        checkboxLabel="show-section-three-items-in-home-page"
        updateAction={updateSettings}
        field="itemsSectionThree"
      />

      <CardInfo headerTitle={t("section-three-items")}>
        {itemsSectionThreeStatus === "loading" ? (
          <Loader />
        ) : (
          <>
            <div>
              {itemsSectionThree.map((item) => (
                <SettingRow
                  data={item}
                  key={item._id}
                  // tooltip="remove-company-from-favorites-advertisement"
                  action={removeFromSectionThree}
                  type="item"
                />
              ))}

              <div
                className={[
                  generalStyles.padding_v_6,
                  generalStyles.flex_container,
                ].join(" ")}
              >
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
        <ChooseItemModal
          close={() => setShowChooseModal(false)}
          chooseAction={addItemToSectionThree}
          url={`${BASEURL}/items?limit=15&isActive=true&inSectionThree=false`}
        />
      )}

      {addItemToSectionThreeStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("item-added")}
          actionAfterTimeout={() =>
            dispatch(resetAddItemToSectionThreeStatus())
          }
        />
      )}

      {addItemToSectionThreeStatus === "failed" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(addItemToSectionThreeError)}
          actionAfterTimeout={() =>
            dispatch(resetAddItemToSectionThreeStatus())
          }
        />
      )}

      {removeItemFromSectionThreeStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("item-removed")}
          actionAfterTimeout={() =>
            dispatch(resetRemoveItemFromSectionThreeStatus())
          }
        />
      )}

      {removeItemFromSectionThreeStatus === "failed" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(removeItemFromSectionThreeError)}
          actionAfterTimeout={() =>
            dispatch(resetRemoveItemFromSectionThreeStatus())
          }
        />
      )}
    </>
  );
}

export default ItemsSectionThreeSettings;
