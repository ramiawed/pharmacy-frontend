import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

// components
import Icon from "../action-icon/action-icon.component";

// constants
import { BASEURL, Colors } from "../../utils/constants";

// react icons
import { RiSave3Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/authSlice";

export const ExportCSVFromURL = ({ url, fileName }) => {
  const { t } = useTranslation();
  const token = useSelector(selectToken);

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  const fileExtension = ".xlsx";

  const exportToCSV = async (fileName) => {
    await axios
      .get(url, {
        // timeout: 10000,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const ws = XLSX.utils.json_to_sheet(response.data.data.items);

        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

        const data = new Blob([excelBuffer], { type: fileType });

        FileSaver.saveAs(data, fileName + fileExtension);
      });
  };

  return (
    <Icon
      selected={false}
      foreColor={Colors.SECONDARY_COLOR}
      tooltip={t("export-items")}
      icon={() => <RiSave3Fill />}
      onclick={(e) => exportToCSV(fileName)}
      withBackground={true}
    />
  );
};

{
}
