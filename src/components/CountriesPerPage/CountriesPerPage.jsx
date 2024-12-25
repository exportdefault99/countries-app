// import { useState, useMemo } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectPaginationItemsSettings, selectIsLoadingCountriesByRegion, updateItemsPerPage } from '../../redux/slices/countriesByRegionSlice';

// import styles from './CountriesPerPage.module.scss';

// const CountriesPerPage = () => {

//   const { totalItems, step, minItemsPerPage, maxItemsPerPage } = useSelector(selectPaginationItemsSettings);
//   const isLoading = useSelector(selectIsLoadingCountriesByRegion);

//   const dispatch = useDispatch();

//   const [value, setValue] = useState(minItemsPerPage);

//   const backgroundStyle = useMemo(() => {
//     const ratio = (value - minItemsPerPage) / (maxItemsPerPage - minItemsPerPage) * 100;
//     return { 
//       background: `linear-gradient(90deg, #525252 ${ratio}%, #dddddd ${ratio}%)`
//     };
//   }, [value, minItemsPerPage, maxItemsPerPage]);

//   if (!totalItems) {
//     return null;
//   }

//   return (
//     <div className={styles.root}>
//       <span className={styles.total}>{totalItems}</span>
//       <p>Countries per page: {value < totalItems ? value : totalItems}</p>
//       <input
//         className={styles.inputRange}
//         style={backgroundStyle}
//         type="range"
//         min={minItemsPerPage}
//         max={maxItemsPerPage}
//         step={step}
//         value={value}
//         disabled={isLoading}
//         onChange={(e) => setValue(e.target.value)}
//         onMouseUp={(e) => dispatch(updateItemsPerPage(+e.target.value))}
//       />
//     </div>
//   );
// }

// export default CountriesPerPage;

import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPaginationItemsSettings, selectIsLoadingCountriesByRegion, updateItemsPerPage, updateStepFlag } from '../../redux/slices/countriesByRegionSlice';

import styles from './CountriesPerPage.module.scss';

const CountriesPerPage = () => {

  const { totalItems, step, minItemsPerPage, maxItemsPerPage } = useSelector(selectPaginationItemsSettings);
  const isLoading = useSelector(selectIsLoadingCountriesByRegion);

  const dispatch = useDispatch();

  const [value, setValue] = useState(minItemsPerPage);

  const backgroundStyle = useMemo(() => {
    const ratio = (value - minItemsPerPage) / (maxItemsPerPage - minItemsPerPage) * 100;
    return {
      background: `linear-gradient(90deg, #525252 ${ratio}%, #dddddd ${ratio}%)`
    };
  }, [value, minItemsPerPage, maxItemsPerPage]);

  useEffect(() => {
    const updateSettings = () => {
      const screenWidth = window.innerWidth;
      dispatch(updateStepFlag(screenWidth > 992));
      setValue(prevValue => screenWidth > 992 ? Math.max(9, Math.round(prevValue / 3) * 3) : Math.max(10, Math.round(prevValue / 2) * 2));
    };
    updateSettings();
    window.addEventListener('resize', updateSettings);

    return () => {
      window.removeEventListener('resize', updateSettings);
    };
  }, [dispatch]);

  useEffect(() => {
    const timerId = setTimeout(() => dispatch(updateItemsPerPage(+value)), 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [dispatch, value]);

  if (!totalItems) {
    return null;
  }

  return (
    <div className={styles.root}>
      <span className={styles.total}>{totalItems}</span>
      <p>Countries per page: {value < totalItems ? value : totalItems}</p>
      <input
        className={styles.inputRange}
        style={backgroundStyle}
        type="range"
        min={minItemsPerPage}
        max={maxItemsPerPage}
        step={step}
        value={value}
        disabled={isLoading}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default CountriesPerPage;