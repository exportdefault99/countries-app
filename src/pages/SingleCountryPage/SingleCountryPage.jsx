import { useLoaderData } from 'react-router-dom';

import CountryDisplayField from '../../components/CountryDisplayField/CountryDisplayField';

import './SingleCountryPage.scss';

const SingleCountryPage = () => {

  const { country } = useLoaderData();

  return (
    <section className="country-details-container">
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
        </div>
      </div>
    </section>
  );
}

export default SingleCountryPage;