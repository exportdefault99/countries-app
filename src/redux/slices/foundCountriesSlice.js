// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getCountriesByName } from '../../services/countriesApi';

// export const fetchFoundCountries = createAsyncThunk(
//   'foundCountries/fetchFoundCountries',
//   getCountriesByName
// );

// const initialState = {
//   countries: [],
//   countriesLoadingStatus: 'idle',
//   term: ''
// };

// const foundCountriesSlice = createSlice({
//   name: 'foundCountries',
//   initialState,
//   reducers: {
//     changeSearchTerm: (state, action) => {
//       state.term = action.payload;
//     },
//     changeStatus: (state, action) => {
//       state.countriesLoadingStatus = action.payload;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchFoundCountries.pending, (state) => {
//         state.countriesLoadingStatus = 'loading';
//       })
//       .addCase(fetchFoundCountries.fulfilled, (state, action) => {
//         state.countriesLoadingStatus = 'success';
//         state.countries = action.payload;
//       })
//       .addCase(fetchFoundCountries.rejected, (state) => {
//         state.countriesLoadingStatus = 'error';
//       })
//       .addDefaultCase(() => { });
//   },
//   selectors: {
//     selectSearchTerm: (state) => state.term,
//     selectCountriesLoadingStatus: (state) => state.countriesLoadingStatus,
//     selectCountries: (state) => state.countries
//   }
// });

// export const { selectSearchTerm, selectCountriesLoadingStatus, selectCountries } = foundCountriesSlice.selectors;

// export const { changeSearchTerm, changeStatus } = foundCountriesSlice.actions;

// export default foundCountriesSlice.reducer;

import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { getCountriesByName } from '../../services/countriesApi';
import { STATUSES } from "../../utils/constants";

export const fetchFoundCountries = createAsyncThunk(
  'foundCountries/fetchFoundCountries',
  async (searchTerm) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return getCountriesByName(searchTerm);
  }, {
    condition: (searchTerm) => {
      return searchTerm.length > 2;
    }
  }
);

const initialState = {
  countries: [],
  countriesLoadingStatus: STATUSES.IDLE,
  term: ''
};

const foundCountriesSlice = createSlice({
  name: 'foundCountries',
  initialState,
  reducers: {
    changeSearchTerm: (state, action) => {
      state.term = action.payload;
      state.countriesLoadingStatus = action.payload.length ? state.countriesLoadingStatus : STATUSES.IDLE;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoundCountries.pending, (state) => {
        state.countriesLoadingStatus = STATUSES.LOADING;
      })
      .addCase(fetchFoundCountries.fulfilled, (state, action) => {
        state.countriesLoadingStatus = STATUSES.SUCCESS;
        state.countries = action.payload;
      })
      .addCase(fetchFoundCountries.rejected, (state) => {
        state.countriesLoadingStatus = STATUSES.ERROR;
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

export const selectIsLoadingFoundCountries = createSelector(
  selectCountriesLoadingStatus,
  (status) => status === STATUSES.LOADING
);

export const selectIsSuccessFoundCountries = createSelector(
  selectCountriesLoadingStatus,
  (status) => status === STATUSES.SUCCESS
);

export const selectIsErrorFoundCountries = createSelector(
  selectCountriesLoadingStatus,
  (status) => status === STATUSES.ERROR
);

export const { changeSearchTerm } = foundCountriesSlice.actions;

export default foundCountriesSlice.reducer;