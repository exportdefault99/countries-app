import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCountriesByRegionLoadingStatus, selectPagination, updateCurrentPage } from '../../redux/slices/countriesByRegionSlice';

import styles from './CountriesListPagination.module.scss';

const CountriesListPagination = () => {

  const countriesByRegionLoadingStatus = useSelector(selectCountriesByRegionLoadingStatus);
  const { totalPages, currentPage } = useSelector(selectPagination);
  const dispatch = useDispatch();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (isScrolled) {
      const element = document.getElementById('target-element');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsScrolled(false);
    }
  }, [currentPage, isScrolled]);

  // if (countriesByRegionLoadingStatus !== 'success') {
  //   return null;
  // }

  const onHandleScroll = (e) => {
    e.preventDefault();
    setIsScrolled(true);
  };

  return (
    <ul className={styles.root}>
      {/* {currentPage !== 1 && <li onClick={() => dispatch(updateCurrentPage(currentPage - 1))}>{'<'}</li>} */}
      <li className={currentPage === 1 ? styles.hidden : null} onClick={(e) => {
        dispatch(updateCurrentPage(currentPage - 1));
        onHandleScroll(e);
      }}>{'<'}</li>

      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        return (
          <li
            key={page}
            className={page === currentPage ? styles.active : null}
            onClick={(e) => {
              onHandleScroll(e);
              dispatch(updateCurrentPage(page));
            }}
          >
            {page}
          </li>
        );
      })}

      {/* {currentPage !== totalPages && <li onClick={() => dispatch(updateCurrentPage(currentPage + 1))}>{'>'}</li>} */}
      <li className={currentPage === totalPages ? styles.hidden : null} onClick={(e) => {
        dispatch(updateCurrentPage(currentPage + 1));
        onHandleScroll(e);
      }}>{'>'}</li>
    </ul>
  );
}

export default CountriesListPagination;