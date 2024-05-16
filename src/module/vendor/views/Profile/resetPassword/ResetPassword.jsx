// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import Box from '@mui/system/Box';
// import Grid from '@mui/material/Grid';
// import { useTheme } from '@mui/material/styles';
// import { Button, Card, CardContent, Divider, Typography } from '@mui/material';
// import commonStyles from 'assets/style/Style';
// import TextField from 'ui-component/common/TextField';
// import { IconLock } from '@tabler/icons';
// import '../Profile.css'

// const ResetPassword = () => {
//     const theme = useTheme();
//     const style = commonStyles(theme);
//     const initialValues = {
//         CurrentPassword: '',
//         NewPassword: '',
//         confirmPassword: ''
//     };
//     const validationSchema = Yup.object({
//         CurrentPassword: Yup.string().required('Current Password Required'),
//         NewPassword: Yup.string().required('Required'),
//         confirmPassword: Yup.string()
//             .oneOf([Yup.ref('resetPassword'), null], 'Passwords must match')
//             .required('Required')
//     });
//     const onSubmit = (values) => {
//         console.log(values);
//     };
//     return (
//         <Box>
//             <Grid style={{ backgroundColor: '#fff', borderRadius: '14px' }}>
//                 <Card>
//                     <CardContent className='photocontent'>
//                         <Typography variant="h4" className='textcontent'>
//                             <IconLock className='textcontenticon' /> Reset Password
//                         </Typography>
//                     </CardContent>
//                     <Divider />
//                     <Formik
//                         initialValues={initialValues}
//                         validationSchema={validationSchema}
//                         onSubmit={onSubmit}
//                         enableReinitialize={true}>
//                         <Form>
//                             <Grid container spacing={2} className='textcard'>
//                                 <Grid item xs={12} sm={6} md={4}>
//                                     <Typography sx={style.typogrphyComponet}>Current Password</Typography>
//                                     <Field
//                                         type='password'
//                                         name="CurrentPassword"
//                                         id="CurrentPassword"
//                                         placeholder="CurrentPassword"
//                                         as={TextField} />
//                                     <ErrorMessage
//                                         name="CurrentPassword"
//                                         component="div"
//                                         style={{ color: '#f54d4f', fontSize: 12, display: 'flex', justifyContent: 'center', position: 'relative', bottom: '5px' }} />
//                                 </Grid>
//                                 <Grid item xs={12} sm={6} md={4}>
//                                     <Typography sx={style.typogrphyComponet}>New Password</Typography>
//                                     <Field
//                                         type='password'
//                                         name="NewPassword"
//                                         id="NewPassword"
//                                         placeholder="New Password"
//                                         as={TextField} />
//                                     <ErrorMessage
//                                         name="NewPassword"
//                                         component="div"
//                                         style={{ color: '#f54d4f', fontSize: 12, display: 'flex', justifyContent: 'center', position: 'relative', bottom: '5px' }} />
//                                 </Grid>
//                                 <Grid item xs={12} sm={6} md={4}>
//                                     <Typography sx={style.typogrphyComponet}>Confirm Password</Typography>
//                                     <Field
//                                         type='password'
//                                         name="confirmPassword"
//                                         id="confirmPassword"
//                                         placeholder="Confirm Password"
//                                         as={TextField} />
//                                     <ErrorMessage
//                                         name="confirmPassword"
//                                         component="div"
//                                         style={{ color: '#f54d4f', fontSize: 12, display: 'flex', justifyContent: 'center', position: 'relative', bottom: '5px' }} />
//                                 </Grid>
//                                 <Grid item md={12} className='password-btn'>
//                                     <Button type="submit" sx={style.changeBtn}>Save</Button>
//                                 </Grid>
//                             </Grid>
//                         </Form>
//                     </Formik>
//                 </Card>
//             </Grid>
//         </Box>
//     );
// };
// export default ResetPassword;

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '@mui/material/styles';
import { Button, Grid, Box, Card, CardContent, Divider, Typography, InputAdornment, IconButton } from '@mui/material';
import commonStyles from 'assets/style/Style';
import TextField from 'ui-component/common/TextField';
import { IconLock, IconEye, IconEyeOff } from '@tabler/icons';
import '../Profile.css';

const ResetPassword = () => {
  const theme = useTheme();
  const style = commonStyles(theme);

  const initialValues = {
    CurrentPassword: '',
    NewPassword: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object({
    CurrentPassword: Yup.string().required('Current Password Required'),
    NewPassword: Yup.string().required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('NewPassword'), null], 'Passwords must match')
      .required('Required')
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box>
      <Grid style={{ backgroundColor: '#fff', borderRadius: '14px' }}>
        <Card>
          <CardContent className="photocontent">
            <Typography variant="h4" className="textcontent">
              <IconLock className="textcontenticon" /> Reset Password
            </Typography>
          </CardContent>
          <Divider />
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
            <Form>
              <Grid container spacing={2} className="textcard">
                <Grid item xs={12} sm={6} md={4}>
                  <Typography sx={style.typogrphyComponet}>Current Password</Typography>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="CurrentPassword"
                    id="CurrentPassword"
                    placeholder="Current Password"
                    as={TextField}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={togglePasswordVisibility}>{showPassword ? <IconEyeOff /> : <IconEye />}</IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <ErrorMessage
                    name="CurrentPassword"
                    component="div"
                    style={{
                      color: '#f54d4f',
                      fontSize: 12,
                      display: 'flex',
                      justifyContent: 'center',
                      position: 'relative',
                      bottom: '5px'
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography sx={style.typogrphyComponet}>New Password</Typography>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="NewPassword"
                    id="NewPassword"
                    placeholder="New Password"
                    as={TextField}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={togglePasswordVisibility}>{showPassword ? <IconEyeOff /> : <IconEye />}</IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <ErrorMessage
                    name="NewPassword"
                    component="div"
                    style={{
                      color: '#f54d4f',
                      fontSize: 12,
                      display: 'flex',
                      justifyContent: 'center',
                      position: 'relative',
                      bottom: '5px'
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography sx={style.typogrphyComponet}>Confirm Password</Typography>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    as={TextField}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={togglePasswordVisibility}>{showPassword ? <IconEyeOff /> : <IconEye />}</IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    style={{
                      color: '#f54d4f',
                      fontSize: 12,
                      display: 'flex',
                      justifyContent: 'center',
                      position: 'relative',
                      bottom: '5px'
                    }}
                  />
                </Grid>
                <Grid item md={12} className="password-btn">
                  <Button type="submit" sx={style.changeBtn}>
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Card>
      </Grid>
    </Box>
  );
};

export default ResetPassword;
