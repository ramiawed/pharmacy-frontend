import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// redux stuff
import { useSelector } from "react-redux";
import { selectFavorites } from "../../redux/favorites/favoritesSlice";

// components
import ExpandableContainer from "../../components/expandable-container/expandable-container.component";
import Company from "../../components/company/company.component";
import Warehouse from "../../components/warehouse/warehouse.component";

// constants
import { UserTypeConstants } from "../../utils/constants.js";

function FavoritesPage() {
  const { t } = useTranslation();
  const favorites = useSelector(selectFavorites);

  const [companiesContainerExpanded, setCompaniesContainerExpanded] =
    useState(false);
  const [warehousesContainerExpanded, setWarehousesContainerExpanded] =
    useState(false);

  return (
    <div>
      <ExpandableContainer
        labelText={t("companies")}
        expanded={companiesContainerExpanded}
        changeExpanded={() =>
          setCompaniesContainerExpanded(!companiesContainerExpanded)
        }
      >
        {favorites
          .filter((favorite) => favorite.type === UserTypeConstants.COMPANY)
          .map((favorite) => (
            <Company key={favorite._id} company={favorite} />
          ))}
      </ExpandableContainer>
      <ExpandableContainer
        labelText={t("warehouses")}
        expanded={warehousesContainerExpanded}
        changeExpanded={() =>
          setWarehousesContainerExpanded(!warehousesContainerExpanded)
        }
      >
        {favorites
          .filter((favorite) => favorite.type === UserTypeConstants.WAREHOUSE)
          .map((favorite) => (
            <Warehouse key={favorite._id} warehouse={favorite} />
          ))}
      </ExpandableContainer>
    </div>
  );
}

export default FavoritesPage;
