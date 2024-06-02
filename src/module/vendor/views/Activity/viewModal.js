import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Tab, Tabs } from '@mui/material';
import commonStyles from 'assets/style/Style';
import { getactivityById } from 'module/vendor/container/activityContainer/slice';
import { getactivityCategoryById } from 'module/vendor/container/activityCategoryContainer/slice';
// import { gettaskTypeById } from 'module/vendor/container/taskTypeContainer/slice';
// import { getUserById } from 'module/vendor/container/userContainer/slice';
// import { gettaskCategoryById } from 'module/vendor/container/taskCategoryContainer/slice';

const ViewModal = ({ data }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState(0);

  const taskByIdData = useSelector((state) => state.data?.customers?.customerByIdData);
  // const activity = useSelector((state)=>state.data.activity.activityByIdData)

  // const taskType = useSelector((state) => state.data?.taskType?.taskTypeByIdData)
  // const taskCategory = useSelector((state) => state.data?.taskCategory?.taskCategoryByIdData)
  // const AssignedTo = useSelector((state) => state.data?.user?.userByIdData)
  console.log("====taskType====",data);

  useEffect(() => {
    dispatch(getactivityCategoryById(data?.taskCategory?.id))
    // dispatch(gettaskTypeById(data?.taskType.id))
    // dispatch(getUserById(data?.assignedTo.id))
    if (data?.id) {
      dispatch(getactivityById(data?.id));
    }
  }, [dispatch, data]);

  return (
    <>
      <Box>
        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          <Tab label="Activity Details" />
          <Tab label="Client Details" />
          <Tab label="Contact Personal Details" />
        </Tabs>
        <TabPanel value={currentTab} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={3} xl={3} md={4} sm={12}>
              <Typography sx={style.viewModalLab}>Type</Typography>
              <Typography sx={style.viewModalContent}>{data?.activityType?.activityType || '-'}</Typography>
            </Grid>
            <Grid item xs={12} lg={3} xl={3} md={4} sm={12}>
              <Typography sx={style.viewModalLab}>Category</Typography>
              <Typography sx={style.viewModalContent}>{data?.activityCategory?.actvtyCatgName || '-'}</Typography>
            </Grid>
            <Grid item xs={12} lg={3} xl={3} md={4} sm={12}>
              <Typography sx={style.viewModalLab}>Priority</Typography>
              <Typography sx={style.viewModalContent}>{data?.activityPriority || '-'}</Typography>
            </Grid>
            <Grid item xs={12} lg={3} xl={3} md={4} sm={12}>
              <Typography sx={style.viewModalLab}>Assigned To</Typography>
              <Typography sx={style.viewModalContent}>{`${data?.assignedTo?.fName || '-'} ${data?.assignedTo?.lName || '-'}`}</Typography>
            </Grid>
            <Grid item xs={12} lg={7} xl={7} md={7} sm={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={4} xl={4} md={4} sm={12}>
                  <Typography sx={style.viewModalLab}>Start Date</Typography>
                  <Typography sx={style.viewModalContent}>{data?.activityStartDate?.split('T')[0].split('-').reverse().join('-') || '-'}</Typography>
                </Grid>
                <Grid item xs={12} lg={4} xl={4} md={4} sm={12}>
                  <Typography sx={style.viewModalLab}>End Date</Typography>
                  <Typography sx={style.viewModalContent}>{data?.activityEndDate?.split('T')[0].split('-').reverse().join('-') || '-'}</Typography>
                </Grid>
                <Grid item xs={12} lg={4} xl={4} md={4} sm={12}>
                  <Typography sx={style.viewModalLab}>Follow Up Date</Typography>
                  <Typography sx={style.viewModalContent}>{data?.nextContactDate?.split('T')[0].split('-').reverse().join('-') || '-'}</Typography>
                </Grid>
                <Grid item xs={12} lg={6} xl={6} md={6} sm={12}>
                  <Typography sx={style.viewModalLab}>Title</Typography>
                  <Typography sx={style.viewModalContent}>{data?.activityName || '-'}</Typography>
                </Grid>
                <Grid item xs={12} lg={6} xl={6} md={6} sm={12}>
                  <Typography sx={style.viewModalLab}>Description</Typography>
                  <Typography sx={style.viewModalContentTextarea}>
                    {data?.activityDescp|| '-'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={5} xl={5} md={5} sm={12}>
              <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
                <img
                  src={taskByIdData?.imgUrls}
                  alt="Selected"
                  style={{ cursor: 'pointer', maxWidth: '250px', maxHeight: '200px', minWidth: '250px', minHeight: '20px' }}
                />
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={currentTab} index={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Name</Typography>
              <Typography sx={style.viewModalContent}>{data?.taskRef?.clientDetails?.name || '-'}</Typography>
            </Grid>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Location</Typography>
              <Typography sx={style.viewModalContent}>{data?.taskRef?.clientDetails?.location || '-'}</Typography>
            </Grid>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Mobile</Typography>
              <Typography sx={style.viewModalContent}>{data?.taskRef?.clientDetails?.mobile || '-'}</Typography>
            </Grid>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Email</Typography>
              <Typography sx={style.viewModalContent}>{data?.taskRef?.clientDetails?.email || '-'}</Typography>
            </Grid>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Website</Typography>
              <Typography sx={style.viewModalContent}>{data?.taskRef?.clientDetails?.website || '-'}</Typography>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={currentTab} index={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>SPOC Name</Typography>
              <Typography sx={style.viewModalContent}>{data?.taskRef?.clientDetails?.spocName || '-'}</Typography>
            </Grid>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>SPOC Mobile</Typography>
              <Typography sx={style.viewModalContent}>{data?.taskRef?.clientDetails?.spocMobile || '-'}</Typography>
            </Grid>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>SPOC Designation</Typography>
              <Typography sx={style.viewModalContent}>{data?.taskRef?.clientDetails?.spocDesig || '-'}</Typography>
            </Grid>

            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Email</Typography>
              <Typography sx={style.viewModalContent}>{data?.taskRef?.clientDetails?.spocEmail || '-'}</Typography>
            </Grid>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Alternate Phone</Typography>
              <Typography sx={style.viewModalContent}>{data?.taskRef?.clientDetails?.alternatePhone || '-'}</Typography>
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
