import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCountriesLoadingStatus, changeSearchTerm, changeStatus } from '../../redux/slices/foundCountriesSlice';

import Spinner from '../Spinner/Spinner';

import styles from './CountrySearch.module.scss';

const CountrySearch = () => {

  const [value, setValue] = useState('');
  const countriesLoadingStatus = useSelector(selectCountriesLoadingStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(changeSearchTerm(value.trim()));
    }, 1000);

    return () => {
      clearTimeout(timerId);
    }
  }, [dispatch, value]);
  
  const spinner = countriesLoadingStatus === 'loading' && <Spinner height='30px' width='30px' styles={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '10px' }} />;

  return (
    <div className={styles.root}>
      <input value={value} onChange={(e) => {
        setValue(e.target.value);
        if (countriesLoadingStatus !== 'idle') {
          dispatch(changeStatus('idle'));
        }
      }} type="text" placeholder="Type a country name" />
      {spinner}
    </div>
  );
}

export default CountrySearch;