import CountrySearch from '../CountrySeach/CountrySearch';
import FoundCountries from '../FoundCountries/FoundCountries';
import SelectedCountry from '../SelectedCountry/SelectedCountry';

import styles from './Aside.module.scss';

const Aside = () => {
  
  return (  
    <aside className={styles.aside}>
      <CountrySearch />
      <FoundCountries />
      <SelectedCountry />
    </aside>
  );
}
 
export default Aside;