import { configureStore } from "@reduxjs/toolkit";

import countriesByRegionReducer from '../slices/countriesByRegionSlice';
import countryInfoReducer from '../slices/countryInfoSlice';
import foundCountriesReducer from '../slices/foundCountriesSlice';
import borderCountriesReducer from '../slices/borderCountriesSlice';

export const store = configureStore({
  reducer: {
    countriesByRegion: countriesByRegionReducer,
    countryInfo: countryInfoReducer,
    foundCountries: foundCountriesReducer,
    borderCountries: borderCountriesReducer
  }
});