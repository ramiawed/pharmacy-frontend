import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { BASEURL, Colors } from "../../utils/constants";
import Icon from "../action-icon/action-icon.component";
import Button from "../button/button.component";
import { MdAddCircle } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";

import styles from "./new-advertisement.module.scss";
import { BiImage } from "react-icons/bi";
import SelectPartnerModal from "../select-partner-modal/select-partner-modal.component";
import SelectMedicineModal from "../select-medicine-modal/select-medicine-modal.component";

function NewAdvertisement() {
  const { t } = useTranslation();
  const inputFileRef = useRef(null);

  const [isNew, setIsNew] = useState(false);
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

  return (
    <div>
      {!isNew ? (
        <>
          <Button
            action={() => {
              setIsNew(true);
            }}
            text={t("new-advertisement")}
            bgColor={Colors.SUCCEEDED_COLOR}
          />
        </>
      ) : (
        <div className={styles.new_advertisement_div}>
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
                  <p>{selectedCompany.name}</p>
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
                  <p>{selectedWarehouse.name}</p>
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
                  <p>{selectedMedicine.name}</p>
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
                    icon={() => <AiFillCloseCircle size={24} />}
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
                  <BiImage size={128} color={Colors.SECONDARY_COLOR} />
                </div>
              )}
            </div>
          </div>
          <div className={styles.actions}>
            <Button
              action={() => {}}
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
