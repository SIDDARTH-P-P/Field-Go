import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Tab, Tabs } from '@mui/material';

import commonStyles from 'assets/style/Style';
import { getCustomerById } from 'module/vendor/container/customerContainer/slice';

const ViewModal = ({ data }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();
  const customerByIdData = useSelector((state) => state.data.customers.customerByIdData);
  console.log('===============customerid=====================', customerByIdData);

  useEffect(() => {
    if (data?.id) {
      dispatch(getCustomerById(data?.id));
    }
  }, [dispatch, data]);
  console.log('================data====================', data.id);
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <>
      <Box>
        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          <Tab label="Basic Details" />
          <Tab label="Additional Details" />
          <Tab label="General Details" />
        </Tabs>

        <TabPanel value={currentTab} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Customer Type</Typography>
              <Typography sx={style.viewModalContent}>{customerByIdData?.custType || '-'}</Typography>
            </Grid>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Name</Typography>
              <Typography sx={style.viewModalContent}>{`${customerByIdData?.fName || '-'} ${customerByIdData?.lName || '-'}`}</Typography>
            </Grid>

            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Email</Typography>
              <Typography>{customerByIdData?.email || '-'}</Typography>
            </Grid>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Mobile(Primary)</Typography>
              <Typography sx={style.viewModalContent}>{customerByIdData?.contactMobile1 || '-'}</Typography>
            </Grid>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Mobile(Secondary)</Typography>
              <Typography sx={style.viewModalContent}>{customerByIdData?.contactMobile2 || '-'}</Typography>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={currentTab} index={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Country</Typography>
              <Typography sx={style.viewModalContent}>{customerByIdData?.address?.country?.name || '-'}</Typography>
            </Grid>

            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>State</Typography>
              <Typography sx={style.viewModalContent}>{customerByIdData?.address?.state?.name || '-'}</Typography>
            </Grid>
            {/* <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>District</Typography>
              <Typography sx={style.viewModalContent}>{customerByIdData?.address.state?.name || '-'}</Typography>
            </Grid> */}
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}> District</Typography>
              <Typography sx={style.viewModalContent}>{customerByIdData?.address?.district?.name || '-'}</Typography>
            </Grid>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>City</Typography>
              <Typography sx={style.viewModalContent}>{customerByIdData?.address?.city || '-'}</Typography>
            </Grid>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Address Line1</Typography>
              <Typography sx={style.viewModalContent}>{customerByIdData?.address?.addr1 || '-'}</Typography>
            </Grid>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Address Line2</Typography>
              <Typography sx={style.viewModalContent}>{customerByIdData?.address?.addr2 || '-'}</Typography>
            </Grid>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Postal Code</Typography>
              <Typography sx={style.viewModalContent}>{customerByIdData?.address?.postalCode || '-'}</Typography>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={currentTab} index={2}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Region</Typography>
            <Typography sx={style.viewModalContent}>{customerByIdData?.address?.region || '-'}</Typography>
          </Grid> */}
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Enquiry Source</Typography>
              <Typography sx={style.viewModalContent}>{customerByIdData?.enqSource?.name || '-'}</Typography>
            </Grid>

            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Enquiry Mode</Typography>
              <Typography sx={style.viewModalContent}>{customerByIdData?.enqMode?.name || '-'}</Typography>
            </Grid>
     
    
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Postal Code</Typography>
            <Typography sx={style.viewModalContent}>{customerByIdData?.licenceNo || '-'}</Typography>
          </Grid>

          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Postal Code</Typography>
            <Typography sx={style.viewModalContent}>{customerByIdData?.gstin || '-'}</Typography>
          </Grid>

          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
            <Typography sx={style.viewModalLab}>Postal Code</Typography>
            <Typography sx={style.viewModalContent}>{customerByIdData?.extRefNo || '-'}</Typography>
          </Grid>

          <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
        <Typography sx={style.viewModalLab}>Remarks</Typography>
        <Typography sx={style.viewModalContentTextarea}>
          {customerByIdData?.remarks || '-'}
        </Typography>
      </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </>
  );
};

export default ViewModal;

function TabPanel(props) {
  const { children, value, index } = props;

  return <div hidden={value !== index}>{value === index && <Box sx={{ p: 3 }}>{children}</Box>}</div>;
}
