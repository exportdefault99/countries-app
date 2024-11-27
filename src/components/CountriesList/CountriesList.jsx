// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectCountriesByRegionWithPagination, selectActiveRegion, fetchCountriesByRegion } from '../../redux/slices/countriesByRegionSlice';

// import CountriesListItem from '../CountriesListItem/CountriesListItem';

// import styles from './CountriesList.module.scss';

// const CountriesList = () => {

//   const countries = useSelector(selectCountriesByRegionWithPagination);
//   const activeRegion = useSelector(selectActiveRegion);
 
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchCountriesByRegion(activeRegion));
//   }, [dispatch, activeRegion]);

//   const elements = countries.map(item => <CountriesListItem key={item.name} {...item} />);

//   return (
//     <ul id="target-element" className={styles.root}>
//       {elements}
//     </ul>
//   );
// }

// export default CountriesList;

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCountriesByRegionWithPagination, selectActiveRegion, fetchCountriesByRegion } from '../../redux/slices/countriesByRegionSlice';
import { changeCountryName } from '../../redux/slices/countryInfoSlice';

import CountriesListItem from '../CountriesListItem/CountriesListItem';
import CountrySkeleton from '../CountrySkeleton/CountrySkeleton';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import styles from './CountriesList.module.scss';

const CountriesList = () => {

  const countries = useSelector(selectCountriesByRegionWithPagination);
  const activeRegion = useSelector(selectActiveRegion);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountriesByRegion(activeRegion));
  }, [dispatch, activeRegion]);

  const elements = countries.map(item => <CountriesListItem key={item.name} onClick={() => dispatch(changeCountryName(item.name))} {...item} />);

  return (
    <ul id="target-element" className={styles.root}>
      {elements}
      {/* {!countries.length && [...Array(9)].map((_, i) => <CountrySkeleton key={i}/>)}
      {[...Array(9)].map((_, i) => <CountrySkeleton key={i} />)} */}
    </ul>
    // <ErrorMessage>
    //   <h2>Error</h2>
    // </ErrorMessage>
  );
}

export default CountriesList;