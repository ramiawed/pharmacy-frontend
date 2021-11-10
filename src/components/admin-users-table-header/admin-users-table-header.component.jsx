// Table header in the admin-users component

import React from "react";
import { useTranslation } from "react-i18next";

import TableHeader from "../table-header/table-header.component";

import tableStyles from "../table.module.scss";

function AdminUserTableHeader() {
  const { t } = useTranslation();

  return (
    <>
      <TableHeader>
        <label className={tableStyles.label_large}>{t("user-name")}</label>
        <label className={tableStyles.label_small}>{t("user-approve")}</label>
        <label className={tableStyles.label_small}>{t("user-delete")}</label>
        <label className={tableStyles.label_small}>{t("show-medicines")}</label>
        <label className={tableStyles.label_large}>{t("user-email")}</label>
        <label className={tableStyles.label_medium}>{t("user-phone")}</label>
        <label className={tableStyles.label_medium}>{t("user-mobile")}</label>
        <label className={tableStyles.label_xsmall}></label>
        <label className={tableStyles.label_xsmall}></label>
      </TableHeader>
    </>
  );
}

export default AdminUserTableHeader;
