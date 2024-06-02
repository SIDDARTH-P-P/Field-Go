const styles = () => ({
    commonModalContent: {
      '&.MuiBox-root': {
        position: 'absolute',
        padding: '20px !important',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: 24,
        borderRadius: '11px',
        height: 'fit-content',
        backgroundColor: '#FFFFFF',
       
      }

    },
    modalBoxHeader: {
      '&.MuiGrid-root': {
        width: '100%',
        marginLeft: '0px'
      }
    },
    
    modalHeadContent: {
      '&.MuiBox-root': {
        padding: '15px 0px',
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#000000d1',
        position: 'relative',

      }
    },
    modalResult: {
      '&.MuiBox-root': {
        border: '1px solid darkgrey',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        p: '10px',
        borderRadius: '5px',
        fontWeight: '500',
        color:' #7c7d7f',
        

      }
    },
    tableHeading:{
      '&.MuiBox-root': {
        padding: '15px 0px',
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'red',
        

      }
    },
    closeIconGrid: {
      '&.MuiGrid-root': {
        position: 'relative',
        top: '12px'
      }
    },
    closeIcon: {
      '&.MuiSvgIcon-root': {
        color: '#707070',
        cursor: 'pointer'
      }
    },
    headerUnderLine: {
      '&.MuiBox-root': {
        position: 'relative',
        width: '96%',
        height: '1px',
        zIndex: '1',
        backgroundColor:' #d9d9d9',
        margin: 'auto',
      }
    },
    modalboxComponet: {
      '&.MuiBox-root': {
        height: 'fit-content',
        overflow: 'auto',
        scrollbarWidth: 'none',
        '-ms-overflow-style': 'none',
        '::-webkit-scrollbar': { display: 'none' },
        padding: '20px',
        marginTop: '0px',
        borderRadius: 4
      }
    }
  });
  
  export default styles;
  