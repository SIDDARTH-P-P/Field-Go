import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const Paginate = ({ page, limit, countryCount, handlePageChange }) => {
  console.log('====================limit================',limit);
  

  return (

    countryCount > limit && (

      <>
        <Box
          sx={{
            marginTop: '20px',
            marginBottom: '20px',
            justifyContent: 'space-between'
          }}
        >
          <Grid container>
            <Grid item xs={12} md={6} lg={6} sm={5}>
              <Box
                sx={{
                  marginTop: '10px',
                  justifyContent: 'flex-start',
                  color: '#B5B7C0',
                  fontSize: '16px'
                }}
              >
                Showing Data {limit * (page - 1) + 1} to {page * limit} of {countryCount} entries
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={6} sm={7}>
              <Box
                sx={{
                  marginTop: '10px',
                  justifyContent: 'flex-end',
                  alignItems: 'end'
                }}
              >
                <Stack spacing={2}>
                  <Pagination
                    count={Math.ceil(countryCount / limit)}
                    variant="outlined"
                    shape="rounded"
                    sx={{
                      '& .Mui-selected': {
                        backgroundColor: '#000080 !important',
                        color: 'white !important'
                      },
                      '& .MuiPagination-root': {
                        color: '#6E6E6E !important'
                      }
                    }}
                    page={page}
                    onChange={handlePageChange}
                  />
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    )
  );
};

Paginate.propTypes = {
  limit: PropTypes.number,
  page: PropTypes.number,
  countryCount: PropTypes.number,
  handlePageChange: PropTypes.func
};

export default Paginate;
