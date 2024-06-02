export const SideMenu = (role, menu) => {
  console.log('===================',role)
    switch (role) {
      case 'admin':
        return menu.admin;
      case 'licensee':
        return menu.licensee;
      case 'vendor':
        return menu.vendor;
      case 'customer':
        return menu.customer;
      
      default:
        break;
    }
  };
  