// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectCountries, selectSearchTerm, selectCountriesLoadingStatus, fetchFoundCountries } from '../../redux/slices/foundCountriesSlice';
// import { changeSelectedCountryName } from '../../redux/slices/countryInfoSlice';
// import styles from './FoundCountries.module.scss';

// const FoundCountries = () => {
//   const countries = useSelector(selectCountries);
//   const searchTerm = useSelector(selectSearchTerm);
//   const countriesLoadingStatus = useSelector(selectCountriesLoadingStatus);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (searchTerm) {
//       dispatch(fetchFoundCountries(searchTerm));
//     }
//   }, [dispatch, searchTerm]);

//   return (
//     <ul className={`${styles.root} ${countriesLoadingStatus === 'success' ? styles.open : ''}`}>
//       {countries.map(item => (
//         <li onClick={() => dispatch(changeSelectedCountryName(item.name))} key={item.name}>
//           <img src={item.flagImg} alt={item.name} />
//           <h2>{item.name}</h2>
//         </li>)
//       )}
//     </ul>
//   );
// }

// export default FoundCountries;

import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCountries, selectSearchTerm, selectIsSuccessFoundCountries, fetchFoundCountries } from '../../redux/slices/foundCountriesSlice';
import { changeSelectedCountryName } from '../../redux/slices/countryInfoSlice';

import FoundCountriesListItem from '../FoundCountriesListItem/FoundCountriesListItem';

import styles from './FoundCountriesList.module.scss';


const FoundCountriesList = () => {
  const countries = useSelector(selectCountries);
  const isSuccess = useSelector(selectIsSuccessFoundCountries);
  const searchTerm = useSelector(selectSearchTerm);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFoundCountries(searchTerm));
  }, [dispatch, searchTerm]);

  const elements = useMemo(() => {
    return countries.map(item => (
      <FoundCountriesListItem
        key={item.name}
        onClick={() => dispatch(changeSelectedCountryName(item.name))}
        searchTerm={searchTerm}
        {...item}
      />
    ));
  }, [dispatch, countries]);

  return (
    <ul style={{ height: isSuccess ? countries.length * 32 + 'px' : '0px' }} className={`${styles.root} ${countries.length > 3 ? styles.scroll : ''}`}>
      {elements}
    </ul>
  );
}

export default FoundCountriesList;