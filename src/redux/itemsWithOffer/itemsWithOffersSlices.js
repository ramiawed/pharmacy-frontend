import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../../utils/constants";

let CancelToken;
let source;

const initialState = {
  status: "idle",
  medicines: [],
  count: 0,
  error: "",
  pageState: {
    searchName: "",
    searchCompaniesIds: [],
    searchWarehousesIds: [],
    page: 1,
  },
};

export const cancelOperation = () => {
  if (source) {
    source.cancel("operation canceled by user");
  }
};

const resetCancelAndSource = () => {
  CancelToken = null;
  source = null;
};

export const getOffers = createAsyncThunk(
  "itemsWithOffers/getOfferMedicines",
  async ({ token }, { rejectWithValue, getState }) => {
    try {
      const {
        itemsWithOffers: { pageState },
      } = getState();
      CancelToken = axios.CancelToken;
      source = CancelToken.source();

      let buildUrl = `${BASEURL}/items/items-with-offer?page=${pageState.page}&limit=15`;

      if (pageState.searchName.trim() !== "") {
        buildUrl = buildUrl + `&itemName=${pageState.searchName}`;
      }

      const response = await axios.get(buildUrl, {
        params: {
          searchCompaniesIds: pageState.searchCompaniesIds.map(
            (company) => company.value
          ),
          searchWarehousesIds: pageState.searchWarehousesIds.map(
            (warehouse) => warehouse.value
          ),
        },
        cancelToken: source.token,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      resetCancelAndSource();

      return response.data;
    } catch (err) {
      resetCancelAndSource();

      if (err.code === "ECONNABORTED" && err.message.startsWith("timeout")) {
        return rejectWithValue("timeout");
      }
      if (axios.isCancel(err)) {
        return rejectWithValue("cancel");
      }

      if (!err.response) {
        return rejectWithValue("network failed");
      }

      return rejectWithValue(err.response.data);
    }
  }
);

export const itemsWithOffersSlice = createSlice({
  name: "itemsWithOffersSlice",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
      state.error = "";
    },

    resetError: (state) => {
      state.error = "";
    },

    setSearchName: (state, action) => {
      state.pageState = {
        ...state.pageState,
        searchName: action.payload,
      };
    },

    setPage: (state, action) => {
      state.pageState = {
        ...state.pageState,
        page: action.payload,
      };
    },

    addIdToCompaniesIds: (state, action) => {
      const { value } = action.payload;
      if (
        state.pageState.searchCompaniesIds.filter(
          (company) => company.value === value
        ).length === 0
      ) {
        state.pageState = {
          ...state.pageState,
          searchCompaniesIds: [
            ...state.pageState.searchCompaniesIds,
            action.payload,
          ],
        };
      }
    },

    removeIdFromCompaniesId: (state, action) => {
      const id = action.payload;
      const filteredArray = state.pageState.searchCompaniesIds.filter(
        (i) => i.value !== id
      );
      state.pageState = {
        ...state.pageState,
        searchCompaniesIds: [...filteredArray],
      };
    },

    addIdToWarehousesIds: (state, action) => {
      const { value } = action.payload;
      if (
        state.pageState.searchWarehousesIds.filter(
          (warehouse) => warehouse.value === value
        ).length === 0
      ) {
        state.pageState = {
          ...state.pageState,
          searchWarehousesIds: [
            ...state.pageState.searchWarehousesIds,
            action.payload,
          ],
        };
      }
    },

    removeIdFromWarehousesId: (state, action) => {
      const id = action.payload;
      const filteredArray = state.pageState.searchWarehousesIds.filter(
        (i) => i.value !== id
      );
      state.pageState = {
        ...state.pageState,
        searchWarehousesIds: [...filteredArray],
      };
    },

    resetOfferItemsArray: (state) => {
      state.medicines = [];
      state.count = 0;
      state.pageState = {
        ...state.pageState,
        page: 1,
      };
    },

    resetOfferItemsPageState: (state) => {
      state.pageState = {
        searchName: "",
        searchCompaniesIds: [],
        searchWarehousesIds: [],
        page: 1,
      };
    },

    offersSliceSignOut: (state) => {
      state.status = "idle";
      state.medicines = [];
      state.count = 0;
      state.error = "";
      state.pageState = {
        searchName: "",
        searchCompaniesIds: [],
        searchWarehousesIds: [],
        page: 1,
      };
    },
  },
  extraReducers: {
    [getOffers.pending]: (state) => {
      state.status = "loading";
    },
    [getOffers.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.medicines = [...state.medicines, ...action.payload.data.data];
      state.count = action.payload.count;
      state.error = "";
      state.pageState = {
        ...state.pageState,
        page: Math.ceil(state.medicines.length / 15) + 1,
      };
    },
    [getOffers.rejected]: (state, { error, meta, payload }) => {
      state.status = "failed";

      if (payload === "timeout") {
        state.error = payload;
      } else if (payload === "cancel") {
        state.error = "cancel operation msg";
      } else if (payload === "network failed") {
        state.error = "network failed";
      } else state.error = payload.message;
    },
  },
});

export const {
  resetStatus,
  resetError,
  resetMedicines,
  offersSliceSignOut,
  setSearchName,
  setPage,
  resetOfferItemsArray,
  resetOfferItemsPageState,
  addIdToCompaniesIds,
  addIdToWarehousesIds,
  removeIdFromCompaniesId,
  removeIdFromWarehousesId,
} = itemsWithOffersSlice.actions;

export const selectOfferMedicines = (state) => state.itemsWithOffers;

export default itemsWithOffersSlice.reducer;
