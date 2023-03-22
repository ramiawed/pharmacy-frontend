import React from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

// components
import Icon from "../icon/icon.component";

// constants
import { Colors } from "../../utils/constants";

// react icons
import { RiSave3Fill } from "react-icons/ri";

// redux stuff
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/auth/authSlice";
import { selectCompanies } from "../../redux/company/companySlice";

export const ExportCSVFromURL = ({ url, fileName }) => {
  const { t } = useTranslation();

  // selectors
  const token = useSelector(selectToken);
  const { companies } = useSelector(selectCompanies);

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  const fileExtension = ".xlsx";

  const exportToCSV = async (fileName) => {
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const items = response.data.data.items.map((item) => {
          const companyName = companies.filter((i) => i._id === item.company)[0]
            .name;

          return {
            ...item,
            company: companyName,
          };
        });
        const ws = XLSX.utils.json_to_sheet(items);

        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

        const data = new Blob([excelBuffer], { type: fileType });

        FileSaver.saveAs(data, fileName + fileExtension);
      });
  };

  return (
    <Icon
      selected={false}
      foreColor={Colors.MAIN_COLOR}
      tooltip={t("export-items")}
      icon={() => <RiSave3Fill />}
      onclick={(e) => exportToCSV(fileName)}
      withBackground={true}
    />
  );
};
