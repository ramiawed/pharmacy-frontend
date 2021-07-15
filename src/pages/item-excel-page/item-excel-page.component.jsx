import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import ItemsFromExcel from "../../components/items-from-excel/items-from-excel.component";
import { selectUser } from "../../redux/auth/authSlice";

function ItemExcelPage() {
  const user = useSelector(selectUser);

  return user ? (
    <>
      <ItemsFromExcel />
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default ItemExcelPage;
