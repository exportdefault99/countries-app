import { useEffect, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectCountriesByRegionWithPagination, 
  selectIsLoadingCountriesByRegion,
  selectIsErrorCountriesByRegion,
  selectActiveRegion, 
  fetchCountriesByRegion 
} from '../../redux/slices/countriesByRegionSlice';
import { changeSelectedCountryName } from '../../redux/slices/countryInfoSlice';

import CountriesListItem from '../CountriesListItem/CountriesListItem';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import styles from './CountriesList.module.scss';

const CountriesList = forwardRef((_, ref) => {

  const countries = useSelector(selectCountriesByRegionWithPagination);
  const isLoading = useSelector(selectIsLoadingCountriesByRegion);
  const isError = useSelector(selectIsErrorCountriesByRegion);
  const activeRegion = useSelector(selectActiveRegion);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountriesByRegion(activeRegion));
  }, [dispatch, activeRegion]);

  if (isLoading && !countries.length) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorMessage><p>An error has occurred.<br/>Try again.</p></ErrorMessage>;
  }

  const elements = countries.map(item => <CountriesListItem key={item.name} onClick={() => dispatch(changeSelectedCountryName(item.name))} {...item} />);

  return (
    <ul ref={ref} className={`${styles.root} ${isLoading ? styles.loading : ''}`}>
      {elements}
    </ul>
  );
});

CountriesList.displayName = 'CountriesList';

export default CountriesList;