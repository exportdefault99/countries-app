import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPagination, updateItemsPerPage } from '../../redux/slices/countriesByRegionSlice';

import styles from './CountriesPerPage.module.scss';

const CountriesPerPage = () => {

  const { totalItems, itemsPerPage } = useSelector(selectPagination);
  const dispatch = useDispatch();

  const [value, setValue] = useState(itemsPerPage);

  const step = 3;
  const minItemsPerPage = 9;
  const maxItemsPerPage = Math.max(totalItems, Math.ceil(totalItems / step) * step);

  const ratio = (value - minItemsPerPage) / (maxItemsPerPage - minItemsPerPage) * 100;

  const style = { background: `linear-gradient(90deg, #525252 ${ratio}%, #dddddd ${ratio}%)` };

  return (
    <div className={styles.perPage}>
      <span className={styles.total}>{totalItems}</span>
      <p>Countries per page: {value < totalItems ? value : totalItems}</p>
      <input
        className={styles.inputRange}
        style={style}
        type="range"
        min={minItemsPerPage}
        max={maxItemsPerPage}
        step={step}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onMouseUp={(e) => dispatch(updateItemsPerPage(+e.target.value))}
      />
    </div>
  );
}
 
export default CountriesPerPage;