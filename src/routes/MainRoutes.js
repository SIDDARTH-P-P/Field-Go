import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';

// Auth Component
import Auth from 'utils/auth';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/dashboard/Default/index')));
const MyTeam = Loadable(lazy(() => import('module/admin/views/Myteam/index')));
const Country = Loadable(lazy(() => import('module/admin/views/country/index')));
const State = Loadable(lazy(() => import('module/admin/views/state/index')));
// const Customer = Loadable(lazy(() => import('module/admin/views/customer/index')));
// const Orders = Loadable(lazy(() => import('module/admin/views/orders/index')));
const Bank = Loadable(lazy(() => import('module/admin/views/Bank/index')));
const SupportType = Loadable(lazy(() => import('module/admin/views/supportType/index')));

const Enqsource = Loadable(lazy(() => import('module/admin/views/engSource/index')));
const EnqMode = Loadable(lazy(() => import('module/admin/views/enqModel/index')));




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
      path: '/myTeam',
      element: <MyTeam />
    },

    {
      path: 'country',
      children: [
        {
          path: '',
          element: <Country />
        }
      ]
    },
  
    {
      path: 'bank',
      children: [
        {
          path: '',
          element: <Bank />
        },
      ]
    },
    {
      path: 'supportType',
      children: [
        {
          path: '',
          element: <SupportType />
        }
      ]
    },
    {
      path: 'state',
      children: [
        {
          path: '',
          element: <State />
        }
      ]
    },
    {
      path: 'enqSource',
      children: [
        {
          path: '',
          element: <Enqsource />
        }
      ]
    },
    {
      path: 'enqMode',
      children: [
        {
          path: '',
          element: <EnqMode />
        }
      ]
    },

  ]
};

export default MainRoutes;
