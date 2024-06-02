import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Tab, Tabs } from '@mui/material';
import commonStyles from 'assets/style/Style';
import { getTaskById } from 'module/vendor/container/customerContainer/slice';
import { gettaskTypeById } from 'module/vendor/container/taskTypeContainer/slice';
import { getUserById } from 'module/vendor/container/userContainer/slice';
import { gettaskCategoryById } from 'module/vendor/container/taskCategoryContainer/slice';

const ViewModal = ({ data }) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState(0);
  const taskByIdData = useSelector((state) => state.data?.customers?.customerByIdData);
  const taskType = useSelector((state) => state.data?.taskType?.taskTypeByIdData)
  const taskCategory = useSelector((state) => state.data?.taskCategory?.taskCategoryByIdData)
  const AssignedTo = useSelector((state) => state.data?.user?.userByIdData)
  console.log("====taskType====", taskCategory.taskCatgName);

  useEffect(() => {
    dispatch(gettaskCategoryById(data?.taskCategory?.id))
    dispatch(gettaskTypeById(data?.taskType.id))
    dispatch(getUserById(data?.assignedTo.id))
    if (data?.id) {
      dispatch(getTaskById(data?.id));
    }
  }, [dispatch, data]);

  return (
    <>
      <Box>
        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          <Tab label="Task Details" />
          <Tab label="Client Details" />
          <Tab label="Contact Personal Details" />
        </Tabs>
        <TabPanel value={currentTab} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={3} xl={3} md={4} sm={12}>
              <Typography sx={style.viewModalLab}>Type</Typography>
              <Typography sx={style.viewModalContent}>{taskType?.taskType || '-'}</Typography>
            </Grid>
            <Grid item xs={12} lg={3} xl={3} md={4} sm={12}>
              <Typography sx={style.viewModalLab}>Category</Typography>
              <Typography sx={style.viewModalContent}>{taskCategory?.taskCatgName || '-'}</Typography>
            </Grid>
            <Grid item xs={12} lg={3} xl={3} md={4} sm={12}>
              <Typography sx={style.viewModalLab}>Priority</Typography>
              <Typography sx={style.viewModalContent}>{taskByIdData?.taskPriority || '-'}</Typography>
            </Grid>
            <Grid item xs={12} lg={3} xl={3} md={4} sm={12}>
              <Typography sx={style.viewModalLab}>Assigned To</Typography>
              <Typography sx={style.viewModalContent}>{`${AssignedTo?.fName || '-'} ${AssignedTo?.lName || '-'}`}</Typography>
            </Grid>

            <Grid item xs={12} lg={7} xl={7} md={7} sm={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={6} xl={6} md={6} sm={12}>
                  <Typography sx={style.viewModalLab}>Start Date</Typography>
                  <Typography sx={style.viewModalContent}>{taskByIdData?.taskStartDate?.split('T')[0].split('-').reverse().join('-') || '-'}</Typography>
                </Grid>

                <Grid item xs={12} lg={6} xl={6} md={6} sm={12}>
                  <Typography sx={style.viewModalLab}>End Date</Typography>
                  <Typography sx={style.viewModalContent}>{taskByIdData?.taskEndDate?.split('T')[0].split('-').reverse().join('-') || '-'}</Typography>
                </Grid>
                <Grid item xs={12} lg={6} xl={6} md={6} sm={12}>
                  <Typography sx={style.viewModalLab}>Title</Typography>
                  <Typography sx={style.viewModalContent}>{taskByIdData?.taskTitle || '-'}</Typography>
                </Grid>
                <Grid item xs={12} lg={6} xl={6} md={6} sm={12}>
                  <Typography sx={style.viewModalLab}>Description</Typography>
                  <Typography sx={style.viewModalContentTextarea}>
                    {taskByIdData?.taskDescp|| '-'}
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
              <Typography sx={style.viewModalContent}>{taskByIdData?.clientDetails?.name || '-'}</Typography>
            </Grid>

            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Location</Typography>
              <Typography sx={style.viewModalContent}>{taskByIdData?.clientDetails?.location || '-'}</Typography>
            </Grid>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Mobile</Typography>
              <Typography sx={style.viewModalContent}>{taskByIdData?.clientDetails?.mobile || '-'}</Typography>
            </Grid>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Email</Typography>
              <Typography sx={style.viewModalContent}>{taskByIdData?.clientDetails?.email || '-'}</Typography>
            </Grid>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Website</Typography>
              <Typography sx={style.viewModalContent}>{taskByIdData?.clientDetails?.website || '-'}</Typography>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={currentTab} index={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>SPOC Name</Typography>
              <Typography sx={style.viewModalContent}>{taskByIdData?.clientDetails?.spocName || '-'}</Typography>
            </Grid>

            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>SPOC Mobile</Typography>
              <Typography sx={style.viewModalContent}>{taskByIdData?.clientDetails?.spocMobile || '-'}</Typography>
            </Grid>


            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>SPOC Designation</Typography>
              <Typography sx={style.viewModalContent}>{taskByIdData?.clientDetails?.spocDesig || '-'}</Typography>
            </Grid>

            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Email</Typography>
              <Typography sx={style.viewModalContent}>{taskByIdData?.clientDetails?.spocEmail || '-'}</Typography>
            </Grid>

            <Grid item xs={12} lg={4} xl={4} md={6} sm={12}>
              <Typography sx={style.viewModalLab}>Alternate Phone</Typography>
              <Typography sx={style.viewModalContent}>{taskByIdData?.clientDetails?.alternatePhone || '-'}</Typography>
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
