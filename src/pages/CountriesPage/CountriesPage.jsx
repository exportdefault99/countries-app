import { useRef, useCallback } from 'react';

import RegionalFilter from '../../components/RegionalFilter/RegionalFilter';
import CountriesPerPage from '../../components/CountriesPerPage/CountriesPerPage';
import CountriesList from '../../components/CountriesList/CountriesList';
import CountriesListPagination from '../../components/CountriesListPagination/CountriesListPagination';

import styles from './CountriesPage.module.scss';

const CountriesPage = () => {

  const countriesListRef = useRef(null);

  const scrollToCountriesList = useCallback(() => {
    const element = countriesListRef.current;

    if (!element) return;

    const { top, bottom } = element.getBoundingClientRect();
    const isFullyVisible = top >= 0 && bottom <= window.innerHeight;
      
    if (!isFullyVisible) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section className={styles.root}>
      <div className={styles.top}>
        <RegionalFilter />
        <CountriesPerPage />
      </div>
      <div className={styles.content}>
        <CountriesList ref={countriesListRef} />
      </div>
      <CountriesListPagination scrollToCountriesList={scrollToCountriesList} />
    </section>
  );
}
 
export default CountriesPage;