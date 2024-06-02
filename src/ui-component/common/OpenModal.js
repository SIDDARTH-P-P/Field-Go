
// import React, { useState } from 'react';
// import { Modal, Box, Grid, Tabs, Tab } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import CustomTabPanel from './CustomTabPanel ';
// import { useTheme } from '@mui/material/styles';
// import styles from './style';

// import AddEditModal from '../../module/vendor/views/Customers/addEditModal';

// const OpenModal = ({ open, handleClose, mdlHeading }) => {
//   const theme = useTheme();
//   const style = styles(theme);
//   const [value, setValue] = useState(0);
//   const [formData, setFormData] = useState({
//     basicDetails: {},
//     additionalInfo: {},
//     generalDetails: {}
//   });

//   const handleIconClick = () => {
//     handleClose();
//   };

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleFormChange = (formtype, field, value) => {
//     setFormData(prevState => ({
//       ...prevState,
//       [formtype]: {
//         ...prevState[formtype],
//         [field]: value
//       }
//     }));
//   };

//   return (
//     <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
//       <Box sx={style.commonModalContent}>
//         <Grid container spacing={2} sx={style.modalBoxHeader}>
//           <Grid item xs={11}>
//             <Box sx={style.modalHeadContent}>{mdlHeading ? mdlHeading : 'Heading'}</Box>
//           </Grid>
//           <Grid item xs={1} sx={style.closeIconGrid}>
//             <CloseIcon sx={style.closeIcon} onClick={handleIconClick} />
//           </Grid>
//         </Grid>
//         <Box sx={style.headerUnderLine}></Box>

//         <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//           <Tab label="Basic Details" />
//           <Tab label="Additional Details" />
//           <Tab label="General Details" />
//         </Tabs>
//         <CustomTabPanel value={value} index={0}>
//           <AddEditModal formtype="basicDetails" formData={formData.basicDetails} handleFormChange={handleFormChange} handleClose={handleClose} />
//         </CustomTabPanel>
//         <CustomTabPanel value={value} index={1}>
//           <AddEditModal formtype="additionalInfo" formData={formData.additionalInfo} handleFormChange={handleFormChange} handleClose={handleClose} />
//         </CustomTabPanel>
//         <CustomTabPanel value={value} index={2}>
//           <AddEditModal formtype="generalDetails" formData={formData.generalDetails} handleFormChange={handleFormChange} handleClose={handleClose} />
//         </CustomTabPanel>
//       </Box>
//     </Modal>
//   );
// };

// export default OpenModal;




import React, { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import styles from './style';

const OpenModal = ({ open, handleClose, component,  mdlHeading, mdlwidth }) => { 
  const theme = useTheme();
  const style = styles(theme);
  const [gradientLength, setGradientLength] = useState(0);
  console.log('------dataaaaa-----------------------------', mdlHeading);
  const handleIconClick = () => {
    handleClose();
  };
  useEffect(() => {
    const textWidth = mdlHeading?.length * 18;

    setGradientLength(textWidth);
  }, [mdlHeading && mdlHeading]);
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
      <Box
        sx={style.commonModalContent}
        style={{
          width: mdlwidth ? mdlwidth : '50%'
        }}
      >
        <Grid container spacing={2} sx={style.modalBoxHeader}>
          <Grid item xs={11}>
            <Box sx={style.modalHeadContent}>{mdlHeading ? mdlHeading : 'Heading'}</Box>
          </Grid>

          <Grid item xs={1} sx={style.closeIconGrid}>
            <CloseIcon sx={style.closeIcon} onClick={handleIconClick} />
          </Grid>
          <Box
            sx={style.headerUnderLine}
            style={{ background: `linear-gradient(to right, #000000 ${gradientLength}px, #7070702e ${gradientLength}px)` }}
          ></Box>
        </Grid>
        <Box sx={style.modalboxComponet}>{component}</Box>
      </Box>
    </Modal>
  );
};

OpenModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  component: PropTypes.node,
  mdlwidth: PropTypes.string,
  mdlheight: PropTypes.string,
  mdlHeading: PropTypes.string
};

export default OpenModal;



