import { memo } from "react";

const HeaderWithSlogn = () => {
  return (
    <div className="hidden sm:flex text-center mb-4 w-[225px] h-[70px] sm:w-[400px] sm:h-[267px] relative  items-center justify-center flex-col">
      {/* <h2 className="sm:hidden block text-xl">Smart Pharma</h2> */}
      <img
        src="/assets/slogen.png"
        alt="none"
        className=" w-[400px] h-[267px] object-fill sm:block"
      />
    </div>
  );
};

export default memo(HeaderWithSlogn);
