import React from 'react';
import PropTypes from 'prop-types';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
// import commonStyles from 'assets/style/Style';
// import { useTheme } from '@mui/material/styles';

const TableHeads = ({ keys = [], config, hasAction = true, hideArray = [] }) => {
  // const theme = useTheme();
  // const style = commonStyles(theme);
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{  whiteSpace: 'nowrap', display: 'table-cell', alignItems: 'center' }} variant="head">
          Sl No
        </TableCell>
        {keys.map((key, i) => {
          if (hideArray.includes(config[key]?.label)) {
            return null;
          }
          return (
            <TableCell 
            // sx={style.listTableHead}
             variant="head" key={i}>
              {config[key]?.label}
            </TableCell>
          );
        })}
        {hasAction && (
          <TableCell 
          // sx={style.listTableHead}
           variant="head">
            Action
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};

TableHeads.propTypes = {
  keys: PropTypes.array,
  config: PropTypes.object,
  hasAction: PropTypes.bool,
  hideArray: PropTypes.array
};

export default TableHeads;
