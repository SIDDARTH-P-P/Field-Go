


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import commonStyles from 'assets/style/Style';

import { getSupportById } from 'module/vendor/container/supportContainer/slice';

const ViewModal = ({ data }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();
  const supportById = useSelector((state) => state.data.support.supportByIdData);

  console.log('===============customerid=====================', supportById);

  useEffect(() => {
    if (data?.id) {
      dispatch(getSupportById(data?.id));
    }
  }, [dispatch, data]);
  console.log('================data====================', data.id);

  return (
    <>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>SupportType</Typography>
            <Typography sx={style.viewModalContent}>{supportById?.sprtType?.supportType || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Priority</Typography>
            <Typography sx={style.viewModalContent}>{supportById?.priority || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Description</Typography>
            <Typography sx={style.viewModalContent}>{supportById?.desc || '-'}</Typography>
          </Grid>
          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Image</Typography>
            {/* Display the selected image with reduced size */}
            {supportById?.imgUrls && (
              <img
                src={supportById.imgUrls}
                alt="Selected"
                style={{ maxWidth: '100%', height: 'auto', maxHeight: '150px' }} // Adjust maximum height as needed
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ViewModal;


 