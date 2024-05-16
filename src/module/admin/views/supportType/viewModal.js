import React ,{useEffect} from 'react';
 import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import commonStyles from 'assets/style/Style';

 import { getSupportTypeById  } from 'module/admin/container/supportTypeContainer/slice';
const ViewModal = ({data}) => {
  const theme = useTheme();
  const style = commonStyles(theme);
    const dispatch = useDispatch();
    const supportTypeById = useSelector((state) => state.adminReducer.supportType.supportTypeByIdData);

 

    useEffect(() => {
      if (data?.id) {
        dispatch( getSupportTypeById (data?.id));
      }
    }, [dispatch, data]);
console.log('================data====================',data.id);

  return (
    <>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>SupportType</Typography>
            <Typography sx={style.viewModalContent}>{supportTypeById?.supportType || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Description</Typography>
            <Typography sx={style.viewModalContent}>{supportTypeById?.desc || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Status</Typography>
            <Typography sx={style.viewModalContent}>{supportTypeById?.isActive ? 'true' : 'false' || '-'}</Typography>
          </Grid>
      
    
        
        </Grid>
      </Box>
    </>
  );
};

export default ViewModal;
