import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCountryByFullName } from '../../services/countriesApi';

import './SingleCountryPage.scss';

const SingleCountryPage = () => {

  const [country, setCountry] = useState(null);

  const { countryName } = useParams();

  useEffect(() => {
    getCountryByFullName(countryName.replace(/-/g, ' '))
      .then(data => setCountry(data[0]));
  }, [countryName]);

  return country && (
    <section className="country-details-container">
      {/* <a href='#' className="back-button">
        Back
      </a> */}
      <div className="country-details">
        <img src={country.flagImg} alt={country.flagAlt} />
        <div className="details-text-container">
          <h1>{country.name}</h1>
          <div className="details-text">
            <p><b>Official Name: </b><span className="native-name">{country.officialName}</span></p>
            <p><b>Population: </b><span className="population">{country.population}</span></p>
            <p><b>Region: </b><span className="region">{country.region}</span></p>
            <p><b>Sub Region: </b><span className="sub-region">{country.subregion}</span></p>
            <p><b>Capital: </b><span className="capital">{country.capital}</span></p>
            <p>
              <b>Top Level Domain: </b><span className="top-level-domain">{country.topLevelDomain.join(', ')}</span>
            </p>
            <p><b>Currencies: </b><span className="currencies">{country.currencies}</span></p>
            <p><b>Languages: </b><span className="languages">{country.languages.join(', ')}</span></p>
          </div>
          {/* <div className="border-countries">
            <b>Border Countries: {country.borders.map(item => <a key={item}>{item}</a>)}</b>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default SingleCountryPage;