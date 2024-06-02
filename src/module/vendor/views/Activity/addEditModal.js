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

import { getTaskById} from 'module/vendor/container/customerContainer/slice';
import { getCountry } from 'module/admin/container/countryContainer/slice';
import { getEnqSource } from 'module/admin/container/enqSourceContainer/slice';
import { getState } from 'module/admin/container/stateContainer/slice';
import { getEnqMode } from 'module/admin/container/enqModeContainer/slice';
import { getDistrict } from 'module/admin/container/districtContainer/slice';
import { addactivity, getactivity, updateactivity } from 'module/vendor/container/activityContainer/slice';
import { getactivityType } from 'module/vendor/container/activityTypeContainer/slice';
import { getactivityCategory } from 'module/vendor/container/activityCategoryContainer/slice';
import { getUserById } from 'module/vendor/container/userContainer/slice';


import TaskModal from './taskModal';
import styled from '@emotion/styled';

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
  const ActivityType = useSelector((state)=>state.data.activityType.activityTypeData)
  const ActivityCategory = useSelector((state)=>state.data.activityCategory.activityCategoryData)
  const AssignedTo = useSelector((state) => state.data?.user?.userByIdData)
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  console.log("===customerByIdData=====",selectedCustomer );

  useEffect(() => {
    dispatch(getUserById(selectedCustomer?.assignedTo.id))
    dispatch(getactivityCategory());
    dispatch(getactivityType());
    dispatch(getCountry());
    dispatch(getEnqSource());
    dispatch(getState());
    dispatch(getEnqMode());
    dispatch(getDistrict());
  }, [dispatch,selectedCustomer]);

  const Input = styled('input')({
    display: 'none',
  });

  useEffect(() => {
    if (data && data.id && formtype === 'editform') {
      dispatch(getTaskById(data.id));
    }
  }, [dispatch, data, formtype]);

  const indiaCountryId = CountryDetails?.rows?.find((country) => country.name === 'INDIA')?.id || '';
  const keralaStateId = stateDetails?.rows?.find((state) => state.name === 'Kerala')?.id || '';
  const kozhikodeDistrictId = district?.rows?.find((district) => district.name === 'kozhikode')?.id || '';

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
  };

  const [initialValues, setInitialValues] = useState({
    activityType: 'individual',
    activityCategory: 'individual',
    activityDescp: '',
    activityName:'',
    taskRef: selectedCustomer?.id,
    activityPriority: 'individual',
    activityStartDate: '',
    activityEndDate: '',
    activityOwnerID:'',
    imgUrls:'',
    status:'',
    assignedTo:'individual',
    assignedDate:'',
    remarks:'',
    nextContactDate:'',
    clientName:'',
    rprtdLocation:'',
    rprtdPerson:'',
    rprtdPrsnDesig:'',
  });

  useEffect(() => {
    if (data && data.id && formtype === 'editform') {
      setInitialValues({
        activityType: data?.activityType.id || 'individual',
        activityCategory: data?.activityCategory?.id || 'individual',
        activityPriority: data?.activityPriority || 'individual',
        activityDescp: data?.activityDescp || '',
        activityName: data?.activityName || '',
        activityStartDate : data?.activityStartDate?.split('T')[0]|| '',
        activityEndDate: data?.activityEndDate?.split('T')[0] || '',
        nextContactDate: data?.nextContactDate?.split('T')[0] || ''
      });
    }
  }, [data, customerByIdData, formtype, indiaCountryId, keralaStateId, kozhikodeDistrictId]);

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
      const datas = {
        ...values,
        taskRef: selectedCustomer?.id,
        assignedTo:selectedCustomer?.assignedTo?.id,
        assignedDate:selectedCustomer?.taskStartDate,
        clientName:selectedCustomer?.clientDetails?.name
      };
      console.log("========Values+++++++======", datas,selectedCustomer?.id);
      if (formtype && formtype === 'addform') {
        await dispatch(addactivity(datas));
      } else {
        datas.id = data.id;
        await dispatch(updateactivity(datas));
        await dispatch(getactivity());
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
              <Tab label="Select Task" />
              <Tab label="Activity Details" />
              {/* <Tab label="Client Details" /> */}
            </Tabs>
            <TabPanel value={currentTab} index={0}>
            <TaskModal onSelect={handleCustomerSelect}/>
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
              {/* Basic Details Tab */}
              <Grid container spacing={2}>
                <Grid item md={3}>
                  <FormLabel>
                    Type
                  </FormLabel>
                  <Select
                    name="activityType"
                    id="activityType"
                    value={values.activityType}
                    onChange={(e) => {
                      setFieldValue('activityType', e.target.value);
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
                      Select  Type
                    </MenuItem>
                    {ActivityType?.rows?.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.activityType}
                      </MenuItem>
                    ))}
                  </Select>
                  <ErrorMessage name="activityType" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={3}>
                  <FormLabel>
                    Category
                    {/* <span style={{ color: 'red' }}>*</span> */}
                  </FormLabel>
                  <Select
                    name="activityCategory"
                    id="activityCategory"
                    value={values.activityCategory}
                    onChange={(e) => {
                      setFieldValue('activityCategory', e.target.value);
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
                      Select Category
                    </MenuItem>
                    {ActivityCategory?.rows?.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.actvtyCatgName}
                      </MenuItem>
                    ))}
                  </Select>
                  <ErrorMessage name="activityCategory" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={3}>
                  <FormLabel>
                    Priority
                  </FormLabel>
                  <Select
                    name="activityPriority"
                    id="activityPriority"
                    value={values.activityPriority}
                    onChange={(e) => {
                      setFieldValue('activityPriority', e.target.value);
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
                      Select  Priority
                    </MenuItem>
                    <MenuItem value="low">low</MenuItem>
                    <MenuItem value="normal">Normal</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="urgent ">Urgent </MenuItem>
                  </Select>
                  <ErrorMessage name="activityPriority" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={3}>
                <FormLabel>Assigned To</FormLabel>
                  <Textfield name="AssignedTo" id="AssignedTo" value={AssignedTo ? `${AssignedTo?.fName || '-'} ${AssignedTo?.lName || '-'}` : '-' } component={Textfield} />
                  <ErrorMessage name="AssignedTo" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={4} >
                  <FormLabel>Start Date</FormLabel>
                  <Textfield name="activityStartDate" id="activityStartDate" type='date' component={Textfield} onChange={(e) => {
                    setFieldValue('activityStartDate', e.target.value);
                  }} />
                  <ErrorMessage name="activityStartDate" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={4} >
                  <FormLabel>Follow Up Date</FormLabel>
                  <Textfield name="nextContactDate" id="nextContactDate"  type='date' component={Textfield} onChange={(e) => {
                    setFieldValue('nextContactDate', e.target.value);
                  }} />
                  <ErrorMessage name="nextContactDate" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={4} >
                  <FormLabel>End Date</FormLabel>
                  <Textfield name="activityEndDate" id="activityEndDate" type='date' component={Textfield} onChange={(e) => {
                    setFieldValue('activityEndDate', e.target.value);
                  }} />
                  <ErrorMessage name="activityEndDate" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>

                <Grid item md={5}>
                  <FormLabel>Name</FormLabel>
                  <Textfield name="activityName" id="activityName" placeholder="activityName" component={Textfield} />
                  <ErrorMessage name="activityName" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />


                  <FormLabel>Add Attachments</FormLabel>
                  <label htmlFor="imgUrls">
                    <Input
                      accept="*"
                      id="imgUrls"
                      type="file"
                      name="imgUrls"
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.taskRef}
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
                        Add Attachments
                      </span>
                    </Button>
                  </label>

                </Grid>

                <Grid item xs={12} md={7}>
                  <FormLabel>Description</FormLabel>
                  <Textfield
                    multiline
                    minRows={5.5}
                    maxRows={5}

                    aria-label="maximum height"
                    name="activityDescp"
                    id="activityDescp"
                    placeholder="activityDescp"
                    component={Textfield}
                  />
                  <ErrorMessage name="activityDescp" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>


                <Grid item xs={12} sm={6}></Grid>
                <Grid container spacing={2}>

                  <Grid item xs={12} sm={6}>

                  </Grid>

                </Grid>

              </Grid>
            </TabPanel>

            {/* <TabPanel value={currentTab} index={2}>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <Grid >
                    <FormLabel>Name</FormLabel>
                    <Textfield name="email" id="email" placeholder='Client Name' component={Textfield} />
                    <ErrorMessage name="email" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                  </Grid>

                  <Grid >
                    <FormLabel>Reported Location</FormLabel>
                    <Textfield name="email" id="email" placeholder='Client Location' component={Textfield} />
                    <ErrorMessage name="email" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                  </Grid>

                  <Grid >
                    <FormLabel>Reported Person</FormLabel>
                    <Textfield name="email" id="email" placeholder='Reported Person' component={Textfield} />
                    <ErrorMessage name="email" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                  </Grid>
                </Grid>

                <Grid item md={6}>
                  <FormLabel>Spoc Designation</FormLabel>
                  <Textfield name="email" id="email" placeholder='Spoc Designation' component={Textfield} />
                  <ErrorMessage name="email" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />

                  <FormLabel>Description</FormLabel>
                  <Textfield
                    multiline
                    minRows={5.5}
                    maxRows={5}

                    aria-label="maximum height"
                    name="desc"
                    id="desc"
                    placeholder="Description"
                    component={Textfield}
                  />
                  <ErrorMessage name="desc" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>
              </Grid>
            </TabPanel> */}

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
