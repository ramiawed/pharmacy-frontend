import { FaUserAlt, FaMobile } from "react-icons/fa";
import { RiLockPasswordFill, RiUserReceived2Fill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import {
  AiFillPhone,
  AiFillEnvironment,
  AiFillSafetyCertificate,
} from "react-icons/ai";
import { GiMedicines, GiCreditsCurrency } from "react-icons/gi";

// choose the icon based on the id of the input
export const getIcon = (type) => {
  switch (type) {
    case "name":
      return <FaUserAlt />;

    case "certificateName":
      return <AiFillSafetyCertificate />;
    case "username":
      return <RiUserReceived2Fill />;
    case "password":
      return <RiLockPasswordFill />;
    case "email":
      return <MdEmail />;
    case "phone":
      return <AiFillPhone />;
    case "mobile":
      return <FaMobile />;
    case "city":
    case "district":
    case "street":
      return <AiFillEnvironment />;
    case "medicine":
      return <GiMedicines />;
    case "price":
      return <GiCreditsCurrency />;
    default:
      return <RiLockPasswordFill />;
  }
};
