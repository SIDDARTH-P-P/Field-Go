const fontSize = {
  fontSize12px: '12px',
  fontSize13px: '13px',
  fontSize14px: '14px',
  fontSize15px: '15px',
  fontSize16px: '16px',
  fontSize18px: '18px'
};

const style= (theme) => ({
  //-------------------------list commonStyle-----------------------//

  listTableBody: {
    '&.MuiTableCell-root': {
      fontFamily: theme.palette.FontFamly,
      fontSize: fontSize.fontSize16px,
      color: theme.palette.color.ListCell2,
      textTransform: 'capitalize',
      lineHeight: '1rem'
    }
  },
  listTableBodyemail: {
    '&.MuiTableCell-root': {
      fontFamily: theme.palette.FontFamly,
      fontSize: fontSize.fontSize16px,
      color: theme.palette.color.ListCell2,
      lineHeight: '1rem'
    }
  },
  listActionIcon: {
    '&.MuiSvgIcon-root': {
      width: '0.8em',
      height: '0.8em'
    }
  },
  listActionBtn: {
    '&.MuiButtonBase-root': {
      padding: '7px 7px',
      minWidth: '30px',
      backgroundColor: '#f0f0f0',
      color: '#000000',
      transition: 'background-color 0.3s ease-in-out',
      '&:hover': {
        backgroundColor: '#cdd0f2'
      },
      marginRight: '5px',
      marginTop: '2px'
    }
  },
  listGrid1: {
    '&.MuiGrid-root': {
      // padding: '20px',
      // paddingBottom: '0px',
      fontFamily: theme.palette.fontFamily
    }
  },
  listBox: {
    '&.MuiBox-root': {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%'
    }
  },
  //====================viewModal============================

  viewModalLab: {
    '&.MuiTypography-root': {
      fontFamily: theme.palette.fontFamily,
      color: '#1B1B1B',
      opacity: 0.4
    }
  },
  viewModalContent: {
    '&.MuiTypography-root': {
      fontFamily: theme.palette.fontFamily,
      color: '#515151',
      opacity: 1,
      textTransform: 'capitalize',
      fontSize: fontSize.fontSize16px
    },
 
  },
  viewModalContentTextarea: {
    whiteSpace: 'pre-line',   
    wordBreak: 'break-word', 
    overflow: 'auto',     
    textOverflow: 'ellipsis',  
    maxHeight: '100px',      
  },
  //============Btn==============================

  addBtn: {
    '&.MuiButtonBase-root': {
      fontFamily: theme.palette.fontFamily,
      backgroundColor: '#b00000',
      transition: 'background-color 0.3s ease-in-out',
      '&:hover': {
        backgroundColor: '#b00000'
      }
    }
  },
  cancelBtn: {
    '&.MuiButtonBase-root': {
      fontFamily: theme.palette.fontFamily,
      backgroundColor: '#797c7e',
      transition: 'background-color 0.3s ease-in-out',
      '&:hover': {
        backgroundColor: '#797c7e'
      },

      marginRight: '10px'
    }
  },
  changeBtn:{
    '&.MuiButtonBase-root': {
      background:'#000000', 
      fontWeight: '600' ,
      border:'none' ,
      color:'white',
      marginLeft: '676px',
      transition: 'background-color 0.3s ease-in-out',
      marginTop:'15px',
      '&:hover': {
        backgroundColor: '#000000'
      },
     
  
    }
  },
  modalHelloContent: {
    '&.MuiGrid-root': {
      background:'red'
    }
  },
  addBtnHead: {
    '&.MuiButtonBase-root': {
      marginLeft: '10px !important',
      width: '95px',
      backgroundColor: '#000000',
      transition: 'background-color 0.3s ease-in-out',
      height: '40px'
    },
    '@media (max-width: 1266px)': {
      marginTop: '2px',
      marginLeft: '0px !important'
    }
  },


//==============================list header=============================//
listTable: {
  '&.MuiTableContainerRoot': {
    overflowX: 'auto'
  }
},
listTableHead: {
  '&.MuiTableCell-head': {
    fontFamily: theme.palette.FontFamly,
    fontSize: fontSize.fontSize18px,
    color: theme.palette.color.listHead2,
    backgroundColor: '#F9FBFF',
    opacity: '.8',
    lineHeight: '1rem'
  },
  '&.MuiTableCell-root': {
    borderTop: '1px solid #E6E6E6'
  }
},
listSelect: {
  '&.MuiInputBase-root.MuiOutlinedInput-root': {
    width: '120px',
    height: '45px',
    borderRadius: 0,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderRightColor: 'transparent',
    '& fieldset': {
      borderColor: 'none'
    },
    backgroundColor: '#F9FBFF'
  }
},

listSearch: {
  '&:focus': {
    borderColor: 'transparent'
  },
  '&.MuiOutlinedInput-root': {
    '&.Mui-focused': {
      borderColor: 'transparent',
      boxShadow: 'none'
    },
    '&.MuiInputBase-adornedStart.Mui-focused': {
      borderColor: 'transparent'
    }
  },

  '&.MuiFormControl-root': {
    fontFamily: theme.palette.fontFamily
  },
  '& .MuiFormControl-root-MuiTextField-root .MuiOutlinedInput-root': {
    paddingTop: '1px'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'none',
      borderRadius: 0,
      height: 45,
      paddingBlock: '10px',
      borderTopRightRadius: 6,
      borderBottomRightRadius: 6,
      borderTopLeftRadius: 6,
      borderBottomLeftRadius: 6,
 
    },
    // padding: '10.5px 18px 1.5px  14px '
  },
  '&.MuiFormControl-root .MuiInputBase-root': {
    backgroundColor: '#F9FBFF',
    fontSize: fontSize.fontSize15px,
    paddingTop: '1px',
    width: '75%',
    fontFamily: theme.palette.fontFamily,
    '&:hover fieldset': {
      borderColor: '#a6a3a6de'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#a6a3a6de'
    }
  },
  '@media (max-width: 1300px)': {
    '&.MuiFormControl-root': {
      width: '270px'
    }
  },
  '@media (min-width: 1300px)': {
    '&.MuiFormControl-root': {
      width: '300px'
    }
  },
  '@media (max-width: 462px)': {
    '&.MuiFormControl-root': {
      marginTop: '8px !important'
    }
  }
},
listSecGrid: {
  '&.MuiGrid-root': {
    display: 'flex'
  },
  '@media (min-width: 1266px)': {
    justifyContent: 'flex-end'
  }
},

listFiltrLbl: {
  '&.MuiFormLabel-root': {
    padding: '1px',
    '&.Mui-focused': { top: '13px' },
    '&.MuiInputLabel-shrink': { top: '13px', backgroundColor: '#' }
  }
},
listChipFilter: {
  '&.MuiChip-root': {
    paddingLeft: '0px',
    paddingRight: '0px',
    fontFamily: theme.palette.FontFamly,
    backgroundColor: 'white'
  },
  '& .MuiChip-label': {
    paddingLeft: '0px',
    paddingRight: '5px',
    paddingTop: '8px',
    fontFamily: theme.palette.FontFamly
  }
},
});

export default style;
