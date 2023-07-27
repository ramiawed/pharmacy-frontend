import React from "react";

const CenterContainer = ({ children, style }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 justify-items-stretch items-stretch px-[20px] py-[10px] place-content-center">
      {children}
    </div>
  );
};

export default CenterContainer;
