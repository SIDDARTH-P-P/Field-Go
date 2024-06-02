import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, Box, Card, CardContent, Divider, Typography, MenuItem, Select, FormLabel } from '@mui/material';
import TextField from 'ui-component/common/TextField';
import { IconButton } from '@mui/material';
 import { IconUser, IconPencil } from '@tabler/icons';
import User1 from 'assets/images/users/5856.jpg';
import './Profile.css';
import commonStyles from 'assets/style/Style';
import { useTheme } from '@mui/material/styles';
import { getProfileById, updateProfile } from 'module/vendor/container/profile/profile/slice';
import { getState } from 'module/admin/container/stateContainer/slice';
import { getCountry } from 'module/admin/container/countryContainer/slice';
import { getDistrict } from 'module/admin/container/districtContainer/slice';
import { capitalizeFirstLetter } from '../utilities/Capitallised';
import { userLogin } from 'container/LoginContainer/slice';
 import Tooltip from '@mui/material/Tooltip';

function Index() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const style = commonStyles(theme);

  // USERS
  // const userData = useSelector((state) => state.login.user);

// PROFILE
const profileByIdData = useSelector((state) => state.data.profile.profileByIdData);
console.log("======profileDetails====", profileByIdData);
  
  const CountryDetails = useSelector((state) => state.adminReducer.country.countryData);
  const stateDetails = useSelector((state) => state.adminReducer.state.stateData);
  const district = useSelector((state) => state.adminReducer.district.districtData);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('INDIA');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(getCountry());
    dispatch(getState());
    dispatch(getDistrict());
  }, [dispatch]);

  useEffect(() => {
    if (userMeDataDe && userMeDataDe.userId) {
      dispatch(getProfileById({ userId: userMeDataDe.userId }));
      dispatch(userLogin());
    }
  }, [dispatch]);

  const userMeDataDe = useSelector((state) => state.login.user);

  const handleChangeCountry = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleChangeState = (event) => {
    setSelectedState(event.target.value);
    setSelectedDistrict('');
  };

  const handleChangeDistrict = (event) => {
    setSelectedDistrict(event.target.value);
  };

  const [initialValues, setInitialValues] = useState({
    fName: capitalizeFirstLetter(userMeDataDe?.fName || ''),
    lName: capitalizeFirstLetter(userMeDataDe?.lName || ''),
    mobileNo: userMeDataDe?.mobileNo || '',
    email: userMeDataDe?.email || '',
    contactMobile1: '',
    contactMobile2: '',
    country: '',
    state: '',
    district: '',
    City: '',
    Region: '',
    LandMark: '',
    addr1: '',
    addr2: '',
    Pincode: ''
  });
  
  useEffect(() => {
    setInitialValues({
      fName: capitalizeFirstLetter(userMeDataDe?.fName || ''),
      lName: capitalizeFirstLetter(userMeDataDe?.lName || ''),
      mobileNo: userMeDataDe?.mobileNo || '',
      email: userMeDataDe?.email || '',
      contactMobile1: profileByIdData?.contactMobile1 || '',
      contactMobile2: profileByIdData?.contactMobile2 || '',
      country: profileByIdData?.country || '',
      state: profileByIdData?.state || '',
      district: profileByIdData?.district || '',
      City: profileByIdData?.City || '',
      Region: profileByIdData?.Region || '',
      LandMark: profileByIdData?.landmark || '',
      addr1: profileByIdData?.addr1 || '',
      addr2: profileByIdData?.addr2 || '',
      Pincode: profileByIdData?.postalCode || ''
    });
  }, [userMeDataDe, profileByIdData]);

  const validationSchema = Yup.object({
    contactMobile1: Yup.string().required('Contact Mobile 1 is Required'),
    contactMobile2: Yup.string().required('Contact Mobile 2 is Required'),
    Country: Yup.string().required('Country is Required'),
    State: Yup.string().required('State is Required'),
    District: Yup.string().required('District is Required'),
    City: Yup.string().required('City is Required'),
    Region: Yup.string().required('Region is Required'),
    LandMark: Yup.string().required('Land Mark is Required'),
    addr1: Yup.string().required('Address Line 1 is Required'),
    addr2: Yup.string().required('Address Line 2 is Required'),
    Pincode: Yup.string().required('Pincode is Required')
  });

  const onSubmit = (values) => {
    dispatch(updateProfile({ userId: userMeDataDe.userId, profileData: values }));
  };

  const handleEditModeToggle = () => {
    setEditMode(!editMode);
  };

  return (
    <Box>
      <Grid style={{ backgroundColor: '#fff', borderRadius: '14px' }}>
        <Card>
          <CardContent className="photocontent">
            <Typography variant="h4" className="textcontent">
              <IconUser className="textcontenticon" /> Update Profile
            </Typography>
          </CardContent>
          <CardContent>
            <Grid style={{ backgroundColor: '#fff', borderRadius: '14px' }}>
              <Card>
                <CardContent style={{ position: 'relative' }}>
                <Tooltip title="Edit Profile">
                    <IconButton
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'black',
                        cursor: 'pointer',
                        color: '#fff'
                      }}
                      onClick={handleEditModeToggle}
                    >
                      <IconPencil style={{ color: 'white' }} />
                    </IconButton>
                    </Tooltip>
                  <Grid container spacing={2} className="media600">
                    <Grid item xs={12} sm={3} md={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <img src={User1} alt="user" style={{ height: '250px', width: '250px', borderRadius: '50%' }} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={9} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                      <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                        enableReinitialize={true}
                      >
                        <Form>
                          <Grid container spacing={2} className="textcard">
                            <Grid item xs={12} sm={6} md={6}>
                              <Typography>First Name</Typography>
                              <Field type="text" id="fName" name="fName" as={TextField} fullWidth disabled={!editMode} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                              <Typography>Last Name</Typography>
                              <Field type="text" id="lName" name="lName" as={TextField} disabled={!editMode} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                              <Typography>Contact No</Typography>
                              <Field type="text" name="mobileNo" as={TextField} disabled />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                              <Typography>Email Id</Typography>
                              <Field type="text" name="email" as={TextField} disabled />
                            </Grid>
                          </Grid>
                        </Form>
                      </Formik>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </CardContent>
          <Divider />
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
            <Form>
              <Grid container spacing={2} className="textcard">
                <Grid item xs={12} sm={6} md={4}>
                  <Typography>Contact Mobile 1</Typography>
                  <Field
                    type="text"
                    name="contactMobile1"
                    id="contactMobile1"
                    placeholder="Contact Mobile 1"
                    as={TextField}
                    disabled={!editMode}
                  />
                  <ErrorMessage
                    name="contactMobile1"
                    component="div"
                    style={{
                      color: '#f54d4f',
                      fontSize: 12,

                      bottom: '5px'
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FormLabel>Country</FormLabel>
                  <Select
                    disabled={!editMode}
                    name="country"
                    id="country"
                    defaultValue="INDIA"
                    onChange={handleChangeCountry}
                    value={selectedCountry}
                    variant="outlined"
                    fullWidth
                    style={{
                      height: '56px',
                      width: '100%',
                      border: 'none',
                      borderBottom: '1px solid black'
                    }}
                  >
                    <MenuItem value="Select Country">Select Country</MenuItem>
                    {CountryDetails.rows &&
                      Array.isArray(CountryDetails.rows) &&
                      CountryDetails.rows.map((item) => (
                        <MenuItem key={item.id} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                  <ErrorMessage name="address.country" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FormLabel>State</FormLabel>
                  <Select
                    disabled={!editMode}
                    name="state"
                    id="state"
                    label="State"
                    defaultValue="KERALA"

                     value={selectedState}
                    onChange={handleChangeState}
                    variant="outlined"
                    fullWidth
                    style={{ height: '56px', width: '100%', border: 'none', borderBottom: '1px solid black' }}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Select State
                    </MenuItem>
                    {stateDetails?.rows?.map((state) => (
                      <MenuItem key={state.id} value={state.name}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <ErrorMessage name="address.state" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FormLabel>District</FormLabel>
                  <Select
                    disabled={!editMode}
                    name="address.district"
                    id="address.district"
                    value={selectedDistrict}
                    onChange={handleChangeDistrict}
                    variant="outlined"
                    fullWidth
                    style={{ height: '56px', width: '100%', border: 'none', borderBottom: '1px solid black' }}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Select District
                    </MenuItem>
                    {district?.rows?.map((district) => (
                      <MenuItem key={district.id} value={district.id}>
                        {district.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <ErrorMessage name="address.district" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography>City</Typography>
                  <Field type="text" name="City" id="City" placeholder="City" as={TextField} disabled={!editMode} />
                  <ErrorMessage
                    name="City"
                    component="div"
                    style={{
                      color: '#f54d4f',
                      fontSize: 12,

                      bottom: '5px'
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography>Region</Typography>
                  <Field type="text" name="Region" id="Region" placeholder="Region" as={TextField} disabled={!editMode} />
                  <ErrorMessage
                    name="Region"
                    component="div"
                    style={{
                      color: '#f54d4f',
                      fontSize: 12,

                      bottom: '5px'
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography>Land Mark</Typography>
                  <Field type="text" name="Land Mark" id="Land Mark" placeholder="Land Mark" as={TextField} disabled={!editMode} />
                  <ErrorMessage
                    name="Land Mark"
                    component="div"
                    style={{
                      color: '#f54d4f',
                      fontSize: 12,

                      bottom: '5px'
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography>Address Line 1</Typography>
                  <Field type="text" name="addr1" id="addr1" placeholder="Address Line 1" as={TextField} disabled={!editMode} />
                  <ErrorMessage
                    name="addr1"
                    component="div"
                    style={{
                      color: '#f54d4f',
                      fontSize: 12,

                      bottom: '5px'
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography>Address Line 2</Typography>
                  <Field type="text" name="addr2" id="addr2" placeholder="Address Line 2" as={TextField} disabled={!editMode} />
                  <ErrorMessage
                    name="addr2"
                    component="div"
                    style={{
                      color: '#f54d4f',
                      fontSize: 12,

                      bottom: '5px'
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Typography>Pincode</Typography>
                  <Field type="text" name="Pincode" id="Pincode" placeholder="Pincode" as={TextField} disabled={!editMode} />
                  <ErrorMessage
                    name="Pincode"
                    component="div"
                    style={{
                      color: '#f54d4f',
                      fontSize: 12,
                      display: 'flex',
                      bottom: '5px'
                    }}
                  />
                </Grid>
              </Grid>
              <Box style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
                <Button type="submit" sx={style.changeBtn} disabled={!editMode}>
                  Save
                </Button>
              </Box>
            </Form>
          </Formik>
        </Card>
      </Grid>
    </Box>
  );
}

export default Index;