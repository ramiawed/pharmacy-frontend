import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

// components
import { ExportCSVFromURL } from "../export-csv-from-url/export-csv-from-url.component";
import Icon from "../action-icon/action-icon.component";

// icons
import { RiAddCircleFill, RiRefreshLine } from "react-icons/ri";
import { SiMicrosoftexcel } from "react-icons/si";
import { IoMdArrowRoundBack } from "react-icons/io";

// constants and utils
import { BASEURL, Colors, UserTypeConstants } from "../../utils/constants";

// styles
import generalStyles from "../../style.module.scss";

function ItemsPageActions({ user, company, search, warehouse }) {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div className={generalStyles.actions}>
      <Icon
        foreColor={Colors.MAIN_COLOR}
        selected={false}
        icon={() => <RiRefreshLine />}
        tooltip={t("refresh-tooltip")}
        onclick={search}
        withBackground={true}
      />
      {user.type === UserTypeConstants.COMPANY ||
      (user.type === UserTypeConstants.ADMIN &&
        company !== null &&
        company.allowAdmin) ? (
        <>
          <Icon
            foreColor={Colors.MAIN_COLOR}
            selected={false}
            icon={() => <RiAddCircleFill />}
            tooltip={t("add-item")}
            onclick={() => {
              history.push("/item", {
                from: user.type,
                type: "new",
                allowAction: true,
                itemId: null,
                companyId:
                  user.type === UserTypeConstants.COMPANY
                    ? user._id
                    : company._id,
                warehouseId: null,
              });
            }}
            withBackground={true}
          />

          <Icon
            foreColor={Colors.MAIN_COLOR}
            selected={false}
            icon={() => <SiMicrosoftexcel />}
            tooltip={t("items-from-excel")}
            onclick={() => {
              history.push("/items-from-excel", {
                companyId:
                  user.type === UserTypeConstants.COMPANY
                    ? user._id
                    : company._id,
              });
            }}
            withBackground={true}
          />

          <ExportCSVFromURL
            url={`${BASEURL}/items/allItemForCompany/${
              user.type === UserTypeConstants.COMPANY ? user._id : company._id
            }`}
            fileName="filename"
          />
        </>
      ) : (
        <></>
      )}

      {(user.type === UserTypeConstants.WAREHOUSE ||
        user.type === UserTypeConstants.ADMIN) &&
        warehouse !== null && (
          <ExportCSVFromURL
            url={`${BASEURL}/items/allItemForWarehouse/${
              user.type === UserTypeConstants.WAREHOUSE
                ? user._id
                : warehouse._id
            }`}
            fileName="filename"
          />
        )}

      <Icon
        withBackground={true}
        tooltip={t("go-back")}
        onclick={() => {
          history.goBack();
        }}
        icon={() => <IoMdArrowRoundBack />}
        foreColor={Colors.MAIN_COLOR}
      />
    </div>
  );
}

export default ItemsPageActions;
