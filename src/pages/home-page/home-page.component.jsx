import React from "react";
import Introduction from "../../components/introduction/introduction.component";
import Offers from "../../components/offers/offers.component";

function HomePage() {
  return (
    <div>
      <Introduction />
      <Offers title="most-visited-company" />
    </div>
  );
}

export default HomePage;
