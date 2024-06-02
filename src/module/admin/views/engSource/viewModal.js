import React ,{useEffect} from 'react';
 import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import commonStyles from 'assets/style/Style';

 import { getEnqSourceById } from 'module/admin/container/enqSourceContainer/slice'
const ViewModal = ({data}) => {
  const theme = useTheme();
  const style = commonStyles(theme);
    const dispatch = useDispatch();
    const stateById = useSelector((state) => state.adminReducer.enqsource.enqsourceByIdData);

 

    useEffect(() => {
      if (data?.id) {
        dispatch( getEnqSourceById (data?.id));
      }
    }, [dispatch, data]);
console.log('================data====================',data.id);

  return (
    <>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Name</Typography>
            <Typography sx={style.viewModalContent}>{stateById?.name || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Description</Typography>
            <Typography sx={style.viewModalContent}>{stateById?.desc || '-'}</Typography>
          </Grid>

        </Grid>
      </Box>
    </>
  );
};

export default ViewModal;
