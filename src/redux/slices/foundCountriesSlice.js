import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCountriesByName } from '../../services/countriesApi';

export const fetchFoundCountries = createAsyncThunk(
  'foundCountries/fetchFoundCountries',
  getCountriesByName
);

const initialState = {
  countries: [],
  countriesLoadingStatus: 'idle',
  term: ''
};

const foundCountriesSlice = createSlice({
  name: 'foundCountries',
  initialState,
  reducers: {
    changeSearchTerm: (state, action) => {
      state.term = action.payload;
    },
    changeStatus: (state, action) => {
      state.countriesLoadingStatus = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoundCountries.pending, (state) => {
        state.countriesLoadingStatus = 'loading';
      })
      .addCase(fetchFoundCountries.fulfilled, (state, action) => {
        state.countriesLoadingStatus = 'success';
        state.countries = action.payload;
      })
      .addCase(fetchFoundCountries.rejected, (state) => {
        state.countriesLoadingStatus = 'error';
      })
      .addDefaultCase(() => { });
  },
  selectors: {
    selectSearchTerm: (state) => state.term,
    selectCountriesLoadingStatus: (state) => state.countriesLoadingStatus,
    selectCountries: (state) => state.countries
  }
});

export const { selectSearchTerm, selectCountriesLoadingStatus, selectCountries } = foundCountriesSlice.selectors;

export const { changeSearchTerm, changeStatus } = foundCountriesSlice.actions;

export default foundCountriesSlice.reducer;