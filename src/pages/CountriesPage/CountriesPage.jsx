import { useRef, useCallback } from 'react';

import RegionalFilter from '../../components/RegionalFilter/RegionalFilter';
import CountriesPerPage from '../../components/CountriesPerPage/CountriesPerPage';
import CountriesList from '../../components/CountriesList/CountriesList';
import CountriesListPagination from '../../components/CountriesListPagination/CountriesListPagination';

import styles from './CountriesPage.module.scss';

const CountriesPage = () => {

  const countriesListRef = useRef(null);

  // const scrollToCountriesList = useCallback(() => {
  //   if (countriesListRef.current) {
  //     countriesListRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, []);

  const scrollToCountriesList = useCallback(() => {
    if (countriesListRef.current) {
      const element = countriesListRef.current;
      const rect = element.getBoundingClientRect();
      const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      
      if (!isFullyVisible) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
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