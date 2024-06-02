
// import React from 'react';
// import TableRow from '@mui/material/TableRow';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import Button from '@mui/material/Button';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import commonStyles from 'assets/style/Style';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import formatLabel from 'utils/formatLabel';
// import formatDate from 'utils/formatDate';
// import formatDateTime from 'utils/formatDateTime';

// const TableRows = ({
//   data = [],
//   keys = [],
//   config = [],
//   hasAction = true,
//   currentPage = 1,
//   pageFilters = { limit: 10 },
//   handleOpenModal,
//   handleDelete,
//   hasDelete = true
// }) => {
//   const theme = useTheme();
//   const style = commonStyles(theme);
 
//   let returnData = '';

//   const rowCellValue = (key, value) => {
//     switch (key?.class) {
//       case 'desc':
//         returnData = value && value.length > 30 ? `${value.substring(0, 30)}...` : value || '--';
//         break;
//       case 'formatLabelId':
//         returnData = `${formatLabel(value)}`;
//         break;
//       case 'formatDate':
//         returnData = `${formatDate(value)}`;
//         break;
//       case 'formatDateTime':
//         returnData = `${formatDateTime(value)}`;
//         break;
//       default:
//         returnData = value;
//     }
//     return returnData;  
//   };

//   return (
//     <TableBody>
//       {data.map((rowItem, rowIndex) => (
//         <TableRow key={rowIndex}>
//           <TableCell sx={style.listTableBody}>
//              {(currentPage - 1) * pageFilters.limit + rowIndex + 1}
          
//           </TableCell>
//           {keys.map((key, i) => {
//             return (
//               <TableCell key={i}>
//                 {config[key]?.label === 'Status' &&
//                 (rowItem[key] === 'active' || rowItem[key] === 'created' || rowItem[key] === 'suspended') ? (
//                   <Box sx={style.tableStatusBox}
//                   //  backgroundColor={returnStyle}
//                    >
//                     {rowItem[key]}
//                   </Box>
//                 ) : (
//                   rowCellValue(config[key], rowItem[key])
//                 )}
//               </TableCell>
//             );
//           })}

//           {hasAction && (
//             <TableCell sx={{ display: 'flex', gap: theme.spacing(1) }}>
//               <Button severity="warning" variant="contained" onClick={() => handleOpenModal('viewform', rowItem)} sx={style.listActionBtn}>
//                 <VisibilityIcon sx={style.listActionIcon} />
//               </Button>
//               <Button severity="info" variant="contained" onClick={() => handleOpenModal('editform', rowItem)} sx={style.listActionBtn}>
//                 <EditIcon sx={style.listActionIcon} />
//               </Button>
//               {hasDelete && (
//                 <Button severity="info" variant="contained" onClick={() => handleDelete(rowItem)} sx={style.listActionBtn}>
//                   <DeleteIcon sx={style.listActionIcon} />
//                 </Button>
//               )}
//             </TableCell>
//           )}
//         </TableRow>
//       ))}
//     </TableBody>
//   );
// };



// export default TableRows;

import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import commonStyles from 'assets/style/Style';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import formatLabel from 'utils/formatLabel';
import formatDate from 'utils/formatDate';
import formatDateTime from 'utils/formatDateTime';

const TableRows = ({
  data = [],
  keys = [],
  config = [],
  hasAction = true,
  currentPage = 1,
  pageFilters = { limit: 10 },
  handleOpenModal,
  handleDelete,
  hasDelete = true
}) => {
  const theme = useTheme();
  const style = commonStyles(theme);

  const rowCellValue = (key, value) => {
    switch (key?.class) {
      case 'desc':
        return value && value.length > 30 ? `${value.substring(0, 30)}...` : value || '--';
      case 'formatLabelId':
        return formatLabel(value);
      case 'formatDate':
        return formatDate(value);
      case 'formatDateTime':
        return formatDateTime(value);
      default:
        return value;
    }
  };

  return (
    <TableBody>
      {data.map((rowItem, rowIndex) => (
        <TableRow key={rowIndex}>
          <TableCell>{(currentPage - 1) * pageFilters.limit + rowIndex + 1}</TableCell>
          {keys.map((key, i) => (
            <TableCell key={i}>
              {config[key]?.label === 'Status' && ['active', 'created', 'suspended'].includes(rowItem[key]) ? (
                <Box sx={style.tableStatusBox}>{rowItem[key]}</Box>
              ) : (
                rowCellValue(config[key], rowItem[key])
              )}
            </TableCell>
          ))}
          {hasAction && (
            <TableCell sx={{ display: 'flex', gap: theme.spacing(1) }}>
              <Button severity="warning" variant="contained" onClick={() => handleOpenModal('viewform', rowItem)} sx={style.listActionBtn}>
                <VisibilityIcon sx={style.listActionIcon} />
              </Button>
              <Button severity="info" variant="contained" onClick={() => handleOpenModal('editform', rowItem)} sx={style.listActionBtn}>
                <EditIcon sx={style.listActionIcon} />
              </Button>
              {hasDelete && (
                <Button severity="info" variant="contained" onClick={() => handleDelete(rowItem)} sx={style.listActionBtn}>
                  <DeleteIcon sx={style.listActionIcon} />
                </Button>
              )}
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableRows;
