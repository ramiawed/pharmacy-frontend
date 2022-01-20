import React from "react";
import { useTranslation } from "react-i18next";

// components
import Modal from "../modal/modal.component";
import Order from "../order/order.component";

// redux stuff
import { selectUsers, setOrderBy } from "../../redux/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";

// constants
import { OrderOptions } from "../../utils/constants";

function AdminUsersOrderModal({ close, okHandler }) {
  const { t } = useTranslation();

  const { pageState } = useSelector(selectUsers);

  const dispatch = useDispatch();

  const orderOptions = [
    { value: OrderOptions.NAME, label: t("user-name") },
    { value: OrderOptions.DATE_CREATED, label: t("user-created-at") },
    { value: OrderOptions.DATE_UPDATED, label: t("user-updated-at") },
    { value: OrderOptions.ACTIVE, label: t("deleted-account") },
    { value: OrderOptions.APPROVED, label: t("approved-state") },
    { value: OrderOptions.CITY, label: t("user-city") },
  ];

  // add/remove field from orderBy object
  const addOrRemoveField = (field) => {
    if (field in pageState.orderBy) {
      const obj = { ...pageState.orderBy };
      delete obj[field];
      dispatch(setOrderBy(obj));
    } else {
      dispatch(
        setOrderBy({
          ...pageState.orderBy,
          [field]: 1,
        })
      );
    }
  };

  // change the order option (ascending, descending) for a specific field
  const changeFieldValue = (field, value) => {
    dispatch(
      setOrderBy({
        ...pageState.orderBy,
        [field]: value,
      })
    );
  };

  return (
    <Modal
      header="order-results"
      cancelLabel="close-label"
      okLabel="ok-label"
      closeModal={close}
      small={true}
      okModal={okHandler}
    >
      <Order
        arr={orderOptions}
        orderBy={pageState.orderBy}
        orderChange={(field) => addOrRemoveField(field)}
        valueChanged={(field, value) => changeFieldValue(field, value)}
      />
    </Modal>
  );
}

export default AdminUsersOrderModal;
