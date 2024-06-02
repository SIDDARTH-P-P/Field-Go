// import React, { useEffect } from 'react';
// import { Formik, Form, ErrorMessage } from 'formik';
// import { useDispatch, useSelector } from 'react-redux';
// import * as Yup from 'yup';
// // import PropTypes from 'prop-types';
// import FormLabel from '@mui/material/FormLabel';
// import Box from '@mui/system/Box';
// import Grid from '@mui/material/Grid';
// import { useTheme } from '@mui/material/styles';
// import Textfield from 'ui-component/common/TextField';
// import { Button, Checkbox, FormControlLabel } from '@mui/material';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import commonStyles from 'assets/style/Style';
// import { addCategory, updateCategory, getCategoryById, getCategory } from 'module/licensee/container/category/slice';
// import { getMainCategory } from 'module/licensee/container/mainCategoryContainer/slice';
// import { useState } from 'react';

// const AddEditModal = ({ formtype, data, handleClose }) => {
//   const theme = useTheme();
//   const style = commonStyles(theme);
//   const dispatch = useDispatch();

//   const categoryById = useSelector((state) => state.licenseeReducer.category.categoryByIdData);
//   const mainCategory = useSelector((state) => state.licenseeReducer.mainCategory.mainCategoryData);
//   console.log('categoryById=======', categoryById);

//   useEffect(() => {
//     dispatch(getMainCategory());
//   }, [dispatch]);

//   useEffect(() => {
//     if (data && data.id && formtype === 'editform') {
//       dispatch(getCategoryById(data.id));
//     }
//   }, [dispatch, data, formtype]);
//   console.log('==================data check==================', data);

//   const [initialValues, setInitialValues] = useState({
//     catgName: '',
//     catgDescp: '',
//     grpCatgId: ''
//   });

//   useEffect(() => {
//     if (data && data.id && formtype === 'editform') {
//       setInitialValues({
//         catgName: categoryById?.catgName || '',
//         catgDescp: categoryById?.catgDescp || '',
//         grpCatgId: categoryById?.grpCatgId?.id || '',
//         isActive: categoryById?.isActive ?? false
//       });
//     }
//   }, [categoryById, data, formtype]);

//   const validationSchema = Yup.object({
//     catgName: Yup.string().required('Required')
//   });

//   const onSubmit = async (values, { resetForm }) => {
//     console.log(values, '=====valuess======');

//     try {
//       if (formtype && formtype === 'addform') {
//         await dispatch(addCategory(values));
//         await dispatch(getCategory());
//       } else {
//         values.id = data.id;
//         await dispatch(updateCategory(values));
//         await dispatch(getCategory());
//       }
//       handleClose(formtype);
//       resetForm();
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   return (
//     <Box onClose={handleClose}>
//       <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
//         {({ values, setFieldValue }) => (
//           <Form>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <FormLabel>Main Category</FormLabel>
//                 <Select
//                   name="grpCatgId"
//                   id="grpCatgId"
//                   value={values.grpCatgId}
//                   // defaultValue="Select maincategory"
//                   onChange={(e) => {
//                     setFieldValue('grpCatgId', e.target.value);
//                   }}
//                   variant="outlined"
//                   fullWidth
//                   style={{
//                     height: '56px',
//                     width: '100%',
//                     border: 'none',
//                     borderBottom: '1px solid black'
//                   }}
//                   displayEmpty
//                 >
//                   <MenuItem value="" disabled>
//                     Select Main Category
//                   </MenuItem>
//                   {mainCategory?.rows?.map((grpCatgId) => (
//                     <MenuItem key={grpCatgId.id} value={grpCatgId.id}>
//                       {grpCatgId.grpCatgName}
//                     </MenuItem>
//                   ))}
//                 </Select>
//                 <ErrorMessage name="grpCatgId" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormLabel>Name</FormLabel>
//                 <Textfield name="catgName" id="catgName" placeholder=" Name" component={Textfield} />
//                 <ErrorMessage name="catgName" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormLabel>Description</FormLabel>
//                 <Textfield name="catgDescp" id="catgDescp" placeholder="Description" component={Textfield} />
//                 <ErrorMessage name="catgDescp" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//               </Grid>

//               <Grid item xs={12} sm={4}>
//                 <FormControlLabel
//                   label=" Is Active"
//                   control={
//                     <Checkbox
//                       onChange={(e) => setFieldValue('isActive', e.target.checked)}
//                       checked={values.isActive}
//                       name="isActive"
//                       color="primary"
//                     />
//                   }
//                 />
//               </Grid>
//             </Grid>
//             <Button type="submit" sx={style.changeBtn}>
//               Save
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </Box>
//   );
// };

// export default AddEditModal;
