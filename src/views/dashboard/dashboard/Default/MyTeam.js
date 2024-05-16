import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// material-ui
// import EarningIcon from 'assets/images/icons/earning.svg';
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';
import { getUser } from 'module/vendor/container/userContainer/slice';

// assets
// import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';

// styles

const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const MyTeam = ({ isLoading }) => {
  const theme = useTheme();


  const dataval = useSelector((state) => state.data.user.userData.count);
 
  const dispatch = useDispatch();

   useEffect(() => {
    dispatch(getUser());  
  }, [dispatch]); 
 

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2 }}>
            <List sx={{ py: 0 }}>
              <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                <ListItemAvatar>
                <Avatar
                              variant="rounded"
                              sx={{
                                width: 50,
                                height: 50,
                                borderRadius: '5px',
                                background: 'linear-gradient(210.04deg, #000000 29.06%, rgb(101 101 101 / 75%) 83.49%)',
                                color: '#ffffff',
                                mr:'10px'
                                
                              }}
                            >
                              {/* <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" /> */}
                            </Avatar>
              
             
                  {/* <Avatar
                    variant="rounded"
                    sx={{
                      // ...theme.typography.commonAvatar,
                      // ...theme.typography.largeAvatar,
                      backgroundColor: theme.palette.warning.light,
                      color: theme.palette.warning.dark
                    }}
                  >
                    <StorefrontTwoToneIcon fontSize="inherit" />
                  </Avatar> */}
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    py: 0,
                    mt: 0.45,
                    mb: 0.45
                  }}
                  primary={<Typography variant="h4">My Team</Typography>}
                  secondary={
                    <Typography
                      variant="h5"
                      sx={{
                        color: theme.palette.grey[500],
                        mt: 0.5
                      }}
                    >
                     {dataval}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

MyTeam.propTypes = {
  isLoading: PropTypes.bool
};

export default MyTeam;
