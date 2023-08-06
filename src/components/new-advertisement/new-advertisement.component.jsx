import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { addAdvertisement } from "../../redux/advertisements/advertisementsSlice";
import { selectUserData } from "../../redux/auth/authSlice";
import { selectCompanies } from "../../redux/company/companySlice";
import { selectWarehouses } from "../../redux/warehouse/warehousesSlice";

// components
import SelectMedicineModal from "../../modals/select-medicine-modal/select-medicine-modal.component";
import SelectPartnerModal from "../../modals/select-partner-modal/select-partner-modal.component";
import Modal from "../../modals/modal/modal.component";
import Toast from "../toast/toast.component";
import Icon from "../icon/icon.component";

// icons
import { MdAddCircle } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiImage } from "react-icons/bi";

// styles
import styles from "./new-advertisement.module.scss";

// constants
import { BASEURL, Colors } from "../../utils/constants";

function NewAdvertisement({ closeHandler, header }) {
  const { t } = useTranslation();
  const inputFileRef = useRef(null);
  const dispatch = useDispatch();

  //  selectors
  const { token } = useSelector(selectUserData);

  const { companies } = useSelector(selectCompanies);
  const { warehouses } = useSelector(selectWarehouses);

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSelectCompanyModal, setShowSelectCompanyModal] = useState(false);
  const [showSelectWarehouseModal, setShowSelectWarehouseModal] =
    useState(false);
  const [showSelectMedicineModal, setShowSelectMedicineModal] = useState(false);
  const [imageErrorMsg, setImageErrorMsg] = useState("");

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
    if (!selectedImage) {
      setImageErrorMsg("choose image msg");
      return;
    }

    if (selectedImage) {
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("company", selectedCompany ? selectedCompany._id : null);
      formData.append(
        "warehouse",
        selectedWarehouse ? selectedWarehouse._id : null
      );
      formData.append(
        "medicine",
        selectedMedicine ? selectedMedicine._id : null
      );

      dispatch(addAdvertisement({ data: formData, token }))
        .then(unwrapResult)
        .then(() => closeHandler(false));
    }
  };

  return (
    <Modal
      header={header}
      cancelLabel="cancel"
      closeModal={() => closeHandler(false)}
      okLabel="ok"
      okModal={addAdvertisementHandler}
    >
      <div className={styles.new_advertisement_div}>
        <div className={styles.content}>
          <div className={styles.links}>
            {/* company */}
            <ChoosePartnerOrItem
              selectedObj={selectedCompany}
              label={t("company")}
              deleteObj={setSelectedCompany}
              showSelectedModal={setShowSelectCompanyModal}
            />
            {/* warehouse */}
            <ChoosePartnerOrItem
              selectedObj={selectedWarehouse}
              label={t("warehouse")}
              deleteObj={setSelectedWarehouse}
              showSelectedModal={setShowSelectWarehouseModal}
            />
            {/* item */}
            <ChoosePartnerOrItem
              selectedObj={selectedMedicine}
              label={t("item")}
              deleteObj={setSelectedMedicine}
              showSelectedModal={setShowSelectMedicineModal}
            />

            <div className={styles.row}>
              <label>{t("image")}:</label>
              {selectedImage === null ? (
                <>
                  <Icon
                    selected={false}
                    foreColor={Colors.SUCCEEDED_COLOR}
                    onclick={handleAddImageClick}
                    icon={() => <MdAddCircle size={24} />}
                  />
                  <div
                    style={{
                      display: "none",
                    }}
                  >
                    <form encType="multipart/form-data">
                      <div>
                        <input
                          multiple={false}
                          accept="image/*"
                          ref={inputFileRef}
                          type="file"
                          onChange={fileChangedHandler}
                          // style={{ display: "none" }}
                        />
                      </div>
                    </form>
                  </div>
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
                  color={Colors.LIGHT_COLOR}
                  onClick={handleAddImageClick}
                  style={{
                    cursor: "pointer",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {imageErrorMsg && (
        <Toast
          bgColor={Colors.FAILED_COLOR}
          foreColor="#fff"
          toastText={t(imageErrorMsg)}
          actionAfterTimeout={() => {
            setImageErrorMsg("");
          }}
        />
      )}
      {showSelectCompanyModal && (
        <SelectPartnerModal
          close={() => setShowSelectCompanyModal(false)}
          chooseAction={(data) => selectCompanyHandler(data)}
          data={companies}
          placeholder="enter company name"
        />
      )}
      {showSelectWarehouseModal && (
        <SelectPartnerModal
          close={() => setShowSelectWarehouseModal(false)}
          chooseAction={(data) => selectWarehouseHandler(data)}
          data={warehouses}
          placeholder="enter warehouse name"
        />
      )}
      {showSelectMedicineModal && (
        <SelectMedicineModal
          close={() => setShowSelectMedicineModal(false)}
          chooseAction={(data) => selectMedicineHandler(data)}
          url={`${BASEURL}/items?limit=15&isActive=true`}
        />
      )}
    </Modal>
  );
}

export default NewAdvertisement;

const ChoosePartnerOrItem = ({
  selectedObj,
  label,
  showSelectedModal,
  deleteObj,
}) => {
  return (
    <div className={styles.row}>
      <label>{label}</label>
      {selectedObj === null ? (
        <Icon
          selected={false}
          foreColor={Colors.SUCCEEDED_COLOR}
          onclick={() => {
            showSelectedModal(true);
          }}
          icon={() => <MdAddCircle size={24} />}
        />
      ) : (
        <>
          <p>{selectedObj.name}</p>
          <Icon
            selected={false}
            foreColor={Colors.FAILED_COLOR}
            onclick={() => {
              deleteObj(null);
            }}
            icon={() => <RiDeleteBin5Fill size={24} />}
          />
        </>
      )}
    </div>
  );
};
