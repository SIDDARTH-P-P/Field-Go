
import { IconBuildingBank, IconDashboard, IconSettings, IconWorld ,IconHelp} from '@tabler/icons';

// constant
const icons = { IconDashboard, IconSettings,IconBuildingBank,IconWorld,IconHelp };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const admin = {
  id: 'admin-dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard2',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'myTeam',
      title: 'My Team',
      type: 'item',
      url: '/myTeam',
      icon: icons.IconDashboard,
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
          id: 'bank',
          title: 'Bank',
          type: 'item',
          url: '/Bank',
          icon: icons.IconBuildingBank,
          breadcrumbs: false
        },
        {
          id: 'supportType',
          title: 'SupportType',
          type: 'item',
          url: '/supportType',
          icon: icons.IconHelp,
          breadcrumbs: false
        },
        {
          id: 'country2',
          title: 'Country',
          type: 'item',
          url: '/country',
          icon: icons.IconWorld,
          breadcrumbs: false
        },
        {
          id: 'state',
          title: 'State',
          type: 'item',
          url: '/state',
          icon: icons.IconWorld,
          breadcrumbs: false
        },
        {
          id: 'enqSource',
          title: 'Enquiry Source',
          type: 'item',
          url: '/enqSource',
          icon: icons.IconWorld,
          breadcrumbs: false
        },
        {
          id: 'enqMode',
          title: 'Enquiry Model',
          type: 'item',
          url: '/enqMode',
          icon: icons.IconWorld,
          breadcrumbs: false
        },
      ]
    }
  ]
};

const adminMenu = {
  admin,
  settings,

};

export default adminMenu;