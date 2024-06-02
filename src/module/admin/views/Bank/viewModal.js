// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Box from '@mui/system/Box';
// import Grid from '@mui/material/Grid';
// import { useTheme } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';
// import commonStyles from 'assets/style/Style';

// import { getBankById } from 'module/vendor/container/bankContainer/slice';

// const ViewModal = ({ data }) => {
//   const theme = useTheme();
//   const style = commonStyles(theme);
//   const dispatch = useDispatch();
//   const bankById = useSelector((state) => state.data.support.bankByIdData);

//   console.log('===============customerid=====================', bankById);

//   useEffect(() => {
//     if (data?.id) {
//       dispatch(getBankById(data?.id));
//     }
//   }, [dispatch, data]);
//   console.log('================data====================', data.id);

//   return (
//     <>
//       <Box>
//         <Grid container spacing={3}>
//           <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
//             <Typography sx={style.viewModalLab}>SupportType</Typography>
//             <Typography sx={style.viewModalContent}>{bankById?.name || '-'}</Typography>
//           </Grid>
//           <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
//             <Typography sx={style.viewModalLab}>Priority</Typography>
//             <Typography sx={style.viewModalContent}>{bankById?.code || '-'}</Typography>
//           </Grid>
//           <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
//             <Typography sx={style.viewModalLab}>Description</Typography>
//             <Typography sx={style.viewModalContent}>{bankById?.desc || '-'}</Typography>
//           </Grid>
//         </Grid>
//       </Box>
//     </>
//   );
// };

// export default ViewModal;





import React ,{useEffect} from 'react';
 import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import commonStyles from 'assets/style/Style';


 import { getBankById } from 'module/admin/container/bankContainer/slice';
const ViewModal = ({data}) => {
  const theme = useTheme();
  const style = commonStyles(theme);
    const dispatch = useDispatch();
    const bankById = useSelector((state) => state.adminReducer.bank.bankByIdData);

console.log('===============customerid=====================',bankById);


    useEffect(() => {
      if (data?.id) {
        dispatch(getBankById(data?.id));
      }
    }, [dispatch, data]);
console.log('================data====================',data.id);


  return (
    <>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Bank Name</Typography>
            <Typography sx={style.viewModalContent}>{bankById?.name || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Code</Typography>
            <Typography sx={style.viewModalContent}>{bankById?.code || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Description</Typography>
            <Typography sx={style.viewModalContent}>{bankById?.desc || '-'}</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ViewModal;

































// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Box from '@mui/system/Box';
// import Grid from '@mui/material/Grid';
// import { useTheme } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';
// import commonStyles from 'assets/style/Style';

// import { getSupportById } from 'module/vendor/container/supportContainer/slice';
// const ViewModal = ({ data }) => {
//   const theme = useTheme();
//   const style = commonStyles(theme);
//   const dispatch = useDispatch();
//   const supportById = useSelector((state) => state.support.support.supportByIdData);

//   console.log('===============Supportid=====================', supportById);

//   useEffect(() => {
//     if (data?.id) {
//       dispatch(getSupportById(data?.id));
//     }
//   }, [dispatch, data]);
//   console.log('================data====================', data.id);

//   return (
//     <>
//       <Box>
//         <Grid container spacing={3}>
//           <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
//             <Typography sx={style.viewModalLab}>First Name</Typography>
//             <Typography sx={style.viewModalContent}>{supportById?.sprtType || '-'}</Typography>
//           </Grid>
//           <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
//             <Typography sx={style.viewModalLab}>Last Name</Typography>
//             <Typography sx={style.viewModalContent}>{supportById?.priority || '-'}</Typography>
//           </Grid>
//           <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
//             <Typography sx={style.viewModalLab}>Email</Typography>
//             <Typography sx={style.viewModalContent}>{supportById?.imgUrls || '-'}</Typography>
//           </Grid>
//           {/* <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
//             <Typography sx={style.viewModalLab}>Mobile</Typography>
//             <Typography sx={style.viewModalContent}>{supportById?.mobile || '-'}</Typography>
//           </Grid> */}

//         </Grid>
//       </Box>
//     </>
//   );
// };

// export default ViewModal;
