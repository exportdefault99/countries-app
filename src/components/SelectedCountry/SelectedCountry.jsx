import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCountryInfoAllData, fetchCountryInfo } from '../../redux/slices/countryInfoSlice';

import Skeleton from '../Skeleton/Skeleton';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import View from './View';

import styles from './SelectedCountry.module.scss';

const SelectedCountry = () => {

  const { country, countryLoadingStatus, name } = useSelector(selectCountryInfoAllData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (name) {
      dispatch(fetchCountryInfo(name));
    }
  }, [dispatch, name]);

  const setContent = () => {
    switch (countryLoadingStatus) {
      case 'idle':
        return <Skeleton />;
      case 'loading':
        return <Spinner />;
      case 'success':
        return <View {...country} />;
      case 'error':
        return <ErrorMessage>Error</ErrorMessage>
    }
  }

  return (
    <div className={styles.wrapper}>
      {setContent()}
    </div>
  );
}

export default SelectedCountry;