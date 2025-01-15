import { useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  selectBorderCountriesWithPagination,
  selectPaginationPagesInfo,
  selectIsLoadingBorderCountries,
  selectIsErrorBorderCountries,
  updateCurrentPage, 
  resetPagination,
  resetBorderCountries,
  fetchBorderCountries
} from '../../redux/slices/borderCountriesSlice';
import { changeSelectedCountryName } from '../../redux/slices/countryInfoSlice';
import { scrollToElement } from '../../utils/scrollToElement';

import CountriesList from "../CountriesList/CountriesList";
import Pagination from "../Pagination/Pagination";

const BorderCountries = ({ borders, className }) => {

  const countriesListRef = useRef(null);

  const countries = useSelector(selectBorderCountriesWithPagination);
  const { totalPages, currentPage, isMoreThanOnePage, hasPrevPage, hasNextPage } = useSelector(selectPaginationPagesInfo);
  const isLoading = useSelector(selectIsLoadingBorderCountries);
  const isError = useSelector(selectIsErrorBorderCountries);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!borders) return;
    
    const alphaCodes = borders.join(',');
    dispatch(fetchBorderCountries(alphaCodes));
  }, [dispatch, borders]);

  useEffect(() => {
    return () => {
      dispatch(resetPagination());
      dispatch(resetBorderCountries());
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
          rows={1}
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
 
export default BorderCountries;