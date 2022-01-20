export const UserTypeConstants = {
  COMPANY: "company",
  WAREHOUSE: "warehouse",
  NORMAL: "normal",
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
  MAIN_COLOR: "#3d425c",
  SECONDARY_COLOR: "#566092",
  SUCCEEDED_COLOR: "#2aa70b",
  FAILED_COLOR: "#ff787e",
  YELLOW_COLOR: "#e9b93f",
  OFFER_COLOR: "#0f04",
  WHITE_COLOR: "#fff",
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

// export const BASEURL = "https://salty-brook-65681.herokuapp.com/api/v1";
export const BASEURL = "http://localhost:8000/api/v1";
// export const SERVER_URL = "https://salty-brook-65681.herokuapp.com";
export const SERVER_URL = "http://localhost:8000";
