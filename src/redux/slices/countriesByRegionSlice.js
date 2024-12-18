import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { getCountriesByRegion } from '../../services/countriesApi';
import { STATUSES } from "../../utils/constants";

export const fetchCountriesByRegion = createAsyncThunk(
  'countriesByRegion/fetchCountriesByRegion',
  getCountriesByRegion, {
    condition: (region, { getState }) => {
      const { regionLoadedCountries } = getState().countriesByRegion;
      return regionLoadedCountries !== region;
    }
  }
);

const initialState = {
  countriesByRegion: [],
  countriesByRegionLoadingStatus: STATUSES.LOADING,
  regionLoadedCountries: null,
  activeRegion: 'Europe',
  pagination: {
    currentPage: 1,
    totalItems: null,
    itemsPerPage: 9
  }
};

const countriesByRegionSlice = createSlice({
  name: 'countriesByRegion',
  initialState,
  reducers: {
    changeActiveRegion: (state, action) => {
      state.activeRegion = action.payload;
    },
    updateCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    updateItemsPerPage: (state, action) => {
      state.pagination.itemsPerPage = action.payload;
      state.pagination.currentPage = Math.min(
        state.pagination.currentPage, 
        Math.ceil(state.pagination.totalItems / state.pagination.itemsPerPage)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountriesByRegion.pending, (state) => {
        state.countriesByRegionLoadingStatus = STATUSES.LOADING;
      })
      .addCase(fetchCountriesByRegion.fulfilled, (state, action) => {
        state.countriesByRegionLoadingStatus = STATUSES.SUCCESS;
        state.countriesByRegion = action.payload;
        state.pagination.totalItems = action.payload.length;
        state.pagination.currentPage = 1;
        state.regionLoadedCountries = state.activeRegion;
      })
      .addCase(fetchCountriesByRegion.rejected, (state) => {
        state.countriesByRegionLoadingStatus = STATUSES.ERROR;
        state.countriesByRegion = [];
        state.pagination.totalItems = null;
        state.regionLoadedCountries = null;
      })
      .addDefaultCase(() => { });
  },
  selectors: {
    selectCountriesByRegion: (state) => state.countriesByRegion,
    selectCountriesByRegionLoadingStatus: (state) => state.countriesByRegionLoadingStatus,
    selectActiveRegion: (state) => state.activeRegion,
    selectPagination: (state) => state.pagination,
    selectPaginationTotalItems: (state) => state.pagination.totalItems,
    selectPaginationItemsPerPage: (state) => state.pagination.itemsPerPage,
    selectPaginationCurrentPage: (state) => state.pagination.currentPage
  }
});

export const {
  selectCountriesByRegion,
  selectCountriesByRegionLoadingStatus,
  selectActiveRegion,
  selectPagination,
  selectPaginationTotalItems,
  selectPaginationItemsPerPage,
  selectPaginationCurrentPage
} = countriesByRegionSlice.selectors;

export const selectCountriesByRegionWithPagination = createSelector(
  selectCountriesByRegion,
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

export const selectPaginationItemsSettings = createSelector(
  selectPaginationTotalItems,
  (totalItems) => {
    const step = 3;
    const minItemsPerPage = 9;

    return {
      totalItems,
      step,
      minItemsPerPage,
      maxItemsPerPage: Math.max(totalItems, Math.ceil(totalItems / step) * step)
    }
  }
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

export const selectIsLoadingCountriesByRegion = createSelector(
  selectCountriesByRegionLoadingStatus,
  (status) => status === STATUSES.LOADING
);

export const selectIsErrorCountriesByRegion = createSelector(
  selectCountriesByRegionLoadingStatus,
  (status) => status === STATUSES.ERROR
);

export const selectCountriesByRegionStatusFlags = createSelector(
  selectCountriesByRegionLoadingStatus,
  (status) => ({
    isLoading: status === STATUSES.LOADING,
    isError: status === STATUSES.ERROR
  })
);

export const { changeActiveRegion, updateCurrentPage, updateItemsPerPage } = countriesByRegionSlice.actions;

export default countriesByRegionSlice.reducer;