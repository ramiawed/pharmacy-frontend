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
  addItemToSectionThree,
  resetAddItemToSectionThreeStatus,
  resetRemoveItemFromSectionThreeStatus,
  selectItemsSectionThree,
  removeItemFromSectionThree,
} from "../../redux/advertisements/itemsSectionThreeSlice";
import { selectToken } from "../../redux/auth/authSlice.js";

// constants
import { Colors } from "../../utils/constants";

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
        header={t("section three items")}
        checkboxLabel="show section in home page"
        updateAction={updateSettings}
        field="itemsSectionThree"
      />

      <CardInfo headerTitle={t("section three items")}>
        {itemsSectionThreeStatus === "loading" ? (
          <Loader />
        ) : (
          <>
            <div>
              {itemsSectionThree.map((item) => (
                <SettingRow
                  data={item}
                  key={item._id}
                  action={removeFromSectionThree}
                  type="item"
                />
              ))}

              <CenterContainer>
                <Button
                  text="add"
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
            dispatch(addItemToSectionThree({ token, id: item._id }));
            setShowChooseModal(false);
          }}
        />
      )}

      {addItemToSectionThreeStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("item added")}
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
          toastText={t("item removed")}
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
