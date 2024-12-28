import { useRef } from 'react';

import RegionalFilter from '../../components/RegionalFilter/RegionalFilter';
import CountriesPerPage from '../../components/CountriesPerPage/CountriesPerPage';
import CountriesList from '../../components/CountriesList/CountriesList';
import CountriesListPagination from '../../components/CountriesListPagination/CountriesListPagination';

import styles from './CountriesPage.module.scss';

const CountriesPage = () => {

  const countriesListRef = useRef(null);

  return (
    <section className={styles.root}>
      <div className={styles.top}>
        <RegionalFilter />
        <CountriesPerPage />
      </div>
      <div className={styles.content}>
        <CountriesList ref={countriesListRef} />
      </div>
      <CountriesListPagination countriesListRef={countriesListRef} />
    </section>
  );
}
 
export default CountriesPage;