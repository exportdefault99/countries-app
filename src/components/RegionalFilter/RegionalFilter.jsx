import { useSelector, useDispatch } from 'react-redux';
import { selectCountriesByRegionLoadingStatus, selectActiveRegion, changeActiveRegion } from '../../redux/slices/countriesByRegionSlice';
import { REGIONS } from '../../utils/constants';

import styles from './RegionalFilter.module.scss';

const RegionalFilter = () => {

  const countriesByRegionLoadingStatus = useSelector(selectCountriesByRegionLoadingStatus);
  const activeRegion = useSelector(selectActiveRegion);

  const dispatch = useDispatch();
  
  const buttons = REGIONS.map(region => (
    <button 
      key={region} 
      className={region === activeRegion ? styles.active : null}
      disabled={countriesByRegionLoadingStatus === 'loading'}
      onClick={() => dispatch(changeActiveRegion(region))}
    >
      {region}
    </button>
  ));

  return (
    <div className={styles.root}>
      {buttons}
    </div>
  );
}

export default RegionalFilter;