import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
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
  addItemToSectionTwo,
  resetAddItemToSectionTwoStatus,
  resetRemoveItemFromSectionTwoStatus,
  selectItemsSectionTwo,
  removeItemFromSectionTwo,
} from "../../redux/advertisements/itemsSectionTwoSlice";
import { selectToken } from "../../redux/auth/authSlice.js";

// styles
import generalStyles from "../../style.module.scss";

// constants
import { BASEURL, Colors } from "../../utils/constants";
import ChooseItemModal from "../choose-item-modal/choose-item-modal.component";

function ItemsSectionTwoSettings() {
  const { t } = useTranslation();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const {
    itemsSectionTwo,
    itemsSectionTwoStatus,
    addItemToSectionTwoStatus,
    removeItemFromSectionTwoStatus,
    addItemToSectionTwoError,
    removeItemFromSectionTwoError,
  } = useSelector(selectItemsSectionTwo);

  const {
    settings: {
      itemsSectionTwo: { show, title, description, order, titleRight },
    },
  } = useSelector(selectSettings);

  const [showChooseModal, setShowChooseModal] = useState(false);

  const removeFromSectionTwo = (id) => {
    dispatch(removeItemFromSectionTwo({ id: id, token }));
  };

  return (
    <>
      <SettingSectionHeader
        show={show}
        title={title}
        description={description}
        order={order}
        titleRight={titleRight}
        header="القسم الثاني / أدوية /"
        checkboxLabel="show-section-two-items-in-home-page"
        updateAction={updateSettings}
        field="itemsSectionTwo"
      />

      <CardInfo headerTitle={t("section-two-items")}>
        {itemsSectionTwoStatus === "loading" ? (
          <Loader />
        ) : (
          <>
            <div>
              {itemsSectionTwo.map((item) => (
                <SettingRow
                  data={item}
                  key={item._id}
                  // tooltip="remove-company-from-favorites-advertisement"
                  action={removeFromSectionTwo}
                  type="item"
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
        <ChooseItemModal
          close={() => setShowChooseModal(false)}
          chooseAction={addItemToSectionTwo}
          url={`${BASEURL}/items?limit=15&isActive=true&inSectionTwo=false`}
        />
      )}

      {addItemToSectionTwoStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("item-added")}
          actionAfterTimeout={() => dispatch(resetAddItemToSectionTwoStatus())}
        />
      )}

      {addItemToSectionTwoStatus === "failed" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(addItemToSectionTwoError)}
          actionAfterTimeout={() => dispatch(resetAddItemToSectionTwoStatus())}
        />
      )}

      {removeItemFromSectionTwoStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("item-removed")}
          actionAfterTimeout={() =>
            dispatch(resetRemoveItemFromSectionTwoStatus())
          }
        />
      )}

      {removeItemFromSectionTwoStatus === "failed" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(removeItemFromSectionTwoError)}
          actionAfterTimeout={() =>
            dispatch(resetRemoveItemFromSectionTwoStatus())
          }
        />
      )}
    </>
  );
}

export default ItemsSectionTwoSettings;
