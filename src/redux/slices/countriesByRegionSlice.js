import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { getCountriesByRegion } from '../../services/countriesApi';

export const fetchCountriesByRegion = createAsyncThunk(
  'countriesByRegion/fetchCountriesByRegion',
  getCountriesByRegion
);

const initialState = {
  countriesByRegion: [],
  countriesByRegionLoadingStatus: 'loading',
  activeRegion: 'Europe',
  pagination: {
    totalPages: null,
    currentPage: 1,
    totalItems: null,
    itemsPerPage: 15
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
      state.pagination.totalPages = Math.ceil(state.pagination.totalItems / state.pagination.itemsPerPage);
      state.pagination.currentPage = Math.min(Math.max(state.pagination.currentPage, 1), state.pagination.totalPages);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountriesByRegion.pending, (state) => {
        state.countriesByRegionLoadingStatus = 'loading';
      })
      .addCase(fetchCountriesByRegion.fulfilled, (state, action) => {
        state.countriesByRegionLoadingStatus = 'success';
        state.countriesByRegion = action.payload;
        state.pagination.totalItems = action.payload.length;
        state.pagination.currentPage = 1;
        state.pagination.totalPages = Math.ceil(state.pagination.totalItems / state.pagination.itemsPerPage);
      })
      .addCase(fetchCountriesByRegion.rejected, (state) => {
        state.countriesByRegionLoadingStatus = 'error';
      })
      .addDefaultCase(() => { });
  },
  selectors: {
    selectCountriesByRegionAllData: (state) => state,
    selectCountriesByRegion: (state) => state.countriesByRegion,
    selectCountriesByRegionLoadingStatus: (state) => state.countriesByRegionLoadingStatus,
    selectActiveRegion: (state) => state.activeRegion,
    selectPagination: (state) => state.pagination
  }
});

export const { 
  selectCountriesByRegionAllData,
  selectCountriesByRegion,
  selectCountriesByRegionLoadingStatus, 
  selectActiveRegion,
  selectPagination
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

export const { changeActiveRegion, updateCurrentPage, updateItemsPerPage } = countriesByRegionSlice.actions;

export default countriesByRegionSlice.reducer;