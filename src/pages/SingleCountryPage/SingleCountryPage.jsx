import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCountryByFullName } from '../../services/countriesApi';
import { resetSelectedCountry } from '../../redux/slices/countryInfoSlice';

import CountryDisplayField from '../../components/CountryDisplayField/CountryDisplayField';

import './SingleCountryPage.scss';

const SingleCountryPage = () => {

  const [country, setCountry] = useState(null);
  const dispatch = useDispatch();
  const { countryName } = useParams();

  useEffect(() => {
    dispatch(resetSelectedCountry());
    getCountryByFullName(countryName.replace(/-/g, ' '))
      .then(data => setCountry(data[0]));
  }, [dispatch, countryName]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/name/russia')
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);

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
            <CountryDisplayField singularLabel="Official" data={country.officialName} />
            <CountryDisplayField singularLabel="Region" data={country.region} />
            <CountryDisplayField singularLabel="Subregion" data={country.subregion} />
            {country.capital && <CountryDisplayField singularLabel="Capital" pluralLabel="Capitals" data={country.capital} />}
            <CountryDisplayField singularLabel="Population" data={country.population} />
            <CountryDisplayField singularLabel="Currency" pluralLabel="Currencies" data={country.currencies} />
            <CountryDisplayField singularLabel="TLD" pluralLabel="TLDs" data={country.topLevelDomains} />
            <CountryDisplayField singularLabel="Language" pluralLabel="Languages" data={country.languages} />
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