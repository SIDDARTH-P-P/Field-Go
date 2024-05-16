import React from 'react';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';
import commonStyles from 'assets/style/Style';
import { useTheme } from '@mui/material/styles';

const DeleteModal = ({ open, handleClose, onDeleteConfirm }) => {
  const theme = useTheme();
  const style = commonStyles(theme);

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
      <Box
        sx={{
          position: 'absolute',
          width: '30%',
          height: 'fit-content',
          backgroundColor: 'white',
          padding: 2,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: 24,
          p: 4,
          borderRadius: 4
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <span style={{ fontSize: '19px' }}>Delete Confirmation</span>
          <span style={{ cursor: 'pointer' }}>
            <HighlightOffIcon
              sx={{
                color: '#b1bdc0',
                fontSize: '35px'
              }}
              onClick={() => handleClose()}
            />
          </span>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: '17px'
          }}
        >
          <p>Are you sure you want to delete?</p>
        </Box>
        <Box
          sx={{
            display: 'flex',
            marginBottom: '20px',
            justifyContent: 'center'
          }}
        >
          <Button type="submit" variant="contained" sx={style.cancelBtn} onClick={() => handleClose()}>
            No
          </Button>

          <Button type="submit" color="info" variant="contained" sx={style.addBtn} onClick={() => onDeleteConfirm()}>
            Yes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onDeleteConfirm: PropTypes.func.isRequired
};

export default DeleteModal;
