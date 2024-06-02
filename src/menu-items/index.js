

import adminMenu from './dashboard';
import licenseeMenu from './licensee';
import vendorMenu from './vendor';
import customerMenu from './customer';


// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  admin: [adminMenu.admin,adminMenu.settings],
  licensee: [licenseeMenu.licensee, licenseeMenu.settings],
  customer: [customerMenu.customer, customerMenu.other],
  vendor: [vendorMenu.vendor]
};

export default menuItems;
