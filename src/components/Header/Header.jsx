import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

const Header = () => {
  
  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <li>
            <NavLink to="/">
              Countries of the world
            </NavLink>
          </li>
          <li>
            <NavLink to="/countries">
              Countries
            </NavLink>
          </li>
          /
          <li>
            <NavLink to="/other">
              Other
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
 
export default Header;