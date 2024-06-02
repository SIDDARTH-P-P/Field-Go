

import React ,{useEffect} from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
// import PropTypes from 'prop-types';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
 import { useTheme } from '@mui/material/styles';
import Textfield from 'ui-component/common/TextField';
import { Button } from '@mui/material';
import commonStyles from 'assets/style/Style';
import { addCountry, updateCountry ,getCountryById, getCountry} from 'module/admin/container/countryContainer/slice';


const AddEditModal = ({ formtype, data, handleClose }) => {
     const theme = useTheme();
     const style = commonStyles(theme);
  const dispatch = useDispatch();
  const countryById = useSelector((state) => state.adminReducer.country.countryByIdData);


  useEffect(() => {
    if (data && data.id) {
      dispatch(getCountryById(data.id));
    }
  }, [dispatch, data]);

  console.log('==================data check==================', data);

  const initialValues = {
    name: formtype === 'editform' ? countryById?.name || '' : '',
    isoName: formtype === 'editform' ? countryById?.isoName || '' : '',
    iso3Name: formtype === 'editform' ? countryById?.iso3Name || '' : '',
    niceName: formtype === 'editform' ? countryById?.niceName || '' : '',
    callingCode: formtype === 'editform' ? countryById?.callingCode || '' : ''

  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    isoName: Yup.string().required('Required'),
    iso3Name: Yup.string().required('Required'),
    niceName: Yup.string().required('Required'),
    callingCode: Yup.string().required('Required')

  });

  const onSubmit = (values, { resetForm }) => {
    console.log(values, '=====valuess======');
 

    console.log(values, '=======updatedValues========');
    if (formtype && formtype === 'addform') {
      dispatch(addCountry(values));
 
    } else {
    
      values.id = data.id;
      dispatch(updateCountry(values));
      dispatch(getCountry())
    }

    handleClose(formtype);
    resetForm();
  };

  return (
    <Box onClose={handleClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
        <Form>
          <Grid container spacing={2}></Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Textfield name="name" id="name" placeholder="Name" component={Textfield} />
              <ErrorMessage name="name" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Textfield name="isoName" id="isoName" placeholder="Iso Name" component={Textfield} />
              <ErrorMessage name="isoName" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Textfield name="iso3Name" id="iso3Name" placeholder="Iso3 Name" component={Textfield} />
              <ErrorMessage name="iso3Name" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Textfield name="niceName" id="niceName" placeholder="NiceName" component={Textfield} />
              <ErrorMessage name="niceName" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Textfield name="callingCode" id="callingCode" placeholder="Calling Code" component={Textfield} />
              <ErrorMessage name="callingCode" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
            </Grid>

          </Grid>
          <Button type="submit"  sx={style.changeBtn}>Save</Button>
        </Form>
      </Formik>
    </Box>
  );
};

// AddEditModal.propTypes = {
//   formtype: PropTypes.string.isRequired,
//   data: PropTypes.any.isRequired,
//   handleClose: PropTypes.func.isRequired
// };

export default AddEditModal;
