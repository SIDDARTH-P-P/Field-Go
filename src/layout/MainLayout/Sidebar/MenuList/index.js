// // material-ui
// import { Typography } from '@mui/material';

// // project imports
// import NavGroup from './NavGroup';
// import menuItem from 'menu-items';

// // ==============================|| SIDEBAR MENU LIST ||============================== //

// const MenuList = () => {
//   const navItems = menuItem.items.map((item) => {
//     switch (item.type) {
//       case 'group':
//         return <NavGroup key={item.id} item={item} />;
//       default:
//         return (
//           <Typography key={item.id} variant="h6" color="error" align="center">
//             Menu Items Error
//           </Typography>
//         );
//     }
//   });

//   return <>{navItems}</>;
// };

// export default MenuList;

import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

// project imports
// import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { SideMenu } from 'utils/sideMenu';
// import NavItem from './NavItem';
import NavGroup from './NavGroup';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const login = useSelector((state) => state.login);

  let menuItems = login?.user && SideMenu(login?.user.role, menuItem);

  console.log('======menu items===========', menuItems);

  useEffect(() => {
    menuItems = login?.user && SideMenu(login?.user.role, menuItem);
  }, [login]);

  const navItems =
    menuItems &&
    menuItems.map((item) => {
      console.log('================id====================', item.id);
      switch (item.type) {
        case 'group':
          return <NavGroup key={item.id} item={item} />;

        default:
          return (
            <Typography key={item.id} variant="h6" color="blue" align="center">
              {console.log('=================Error===================')}; Menu Items Error
            </Typography>
          );
      }
    });

  console.log('fghjkl', navItems);
  return <>{navItems}</>;
};

MenuList.propTypes = {
  drawerOpen: PropTypes.bool
};

export default MenuList;
