// assets
import {IconDashboard,IconSettings,IconUsers,IconCurrencyRupee,IconHelp,IconListCheck,IconAnalyze} from '@tabler/icons';
// import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

const icons = {IconDashboard,IconSettings,IconUsers,IconCurrencyRupee,IconHelp,IconListCheck,IconAnalyze};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const vendor = {
  id: 'vendor-dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard6',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'tasks',
      title: 'Tasks',
      type: 'item',
      url: '/customers',
      icon: icons.IconListCheck,
      breadcrumbs: false
    },
    {
      id: 'activity',
      title: 'Activity',
      type: 'item',
      url: '/activity',
      icon: icons.IconAnalyze,
      breadcrumbs: false
    },
    // {
    //   id: 'orders',
    //   title: 'Orders',
    //   type: 'item',
    //   url: '/orders',
    //   icon: icons.IconBow,
    //   breadcrumbs: false,
    //   disabled: true,

    // },
    // {
    //   id: 'Payments',
    //   title: 'Payment ',
    //   type: 'item',
    //   url: '/Payments',
    //   icon: icons.IconBrandPaypal,
    //   breadcrumbs: true,
    //   disabled: true,
    // },
    {
      id: 'expenses',
      title: 'Expenses',
      type: 'item',
      url: '/myteam',
      icon: icons.IconCurrencyRupee,
      breadcrumbs: false
    },
    {
      id: 'myteam',
      title: 'My Team',
      type: 'item',
      url: '/myteam',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    {
      id: 'support',
      title: 'Support',
      type: 'item',
      url: '/support',
      icon: icons.IconHelp,
      breadcrumbs: false
    },
    {
      id: 'authentication',
      title: 'Settings',
      type: 'collapse',
      icon: icons.IconSettings,
      children: [
        {
          id: 'option1',
          title: 'option1',
          type: 'item',
          url: '',
          target: true
        },
        {
          id: 'option2',
          title: 'option2',
          type: 'item',
          url: '',
          target: true
        }
      ]
    }
  ]
};


const VendorMenu={
  vendor

}

export default VendorMenu;
