import { useSelector, useDispatch } from 'react-redux';
import { selectActiveRegion, selectIsLoadingCountriesByRegion, changeActiveRegion } from '../../redux/slices/countriesByRegionSlice';
import { REGIONS } from '../../utils/constants';

import styles from './RegionalFilter.module.scss';

const RegionalFilter = () => {

  const activeRegion = useSelector(selectActiveRegion);
  const isLoading = useSelector(selectIsLoadingCountriesByRegion);

  const dispatch = useDispatch();

  const onRegionChange = (region, isCurrentRegion) => {
    if (isCurrentRegion) return;

    dispatch(changeActiveRegion(region));
  }

  const buttons = REGIONS.map(region => {
    const isActive = region === activeRegion;

    return (
      <button
        key={region}
        className={isActive ? styles.active : null}
        disabled={isLoading}
        onClick={() => onRegionChange(region, isActive)}
      >
        {region}
      </button>
    );
  });

  return (
    <div className={styles.btnGroup}>
      {buttons}
    </div>
  );
}

export default RegionalFilter;