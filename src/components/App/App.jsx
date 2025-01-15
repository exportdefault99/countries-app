import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import { getCountryByFullName } from '../../services/countriesApi';

import Layout from '../Layout/Layout';
import CountriesPage from '../../pages/CountriesPage/CountriesPage';

const SingleCountryPage = lazy(() => import('../../pages/SingleCountryPage/SingleCountryPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));


const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <CountriesPage />
        },
        {
          path: '/:countryName',
          element: <SingleCountryPage />,
          loader: async ({ params }) => {
            const { countryName } = params;
            const [country] = await getCountryByFullName(countryName.replace(/-/g, ' '));
            return { country };
          },
          errorElement: <NotFoundPage />
        },
        {
          path: '*',
          element: <NotFoundPage />
        },
      ],
    },
  ], { basename: '/countries-app' });

  return <RouterProvider router={router} />;
}

export default App;