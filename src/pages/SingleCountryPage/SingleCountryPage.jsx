import { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetSelectedCountry } from '../../redux/slices/countryInfoSlice';
import CountryDisplayField from '../../components/CountryDisplayField/CountryDisplayField';
import BorderCountries from '../../components/BorderCountries/BorderCountries';

import './SingleCountryPage.scss';

const SingleCountryPage = () => {

  const { country } = useLoaderData();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetSelectedCountry());
  }, [dispatch, country]);

  const onBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <section className="country-details-container">

      <div className="top">
        <button onClick={onBack} className="back-button"></button>
        <h1>{country.name} {country.name !== country.officialName && `/ ${country.officialName}`}</h1>
      </div>

      <div className="country-details">
        <img src={country.flagImg} alt={country.flagAlt} />
        <div>
          <div className="main">
            <div>
              <h2 className="name">{country.name}</h2>
              <p className="region">{country.region} / {country.subregion}</p>
            </div>
            <p className="area">{country.area} km<sup>2</sup></p>
          </div>

          <div className="details-text">
            {country.capital && <CountryDisplayField singularLabel="Capital" pluralLabel="Capitals" data={country.capital} hasWrapper />}
            <CountryDisplayField singularLabel="Population" data={country.population} hasWrapper />
            <CountryDisplayField singularLabel="Currency" pluralLabel="Currencies" data={country.currencies} hasWrapper />
            <CountryDisplayField singularLabel="Language" pluralLabel="Languages" data={country.languages} hasWrapper />
            <CountryDisplayField singularLabel="TLD" pluralLabel="TLDs" data={country.topLevelDomains} hasWrapper />
          </div>
        </div>
      </div>

      { country.borders && (
        <>
          <h3>Border countries:</h3>
          <BorderCountries borders={country.borders} className="content" />
        </>
      ) }

    </section>
  );
}

export default SingleCountryPage;