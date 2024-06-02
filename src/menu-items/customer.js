// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const customer = {
  id: 'customer-dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    }
  ]
};

const other = {
  id: 'sample-docs-roadmap',
  title: 'SampledccPage',
  type: 'group',
  children: [
    {
      id: 'sample-page2',
      title: 'Sample Page',
      type: 'item',
      url: '/sample-page',
      icon: icons.IconBrandChrome,
      breadcrumbs: true
    }
  ]
};

const customerMenu = {
  customer,
  other
};

export default customerMenu;
