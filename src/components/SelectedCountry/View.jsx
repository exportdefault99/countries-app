import { Link } from "react-router-dom";

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
        <div className={styles.row}>
          <p className={styles.col1}>Capital:</p>
          <span className={styles.col2}>{capital.join(', ')}</span>
        </div>
        <div className={styles.row}>
          <p className={styles.col1}>Population:</p>
          <span className={styles.col2}>{population}</span>
        </div>
        <div className={styles.row}>
          <p className={styles.col1}>Currency:</p>
          <span className={styles.col2}>{currencies.join(', ')}</span>
        </div>
        <div className={styles.row}>
          <p className={styles.col1}>Language:</p>
          <span className={styles.col2}>{languages.join(', ')}</span>
        </div>
      </div>

      <Link to={`/countries/${urlPath}`} className={styles.link}>
        More info
      </Link>
    </div>
  );
}

export default View;