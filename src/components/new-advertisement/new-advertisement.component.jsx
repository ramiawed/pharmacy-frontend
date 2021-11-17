import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { useDispatch, useSelector } from "react-redux";
import { addAdvertisement } from "../../redux/advertisements/advertisementsSlice";
import { selectUserData } from "../../redux/auth/authSlice";
import { unwrapResult } from "@reduxjs/toolkit";

// components
import Icon from "../action-icon/action-icon.component";
import Button from "../button/button.component";
import SelectPartnerModal from "../select-partner-modal/select-partner-modal.component";
import SelectMedicineModal from "../select-medicine-modal/select-medicine-modal.component";

// icons
import { MdAddCircle } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiImage } from "react-icons/bi";

// styles
import styles from "./new-advertisement.module.scss";

// constants
import { BASEURL, Colors } from "../../utils/constants";

function NewAdvertisement({ isNew, setIsNew }) {
  const { t } = useTranslation();
  const inputFileRef = useRef(null);
  const dispatch = useDispatch();

  //  selectors
  const { token } = useSelector(selectUserData);

  // const [isNew, setIsNew] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSelectCompanyModal, setShowSelectCompanyModal] = useState(false);
  const [showSelectWarehouseModal, setShowSelectWarehouseModal] =
    useState(false);
  const [showSelectMedicineModal, setShowSelectMedicineModal] = useState(false);

  const resetState = () => {
    setIsNew(false);
    setSelectedCompany(null);
    setSelectedWarehouse(null);
    setSelectedMedicine(null);
    setSelectedImage(null);
  };

  const handleAddImageClick = () => {
    inputFileRef.current.click();
  };

  const fileChangedHandler = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const selectCompanyHandler = (data) => {
    setSelectedCompany(data);
    setSelectedWarehouse(null);
    setSelectedMedicine(null);
  };

  const selectWarehouseHandler = (data) => {
    setSelectedWarehouse(data);
    setSelectedCompany(null);
    setSelectedMedicine(null);
  };

  const selectMedicineHandler = (data) => {
    setSelectedMedicine(data);
    setSelectedWarehouse(null);
    setSelectedCompany(null);
  };

  const addAdvertisementHandler = () => {
    if (selectedImage) {
      const data = new FormData();
      data.append(
        "name",
        `${Date.now()}.${selectedImage.name.split(".").pop()}`
      );
      data.append("company", selectedCompany ? selectedCompany._id : null);
      data.append(
        "warehouse",
        selectedWarehouse ? selectedWarehouse._id : null
      );
      data.append("medicine", selectedMedicine ? selectedMedicine._id : null);
      data.append("file", selectedImage);

      dispatch(addAdvertisement({ data, token }))
        .then(unwrapResult)
        .then(() => {
          resetState();
        });
    }
  };

  return (
    <div>
      {isNew && (
        <div
          className={styles.new_advertisement_div}
          style={{
            marginBottom: "10px",
          }}
        >
          <div className={styles.content}>
            <div className={styles.links}>
              <div className={styles.row}>
                <label>{t("company")}:</label>
                {selectedCompany === null ? (
                  <Icon
                    selected={false}
                    foreColor={Colors.SUCCEEDED_COLOR}
                    onclick={() => {
                      setShowSelectCompanyModal(true);
                    }}
                    icon={() => <MdAddCircle size={24} />}
                  />
                ) : (
                  <>
                    <p>{selectedCompany.name}</p>
                    <Icon
                      selected={false}
                      foreColor={Colors.FAILED_COLOR}
                      onclick={() => {
                        setSelectedCompany(null);
                      }}
                      icon={() => <RiDeleteBin5Fill size={24} />}
                    />
                  </>
                )}
              </div>
              <div className={styles.row}>
                <label>{t("warehouse")}:</label>
                {selectedWarehouse === null ? (
                  <Icon
                    selected={false}
                    foreColor={Colors.SUCCEEDED_COLOR}
                    onclick={() => {
                      setShowSelectWarehouseModal(true);
                    }}
                    icon={() => <MdAddCircle size={24} />}
                  />
                ) : (
                  <>
                    <p>{selectedWarehouse.name}</p>
                    <Icon
                      selected={false}
                      foreColor={Colors.FAILED_COLOR}
                      onclick={() => {
                        setSelectedWarehouse(null);
                      }}
                      icon={() => <RiDeleteBin5Fill size={24} />}
                    />
                  </>
                )}
              </div>
              <div className={styles.row}>
                <label>{t("single-item")}:</label>
                {selectedMedicine === null ? (
                  <Icon
                    selected={false}
                    foreColor={Colors.SUCCEEDED_COLOR}
                    onclick={() => {
                      setShowSelectMedicineModal(true);
                    }}
                    icon={() => <MdAddCircle size={24} />}
                  />
                ) : (
                  <>
                    <p>{selectedMedicine.name}</p>
                    <Icon
                      selected={false}
                      foreColor={Colors.FAILED_COLOR}
                      onclick={() => {
                        setSelectedMedicine(null);
                      }}
                      icon={() => <RiDeleteBin5Fill size={24} />}
                    />
                  </>
                )}
              </div>
              <div className={styles.row}>
                <label>{t("image-label")}:</label>
                {selectedImage === null ? (
                  <>
                    <Icon
                      selected={false}
                      foreColor={Colors.SUCCEEDED_COLOR}
                      onclick={handleAddImageClick}
                      icon={() => <MdAddCircle size={24} />}
                    />
                    <input
                      multiple={false}
                      accept="image/*"
                      ref={inputFileRef}
                      type="file"
                      onChange={fileChangedHandler}
                      style={{ display: "none" }}
                    />
                  </>
                ) : (
                  <Icon
                    icon={() => <RiDeleteBin5Fill size={24} />}
                    selected={false}
                    foreColor={Colors.FAILED_COLOR}
                    onclick={() => setSelectedImage(null)}
                  />
                )}
              </div>
            </div>
            <div className={styles.img}>
              {selectedImage ? (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  className={styles.image}
                  alt="Thumb"
                />
              ) : (
                <div>
                  <BiImage
                    size={128}
                    color={Colors.SECONDARY_COLOR}
                    onClick={handleAddImageClick}
                    style={{
                      cursor: "pointer",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.actions}>
            <Button
              action={addAdvertisementHandler}
              text={t("add-label")}
              bgColor={Colors.SUCCEEDED_COLOR}
            />
            <Button
              action={resetState}
              text={t("cancel-label")}
              bgColor={Colors.FAILED_COLOR}
            />
          </div>
        </div>
      )}

      {showSelectCompanyModal && (
        <SelectPartnerModal
          header="choose-company"
          close={() => setShowSelectCompanyModal(false)}
          chooseAction={(data) => selectCompanyHandler(data)}
          url={`${BASEURL}/users?limit=9&isActive=true&type=company`}
        />
      )}

      {showSelectWarehouseModal && (
        <SelectPartnerModal
          header="choose-warehouse"
          close={() => setShowSelectWarehouseModal(false)}
          chooseAction={(data) => selectWarehouseHandler(data)}
          url={`${BASEURL}/users?limit=9&isActive=true&type=warehouse`}
        />
      )}

      {showSelectMedicineModal && (
        <SelectMedicineModal
          close={() => setShowSelectMedicineModal(false)}
          chooseAction={(data) => selectMedicineHandler(data)}
          url={`${BASEURL}/items?limit=9&isActive=true`}
        />
      )}
    </div>
  );
}

export default NewAdvertisement;
