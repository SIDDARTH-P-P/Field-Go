import React ,{useEffect} from 'react';
 import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import commonStyles from 'assets/style/Style';


 import { getUserById  } from 'module/vendor/container/userContainer/slice';
const ViewModal = ({data}) => {
  const theme = useTheme();
  const style = commonStyles(theme);
    const dispatch = useDispatch();
    const userById = useSelector((state) => state.data.user.userByIdData);

console.log('===============userid=====================',userById);


    useEffect(() => {
      if (data?.id) {
        dispatch(getUserById(data?.id));
      }
    }, [dispatch, data]);
console.log('================data====================',data.id);


  return (
    <>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>First Name</Typography>
            <Typography sx={style.viewModalContent}>{userById?.fName || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Last Name</Typography>
            <Typography sx={style.viewModalContent}>{userById?.lName || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Email</Typography>
            <Typography sx={style}>{userById?.email || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Mobile</Typography>
            <Typography sx={style.viewModalContent}>{userById?.mobileNo || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>User Role</Typography>
            <Typography sx={style.viewModalContent}>{userById?.role || '-'}</Typography>
          </Grid>
        
        </Grid>
      </Box>
    </>
  );
};

export default ViewModal;
