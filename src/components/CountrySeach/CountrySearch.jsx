import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectIsLoadingFoundCountries,
  selectIsErrorFoundCountries,
  selectIsSuccessFoundCountries,
  selectTotalFoundCountries,
  changeSearchTerm
} from '../../redux/slices/foundCountriesSlice';

import Spinner from '../Spinner/Spinner';

import styles from './CountrySearch.module.scss';

const CountrySearch = () => {

  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

  const isLoading = useSelector(selectIsLoadingFoundCountries);
  const isError = useSelector(selectIsErrorFoundCountries);
  const isSuccess = useSelector(selectIsSuccessFoundCountries);
  const totalFoundCountries = useSelector(selectTotalFoundCountries);

  const dispatch = useDispatch();

  useEffect(() => {
    const timerId = setTimeout(() => {
      const searchTerm = value.trim();

      if (searchTerm && searchTerm.length < 3) {
        setError('Please enter at least 3 characters');
      } else {
        setError(null);
        dispatch(changeSearchTerm(searchTerm));
      }
    }, 1000);

    return () => {
      clearTimeout(timerId);
    }
  }, [dispatch, value]);

  return (
    <div className={styles.wrapper}>
      <label htmlFor="search" className={styles.search}>
        Search:
        {error && <span className={styles.errorText}> {error}</span>}
        {!error && isError && <span className={styles.errorText}> No results</span>}
        {!error && isSuccess && <span className={styles.success}> Total countries found - {totalFoundCountries}</span>}
      </label>
      <div className={styles.root}>
        <input
          id='search'
          autoComplete="off"
          className={error && styles.error}
          value={value}
          type="text"
          placeholder="Type a country name"
          onChange={(e) => setValue(e.target.value)}
        />
        {isLoading && <Spinner height='30px' width='30px' styles={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '10px' }} />}
      </div>
    </div>
  );
}

export default CountrySearch;