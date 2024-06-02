// import React ,{useEffect} from 'react';
//  import { useDispatch, useSelector } from 'react-redux';
// import Box from '@mui/system/Box';
// import Grid from '@mui/material/Grid';
// import { useTheme } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';
// import commonStyles from 'assets/style/Style';

//  import { getMainCategoryById  } from 'module/licensee/container/mainCategoryContainer/slice';
// const ViewModal = ({data}) => {
//   const theme = useTheme();
//   const style = commonStyles(theme);
//     const dispatch = useDispatch();
//     const mainCategoryById = useSelector((state) => state.licenseeReducer.mainCategory.mainCategoryByIdData);

// console.log('===============mainCategoryid=====================',mainCategoryById);


//     useEffect(() => {
//       if (data?.id) {
//         dispatch(getMainCategoryById(data?.id));
//       }
//     }, [dispatch, data]);
// console.log('================data====================',data.id);


//   return (
//     <>
//       <Box>
//         <Grid container spacing={3}>
//           <Grid item xs={12}  md={6} sm={12}>
//             <Typography sx={style.viewModalLab}>Name</Typography>
//             <Typography sx={style.viewModalContent}>{mainCategoryById?.grpCatgName || '-'}</Typography>
//           </Grid>
//           <Grid item xs={12} md={6} sm={12}>
//             <Typography sx={style.viewModalLab}>Iso Name</Typography>
//             <Typography sx={style.viewModalContent}>{mainCategoryById?.grpCatgDescp || '-'}</Typography>
//           </Grid>
          
        
//         </Grid>
//       </Box>
//     </>
//   );
// };

// export default ViewModal;
