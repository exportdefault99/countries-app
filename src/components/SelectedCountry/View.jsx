import { Link } from "react-router-dom";

import CountryDisplayField from "../CountryDisplayField/CountryDisplayField";

import styles from './View.module.scss';

const View = ({ flagImg, flagAlt, name, region, subregion, area, capital, population, currencies, languages, urlPath }) => {

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
        {capital && <CountryDisplayField singularLabel="Capital" pluralLabel="Capitals" data={capital} hasWrapper />}
        <CountryDisplayField singularLabel="Population" data={population} hasWrapper />
        <CountryDisplayField singularLabel="Currency" pluralLabel="Currencies" data={currencies} hasWrapper />
        <CountryDisplayField singularLabel="Language" pluralLabel="Languages" data={languages} hasWrapper />

        {/* <div className={styles.row}>
          <p className={styles.col1}>Language:</p>
          <span className={styles.col2}>{languages.join(', ')}</span>
        </div> */}
      </div>

      <Link to={`/countries/${urlPath}`} className={styles.link}>
        More info
      </Link>
    </div>
  );
}

export default View;