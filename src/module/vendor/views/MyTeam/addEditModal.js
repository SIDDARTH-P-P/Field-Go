import React, { useEffect } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Textfield from 'ui-component/common/TextField';
import { Button, MenuItem, Select, IconButton, InputAdornment } from '@mui/material';
import commonStyles from 'assets/style/Style';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { addUser, updateUser, getUserById } from 'module/vendor/container/userContainer/slice';
import { useState } from 'react';

const AddEditModal = ({ formtype, data, handleClose }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();
  const userById = useSelector((state) => state.data.user.userByIdData);
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  useEffect(() => {
    if (data && data.id) {
      dispatch(getUserById(data.id));
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (userById && userById.role) {
      setRole(userById.role);
    }
  }, [userById]);

  const RoleEnum = {
    VENDOR_ACCOUNTANT: 'vendorAcnt',
    VENDOR_MANAGER: 'vendorMngr',
    VENDOR_OPERATOR: 'vendorOptr'
  };

  const initialValues = {
    fName: formtype === 'editform' ? userById?.fName || '' : '',
    lName: formtype === 'editform' ? userById?.lName || '' : '',
    email: formtype === 'editform' ? userById?.email || '' : '',
    mobileNo: formtype === 'editform' ? userById?.mobileNo || '' : '',
    role: formtype === 'editform' ? userById?.role || '' : ''
  };

  const validationSchema = Yup.object({
    fName: Yup.string().required('First Name is Required'),
    lName: Yup.string().required('Last Name is Required'),
   
    mobileNo: Yup.string().required('Mobile is Required'),
    password: Yup.string().required('Password is Required')
  });

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const onSubmit = (values, { resetForm }) => {
    const userData = {
      ...values,
      role: role
    };

    if (formtype === 'addform') {
      dispatch(addUser(userData));
      // dispatch(getUser());
    } else {
      values.id = data.id;
      dispatch(updateUser(values));
      // dispatch(getUser());
      // dispatch(updateUser({ id: data.id, ...userData }));
    }

    handleClose();
    resetForm();
  };

  return (
    <Box onClose={handleClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormLabel>First Name <span style={{ color: 'red' }}>*</span></FormLabel>
              <Textfield name="fName" id="fName" placeholder="First Name" component={Textfield} />
              <ErrorMessage name="fName" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>Last Name</FormLabel>
              <Textfield name="lName" id="lName" placeholder="Last Name " component={Textfield} />
              <ErrorMessage name="lName" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>Email <span style={{ color: 'red' }}>*</span></FormLabel>
              <Textfield name="email" id="email" placeholder="Email" component={Textfield} />
              <ErrorMessage name="email" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>Mobile <span style={{ color: 'red' }}>*</span></FormLabel>
              <Textfield name="mobileNo" id="mobileNo" placeholder="Mobile" component={Textfield} />
              <ErrorMessage name="mobileNo" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>Role <span style={{ color: 'red' }}>*</span></FormLabel>
              
              <Select
                name="role"
                placeholder="Role"
                value={role}
                onChange={handleRoleChange}
                variant="outlined"
                fullWidth
                
                style={{
                  height: '51px',
                  width: '100%',
                  borderRadius: '2px !importent',
                  borderBottom: '1px solid black',
                  marginTop:'8px'
                }}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Role
                </MenuItem>{' '}
                <MenuItem value={RoleEnum.VENDOR_ACCOUNTANT}>Accountant</MenuItem>
                <MenuItem value={RoleEnum.VENDOR_MANAGER}>Manager</MenuItem>
                <MenuItem value={RoleEnum.VENDOR_OPERATOR}>Operator</MenuItem>
              </Select>
              <ErrorMessage name="role" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
            </Grid>
            {formtype === 'addform' && (
              <Grid item xs={12} sm={6}>
                <FormLabel>Password <span style={{ color: 'red' }}>*</span></FormLabel>
                <Textfield
                    name="password"
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    fullWidth
                    component={Textfield}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={togglePasswordVisibility} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                <ErrorMessage name="password" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid>
            )}
            {/* {formtype === 'addform' && (
              <Grid item xs={12} sm={6}>
                <FormLabel>Retype Password</FormLabel>
                <Textfield name="Repassword" id="Repassword" placeholder="Retype Password" component={Textfield} />
                <ErrorMessage name="Repassword" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid>
            )} */}
          </Grid>
          <Button type="submit" sx={style.changeBtn}>
            Save
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default AddEditModal;
