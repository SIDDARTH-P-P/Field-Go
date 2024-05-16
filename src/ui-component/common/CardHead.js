import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import commonStyles from 'assets/style/Style';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp';
import { useDispatch } from 'react-redux';
import styles from './style';
import { getCustomer } from '../../module/vendor/container/customerContainer/slice';




const CardHead = ({
  tableHeading,
  count,
  hasHead = true,
  hasAdd = true,
  handleAddModal,
  hasSearch = true,
  searchHandler,
}) => {
  const theme = useTheme();
  const style = commonStyles(theme);
  const styling = styles(theme);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomer());
  }, [dispatch]);

  return (
    <Grid container spacing={2} justifyContent="center">
      {hasHead && (
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ ...styling.modalHeadContent, textAlign: 'left' }}>
            {tableHeading ? tableHeading : 'Add Heading'}
          </Box>
        </Grid>
      )}

      {hasSearch && (
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            sx={{ width: '100%' }}
            placeholder="Search Here"
            InputLabelProps={{
              shrink: false,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            className="searchOne"
            onChange={searchHandler}
          />
        </Grid>
      )}

      <Grid item xs={12} sm={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {hasAdd && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ ...styling.modalResult, marginRight: 1 }}>
              <FilterAltSharpIcon />
              <span style={{ fontWeight: '900' }}>Result:{count ? count : '-'}</span>
            </Box>
            <Button
              color="info"
              variant="contained"
              onClick={handleAddModal}
              sx={style.addBtnHead}
            >
              +ADD
            </Button>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default CardHead;