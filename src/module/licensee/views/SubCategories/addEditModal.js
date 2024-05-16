
// import React ,{useEffect} from 'react';
// import { Formik, Form, ErrorMessage } from 'formik';
// import { useDispatch, useSelector} from 'react-redux';
// import * as Yup from 'yup';
// // import PropTypes from 'prop-types';
// import FormLabel from '@mui/material/FormLabel';
// import Box from '@mui/system/Box';
// import Grid from '@mui/material/Grid';
//  import { useTheme } from '@mui/material/styles';
// import Textfield from 'ui-component/common/TextField';
// import { Button ,Checkbox, FormControlLabel  } from '@mui/material';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import commonStyles from 'assets/style/Style';
// import { addSubCategory, updateSubCategory, getSubCategoryById,getSubCategory } from 'module/licensee/container/subCategoryContainer/slice';
// import {getCategory} from 'module/licensee/container/category/slice';
// import { useState } from 'react';


// const AddEditModal = ({ formtype, data, handleClose }) => {
//      const theme = useTheme();
//      const style = commonStyles(theme);
//   const dispatch = useDispatch();

//   const subCategoryById = useSelector((state) => state.licenseeReducer.subCategory.subCategoryByIdData);
//   const category = useSelector((state) => state.licenseeReducer.category.categoryData);
//   console.log("subCategoryById=======", subCategoryById);

// useEffect(() =>{
//  dispatch(getCategory())


// }, [dispatch])

//   useEffect(() => {
//     if (data && data.id && formtype === 'editform') {
//       dispatch(getSubCategoryById(data.id));
      
//     }
//   }, [dispatch, data, formtype]);
//   console.log('==================data check==================', data);



//   const [initialValues, setInitialValues] = useState({

//     subCatgName:'',
//     subCatgDescp:'',
//     catgId:''
    

//   });


// useEffect(()=>{
//   if (data && data.id && formtype === 'editform') {
//     setInitialValues({
//       subCatgName: subCategoryById?.subCatgName || '',
//       subCatgDescp: subCategoryById?.subCatgDescp || '',
//       catgId: subCategoryById?.catgId?.id || '',
//       isActive: subCategoryById?.isActive ?? false, 

//     });

//   }
// },[data,subCategoryById, formtype ]);

//   const validationSchema = Yup.object({
//     subCatgName: Yup.string().required('Required'),
//     // isoName: Yup.string().required('Required'),


//   });

//   const onSubmit =async (values, { resetForm }) => {
//     console.log(values, '=====valuess======');
 
// try {

//   if (formtype && formtype === 'addform') {
//     await dispatch(addSubCategory(values));
//     await dispatch(getSubCategory());

//   } else {
  
//     values.id = data.id;
//     await dispatch(updateSubCategory(values));
//    await  dispatch(getSubCategory())
//   }
//   handleClose(formtype);
//   resetForm();
// }catch (error){
//   console.error('Error submitting form:', error);
// }
   

  
//   };

//   return (
//     <Box onClose={handleClose}>
//       <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
//       {({  values, setFieldValue }) => (
//         <Form>
          
//           <Grid container spacing={2}>

//           <Grid item xs={12} sm={6}>
//                   <FormLabel>Category</FormLabel>
//                   <Select
//                   name="catgId"
//                   id="catgId"
//                   value={values.grpCatgId} 
//                   // defaultValue="Select maincategory"
//                   onChange={(e) => {
//                     setFieldValue('catgId', e.target.value); 
//                   }}
//                     variant="outlined"
//                     fullWidth
//                     style={{
//                       height: '56px',
//                       width: '100%',
//                       border: 'none',
//                       borderBottom: '1px solid black'
//                     }}
//                     displayEmpty
//                   >
//                     <MenuItem  value="" disabled>
//                         Select  Category
//                       </MenuItem>
//                     {category?.rows?.map((catgId) => (
//                       <MenuItem key={catgId.id} value={catgId.id}>
//                         {catgId.catgName}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                   <ErrorMessage name="catgId" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//                 </Grid>


//             <Grid item xs={12} sm={6}>
//             <FormLabel>Name</FormLabel>
//               <Textfield name="subCatgName" id="subCatgName" placeholder=" Name" component={Textfield} />
//               <ErrorMessage name="subCatgName" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//             <FormLabel>Description</FormLabel>
//               <Textfield name="subCatgDescp" id="subCatgDescp" placeholder="Description" component={Textfield} />
//               <ErrorMessage name="subCatgDescp" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//             </Grid>


//             <Grid item xs={12} sm={4}>
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

//           </Grid>
//           <Button type="submit"  sx={style.changeBtn}>Save</Button>
//         </Form>
//          )}
//       </Formik>
//     </Box>
//   );
// };


// export default AddEditModal;
