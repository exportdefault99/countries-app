import { useEffect, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectCountriesByRegionWithPagination, 
  selectIsLoadingCountriesByRegion,
  selectActiveRegion, 
  fetchCountriesByRegion 
} from '../../redux/slices/countriesByRegionSlice';
import { changeCountryName } from '../../redux/slices/countryInfoSlice';

import CountriesListItem from '../CountriesListItem/CountriesListItem';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import styles from './CountriesList.module.scss';

const CountriesList = forwardRef((_, ref) => {

  const countries = useSelector(selectCountriesByRegionWithPagination);
  const isLoading = useSelector(selectIsLoadingCountriesByRegion);
  const activeRegion = useSelector(selectActiveRegion);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountriesByRegion(activeRegion));
  }, [dispatch, activeRegion]);

  // return <ErrorMessage>An error has occurred. Try again.</ErrorMessage>;
  // return <Spinner />;
  const elements = countries.map(item => <CountriesListItem key={item.name} onClick={() => dispatch(changeCountryName(item.name))} {...item} />);

  return (
    <ul ref={ref} className={styles.root}>
      {elements}
    </ul>
  );
});

CountriesList.displayName = 'CountriesList';

export default CountriesList;