import React from "react";

import * as FileSaver from "file-saver";

import * as XLSX from "xlsx";
import Icon from "../icon/icon.component";
import { Colors, OfferTypes } from "../../utils/constants";
import { RiSave3Fill } from "react-icons/ri";
import { useTranslation } from "react-i18next";

const computeTotalPrice = (data) => {
  let total = 0;

  data.forEach((item) => {
    total =
      total +
      item.qty * item.item.price -
      (item.bonus && item.bonusType === OfferTypes.PERCENTAGE
        ? (item.qty * item.item.price * item.bonus) / 100
        : 0);
  });

  return total;
};

export const ExportCSV = ({ csvData, fileName }) => {
  const { t } = useTranslation();
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName) => {
    let jsonData = csvData.map((d) => {
      return {
        "الاسم التحاري": d.item.name,
        الشركة: d.item.company.name,
        "الشكل الصيدلاني": d.item.formula,
        العيار: d.item.caliber,
        التعبئة: d.item.packing,
        "السعر للصيدلاني": d.item.price,
        "السعر للعموم": d.item.customer_price,
        الكمية: d.qty,
        العرض: d.bonus
          ? d.bonus +
            (d.bonus
              ? d.bonusType === OfferTypes.PERCENTAGE
                ? t("after-bonus-percentage-label")
                : t("after-quantity-label")
              : "")
          : "",
        "السعر الاجمالي":
          d.qty * d.item.price -
          (d.bonus && d.bonusType === OfferTypes.PERCENTAGE
            ? (d.qty * d.item.price * d.bonus) / 100
            : 0),
      };
    });

    jsonData = [
      ...jsonData,
      {
        "الاسم التحاري": "",
        الشركة: "",
        "الشكل الصيدلاني": "",
        العيار: "",
        التعبئة: "",
        "السعر للصيدلاني": "",
        "السعر للعموم": "",
        الكمية: "",
        العرض: "",
        "السعر الاجمالي": computeTotalPrice(csvData),
      },
    ];
    const ws = XLSX.utils.json_to_sheet(jsonData);

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Icon
      selected={false}
      foreColor={Colors.DARK_COLOR}
      tooltip={t("save-order")}
      icon={() => <RiSave3Fill />}
      onclick={() => exportToCSV(csvData, fileName)}
      withBackground={true}
      text={t("save-order")}
    />
  );
};
