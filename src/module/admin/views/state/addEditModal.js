import React ,{useEffect} from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import FormLabel from '@mui/material/FormLabel';
// import PropTypes from 'prop-types';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
 import { useTheme } from '@mui/material/styles';
import Textfield from 'ui-component/common/TextField';
import { Button } from '@mui/material';
import commonStyles from 'assets/style/Style';

import { addState, updateState, getStateById, getState} from 'module/admin/container/stateContainer/slice';

const AddEditModal = ({ formtype, data, handleClose }) => {
     const theme = useTheme();
     const style = commonStyles(theme);
     const dispatch = useDispatch();
  const stateByIdData = useSelector((state) => state.adminReducer.state.stateByIdData);

  useEffect(() => {
    if (data && data.id) {
      dispatch(getStateById(data.id));
    }
  }, [dispatch, data]);

  console.log('==================datacheck==================', data);

  const initialValues = {
    code: formtype === 'editform' ?  stateByIdData?.code || '' : '',
    name: formtype === 'editform' ?  stateByIdData?.name || '' : '',
  
  };

  const validationSchema = Yup.object({
    code: Yup.string().required('code is Required'),
    name: Yup.string().required('Description is Required'),
  });

  const onSubmit = (values, { resetForm }) => {

    console.log(values, '=======updatedValues========');
    if (formtype && formtype === 'addform') {
      dispatch(addState(values));
      // dispatch(getState())
 
    } else {
    
      values.id = data.id;
      dispatch(updateState(values));
      dispatch(getState())
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
            <Grid item xs={12} sm={6}>
            <FormLabel>code</FormLabel>
              <Textfield name="code" id="code" placeholder="code" component={Textfield} />
              <ErrorMessage name="code" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormLabel>Name</FormLabel>
              <Textfield name="name" id="name" placeholder="Name " component={Textfield} />
              <ErrorMessage name="name" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
            </Grid>
            
           
          </Grid>
          <Button type="submit"  sx={style.changeBtn}>Save</Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default AddEditModal;
