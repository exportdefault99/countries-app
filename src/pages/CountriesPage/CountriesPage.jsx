import RegionalFilter from '../../components/RegionalFilter/RegionalFilter';
import CountriesPerPage from '../../components/CountriesPerPage/CountriesPerPage';
import CountriesByRegion from '../../components/CountriesByRegion/CountriesByRegion';

import styles from './CountriesPage.module.scss';

const CountriesPage = () => {

  return (
    <section className={styles.root}>
      <div className={styles.top}>
        <RegionalFilter />
        <CountriesPerPage />
      </div>
      <CountriesByRegion className={styles.content} />
    </section>
  );
}
 
export default CountriesPage;