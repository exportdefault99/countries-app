import { Link } from "react-router-dom";

import CountryDisplayField from "../CountryDisplayField/CountryDisplayField";

import styles from './View.module.scss';

const View = ({ flagImg, flagAlt, name, region, subregion, area, capital, population, currencies, languages, urlPath }) => {

  return (
    <div className={styles.root}>

      <div className={styles.top}>
        <img className={styles.img} src={flagImg} alt={flagAlt} />

        {/* <div className={styles.main}>
          <div>
            <h2 className={styles.name}>{name}</h2>
            <p className={styles.region}>{region} / {subregion}</p>
          </div>
          <p className={styles.area}>{area} km<sup>2</sup></p>
        </div> */}

        <div>
          <h2 className={styles.name}>{name}</h2>
          <div className={styles.main}>
            <p className={styles.region}>{region} / {subregion.length > 22 && <br/>}{subregion}</p>
            <p className={styles.area}>{area} <span>km<sup>2</sup></span></p>
          </div>
        </div>
        <Link to={`/${urlPath}`} className={styles.link2} />
      </div>

      <div className={styles.info}>
        {capital && <CountryDisplayField singularLabel="Capital" pluralLabel="Capitals" data={capital} shouldTruncate hasWrapper />}
        <CountryDisplayField singularLabel="Population" data={population} hasWrapper />
        <CountryDisplayField singularLabel="Currency" pluralLabel="Currencies" data={currencies} shouldTruncate hasWrapper />
        <CountryDisplayField singularLabel="Language" pluralLabel="Languages" data={languages} shouldTruncate hasWrapper />
      </div>

      <Link to={`/${urlPath}`} className={styles.link}>
        More info
      </Link>
    </div>
  );
}

export default View;