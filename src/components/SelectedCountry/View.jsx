import { Link } from "react-router-dom";

import styles from './View.module.scss';

const View = ({ flagImg, flagAlt, name, region, subregion, area, alphaCode, capital, population, currencies, languages, urlPath }) => {

  const currenciesLabel = Object.values(currencies);
  const languagesLabel = Object.values(languages);

  return (
    <div className={styles.root}>

      <img className={styles.img} src={flagImg} alt={flagAlt} />
      
      <div className={styles.main}>
        <div>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.region}>{region} / {subregion}</p>
        </div>
        <p className={styles.area}>{area} km<sup>2</sup></p>
      </div>

      <div className={styles.info}>
        <div className={styles.circle}>
          <span>{alphaCode}</span>
        </div>
        <p>Capital: <span>{capital}</span></p>
        <p>Population: <span>{population}</span></p>
        <p>Currency: <span>{currenciesLabel[0].name}</span></p>
        <p>Language: <span>{languagesLabel}</span></p>
      </div>

        <Link to={`/countries/${urlPath}`} className={styles.link}>
          More info
        </Link>
    </div>
  );
}
 
export default View;