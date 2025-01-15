import { useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCountriesByRegionWithPagination,
  selectPaginationPagesInfo,
  selectIsLoadingCountriesByRegion,
  selectIsErrorCountriesByRegion,
  selectActiveRegion,
  fetchCountriesByRegion,
  updateCurrentPage,
  resetPagination
} from '../../redux/slices/countriesByRegionSlice';
import { changeSelectedCountryName } from '../../redux/slices/countryInfoSlice';
import { scrollToElement } from '../../utils/scrollToElement';

import CountriesList from "../CountriesList/CountriesList";
import Pagination from "../Pagination/Pagination";

const CountriesByRegion = ({ className }) => {

  const countriesListRef = useRef(null);

  const countries = useSelector(selectCountriesByRegionWithPagination);
  const { totalPages, currentPage, isMoreThanOnePage, hasPrevPage, hasNextPage } = useSelector(selectPaginationPagesInfo);
  const isLoading = useSelector(selectIsLoadingCountriesByRegion);
  const isError = useSelector(selectIsErrorCountriesByRegion);
  const activeRegion = useSelector(selectActiveRegion);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountriesByRegion(activeRegion));
  }, [dispatch, activeRegion]);

  useEffect(() => {
    return () => {
      dispatch(resetPagination());
    };
  }, [dispatch]);

  const onCountrySelected = useCallback((name) => {
    dispatch(changeSelectedCountryName(name));
  }, [dispatch]);

  const onPageChange = useCallback((page, isCurrentPage) => {
    if (isCurrentPage) return;

    dispatch(updateCurrentPage(page));
    setTimeout(() => scrollToElement(countriesListRef), 150);
  }, [dispatch]);

  return (
    <>
      <div className={className}>
        <CountriesList
          countries={countries}
          isLoading={isLoading}
          isError={isError}
          onCountrySelected={onCountrySelected}
          rows={3}
          ref={countriesListRef}
        />
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        isMoreThanOnePage={isMoreThanOnePage}
        hasPrevPage={hasPrevPage}
        hasNextPage={hasNextPage}
        isLoading={isLoading}
        onPageChange={onPageChange}
      />
    </>
  );
}

export default CountriesByRegion;