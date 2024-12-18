import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { lazy } from "react";

import Layout from '../Layout/Layout';
import MainPage from '../../pages/MainPage/MainPage';
import CountriesPage from '../../pages/CountriesPage/CountriesPage';
import SingleCountryPage from '../../pages/SingleCountryPage/SingleCountryPage';

// const MainPage = lazy(() => import('../../pages/MainPage/MainPage'));
// const CountriesPage = lazy(() => import('../../pages/CountriesPage/CountriesPage'));
// const SingleCountryPage = lazy(() => import('../../pages/SingleCountryPage/SingleCountryPage'));

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <MainPage />
        },
        {
          path: '/countries',
          element: <CountriesPage />
        },
        {
          path: '/countries/:countryName',
          element: <SingleCountryPage />
        },
      ],
    },
  ], { basename: '/countries-app' });

  return <RouterProvider router={router} />;
}
 
export default App;