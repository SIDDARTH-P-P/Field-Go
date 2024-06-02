import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';

// Auth Component
import Auth from 'utils/auth';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/dashboard/Default/index')));
const Vendor = Loadable(lazy(() => import('../module/licensee/views/Vendor/index')));
const MainCategory = Loadable(lazy(() => import('../module/licensee/views/MainCategories/index')));
const Category = Loadable(lazy(() => import('../module/licensee/views/Categories/index')));
const SubCategory = Loadable(lazy(() => import('../module/licensee/views/SubCategories/index')));





// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
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
      path: '',
      element: <Navigate to="/dashboard" replace={true} />
    },
    {
      path: '/dashboard',
      element: <DashboardDefault />
    },
    {
      path: '/vendor',
      element: <Vendor />
    },

    {
      path: 'mainCategory',
      children: [
        {
          path: '',
          element: <MainCategory />
        }
      ]
    },
    {
      path: 'category',
      children: [
        {
          path: '',
          element: <Category />
        }
      ]
    },
    {
      path: 'subCategory',
      children: [
        {
          path: '',
          element: <SubCategory />
        }
      ]
    },
  
    

  ]
};

export default MainRoutes;
