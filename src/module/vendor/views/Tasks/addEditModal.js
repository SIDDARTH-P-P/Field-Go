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

import { getTaskById ,addtask,gettask,updateTask} from 'module/vendor/container/customerContainer/slice';
import { getCountry } from 'module/admin/container/countryContainer/slice';
import { getEnqSource } from 'module/admin/container/enqSourceContainer/slice';
import { getState } from 'module/admin/container/stateContainer/slice';
import { getEnqMode } from 'module/admin/container/enqModeContainer/slice';
import { getDistrict } from 'module/admin/container/districtContainer/slice';
import { getUser } from 'module/vendor/container/userContainer/slice';
import { gettaskType } from 'module/vendor/container/taskTypeContainer/slice';
import { gettaskCategory } from 'module/vendor/container/taskCategoryContainer/slice';
import styled from '@emotion/styled';

const AddEditModal = ({ formtype, data, handleClose }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();

  const taskByIdData = useSelector((state) => state.data.customers.customerByIdData );
  const CountryDetails = useSelector((state) => state.adminReducer.country.countryData);
  // const enqSourceDetails = useSelector((state) => state.adminReducer.enqsource.enqsourceData);
  const stateDetails = useSelector((state) => state.adminReducer.state.stateData);
  // const enqModDetails = useSelector((state) => state.adminReducer.enqmode.enqModeData);
  const district = useSelector((state) => state.adminReducer.district.districtData);
  const userDetails = useSelector((state) => state.data.user.userData);
  const taskType = useSelector((state)=>state.data.taskType.taskTypeData)
  const taskCategory = useSelector((state)=>state.data.taskCategory.taskCategoryData)
  const [buttonText,setbuttonText] = useState("Add Attachments")

  const Input = styled('input')({
    display: 'none',
  })

  console.log("===taskByIdData =====", taskByIdData);
  console.log("===userDetails=====", userDetails?.rows);
  console.log("===taskTypess=====", taskCategory?.rows?.taskCatgName);

  useEffect(() => {
    dispatch(gettaskCategory())
    dispatch(gettaskType())
    dispatch(getUser({}));
    dispatch(getCountry());
    dispatch(getEnqSource());
    dispatch(getState());
    dispatch(getEnqMode());
    dispatch(getDistrict());
  }, [dispatch]);


  useEffect(() => {
    if (data && data.id && formtype === 'editform') {
      dispatch(getTaskById(data.id));
    }
  }, [dispatch, data, formtype]);

  const indiaCountryId = CountryDetails?.rows?.find((country) => country.name === 'INDIA')?.id || '';
  const keralaStateId = stateDetails?.rows?.find((state) => state.name === 'Kerala')?.id || '';
  const kozhikodeDistrictId = district?.rows?.find((district) => district.name === 'kozhikode')?.id || '';

  const [initialValues, setInitialValues] = useState({
    taskType: 'individual',
    taskCategory: 'individual',
    taskTitle: '',
    taskDescp: '',
    taskPriority: 'individual',
    taskStartDate: '',
    taskEndDate: '',
    assignedTo: 'individual',
    imgUrls:'',
    clientDetails: {
      name: '',
      location: '',
      mobile: '',
      email: '',
      website: '',
      spocName: '',
      spocDesig: 'individual',
      spocMobile: '',
      spocEmail: '',
      alternatePhone: ''
    }
  });

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  

  useEffect(() => {
    if (data && data.id && formtype === 'editform') {
      setInitialValues({
        taskType: taskByIdData ?.taskType?.id || 'individual',
        taskCategory: taskByIdData ?.taskCategory?.id || 'individual',
        assignedTo: taskByIdData ?.assignedTo?.id  || 'individual',
        taskTitle: taskByIdData ?.taskTitle || '',
        taskDescp: taskByIdData ?.taskDescp || '',
        taskPriority: taskByIdData ?.taskPriority || '',
        taskStartDate: taskByIdData ?.taskStartDate?.split('T')[0] || '',
        taskEndDate: taskByIdData ?.taskEndDate?.split('T')[0] || '',
        clientDetails: {
          spocDesig: taskByIdData ?.clientDetails?.spocDesig || 'individual',
          name: taskByIdData ?.clientDetails?.name || '',
          mobile: taskByIdData ?.clientDetails?.mobile || '',
          location: taskByIdData ?.clientDetails?.location || '',
          email: taskByIdData ?.clientDetails?.email || '',
          website: taskByIdData ?.clientDetails?.website || '',
          spocName: taskByIdData ?.clientDetails?.spocName || '',
          spocMobile: taskByIdData ?.clientDetails?.spocMobile || '',
          spocEmail: taskByIdData ?.clientDetails?.spocEmail || '',
          alternatePhone: taskByIdData ?.clientDetails?.alternatePhone || '',
        },
      });
    }
  }, [data, taskByIdData , formtype, indiaCountryId, keralaStateId, kozhikodeDistrictId]);

  const validationSchema = Yup.object({
    // custType: Yup.string().required('  Customer Type is required'),
    // fName: Yup.string().required('First Name is required'),
    // contactMobile1: Yup.string()
    //   .required('Mobile is required')
    //   .matches(/^\d{10}$/, 'Must be a 10-digit mobile number'),
    // contactMobile2: Yup.string().matches(/^\d{10}$/, 'Must be a 10-digit mobile number')
  });

  const onSubmit = async (values, { resetForm }) => {

    try {
      if (formtype && formtype === 'addform') {
        await dispatch(addtask(values));
        await dispatch(gettask());
      } else {
        values.id = data.id;
        await dispatch(updateTask(values));
        await dispatch(gettask());
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
                <Grid item md={3}>
                  <FormLabel>
                    Type
                  </FormLabel>
                  <Select
                    name="taskType"
                    id="taskType"
                    value={values.taskType}
                    onChange={(e) => {
                      setFieldValue('taskType', e.target.value);
                    }}
                    variant="outlined"
                    fullWidth
                    style={{
                      marginTop: 5,
                      height: '56px',
                      width: '100%',
                      border: 'none',
                    }}
                    displayEmpty
                  >
                    <MenuItem value="individual" disabled>
                      Select  Type
                    </MenuItem>
                      {taskType?.rows?.map((task) => (
                      <MenuItem key={task.id} value={task.id}>
                        {task.taskType}
                      </MenuItem>
                    ))}
                  </Select>
                  <ErrorMessage name="custType" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={3}>
                  <FormLabel>
                    Category
                    {/* <span style={{ color: 'red' }}>*</span> */}
                  </FormLabel>
                  <Select
                    name="taskCategory"
                    id="taskCategory"
                    value={values.taskCategory}
                    onChange={(e) => {
                      setFieldValue('taskCategory', e.target.value);
                    }}
                    variant="outlined"
                    fullWidth
                    style={{
                      marginTop: 5,
                      height: '56px',
                      width: '100%',
                      border: 'none',
                    }}
                    displayEmpty
                  >
                    <MenuItem value="individual" disabled>
                      Select Category
                    </MenuItem>
                      {taskCategory?.rows?.map((task) => (
                      <MenuItem key={task.id} value={task.id}>
                        {task.taskCatgName}
                      </MenuItem>
                    ))}
                  </Select>
                  <ErrorMessage name="custType" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={3}>
                  <FormLabel>
                    Priority
                  </FormLabel>
                  <Select
                    name="taskPriority"
                    id="taskPriority"
                    value={values.taskPriority}
                    onChange={(e) => {
                      setFieldValue('taskPriority', e.target.value);
                    }}
                    variant="outlined"
                    fullWidth
                    style={{
                      marginTop: 5,
                      height: '56px',
                      width: '100%',
                      border: 'none',
                    }}
                    displayEmpty
                  >
                    <MenuItem value="individual" disabled>
                      Select  Priority
                    </MenuItem>
                    <MenuItem value="low">low</MenuItem>
                    <MenuItem value="normal">Normal</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="urgent ">Urgent </MenuItem>
                  </Select>
                  <ErrorMessage name="custType" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={3}>
                  <FormLabel>
                    Assigned To
                  </FormLabel>
                  <Select
                    name="assignedTo"
                    id="assignedTo"
                    value={values.assignedTo} // Use Formik values
                    onChange={(e) => {
                      setFieldValue('assignedTo', e.target.value)
                      console.log(e.target.value); // Update Formik values
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
                    <MenuItem value="individual" disabled>
                      Assigned To
                    </MenuItem>
                    {userDetails?.rows?.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.fName}
                      </MenuItem>
                    ))}
                  </Select>
                  <ErrorMessage name="assignedTo" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />

                </Grid>

                  <Grid item md={5}>

                    <FormLabel>Start Date</FormLabel>
                    <Textfield name="taskStartDate" id="taskStartDate" type='date' component={Textfield} onChange={(e) => {
                      setFieldValue('taskStartDate', e.target.value);
                    }} />
                    <ErrorMessage name="taskStartDate" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />

                    <FormLabel>End Date</FormLabel>
                    <Textfield name="taskEndDate" id="taskEndDate" type='date' component={Textfield} onChange={(e) => {
                      setFieldValue('taskEndDate', e.target.value);
                    }} />
                    <ErrorMessage name="taskEndDate" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />

                    <FormLabel>Upload Image</FormLabel>
                  <label htmlFor="imgUrls">
                    <Input
                      accept="image/*"
                      id="imgUrls"
                      type="file"
                      name="imgUrls"
                      // onChange={handleChange}
                      // onBlur={handleBlur}
                      onChange={(event) => {
                        setbuttonText(event.currentTarget.files[0].name)
                        convertFileToBase64(event.currentTarget.files[0])
                        .then(res =>(setFieldValue('imgUrls',res)))
                      }}
                      // value={values.imgUrls}
                    />
                    <Button
                      variant="outlined"
                      component="span"
                      fullWidth
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '12px 16px',
                        borderColor: 'rgba(0, 0, 0, 0.23)',
                        borderRadius: '4px',
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <svg
                          style={{ marginRight: 8 }}
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 17h14v2H5v-2zm7-12l5 5h-4v6h-2v-6H7l5-5z"
                            fill="currentColor"
                          />
                        </svg>
                        {buttonText}
                      </span>
                    </Button>
                  </label>

                  </Grid>

                  <Grid item xs={12} md={7}>

                    <FormLabel>Title</FormLabel>
                    <Textfield name="taskTitle" id="taskTitle" placeholder="Task Title" component={Textfield} />
                    <ErrorMessage name="taskTitle" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />

                    <FormLabel>Description</FormLabel>

                    <Textfield
                      multiline
                      minRows={5.5}
                      maxRows={5}

                      aria-label="maximum height"
                      name="taskDescp"
                      id="taskDescp"
                      placeholder="Description"
                      component={Textfield}
                    />
                    <ErrorMessage name="taskDescp" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
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
                  <FormLabel>Name</FormLabel>
                  <Textfield name="clientDetails.name" id="clientDetails.name" placeholder='Name' component={Textfield} />
                  <ErrorMessage name="clientDetails.name" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
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
                  <FormLabel>Location</FormLabel>
                  <Textfield name="clientDetails.location" id="clientDetails.location" placeholder='Location' component={Textfield} />
                  <ErrorMessage name="clientDetails.location" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
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
                  <FormLabel>Mobile</FormLabel>
                  <Textfield name="clientDetails.mobile" id="clientDetails.mobile" placeholder='Mobile' component={Textfield} />
                  <ErrorMessage name="clientDetails.mobile" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={4}>
                  <FormLabel>Email</FormLabel>
                  <Textfield name="clientDetails.email" id="clientDetails.email" placeholder='Email' component={Textfield} />
                  <ErrorMessage name="clientDetails.email" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={4}>
                  <FormLabel>Website</FormLabel>
                  <Textfield name="clientDetails.website" id="clientDetails.website" placeholder='Website' component={Textfield} />
                  <ErrorMessage name="clientDetails.website" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

              </Grid>
            </TabPanel>
            <TabPanel value={currentTab} index={2}>
              {/* Remarks Tab */}
              <Grid container spacing={2}>
                <Grid item md={4}>
                  <FormLabel>SPOC Name</FormLabel>
                  <Textfield name="clientDetails.spocName" id="clientDetails.spocName" placeholder='SPOC Name' component={Textfield} />
                  <ErrorMessage name="clientDetails.spocName" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>
                <Grid item md={4}>
                  <FormLabel>SPOC Mobile</FormLabel>
                  <Textfield name="clientDetails.spocMobile" id="clientDetails.spocMobile" placeholder='SPOC Mobile' component={Textfield} />
                  <ErrorMessage name="clientDetails.spocMobile" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>


                <Grid item md={4}>
                  <FormLabel>
                    SPOC Designation
                  </FormLabel>
                  <Select
                    name="clientDetails.spocDesig"
                    id="clientDetails.spocDesig"
                    value={values.clientDetails.spocDesig}
                    onChange={(e) => {
                      setFieldValue('clientDetails.spocDesig', e.target.value);
                    }}
                    variant="outlined"
                    fullWidth
                    style={{
                      marginTop: 5,
                      height: '56px',
                      width: '100%',
                      border: 'none',
                    }}
                    displayEmpty
                  >
                    <MenuItem value="individual" disabled>
                      SPOC Designation
                    </MenuItem>
                    <MenuItem value="organization">Organization</MenuItem>
                    <MenuItem value="Agent">Agent</MenuItem>
                  </Select>
                  <ErrorMessage name="clientDetails.spocDesig" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                {/* <Grid item md={4}>
                  <FormLabel>Mobile</FormLabel>
                  <Textfield name="clientDetails.spocMobile" id="clientDetails.spocMobile" placeholder="Mobile" component={Textfield} />
                  <ErrorMessage name="clientDetails.spocMobile" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid> */}

                <Grid item md={4}>
                  <FormLabel>Email</FormLabel>
                  <Textfield name="clientDetails.spocEmail" id="clientDetails.spocEmail" placeholder="Email" component={Textfield} />
                  <ErrorMessage name="clientDetails.spocEmail" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={4}>
                  <FormLabel>Alternate Phone</FormLabel>
                  <Textfield name="clientDetails.alternatePhone" id="clientDetails.alternatePhone" placeholder="Alternate Phone" component={Textfield} />
                  <ErrorMessage name="clientDetails.alternatePhone" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
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
