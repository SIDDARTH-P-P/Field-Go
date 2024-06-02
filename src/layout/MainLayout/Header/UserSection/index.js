import React, { useEffect } from 'react';
import { Box, CardHeader } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from 'container/LoginContainer/slice';
 

const UserSection = () => {
  const userData = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userLogin());
    console.log('=======dasborduserData=======', userData);
  }, [dispatch, userData]);

  // const capitalizeFirstLetter = (value) => {
  //   return value
  //     .toLowerCase()
  //     .split(" ")
  //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //     .join(" ");
  // };

  // const userFullName = userData
  // ? `${capitalizeFirstLetter(userData.fName || '-')} ${capitalizeFirstLetter(
  //     userData.lName || '-'
  //   )}`
  // : '-';
  return (
    <Box sx={{ ml: 4 }}>
      {userData ? (
        <CardHeader
          key={userData.id}
          sx={{ m: 0, p: 0 }}
          title='CompanyName'
          // title={userFullName}
          // subheader={userData.email || '-'}
          
        />
      ) : (
        <p>Loading...</p>
      )}
      
    </Box>
  );
};

export default UserSection;
