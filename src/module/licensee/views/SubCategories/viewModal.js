// import React ,{useEffect} from 'react';
//  import { useDispatch, useSelector } from 'react-redux';
// import Box from '@mui/system/Box';
// import Grid from '@mui/material/Grid';
// import { useTheme } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';
// import commonStyles from 'assets/style/Style';
// import { getCategoryById } from 'module/licensee/container/category/slice';

//  import { getSubCategoryById  } from 'module/licensee/container/subCategoryContainer/slice';
//  const ViewModal = ({data}) => {
//   const theme = useTheme();
//   const style = commonStyles(theme);
//     const dispatch = useDispatch();
//     const subCategoryById = useSelector((state) => state.licenseeReducer.subCategory.subCategoryByIdData);
//     const categoryDetails = useSelector((state) => state.licenseeReducer.category.categoryByIdData);

// console.log('===============SubCategoryid=====================',subCategoryById);
// console.log('===============CategoryDetails=====================',categoryDetails);


//     useEffect(() => {
//       if (data?.id) {
//         dispatch(getSubCategoryById(data?.id));
//         dispatch(getCategoryById(data?.catgId));
//       }
//     }, [dispatch, data]);
// console.log('================data====================',data);


//   return (
//     <>
//       <Box>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6} sm={12}>
//             <Typography sx={style.viewModalLab}>Name</Typography>
//             <Typography sx={style.viewModalContent}>{subCategoryById?.subCatgName || '-'}</Typography>
//           </Grid>
//           <Grid item xs={12} md={6} sm={12}>
//             <Typography sx={style.viewModalLab}>Iso Name</Typography>
//             <Typography sx={style.viewModalContent}>{subCategoryById?.subCatgDescp || '-'}</Typography>
//           </Grid>
//           <Grid item xs={12} md={6} sm={12}>
//             <Typography sx={style.viewModalLab}>Iso Name</Typography>
//             <Typography sx={style.viewModalContent}>{categoryDetails.catgName || '-'}</Typography>
//           </Grid>
          
        
//         </Grid>
//       </Box>
//     </>
//   );
// };

// export default ViewModal;
