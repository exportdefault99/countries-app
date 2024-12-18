import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCountryByFullName } from '../../services/countriesApi';

import './SingleCountryPage.scss';

const SingleCountryPage = () => {

  const [country, setCountry] = useState(null);

  const { countryName } = useParams();

  useEffect(() => {
    getCountryByFullName(countryName)
      .then(data => setCountry(data[0]));
  }, [countryName]);

  return country && (
    <section className="country-details-container">
      <span className="back-button">
        Back
      </span>
      <div className="country-details">
        <img src={country.flagImg} alt={country.flagAlt} />
        <div className="details-text-container">
          <h1>{country.name}</h1>
          <div className="details-text">
            <p><b>Native Name: </b><span className="native-name">England</span></p>
            <p><b>Population: </b><span className="population">{country.population}</span></p>
            <p><b>Region: </b><span className="region">{country.region}</span></p>
            <p><b>Sub Region: </b><span className="sub-region">{country.subregion}</span></p>
            <p><b>Capital: </b><span className="capital">{country.capital}</span></p>
            <p>
              <b>Top Level Domain: </b><span className="top-level-domain">{country.topLevelDomain.join(', ')}</span>
            </p>
            <p><b>Currencies: </b><span className="currencies">{Object.values(country.currencies)[0].name}</span></p>
            <p><b>Languages: </b><span className="languages">{Object.values(country.languages)}</span></p>
          </div>
          <div className="border-countries">
            <b>Border Countries: {country.borders.map(item => <a key={item}>{item}</a>)}</b>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleCountryPage;