import React, { useState } from "react";

import { IoMdAddCircle, IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";

import { BASEURL, Colors } from "../../utils/constants";
import SelectPartnerModal from "../select-partner-modal/select-partner-modal.component";

import styles from "./search-partner-container.module.scss";

const SearchPartnerContainer = ({
  label,
  partners,
  addId,
  removeId,
  partnerType,
}) => {
  const dispatch = useDispatch();
  const [showChoosePartnerModal, setShowChoosePartnerModal] = useState(false);
  return (
    <>
      <div className={styles.container}>
        <label className={styles.label}>{label}</label>
        <div className={styles.partners_container}>
          {partners?.map((partner) => (
            <div key={partner.value} className={styles.partner}>
              <div className={styles.name}>{partner.label}</div>
              <div
                className={styles.remove_icon}
                onClick={() => {
                  dispatch(removeId(partner.value));
                }}
              >
                <IoMdClose size={20} color={Colors.FAILED_COLOR} />
              </div>
            </div>
          ))}
        </div>
        <IoMdAddCircle
          size={24}
          color={Colors.SUCCEEDED_COLOR}
          className={styles.add_icon}
          onClick={() => {
            setShowChoosePartnerModal(true);
          }}
        />
      </div>

      {showChoosePartnerModal && (
        <SelectPartnerModal
          header="choose-warehouse"
          close={() => setShowChoosePartnerModal(false)}
          chooseAction={(data) => {
            dispatch(addId({ value: data._id, label: data.name }));
          }}
          url={`${BASEURL}/users?limit=15&isActive=true&isApproved=true&type=${partnerType}`}
          placeholder="enter-company-name"
        />
      )}
    </>
  );
};

export default SearchPartnerContainer;
