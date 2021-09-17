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

export const Colors = {
  MAIN_COLOR: "#3d425c",
  SECONDARY_COLOR: "#566092",
  SUCCEEDED_COLOR: "#2aa70b",
  FAILED_COLOR: "#ff787e",
  YELLOW_COLOR: "#e9b93f",
};

export const SideNavLinks = {
  PARTNERS: "partners",
  ITEMS: "items",
  ORDERS: "orders",
  ADVERTISEMENTS: "advertisements",
  OFFERS: "offers",
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

export const BASEURL = "http://localhost:8000/api/v1";
