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

// import { addEnqSource,updateEnqSource,getEnqSourceById, getEnqSource} from 'module/admin/container/enqSourceContainer/slice';
import { addEnqMode, updateEnqMode,getEnqModeById,getEnqMode } from 'module/admin/container/enqModeContainer/slice';

const AddEditModal = ({ formtype, data, handleClose }) => {
     const theme = useTheme();
     const style = commonStyles(theme);
     const dispatch = useDispatch();
  // const stateByIdData = useSelector((state) => state.data.enqsource.enqsourceByIdData);
  const enqModeByIdData = useSelector((state)=>state.adminReducer.enqmode.enqModeByIdData);

  useEffect(() => {
    if (data && data.id) {
      dispatch(getEnqModeById(data.id));
    }
  }, [dispatch, data]);

  console.log('==================datacheck==================', data);

  const initialValues = {
    name: formtype === 'editform' ?  enqModeByIdData?.name || '' : '',
    desc: formtype === 'editform' ?  enqModeByIdData?.desc || '' : '',
  
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is Required'),
    desc: Yup.string().required('Description is Required'),
  });

  const onSubmit = (values, { resetForm }) => {

    console.log(values, '=======updatedValues========');
    if (formtype && formtype === 'addform') {
      dispatch(addEnqMode(values));
      // dispatch(getEnqMode())
 
    } else {
    
      values.id = data.id;
      dispatch(updateEnqMode(values));
      dispatch(getEnqMode())
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
              <Textfield name="name" id="name" placeholder="Name" component={Textfield} />
              <ErrorMessage name="name" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormLabel>Name</FormLabel>
              <Textfield name="desc" id="desc" placeholder="Description " component={Textfield} />
              <ErrorMessage name="desc" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
            </Grid>
            
           
          </Grid>
          <Button type="submit"  sx={style.changeBtn}>Save</Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default AddEditModal;
