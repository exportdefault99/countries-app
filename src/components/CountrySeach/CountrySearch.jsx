import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoadingFoundCountries, selectIsErrorFoundCountries, changeSearchTerm } from '../../redux/slices/foundCountriesSlice';

import Spinner from '../Spinner/Spinner';

import styles from './CountrySearch.module.scss';

const CountrySearch = () => {

  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

  const isLoading = useSelector(selectIsLoadingFoundCountries);
  const isError = useSelector(selectIsErrorFoundCountries);

  const dispatch = useDispatch();

  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(changeSearchTerm(value.trim()));
      const query = value.trim();
      if (query && query.length < 3) {
        setError('Minimum number of characters - 3');
      } else {
        setError(null);
      }
    }, 1000);

    return () => {
      clearTimeout(timerId);
    }
  }, [dispatch, value]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.root}>
        <input
          className={error && styles.error}
          value={value}
          type="text"
          placeholder="Type a country name"
          onChange={(e) => setValue(e.target.value)}
        />
        {isLoading && <Spinner height='30px' width='30px' styles={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '10px' }} />}
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
      {!error && isError && <p className={styles.errorText}>No results</p>}
    </div>
  );
}

export default CountrySearch;