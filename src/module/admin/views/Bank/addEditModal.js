// import React, { useEffect, useState } from 'react';
// import { Formik, Form, ErrorMessage } from 'formik';
// import { useDispatch, useSelector } from 'react-redux';
// import Textfield from 'ui-component/common/TextField';
// import * as Yup from 'yup';
// import FormLabel from '@mui/material/FormLabel';
// import Box from '@mui/system/Box';
// import Grid from '@mui/material/Grid';
// import { useTheme } from '@mui/material/styles';
// import FormLabel from '@mui/material/FormLabel';
// import Button  from '@mui/material/Button';
// import commonStyles from 'assets/style/Style';
// import { getSupportType } from 'module/vendor/container/supportTypeContainer/slice';
// import { addBank, updateBank, getBankById } from 'module/vendor/container/bankContainer/slice';

// const AddEditModal = ({ formtype, data, handleClose }) => {
//   const theme = useTheme();
//   const style = commonStyles(theme);
//   const dispatch = useDispatch();
//   const bankById = useSelector((state) => state.data.support.bankByIdData);

//   useEffect(() => {
//     if (formtype === 'editform' && data && data.id) {
//       dispatch(getBankById(data.id));
//     }
//     dispatch(getSupportType());
//   }, [dispatch, formtype, data]);

//   const initialValues = {
//     name: formtype === 'editform' ? bankById?.name || '' : '',
//     code: formtype === 'editform' ? bankById?.code || '' : '',
//     desc: formtype === 'editform' ? bankById?.desc || '' : '',
//   };

//   const validationSchema = Yup.object({
//     name: Yup.string().required('Support is required'),
//     code: Yup.string().required('Priority is Required'),
//     desc: Yup.string().required('Description is Required'),
//   });

//   // const onSubmit = async (values, { resetForm }) => {
//   //   if (formtype && formtype === 'addform') {
//   //     await dispatch(addBank(values));
//   //   } else {
//   //     values.id = data.id;
//   //     await dispatch(updateBank(values));
//   //   }
//   //   handleClose(formtype);
//   //   resetForm(); 
//   // };

//   const onSubmit = (values, { resetForm }) => {

//     console.log(values, '=======updatedValues========');
//     if (formtype && formtype === 'addform') {
//       dispatch(addBank(values));
//     } else {
//       values.id = data.id;
//       dispatch(updateBank(values));
//     }
//     handleClose(formtype);
//     resetForm();
//   };

//   return (
//     <Box onClose={handleClose}>
//       <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
//         <Form>
//           <Grid container spacing={2}></Grid>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//             <FormLabel>Bank Name</FormLabel>
//               <Textfield name="name" id="name" placeholder="Bank Name" component={Textfield} />
//               <ErrorMessage name="name" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//             <FormLabel>Bank Code</FormLabel>
//               <Textfield name="code" id="code" placeholder="Bank Code" component={Textfield} />
//               <ErrorMessage name="code" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//             </Grid>
//             <Grid item xs={12} sm={6} >
//             <FormLabel>Description</FormLabel>
//               <Textfield name="desc" id="desc" placeholder="Description" component={Textfield} />
//               <ErrorMessage name="desc" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//             </Grid>

//           </Grid>
//           <Button type="submit"  sx={style.changeBtn}>Save</Button>
//         </Form>
//       </Formik>
//     </Box>
//   );
// };

// export default AddEditModal;


// --------------------------------------------------------------------------------

// import React, { useEffect } from 'react';
// import { Formik, Form, ErrorMessage } from 'formik';
// import { useDispatch, useSelector } from 'react-redux';
// import Textfield from 'ui-component/common/TextField';
// import * as Yup from 'yup';
// import FormLabel from '@mui/material/FormLabel';
// import Box from '@mui/system/Box';
// import Grid from '@mui/material/Grid';
// import { useTheme } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import commonStyles from 'assets/style/Style';
// import { getSupportType } from 'module/vendor/container/supportTypeContainer/slice';
// import { addBank, updateBank, getBankById } from 'module/vendor/container/bankContainer/slice';

// const AddEditModal = ({ formtype, data, handleClose }) => {
//   const theme = useTheme();
//   const style = commonStyles(theme);
//   const dispatch = useDispatch();
//   const bankById = useSelector((state) => state.data.support.bankByIdData);

//   useEffect(() => {
//     if (formtype === 'editform' && data && data.id) {
//       dispatch(getBankById(data.id));
//     }
//     dispatch(getSupportType());
//   }, [dispatch, formtype, data]);

//   const initialValues = {
//     name: formtype === 'editform' ? bankById?.name || '' : '',
//     code: formtype === 'editform' ? bankById?.code || '' : '',
//     desc: formtype === 'editform' ? bankById?.desc || '' : '',
//   };

//   const validationSchema = Yup.object({
//     name: Yup.string().required('Support is required'),
//     code: Yup.string().required('Priority is Required'),
//     desc: Yup.string().required('Description is Required'),
//   });

//   const onSubmit = (values, { resetForm }) => {
//     console.log(values, '=======updatedValues========');
//     if (formtype && formtype === 'addform') {
//       dispatch(addBank(values));
//     } else {
//       values.id = data.id;
//       dispatch(updateBank(values));
//     }
//     handleClose(formtype);
//     resetForm();
//   };

//   return (
//     <Box>
//       <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
//         <Form>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <FormLabel>Bank Name</FormLabel>
//               <Textfield name="name" id="name" placeholder="Bank Name" component={Textfield} />
//               <ErrorMessage name="name" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormLabel>Bank Code</FormLabel>
//               <Textfield name="code" id="code" placeholder="Bank Code" component={Textfield} />
//               <ErrorMessage name="code" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormLabel>Description</FormLabel>
//               <Textfield name="desc" id="desc" placeholder="Description" component={Textfield} />
//               <ErrorMessage name="desc" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//             </Grid>
//           </Grid>
//           <Button type="submit" sx={style.changeBtn}>Save</Button>
//         </Form>
//       </Formik>
//     </Box>
//   );
// };

// export default AddEditModal;


 


import React, { useEffect} from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Textfield from 'ui-component/common/TextField';
import { Button } from '@mui/material';
import commonStyles from 'assets/style/Style';
import 'assets/style/style.css';
import { addBank, updateBank, getBankById,getBank } from 'module/admin/container/bankContainer/slice';

const AddEditModal = ({ formtype, data, handleClose }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();
  const bankById = useSelector((state) => state.adminReducer.bank.bankByIdData);

  useEffect(() => {
    if (data && data.id) {
      dispatch(getBankById(data.id));
    }
  }, [dispatch, data]);

  console.log('==================datacheck==================', data);

  const initialValues = {
    
    name: formtype === 'editform' ? bankById?.name || '' : '',
    code: formtype === 'editform' ? bankById?.code || '' : '',
    desc: formtype === 'editform' ? bankById?.desc || '' : '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Bank Name Type is Required'),
    code: Yup.string().required('code is Required'),
    desc: Yup.string().required('Last Name is Required'),
  });

  const onSubmit = (values, { resetForm }) => {
 
    const isChanged = Object.keys(initialValues).some(key => initialValues[key] !== values[key]);
    if (isChanged) {
    if (formtype && formtype === 'addform') {
      // values.address = {
      //   ...values.address,
      // };
      dispatch(addBank(values));
    } else {
      values.id = data.id;
      dispatch(updateBank(values));
      dispatch(getBank())
    }
    handleClose(formtype);
    resetForm();
    toast.success('Edited successful', { autoClose: 3000 });

  } else {
    handleClose(formtype);
    resetForm();
  }
  };

  return (
    <Box onClose={handleClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
        <Form>
          <Grid item xs={6} sm={4}>
            <FormLabel>Bank Name</FormLabel>
            <Textfield name="name" id="name" placeholder="Bank Name" component={Textfield} />
            <ErrorMessage name="name" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormLabel>Code</FormLabel>
            <Textfield name="code" id="code" placeholder="Code" component={Textfield} />
            <ErrorMessage name="code" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormLabel>Description</FormLabel>
            <Textfield name="desc" id="desc" placeholder="Description" component={Textfield} />
            <ErrorMessage name="desc" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
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