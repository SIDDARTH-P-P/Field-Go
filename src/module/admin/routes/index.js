import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Auth from 'utils/auth';


const Country = Loadable(lazy(() => import('module/admin/views/country')));
const Customer = Loadable(lazy(() => import('module/admin/views/customer/')));
const Orders = Loadable(lazy(() => import('module/admin/views/orders/index')));



const CustomerRoutes = {
  path: '/',
  element: (
    <>
      <Auth>
        <MainLayout />
      </Auth>
    </>
  ),
  children: [
    {
      path: '/country',
      children: [
        {
          path: '',
          element: <Country />
        }
      ]
    },
    {
      path: '/customer',
      children: [
        {
          path: '',
          element: <Customer />
        }
      ]
    },
    {
      path: '/orders',
      children: [
        {
          path: '',
          element: <Orders />
        }
      ]
    }
  ]
};

export default CustomerRoutes;
