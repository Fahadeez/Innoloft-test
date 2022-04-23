import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import DashboardLayout from './layouts/dashboard';
import MainPage from './pages/dashboard/MainPage';
import ProductDetails from './pages/dashboard/ProductDetails';

import NotFound from './pages/Page404';



export default function Router() {

  var routes = []

  
    routes = [
      {
        path: '/',
        element: <DashboardLayout />,
        children: [
          { path: '', element: <MainPage /> },
          { path: 'product/:product/*', element: <ProductDetails /> },

        ]
      },

      { path: '*', element: <NotFound />  }
    ]


  return useRoutes(routes);
}