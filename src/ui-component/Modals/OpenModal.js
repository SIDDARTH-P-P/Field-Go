// import React from 'react';
// import { Modal } from '@mui/material';
// import Box from '@mui/material/Box';
// import PropTypes from 'prop-types';
// import HighlightOffIcon from '@mui/icons-material/HighlightOff';

// const OpenModal = ({ open, handleClose, component, mdlwidth, mdlheight }) => {
//   const handleIconClick = () => {
//     handleClose();
//   };
//   console.log(mdlheight, 'height');
//   return (
//     <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
//       <Box
//         sx={{
//           position: 'absolute',
//           width: mdlwidth ? mdlwidth : '50%',
//           height: mdlheight ? mdlheight : '60%',
//           backgroundColor: 'white',
//           padding: 2,
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           boxShadow: 24,
//           p: 4,
//           borderRadius: 4
//         }}
//       >
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'end'
//           }}
//         >
//           <span style={{ marginBottom: '-40px', zIndex: 2, cursor: 'pointer' }}>
//             <HighlightOffIcon
//               sx={{
//                 color: '#b1bdc0',
//                 fontSize: '35px'
//               }}
//               onClick={handleIconClick}
//             />
//           </span>
//         </Box>

//         <Box>{component}</Box>
//       </Box>
//     </Modal>
//   );
// };

// OpenModal.propTypes = {
//   open: PropTypes.bool.isRequired,
//   handleClose: PropTypes.func.isRequired,
//   component: PropTypes.node,
//   mdlwidth: PropTypes.string,
//   mdlheight: PropTypes.string
// };

// export default OpenModal;
