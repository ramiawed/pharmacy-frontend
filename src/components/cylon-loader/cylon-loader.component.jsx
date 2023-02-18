import React from "react";
import ReactLoading from "react-loading";

// constants
import { Colors } from "../../utils/constants";

const CylonLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItem: "center",
        justifyContent: "space-around",
      }}
    >
      <ReactLoading color={Colors.LIGHT_COLOR} type="cylon" />
    </div>
  );
};

export default CylonLoader;
