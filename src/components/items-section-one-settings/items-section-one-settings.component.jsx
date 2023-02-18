import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// components
import SettingSectionHeader from "../setting-section-header/setting-section-header.component";
import FilterItemsModal from "../../modals/filter-items-modal/filter-items-modal.component";
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
  addItemToSectionOne,
  resetAddItemToSectionOneStatus,
  resetRemoveItemFromSectionOneStatus,
  selectItemsSectionOne,
  removeItemFromSectionOne,
} from "../../redux/advertisements/itemsSectionOneSlice";
import { selectToken } from "../../redux/auth/authSlice.js";

// styles
import generalStyles from "../../style.module.scss";

// constants
import { Colors } from "../../utils/constants";

function ItemsSectionOneSettings() {
  const { t } = useTranslation();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  const {
    itemsSectionOne,
    itemsSectionOneStatus,
    addItemToSectionOneStatus,
    removeItemFromSectionOneStatus,
    addItemToSectionOneError,
    removeItemFromSectionOneError,
  } = useSelector(selectItemsSectionOne);

  const {
    settings: {
      itemsSectionOne: { show, title, description, order, titleRight },
    },
  } = useSelector(selectSettings);

  const [showChooseModal, setShowChooseModal] = useState(false);

  const removeFromSectionOne = (id) => {
    dispatch(removeItemFromSectionOne({ id: id, token }));
  };

  return (
    <>
      <SettingSectionHeader
        show={show}
        title={title}
        description={description}
        order={order}
        titleRight={titleRight}
        header="القسم الاول / أدوية /"
        checkboxLabel="show-section-one-items-in-home-page"
        updateAction={updateSettings}
        field="itemsSectionOne"
      />

      <CardInfo headerTitle={t("section-one-items")}>
        {itemsSectionOneStatus === "loading" ? (
          <Loader />
        ) : (
          <>
            <div>
              {itemsSectionOne.map((item) => (
                <SettingRow
                  data={item}
                  key={item._id}
                  action={removeFromSectionOne}
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
        <FilterItemsModal
          close={() => setShowChooseModal(false)}
          selectedAction={(item) => {
            dispatch(addItemToSectionOne({ token, id: item._id }));
            setShowChooseModal(false);
          }}
        />
      )}

      {addItemToSectionOneStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("item-added")}
          actionAfterTimeout={() => dispatch(resetAddItemToSectionOneStatus())}
        />
      )}

      {addItemToSectionOneStatus === "failed" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(addItemToSectionOneError)}
          actionAfterTimeout={() => dispatch(resetAddItemToSectionOneStatus())}
        />
      )}

      {removeItemFromSectionOneStatus === "succeeded" && (
        <Toast
          bgColor={Colors.SUCCEEDED_COLOR}
          foreColor="#fff"
          toastText={t("item-removed")}
          actionAfterTimeout={() =>
            dispatch(resetRemoveItemFromSectionOneStatus())
          }
        />
      )}

      {removeItemFromSectionOneStatus === "failed" && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(removeItemFromSectionOneError)}
          actionAfterTimeout={() =>
            dispatch(resetRemoveItemFromSectionOneStatus())
          }
        />
      )}
    </>
  );
}

export default ItemsSectionOneSettings;
