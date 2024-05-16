import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Textfield from 'ui-component/common/TextField';
import { Button, Tab, Tabs } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import commonStyles from 'assets/style/Style';
import 'assets/style/style.css';

import { addCustomer, updateCustomer, getCustomerById, getCustomer } from 'module/vendor/container/customerContainer/slice';
import { getCountry } from 'module/admin/container/countryContainer/slice';
import { getEnqSource } from 'module/admin/container/enqSourceContainer/slice';
import { getState } from 'module/admin/container/stateContainer/slice';
import { getEnqMode } from 'module/admin/container/enqModeContainer/slice';
import { getDistrict } from 'module/admin/container/districtContainer/slice';

const AddEditModal = ({ formtype, data, handleClose }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();

  const customerByIdData = useSelector((state) => state.data.customers.customerByIdData);
  const CountryDetails = useSelector((state) => state.adminReducer.country.countryData);
  // const enqSourceDetails = useSelector((state) => state.adminReducer.enqsource.enqsourceData);
  const stateDetails = useSelector((state) => state.adminReducer.state.stateData);
  // const enqModDetails = useSelector((state) => state.adminReducer.enqmode.enqModeData);
  const district = useSelector((state) => state.adminReducer.district.districtData);

  console.log("===customerByIdData=====", customerByIdData);

  useEffect(() => {
    dispatch(getCountry());
    dispatch(getEnqSource());
    dispatch(getState());
    dispatch(getEnqMode());
    dispatch(getDistrict());
  }, [dispatch]);

  useEffect(() => {
    if (data && data.id && formtype === 'editform') {
      dispatch(getCustomerById(data.id));
    }
  }, [dispatch, data, formtype]);

  const indiaCountryId = CountryDetails?.rows?.find((country) => country.name === 'INDIA')?.id || '';
  const keralaStateId = stateDetails?.rows?.find((state) => state.name === 'Kerala')?.id || '';
  const kozhikodeDistrictId = district?.rows?.find((district) => district.name === 'kozhikode')?.id || '';

  const [initialValues, setInitialValues] = useState({
    custType: 'individual',
    fName: '',
    lName: '',
    email: '',
    contactMobile1: '',
    contactMobile2: '',
    address: {
      country: indiaCountryId,
      state: keralaStateId,
      district: kozhikodeDistrictId,
      city: '',
      addr1: '',
      addr2: '',
      postalCode: ''
    },
    enqMode: '',
    enqSource: '',
    gstin: '',
    licenceNo: '',
    remarks: '',
    extRefNo: ''
  });

  useEffect(() => {
    if (data && data.id && formtype === 'editform') {
      setInitialValues({
        custType: customerByIdData?.custType?.values || 'individual',
        fName: customerByIdData?.fName || '',
        lName: customerByIdData?.lName || '',
        email: customerByIdData?.email || '',
        contactMobile1: customerByIdData?.contactMobile1 || '',
        contactMobile2: customerByIdData?.contactMobile2 || '',
        address: {
          country: customerByIdData?.address?.country.id?.name || indiaCountryId,
          state: customerByIdData?.address?.state?.id?.name || keralaStateId,
          district: customerByIdData?.address?.district?.id?.name || kozhikodeDistrictId,
          city: customerByIdData?.address?.city || '',
          addr1: customerByIdData?.address?.addr1 || '',
          addr2: customerByIdData?.address?.addr2 || '',
          postalCode: customerByIdData?.address?.postalCode || ''
        },

        enqMode: customerByIdData?.enqMode?.id || '',
        enqSource: customerByIdData?.enqSource?.id || '',
        licenceNo: customerByIdData?.licenceNo || '',
        gstin: customerByIdData?.gstin || '',
        remarks: customerByIdData?.remarks || '',
        extRefNo: customerByIdData?.extRefNo || ''
      });
    }
  }, [data, customerByIdData, formtype, indiaCountryId, keralaStateId, kozhikodeDistrictId]);

  const validationSchema = Yup.object({
    custType: Yup.string().required('  Customer Type is required'),
    fName: Yup.string().required('First Name is required'),
    contactMobile1: Yup.string()
      .required('Mobile is required')
      .matches(/^\d{10}$/, 'Must be a 10-digit mobile number'),
    contactMobile2: Yup.string().matches(/^\d{10}$/, 'Must be a 10-digit mobile number')
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      if (formtype && formtype === 'addform') {
        await dispatch(addCustomer(values));
        await dispatch(getCustomer());
      } else {
        values.id = data.id;
        await dispatch(updateCustomer(values));
        await dispatch(getCustomer());
      }
      handleClose(formtype);
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <Box onClose={handleClose}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
              <Tab label="Task Details" />
              <Tab label="Client Details" />
              <Tab label="Contact Personal Details" />
            </Tabs>
            <TabPanel value={currentTab} index={0}>
              {/* Basic Details Tab */}
              <Grid container spacing={2}>
                <Grid item md={4}>
                  <FormLabel>
                    Task Type
                  </FormLabel>
                  <Select
                    name="custType"
                    id="custType"
                    value={values.custType}
                    onChange={(e) => {
                      setFieldValue('custType', e.target.value);
                    }}
                    variant="outlined"
                    fullWidth
                    style={{
                      height: '56px',
                      width: '100%',
                      border: 'none',
                      borderBottom: '1px solid black'
                    }}
                    displayEmpty
                  >
                    <MenuItem value="individual" disabled>
                      Select Task Type
                    </MenuItem>
                    {/* <MenuItem value="organization">Organization</MenuItem>
                    <MenuItem value="individual">Individual</MenuItem>
                    <MenuItem value="Agent">Agent</MenuItem> */}
                  </Select>
                  <ErrorMessage name="custType" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={4}>
                  <FormLabel>
                    Task Category
                    {/* <span style={{ color: 'red' }}>*</span> */}
                  </FormLabel>
                  <Select
                    name="custType"
                    id="custType"
                    value={values.custType}
                    onChange={(e) => {
                      setFieldValue('custType', e.target.value);
                    }}
                    variant="outlined"
                    fullWidth
                    style={{
                      height: '56px',
                      width: '100%',
                      border: 'none',
                      borderBottom: '1px solid black'
                    }}
                    displayEmpty
                  >
                    <MenuItem value="individual" disabled>
                      Select Task Category
                    </MenuItem>
                    {/* <MenuItem value="organization">Organization</MenuItem> */}
                    {/* <MenuItem value="individual" >Select Task Category</MenuItem> */}
                    {/* <MenuItem value="Agent">Agent</MenuItem> */}
                  </Select>
                  <ErrorMessage name="custType" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={4}>
                  <FormLabel>Task Title</FormLabel>
                  <Textfield name="lName" id="lName" placeholder="Task Title" component={Textfield} />
                  <ErrorMessage name="lName" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={4}>
                  <FormLabel>
                    Task Priority
                  </FormLabel>
                  <Select
                    name="custType"
                    id="custType"
                    value={values.custType}
                    onChange={(e) => {
                      setFieldValue('custType', e.target.value);
                    }}
                    variant="outlined"
                    fullWidth
                    style={{
                      height: '56px',
                      width: '100%',
                      border: 'none',
                      borderBottom: '1px solid black'
                    }}
                    displayEmpty
                  >
                    <MenuItem value="individual" disabled>
                      Select Task Priority
                    </MenuItem>
                    {/* <MenuItem value="organization">Organization</MenuItem>
                    <MenuItem value="individual">Individual</MenuItem>
                    <MenuItem value="Agent">Agent</MenuItem> */}
                  </Select>
                  <ErrorMessage name="custType" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={4}>
                  <FormLabel>Start Date</FormLabel>
                  <Textfield name="email" id="email" type='date' component={Textfield} />
                  <ErrorMessage name="email" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={4}>
                  <FormLabel>End Date</FormLabel>
                  <Textfield name="email" id="email" type='date' component={Textfield} />
                  <ErrorMessage name="email" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={4}>
                  <FormLabel>Image Uploads</FormLabel>
                  <Textfield  name="email"  type='file' component={Textfield} />
                  <ErrorMessage name="email" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={4}>
                  <FormLabel>
                    Assigned To
                  </FormLabel>
                  <Select
                    name="custType"
                    id="custType"
                    value={values.custType}
                    onChange={(e) => {
                      setFieldValue('custType', e.target.value);
                    }}
                    variant="outlined"
                    fullWidth
                    style={{
                      marginTop:2,
                      height: '56px',
                      width: '100%',
                      border: 'none',
                      borderBottom: '1px solid black'
                    }}
                    displayEmpty
                  >
                    <MenuItem value="individual" disabled>
                      Assigned To
                    </MenuItem>
                    {/* <MenuItem value="organization">Organization</MenuItem>
                    <MenuItem value="individual">Individual</MenuItem>
                    <MenuItem value="Agent">Agent</MenuItem> */}
                  </Select>
                  <ErrorMessage name="custType" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormLabel>Description</FormLabel>

                  <Textfield
                    multiline
                    minRows={4}
                    maxRows={6}

                    aria-label="maximum height"
                    name="desc"
                    id="desc"
                    placeholder="Description"
                    component={Textfield}
                  />
                  <ErrorMessage name="desc" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>
                <Grid item xs={12} sm={6}></Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={currentTab} index={1}>
              <Grid container spacing={2}>
                {/* Country Dropdown */}
                {/* <Grid item xs={12} sm={4}>
                  <FormLabel>Country</FormLabel>
                  <Select
                    name="address.country"
                    id="address.country"
                    value={values.address.country} // Use Formik values
                    onChange={(e) => {
                      setFieldValue('address.country', e.target.value); // Update Formik values
                    }}
                    variant="outlined"
                    fullWidth
                    style={{
                      height: '56px',
                      width: '100%',
                      border: 'none',
                      borderBottom: '1px solid black'
                    }}
                  >
                    {CountryDetails?.rows?.map((country) => (
                      <MenuItem key={country.id} value={country.id}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <ErrorMessage name="address.country" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid> */}
                <Grid item md={4}>
                  <FormLabel>Client Name</FormLabel>
                  <Textfield name="email" id="email" placeholder='Client Name' component={Textfield} />
                  <ErrorMessage name="email" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>
                {/* State Dropdown */}
                {/* <Grid item xs={12} sm={4}>
                  <FormLabel>State</FormLabel>
                  <Select
                    name="address.state"
                    id="address.state"
                    label="State"
                    defaultValue="Select State"
                    value={values.address.state}
                    onChange={(e) => {
                      setFieldValue('address.state', e.target.value);
                    }}
                    variant="outlined"
                    fullWidth
                    style={{ height: '56px', width: '100%', border: 'none', borderBottom: '1px solid black' }}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Select State
                    </MenuItem>
                    {stateDetails?.rows?.map((state) => (
                      <MenuItem key={state.id} value={state.id}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>

                  <ErrorMessage name="address.state" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid> */}
                <Grid item md={4}>
                  <FormLabel>Client Location</FormLabel>
                  <Textfield name="email" id="email" placeholder='Client Location' component={Textfield} />
                  <ErrorMessage name="email" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                {/* District Dropdown */}
                {/* <Grid item xs={12} sm={4}>
                  <FormLabel>District</FormLabel>
                  <Select
                    name="address.district"
                    id="address.district"
                    value={values.address.district}
                    onChange={(e) => {
                      setFieldValue('address.district', e.target.value);
                    }}
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
                </Grid> */}
                <Grid item md={4}>
                  <FormLabel>Client Mobile</FormLabel>
                  <Textfield name="email" id="email" placeholder='Client Mobile' component={Textfield} />
                  <ErrorMessage name="email" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={4}>
                  <FormLabel>Client Email</FormLabel>
                  <Textfield name="email" id="email" placeholder='Client Email' component={Textfield} />
                  <ErrorMessage name="email" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={4}>
                  <FormLabel>Client Website</FormLabel>
                  <Textfield name="email" id="email" placeholder='Client Website' component={Textfield} />
                  <ErrorMessage name="email" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

              </Grid>
            </TabPanel>
            <TabPanel value={currentTab} index={2}>
              {/* Remarks Tab */}
              <Grid container spacing={2}>
                <Grid item md={4}>
                  <FormLabel>Spoc Name</FormLabel>
                  <Textfield name="email" id="email" placeholder='Spoc Name' component={Textfield} />
                  <ErrorMessage name="email" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>
                <Grid item md={4}>
                  <FormLabel>Spoc Mobile</FormLabel>
                  <Textfield name="email" id="email" placeholder='Spoc Mobile' component={Textfield} />
                  <ErrorMessage name="email" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>


                <Grid item md={4}>
                  <FormLabel>
                    Spoc Designation
                  </FormLabel>
                  <Select
                    name="custType"
                    id="custType"
                    value={values.custType}
                    onChange={(e) => {
                      setFieldValue('custType', e.target.value);
                    }}
                    variant="outlined"
                    fullWidth
                    style={{
                      height: '56px',
                      width: '100%',
                      border: 'none',
                      borderBottom: '1px solid black'
                    }}
                    displayEmpty
                  >
                    <MenuItem value="individual" disabled>
                      Spoc Designation
                    </MenuItem>
                    {/* <MenuItem value="organization">Organization</MenuItem>
                    <MenuItem value="individual">Individual</MenuItem>
                    <MenuItem value="Agent">Agent</MenuItem> */}
                  </Select>
                  <ErrorMessage name="custType" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={4}>
                  <FormLabel>Mobile</FormLabel>
                  <Textfield name="licenceNo" id="licenceNo" placeholder="Mobile" component={Textfield} />
                  <ErrorMessage name="licenceNo" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={4}>
                  <FormLabel>Email</FormLabel>
                  <Textfield name="extRefNo" id="extRefNo" placeholder="Email" component={Textfield} />
                  <ErrorMessage name="extRefNo" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={4}>
                  <FormLabel>Alternate Phone</FormLabel>
                  <Textfield name="extRefNo" id="extRefNo" placeholder="Email" component={Textfield} />
                  <ErrorMessage name="extRefNo" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>


                {/* <TextareaAutosize
          minRows={3}
          aria-label="remarks"
          name="remarks"
          id="remarks"
          placeholder="Enter your remarks"
          component={Textfield} 
          style={{ width: '100%' }} // Optional, set width to fill the grid
        />    */}

                {/* <Grid item xs={12} md={4}>
                  <FormLabel>Remarks</FormLabel>
                  <Textfield
                    multiline
                    minRows={4}
                    maxRows={6}
                    aria-label="maximum height"
                    name="remarks"
                    id="remarks"
                    placeholder="Remarks"
                    component={Textfield}
                  />
                  <ErrorMessage name="remarks" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid> */}

              </Grid>
            </TabPanel>
            <Button type="submit" sx={style.changeBtn}>
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

function TabPanel(props) {
  const { children, value, index } = props;

  return <div hidden={value !== index}>{value === index && <Box sx={{ p: 3 }}>{children}</Box>}</div>;
}

export default AddEditModal;
