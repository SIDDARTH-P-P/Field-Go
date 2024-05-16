
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Formik, Form, Field } from 'formik';
// import { Grid, Card, CardContent, Typography, Avatar, IconButton } from '@mui/material';
// import './Profile.css';
// import TextField from 'ui-component/common/TextField';
// import User1 from 'assets/images/users/5856.jpg';
// import { useState } from 'react';
// import { IconPencil } from '@tabler/icons';
//  import { capitalizeFirstLetter } from '../utilities/Capitallised';

// // import { getUserMe } from 'module/vendor/container/userContainer/slice';
// // import { getUserById } from '';

// import { userLogin } from 'container/LoginContainer/slice';


// // 
// function User() {
//   const dispatch = useDispatch();
//   const [editMode, setEditMode] = useState(false);

//   useEffect(() => {
//         dispatch(userLogin());
//         console.log('=======userData=======', userMeDataDe);
//       }, [dispatch]);

//         const userMeDataDe = useSelector((state) => state.login.user);


  
//   const initialValues = {
//     fName: capitalizeFirstLetter(userMeDataDe?.fName || ''),
//     lName: capitalizeFirstLetter(userMeDataDe?.lName || ''),
//     mobileNo: userMeDataDe?.mobileNo || '',
//     email: userMeDataDe?.email || ''
//   };
//   const handleEditModeToggle = () => {
//     setEditMode(!editMode);
//   };
//   return (
//     <>
//       <Grid style={{ backgroundColor: '#fff', borderRadius: '14px' }}>
//         <Card>
//           <CardContent style={{ position: 'relative' }}>
//             <IconButton
//               style={{
//                 position: 'absolute',
//                 top: 0,
//                 right: 0,
//                 backgroundColor: 'black',
//                 cursor: 'pointer',
//                 color:'#fff'
//               }}
//               onClick={handleEditModeToggle}
//             >
//               <IconPencil style={{ color: 'white' }} />
//             </IconButton>

//             <Grid container spacing={2} className="media600">
//               <Grid item xs={12} sm={3} md={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                 <Avatar src={User1} style={{ height: '250px', width: '250px' }} />
//               </Grid>
//               <Grid item xs={12} sm={6} md={9} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
//                 <Formik initialValues={initialValues} onSubmit={(values) => console.log(values)}>
//                   {() => (
//                     <Form>
//                       <Grid container spacing={2} className="textcard">
//                         <Grid item xs={12} sm={6} md={6}>
//                           <Typography>First Name</Typography>
//                           <Field type="text" id="fName" name="fName" as={TextField} fullWidth disabled={!editMode} />
//                         </Grid>
//                         <Grid item xs={12} sm={6} md={6}>
//                           <Typography>Last Name</Typography>
//                           <Field type="text" id="lName" name="lName" as={TextField} disabled={!editMode}  />
//                         </Grid>
//                         <Grid item xs={12} sm={6} md={6}>
//                           <Typography>Contact No</Typography>
//                           <Field type="text" name="mobileNo" as={TextField} disabled />
//                         </Grid>
//                         <Grid item xs={12} sm={6} md={6}>
//                           <Typography>Email Id</Typography>
//                           <Field type="text" name="email" as={TextField} disabled />
//                         </Grid>
//                       </Grid>
//                     </Form>
//                   )}
//                 </Formik>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
//       </Grid>
//     </>
//   );
// }

// export default User;
