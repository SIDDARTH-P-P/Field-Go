import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import FilePresentIcon from '@mui/icons-material/FilePresent';
const NOdataFound = () => {
  return (
    <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', paddingTop: 30 }}>
      <FilePresentIcon style={{ fontSize: '7rem', color: '#AAAAAA' }} fontSize="large" />
      <Box>
        <Typography fontWeight={800} fontSize={24} style={{color: '#AAAAAA'}}>
          No Data Found
        </Typography>
      </Box>
      <Box></Box>
    </Paper>
  );
};

export default NOdataFound;
