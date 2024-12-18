import HighlightedCountryName from "../HighlightedCountryName/HighlightedCountryName";

import styles from './FoundCountriesListItem.module.scss';

const FoundCountriesListItem = ({ name, flagImg, flagAlt, searchTerm, onClick}) => {

  return (
     <li className={styles.root}>
      <div onClick={onClick}>
          <img src={flagImg} alt={flagAlt} />
          <HighlightedCountryName countryName={name} searchTerm={searchTerm} />
        </div>
    </li>
  );
}
 
export default FoundCountriesListItem;