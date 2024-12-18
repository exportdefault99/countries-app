const _apiBase = 'https://restcountries.com/v3.1/';

const _transformCountry = (country) => ({
  name: country.name.common,
  officialName: country.name.official,
  region: country.region,
  subregion: country.subregion,
  capital: country.capital,
  flagImg: country.flags.png,
  flagAlt: country.flags.alt,
  area: country.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
  population: country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "),
  currencies: Object.values(country.currencies).map(currency => currency.name),
  languages: Object.values(country.languages),
  alphaCode: country.cca2,
  urlPath: country.name.common.replace(/\s+/g, '-').toLowerCase(),
  topLevelDomain: country.tld,
  borders: country.borders
});

const request = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  const data = await res.json();

  return data.map(_transformCountry);
}

export const getAllCountries = () => request(`${_apiBase}all`);

export const getCountriesByRegion = (region) => request(`${_apiBase}region/${region}`);

export const getCountriesByName = (name) => request(`${_apiBase}name/${name}`);

export const getCountryByFullName = (name) => request(`${_apiBase}name/${name}?fullText=true`);