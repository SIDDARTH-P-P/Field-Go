

import { IconBuildingBank, IconDashboard, IconSettings, IconWorld ,IconHelp} from '@tabler/icons';

// constant
const icons = { IconDashboard, IconSettings,IconBuildingBank,IconWorld,IconHelp };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const licensee = {
  id: 'licensee-dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard9',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'vendor',
      title: 'Vendors',
      type: 'item',
      url: '/vendor',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
  ]
};
 



const settings = {
  id: 'settings',
  type: 'group',
  children: [
   
    {
      id: 'icons',
      title: 'Settings',
      type: 'collapse',
      icon: icons.IconSettings,
      children: [
        {
          id: 'mainCategory',
          title: 'Main Category',
          type: 'item',
          url: '/MainCategory',
          icon: icons.IconBuildingBank,
          breadcrumbs: false
        },
        {
          id: 'category',
          title: 'Category',
          type: 'item',
          url: '/Category',
          icon: icons.IconBuildingBank,
          breadcrumbs: false
        },
        {
          id: 'subCategory',
          title: 'Sub Category',
          type: 'item',
          url: '/SubCategory',
          icon: icons.IconBuildingBank,
          breadcrumbs: false
        },
      
      ]
    },
 
  ]
};

const licenseeMenu = {
  licensee,
  settings,
  // vendor

};

export default licenseeMenu;
