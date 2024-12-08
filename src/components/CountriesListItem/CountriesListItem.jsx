// import styles from './CountriesListItem.module.scss';

// const CountriesListItem = ({ name, subregion, capital, flagImg, flagAlt, onClick }) => {

//   return (
//     <li onClick={onClick} className={styles.root}>
//       <div className={styles.root__top}>
//         <img src={flagImg} alt={flagAlt} />
//         <h3>{name}</h3>
//       </div>
//       <div className={styles.root__info}>
//         <p>{subregion}</p>
//         <p>Capital: {capital}</p>
//       </div>
//     </li>
//   );
// }

// export default CountriesListItem;

import CapitalCountry from '../CapitalCountry/CapitalCountry';

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
        { capital && <CapitalCountry capital={capital} /> }
      </div>
      <div className={styles.circle}>
        <span>{alphaCode}</span>
      </div>
    </li>
  );
}

export default CountriesListItem;