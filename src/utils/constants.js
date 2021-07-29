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
};

export const SideNavLinks = {
  PARTNERS: "partners",
  ITEMS: "items",
  ORDERS: "orders",
  ADVERTISEMENTS: "advertisements",
  OFFERS: "offers",
  PROFILE: "profile",
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
