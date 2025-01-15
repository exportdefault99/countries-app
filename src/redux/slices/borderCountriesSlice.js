import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { getCountriesByAlphaCodes } from '../../services/countriesApi';
import { STATUSES } from "../../utils/constants";

export const fetchBorderCountries = createAsyncThunk(
  'borderCountries/fetchBorderCountries',
  getCountriesByAlphaCodes
);

const initialState = {
  countries: [],
  countriesLoadingStatus: STATUSES.LOADING,
  isOddStep: true,
  pagination: {
    currentPage: 1,
    totalItems: null,
    itemsPerPage: 3
  }
};

const borderCountriesSlice = createSlice({
  name: 'borderCountries',
  initialState,
  reducers: {
    updateCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    updateStepFlag: (state, action) => {
      state.isOddStep = action.payload;
    },
    resetPagination: (state) => {
      state.pagination.currentPage = 1;
      state.pagination.itemsPerPage = state.isOddStep ? 3 : 4;
    },
    resetBorderCountries: (state) => {
      state.countriesLoadingStatus = STATUSES.LOADING;
      state.totalItems = null;
      state.countries = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBorderCountries.pending, (state) => {
        state.countriesLoadingStatus = STATUSES.LOADING;
      })
      .addCase(fetchBorderCountries.fulfilled, (state, action) => {
        state.countriesLoadingStatus = STATUSES.SUCCESS;
        state.countries = action.payload;
        state.pagination.totalItems = action.payload.length;
        state.pagination.currentPage = 1;
      })
      .addCase(fetchBorderCountries.rejected, (state) => {
        state.countriesLoadingStatus = STATUSES.ERROR;
        state.countries = [];
        state.pagination.totalItems = null;
      })
      .addDefaultCase(() => { });
  },
  selectors: {
    selectBorderCountriesLoadingStatus: (state) => state.countriesLoadingStatus,
    selectBorderCountries: (state) => state.countries,
    selectIsOddStep: (state) => state.isOddStep,
    selectPagination: (state) => state.pagination,
    selectPaginationTotalItems: (state) => state.pagination.totalItems,
    selectPaginationItemsPerPage: (state) => state.pagination.itemsPerPage,
    selectPaginationCurrentPage: (state) => state.pagination.currentPage
  }
});



export const { 
  selectBorderCountriesLoadingStatus, 
  selectBorderCountries, 
  selectIsOddStep, 
  selectPagination,
  selectPaginationTotalItems,
  selectPaginationItemsPerPage,
  selectPaginationCurrentPage
} = borderCountriesSlice.selectors;

export const selectBorderCountriesWithPagination = createSelector(
  selectBorderCountries,
  selectPagination,
  (countries, { totalItems, itemsPerPage, currentPage }) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    return countries.slice(startIndex, endIndex);
  }
);

export const selectPaginationItemsInfo = createSelector(
  selectPaginationTotalItems,
  selectPaginationItemsPerPage,
  (totalItems, itemsPerPage) => ({ totalItems, itemsPerPage })
);

export const selectPaginationTotalPages = createSelector(
  selectPaginationItemsInfo,
  ({ totalItems, itemsPerPage }) => totalItems && Math.ceil(totalItems / itemsPerPage)
);

export const selectPaginationPagesInfo = createSelector(
  selectPaginationTotalPages,
  selectPaginationCurrentPage,
  (totalPages, currentPage) => ({
    totalPages,
    currentPage,
    isMoreThanOnePage: totalPages > 1,
    hasPrevPage: currentPage > 1,
    hasNextPage: currentPage < totalPages
  })
);

export const selectIsLoadingBorderCountries = createSelector(
  selectBorderCountriesLoadingStatus,
  (status) => status === STATUSES.LOADING
);

export const selectIsSuccessBorderCountries = createSelector(
  selectBorderCountriesLoadingStatus,
  (status) => status === STATUSES.SUCCESS
);

export const selectIsErrorBorderCountries = createSelector(
  selectBorderCountriesLoadingStatus,
  (status) => status === STATUSES.ERROR
);

export const { updateStepFlag, updateCurrentPage, resetPagination, resetBorderCountries } = borderCountriesSlice.actions;

export default borderCountriesSlice.reducer;