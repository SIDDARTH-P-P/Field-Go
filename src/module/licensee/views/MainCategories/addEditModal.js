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
// import { Button } from '@mui/material';
// import commonStyles from 'assets/style/Style';
// import { addMainCategory, updateMainCategory, getMainCategoryById,getMainCategory } from 'module/licensee/container/mainCategoryContainer/slice';



// const AddEditModal = ({ formtype, data, handleClose }) => {
//      const theme = useTheme();
//      const style = commonStyles(theme);
//   const dispatch = useDispatch();
//   const mainCategoryById = useSelector((state) => state.licenseeReducer.mainCategory.mainCategoryByIdData);


//   useEffect(() => {
//     if (data && data.id) {
//       dispatch(getMainCategoryById(data.id));
//     }
//   }, [dispatch, data]);

//   console.log('==================data check==================', data);

//   const initialValues = {
//     grpCatgName: formtype === 'editform' ? mainCategoryById?.grpCatgName || '' : '',
//     grpCatgDescp: formtype === 'editform' ? mainCategoryById?.grpCatgDescp || '' : '',
    

//   };

//   const validationSchema = Yup.object({
//     grpCatgName: Yup.string().required('Name is Required'),
//     // isoName: Yup.string().required('Required'),


//   });

//   const onSubmit = (values, { resetForm }) => {
//     console.log(values, '=====valuess======');
 

//     console.log(values, '=======updatedValues========');
//     if (formtype && formtype === 'addform') {
//       dispatch(addMainCategory(values));
 
//     } else {
    
//       values.id = data.id;
//       dispatch(updateMainCategory(values));
//       dispatch(getMainCategory())
//     }

//     handleClose(formtype);
//     resetForm();
//   };

//   return (
//     <Box onClose={handleClose}>
//       <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
//         <Form>
        
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6} md={6}>
//             <FormLabel>Name</FormLabel>
//               <Textfield name="grpCatgName" id="grpCatgName" placeholder="Name" component={Textfield} />
//               <ErrorMessage name="grpCatgName" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//             </Grid>

            
//             <Grid item xs={12} sm={6} md={6}>
//             <FormLabel>Description</FormLabel>
//               <Textfield name="grpCatgDescp" id="grpCatgDescp" placeholder="Description" component={Textfield} />
//               <ErrorMessage name="grpCatgDescp" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//             </Grid>

//           </Grid>
//           <Button type="submit"  sx={style.changeBtn}>Save</Button>
//         </Form>
//       </Formik>
//     </Box>
//   );
// };


// export default AddEditModal;
