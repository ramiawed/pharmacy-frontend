// Table header in the admin-users component
import React from "react";
import { useTranslation } from "react-i18next";

// components
import ChildFlexOneDiv from "../child-flex-one-div/child-flex-one-div.component";
import FixedSizeDiv from "../fixed-size-div/fixed-size-div.component";
import RowContainer from "../row-container/row-container.component";

function AdminUserTableHeader() {
  const { t } = useTranslation();

  return (
    <RowContainer isHeader={true}>
      <ChildFlexOneDiv>
        <label>{t("name")}</label>
      </ChildFlexOneDiv>

      <FixedSizeDiv size="large">
        <label>{t("user type")}</label>
      </FixedSizeDiv>

      <FixedSizeDiv size="large">
        <label>{t("mobile")}</label>
      </FixedSizeDiv>

      <FixedSizeDiv size="medium">
        <label>{t("show items")}</label>
      </FixedSizeDiv>
      <FixedSizeDiv size="medium">
        <label>{t("points")}</label>
      </FixedSizeDiv>
      <FixedSizeDiv size="small"></FixedSizeDiv>
    </RowContainer>
  );
}

export default AdminUserTableHeader;
