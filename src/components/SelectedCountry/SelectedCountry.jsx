import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCountryInfoAllData, fetchCountryInfo } from '../../redux/slices/countryInfoSlice';
import { STATUSES } from '../../utils/constants';

import Skeleton from '../Skeleton/Skeleton';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import View from './View';

import styles from './SelectedCountry.module.scss';

const SelectedCountry = () => {

  const selectedCountryRef = useRef(null);

  const { country, countryLoadingStatus, selectedCountryName } = useSelector(selectCountryInfoAllData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountryInfo(selectedCountryName));
  }, [dispatch, selectedCountryName]);

  const setContent = () => {
    switch (countryLoadingStatus) {
      case STATUSES.IDLE:
        return <Skeleton />;
      case STATUSES.LOADING:
        return <Spinner />;
      case STATUSES.SUCCESS:
        return <View {...country} />;
      case STATUSES.ERROR:
        return <ErrorMessage className={styles.error}>Error</ErrorMessage>
    }
  }

  return (
    <div ref={selectedCountryRef} className={styles.wrapper}>
      {setContent()}
    </div>
  );
}

export default SelectedCountry;