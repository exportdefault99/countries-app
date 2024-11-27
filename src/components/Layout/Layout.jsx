import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import Header from '../Header/Header';
import Aside from '../Aside/Aside';
import Spinner from '../Spinner/Spinner';

import styles from './Layout.module.scss';

const Layout = () => {
  
  return (
    <div className={styles.app}>
      <Header />
      <main>
        <Suspense fallback={<Spinner styles={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/>}>
          <Outlet />
        </Suspense>
      </main>
      <Aside />
    </div>
  );
}
 
export default Layout;