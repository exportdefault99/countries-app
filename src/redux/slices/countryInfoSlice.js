import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCountryByFullName } from '../../services/countriesApi';
import { STATUSES } from "../../utils/constants";

export const fetchCountryInfo = createAsyncThunk(
  'countryInfo/fetchCountryInfo',
  getCountryByFullName, {
    condition: (countryName, { getState }) => {
      const { cacheSelectedCountries } = getState().countryInfo;
      return !!(countryName && !cacheSelectedCountries[countryName]);
    }
  }
);

const initialState = {
  country: null,
  countryLoadingStatus: STATUSES.IDLE,
  cacheSelectedCountries: {},
  selectedCountryName: null
};

const countryInfoSlice = createSlice({
  name: 'countryInfo',
  initialState,
  reducers: {
    changeSelectedCountryName: (state, action) => {
      state.selectedCountryName = action.payload;
      state.country = state.cacheSelectedCountries[action.payload] || state.country;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountryInfo.pending, (state) => {
        state.countryLoadingStatus = STATUSES.LOADING;
      })
      .addCase(fetchCountryInfo.fulfilled, (state, action) => {
        state.countryLoadingStatus = STATUSES.SUCCESS;
        state.country = action.payload[0];
        state.cacheSelectedCountries[action.payload[0].name] = action.payload[0];
      })
      .addCase(fetchCountryInfo.rejected, (state) => {
        state.countryLoadingStatus = STATUSES.ERROR;
      })
      .addDefaultCase(() => { });
  },
  selectors: {
    selectCountryInfoAllData: (state) => state,
  }
});

export const { selectCountryInfoAllData } = countryInfoSlice.selectors;

export const { changeSelectedCountryName } = countryInfoSlice.actions;

export default countryInfoSlice.reducer;