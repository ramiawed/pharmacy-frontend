export const UserTypeConstants = {
  COMPANY: "company",
  WAREHOUSE: "warehouse",
  ADMIN: "admin",
  GUEST: "normal",
  PHARMACY: "pharmacy",
  ALL: "all",
};

export const UserApprovedState = {
  APPROVED: "approved-account",
  NOT_APPROVED: "not-approved-account",
  ALL: "all",
};

export const ShowWarehouseItems = {
  SHOW: "show-items",
  DONT_SHOW: "dont-show-items",
  ALL: "all",
};

export const UserActiveState = {
  ACTIVE: "not-deleted-account",
  INACTIVE: "deleted-account",
  ALL: "all",
};

export const GuestJob = {
  STUDENT: "student",
  PHARMACIST: "pharmacist",
  EMPLOYEE: "employee",
  NONE: "user-job",
};

export const WarehouseOrderStatus = {
  ALL: "all",
  UNREAD: "unread",
  RECEIVED: "received",
  SENT: "sent",
  WILL_DONT_SERVER: "will-dont-serve",
};

export const PharmacyOrderStatus = {
  ALL: "all",
  RECEIVED: "received",
  SENT: "sent",
};

export const AdminOrderStatus = {
  ALL: "all",
  SEEN: "seen",
  NOT_SEEN: "not-seen",
};

export const CitiesName = {
  ALEPPO: "aleppo",
  DAMASCUS: "damascus",
  DARAA: "daraa",
  DEIR_EZ_ZOR: "deir_ez_zor",
  HAMA: "hama",
  AL_HASAKAH: "al_hasakah",
  HOMS: "homs",
  IDLIB: "idlib",
  LATAKIA: "latakia",
  QUNEITRA: "guneitra",
  RAQQA: "RAQQA",
  AL_SUWAYDA: "al_suwayda",
  TARTUS: "tartus",
  DAMASCUS_COUNTRYSIDE: "damascus_countryside",
  NONE: "city-name",
  ALL: "all-cities",
};

export const Colors = {
  MAIN_COLOR: "#4267B2",
  SECONDARY_COLOR: "#acb3c3",
  BACKUP_COLOR: "#99cf16",
  SUCCEEDED_COLOR: "#2aa70b",
  FAILED_COLOR: "#ff787e",
  YELLOW_COLOR: "#e9b93f",
  OFFER_COLOR: "#81bbf5a4",
  WHITE_COLOR: "#fff",
  BLUE_COLOR: "#00A5CF",
  GREY_COLOR: "#898F9C",
};

export const SideNavLinks = {
  PARTNERS: "partners",
  ITEMS: "items",
  ORDERS: "orders",
  ADVERTISEMENTS: "advertisements",
  NOTIFICATIONS: "notifications",
  PROFILE: "profile",
  SETTINGS: "settings",
  STATISTICS: "statistics",
};

export const TopNavLinks = {
  HOME: "home",
  COMPANIES: "companies",
  WAREHOUSES: "warehouses",
  FAVORITES: "favorites",
  CART: "cart",
  MEDICINES: "medicines",
  NOTIFICATIONS: "notifications",
  SIGNOUT: "signout",
};

export const OrderOptions = {
  NAME: "name",
  DATE_CREATED: "createdAt",
  DATE_UPDATED: "updatedAt",
  APPROVED: "isApproved",
  ACTIVE: "isActive",
  CITY: "city",
  DISTRICT: "district",
  STREET: "street",
};

export const OfferTypes = {
  PIECES: "pieces",
  PERCENTAGE: "percentage",
  SELECT_OFFER_TYPE: "select-offer-type",
};

export const DateOptions = {
  ONE_DAY: "1D",
  THREE_DAY: "3D",
  ONE_WEEK: "1W",
  TWO_WEEK: "2W",
  ONE_MONTH: "1M",
  TWO_MONTH: "2M",
  SIX_MONTH: "6M",
  ONE_YEAR: "1Y",
};

export const AdditionalColors = [
  "#1a535c",
  "#6D597A",
  "#0B86B2",
  "#3D5A80",
  "#E56B6F",
  "#ffe66d",
];

export const toEnglishNumber = (strNum) => {
  var ar = "٠١٢٣٤٥٦٧٨٩".split("");
  var en = "0123456789".split("");
  strNum = strNum.replace(/[٠١٢٣٤٥٦٧٨٩]/g, (x) => en[ar.indexOf(x)]);
  strNum = strNum.replace(/[^\d]/g, "");
  return strNum;
};

export const onKeyPressForNumberInput = (event) => {
  return event.charCode >= 48 && event.charCode <= 57;
};

// export const BASEURL = "https://salty-brook-65681.herokuapp.com/api/v1";
export const BASEURL = "http://localhost:8000/api/v1";
// export const BASEURL = "http://67.205.165.65/api/v1";
// export const SERVER_URL = "https://salty-brook-65681.herokuapp.com";
export const SERVER_URL = "http://localhost:8000";
// export const SERVER_URL = "http://67.205.165.65/";
