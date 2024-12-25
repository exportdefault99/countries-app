import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPaginationPagesInfo, selectIsLoadingCountriesByRegion, updateCurrentPage, resetPagination } from '../../redux/slices/countriesByRegionSlice';

import styles from './CountriesListPagination.module.scss';

const CountriesListPagination = ({ scrollToCountriesList }) => {

  const { totalPages, currentPage, isMoreThanOnePage, hasPrevPage, hasNextPage } = useSelector(selectPaginationPagesInfo);
  const isLoading = useSelector(selectIsLoadingCountriesByRegion);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetPagination());
    };
  }, [dispatch]);
  
  if (!isMoreThanOnePage) {
    return null;
  }

  const onPageChange = (page, isCurrentPage) => {
    if (isCurrentPage) return;

    dispatch(updateCurrentPage(page));
    setTimeout(scrollToCountriesList, 150);
  }
  
  const prevPageButton = hasPrevPage && (
    <button className={styles.prevPage} disabled={isLoading} onClick={() => onPageChange(currentPage - 1)}>
      {'<'}
    </button>
  );

  const pageNumberButtons = [...Array(totalPages)].map((_, i) => {
    const page = i + 1;
    const isActive = page === currentPage;

    return (
      <button
        key={page}
        className={isActive ? styles.active : null}
        disabled={isLoading}
        onClick={() => onPageChange(page, isActive)}
      >
        {page}
      </button>
    );
  });

  const nextPageButton = hasNextPage && (
    <button className={styles.nextPage} disabled={isLoading} onClick={() => onPageChange(currentPage + 1)}>
      {'>'}
    </button>
  );

  return (
    <div className={styles.pagination}>
      {prevPageButton}
      <div className={styles.pages}>
        {pageNumberButtons}
      </div>
      {nextPageButton}
    </div>
  );
}

export default CountriesListPagination;