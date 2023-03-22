import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import SettingSectionHeader from "../setting-section-header/setting-section-header.component";
import FilterItemsModal from "../../modals/filter-items-modal/filter-items-modal.component";
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
  addItemToSectionTwo,
  resetAddItemToSectionTwoStatus,
  resetRemoveItemFromSectionTwoStatus,
  selectItemsSectionTwo,
  removeItemFromSectionTwo,
} from "../../redux/advertisements/itemsSectionTwoSlice";
import { selectToken } from "../../redux/auth/authSlice.js";

// constants
import { Colors } from "../../utils/constants";

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
                  action={removeFromSectionTwo}
                  type="item"
                />
              ))}

              <CenterContainer>
                <Button
                  text="add-label"
                  action={() => {
                    setShowChooseModal(true);
                  }}
                  classStyle="bg_green"
                />
              </CenterContainer>
            </div>
          </>
        )}
      </CardInfo>

      {showChooseModal && (
        <FilterItemsModal
          close={() => setShowChooseModal(false)}
          selectedAction={(item) => {
            dispatch(addItemToSectionTwo({ token, id: item._id }));
            setShowChooseModal(false);
          }}
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
