
import React, { useEffect } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Textfield from 'ui-component/common/TextField';
import { Button, FormControlLabel, Switch } from '@mui/material';
import commonStyles from 'assets/style/Style';
 
import { addSupportType, updateSupportType, getSupportTypeById,getSupportType } from 'module/admin/container/supportTypeContainer/slice';

const AddEditModal = ({ formtype, data, handleClose }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();
  const supportTypeById = useSelector((state) => state.adminReducer.supportType.supportTypeByIdData);


  useEffect(() => {
    if (data && data.id) {
      dispatch(getSupportTypeById(data.id));
    }
  }, [dispatch, data]);


  const initialValues = {
    supportType: formtype === 'editform' ? supportTypeById?.supportType || '' : '',
    desc: formtype === 'editform' ? supportTypeById?.desc || '' : '',
    isActive: formtype === 'editform' ? supportTypeById?.isActive || '' : '',
  };

  const validationSchema = Yup.object({
    supportType: Yup.string().required('SupportType is Required'),
    desc: Yup.string().required('Description is Required'),
    // Include validation for isActive only in editform
    ...(formtype === 'editform' && { isActive: Yup.string().required('isActive is Required') }),
  });




  const onSubmit = (values, { resetForm }) => {
    console.log(values, '=====valuess======');
 

    console.log(values, '=======updatedValues========');
    if (formtype && formtype === 'addform') {
      dispatch(addSupportType(values));
 
    } else {
    
      values.id = data.id;
      dispatch(updateSupportType(values));
      dispatch(getSupportType())
    }

    handleClose(formtype);
    resetForm();
  };



  return (
    <Box onClose={handleClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
        <Form>
      
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormLabel>SupportType</FormLabel>
              <Textfield name="supportType" id="supportType" placeholder="SupportType" component={Textfield} />
              <ErrorMessage name="supportType" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>Description</FormLabel>
              <Textfield name="desc" id="desc" placeholder="Description" component={Textfield} />
              <ErrorMessage name="desc" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
            </Grid>
            {formtype === 'editform' && (
              <Grid item xs={12} sm={6}>
                <FormControlLabel control={<Switch name="isActive" />} label="Active" labelPlacement="start" />
              </Grid>
            )}
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
