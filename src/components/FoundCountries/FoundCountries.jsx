import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCountries, selectSearchTerm, selectCountriesLoadingStatus, fetchFoundCountries } from '../../redux/slices/foundCountriesSlice';
import { changeCountryName } from '../../redux/slices/countryInfoSlice';
import styles from './FoundCountries.module.scss';

const FoundCountries = () => {
  const countries = useSelector(selectCountries);
  const searchTerm = useSelector(selectSearchTerm);
  const countriesLoadingStatus = useSelector(selectCountriesLoadingStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    if (searchTerm) {
      dispatch(fetchFoundCountries(searchTerm));
    }
  }, [dispatch, searchTerm]);

  return (
    <ul className={`${styles.root} ${countriesLoadingStatus === 'success' ? styles.open : ''}`}>
      {countries.map(item => (
        <li onClick={() => dispatch(changeCountryName(item.name))} key={item.name}>
          <img src={item.flagImg} alt={item.name} />
          <h2>{item.name}</h2>
        </li>)
      )}
    </ul>
  );
}

export default FoundCountries;