import CountryDisplayField from '../CountryDisplayField/CountryDisplayField';

import styles from './CountriesListItem.module.scss';

const CountriesListItem = ({ name, subregion, capital, flagImg, flagAlt, alphaCode, onClick }) => {

  return (
    <li onClick={onClick} className={styles.root}>
      <div className={styles.root__top}>
        <img src={flagImg} alt={flagAlt} />
        <h3>{name}</h3>
      </div>
      <div className={styles.root__info}>
        <p className={styles.subregion}>{subregion}</p>
        {capital && <CountryDisplayField singularLabel="Capital" pluralLabel="Capitals" data={capital} /> }
      </div>
      <div className={styles.circle}>
        <span>{alphaCode}</span>
      </div>
    </li>
  );
}

export default CountriesListItem;