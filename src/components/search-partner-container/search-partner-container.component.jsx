import React, { useState } from "react";

import { IoMdAddCircle, IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";

import { Colors, UserTypeConstants } from "../../utils/constants";
import SelectPartnerModal from "../../modals/select-partner-modal/select-partner-modal.component";

import styles from "./search-partner-container.module.scss";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectCompanies } from "../../redux/company/companySlice";
import { selectWarehouses } from "../../redux/warehouse/warehousesSlice";

const SearchPartnerContainer = ({
  label,
  partners,
  addId,
  removeId,
  partnerType,
  action,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { companies } = useSelector(selectCompanies);
  const { warehouses } = useSelector(selectWarehouses);

  const [showChoosePartnerModal, setShowChoosePartnerModal] = useState(false);

  const clickHandler = () => {
    if (partners?.length === 0) setShowChoosePartnerModal(true);
  };

  return (
    <>
      <div className={styles.container}>
        <label className={styles.label}>{label}</label>
        <div className={styles.partners_container} onClick={clickHandler}>
          {partners?.length > 0 ? (
            partners?.map((partner) => (
              <div key={partner.value} className={styles.partner}>
                <div className={styles.name}>{partner.label}</div>
                <div
                  className={styles.remove_icon}
                  onClick={() => {
                    dispatch(removeId(partner.value));
                    if (action) action();
                  }}
                >
                  <IoMdClose size={20} color={Colors.FAILED_COLOR} />
                </div>
              </div>
            ))
          ) : (
            <label className={styles.placeholder}>
              {partnerType === UserTypeConstants.WAREHOUSE
                ? t("enter-warehouse-name")
                : t("enter-company-name")}
            </label>
          )}
        </div>
        <IoMdAddCircle
          size={32}
          color={Colors.SUCCEEDED_COLOR}
          className={styles.add_icon}
          onClick={() => {
            setShowChoosePartnerModal(true);
          }}
        />
      </div>

      {showChoosePartnerModal && (
        <SelectPartnerModal
          header={`${
            partnerType === UserTypeConstants.WAREHOUSE
              ? "choose-warehouse"
              : "choose-company"
          }`}
          close={() => setShowChoosePartnerModal(false)}
          chooseAction={(data) => {
            dispatch(addId({ value: data._id, label: data.name }));
            if (action) action();
          }}
          placeholder={`${
            partnerType === UserTypeConstants.WAREHOUSE
              ? "enter-warehouse-name"
              : "enter-company-name"
          }`}
          data={
            partnerType === UserTypeConstants.WAREHOUSE ? warehouses : companies
          }
        />
      )}
    </>
  );
};

export default SearchPartnerContainer;
