import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

// redux stuff
import { selectUser } from "../../redux/auth/authSlice";

// components
import CompanyItems from "../../components/company-items/company-items.component";

function CompanyItemsPage() {
  const user = useSelector(selectUser);

  return user ? (
    <>
      <CompanyItems />
    </>
  ) : (
    <Redirect to="/signin" />
  );
}

export default CompanyItemsPage;
