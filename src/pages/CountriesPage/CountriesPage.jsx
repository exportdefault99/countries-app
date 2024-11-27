import RegionalFilter from '../../components/RegionalFilter/RegionalFilter';
import CountriesPerPage from '../../components/CountriesPerPage/CountriesPerPage';
import CountriesList from '../../components/CountriesList/CountriesList';
import CountriesListPagination from '../../components/CountriesListPagination/CountriesListPagination';

import styles from './CountriesPage.module.scss';

const CountriesPage = () => {
  
  return (
    <section className={styles.root}>
      <div className={styles.top}>
        <RegionalFilter />
        <CountriesPerPage />
      </div>
      <CountriesList />
      <CountriesListPagination />
    </section>
  );
}
 
export default CountriesPage;