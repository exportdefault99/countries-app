import CountrySearch from '../CountrySeach/CountrySearch';
import FoundCountriesList from '../FoundCountriesList/FoundCountriesList';
import SelectedCountry from '../SelectedCountry/SelectedCountry';

import styles from './Aside.module.scss';

const Aside = () => {
  
  return (  
    <aside className={styles.aside}>
      <CountrySearch />
      <FoundCountriesList />
      <SelectedCountry />
    </aside>
  );
}
 
export default Aside;