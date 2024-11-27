import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCountryByFullName } from '../../services/countriesApi';

export const fetchCountryInfo = createAsyncThunk(
  'countryInfo/fetchCountryInfo',
  getCountryByFullName
);

const initialState = {
  country: null,
  countryLoadingStatus: 'idle',
  name: ''
};

const countryInfoSlice = createSlice({
  name: 'countryInfo',
  initialState,
  reducers: {
    changeCountryName: (state, action) => {
      state.name = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountryInfo.pending, (state) => {
        state.countryLoadingStatus = 'loading';
      })
      .addCase(fetchCountryInfo.fulfilled, (state, action) => {
        state.countryLoadingStatus = 'success';
        state.country = action.payload[0];
      })
      .addCase(fetchCountryInfo.rejected, (state) => {
        state.countryLoadingStatus = 'error';
      })
      .addDefaultCase(() => { });
  },
  selectors: {
    selectCountryInfoAllData: (state) => state,
  }
});

export const { selectCountryInfoAllData } = countryInfoSlice.selectors;

export const { changeCountryName } = countryInfoSlice.actions;

export default countryInfoSlice.reducer;