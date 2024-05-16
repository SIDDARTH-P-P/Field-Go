// import React from 'react';
// import { useField } from 'formik';
// import { Field } from 'formik';
// import { useTheme } from '@mui/material/styles';
// import TextField from '@mui/material/TextField';
// import PropTypes from 'prop-types';

// const TextFieldComponent = ({ label, style, ...props }) => {
//   const theme = useTheme();
//   const [field] = useField(props.name);

//   return (
//     <Field
//       {...field}
//       {...props}
//       style={style}
//       label={label}
//       fullWidth
//       variant="filled"
//       sx={{
//         ...theme.typography.customInput,
//         backgroundColor: 'white',
//         borderBottom: 'none !important',

//         '& .MuiFilledInput-root': {
//           backgroundColor: 'transparent',
//           border: '1px solid #cdcdcd',
//           borderRadius: '12px',
//           '&:hover': {
//             // boxShadow: '0 0 2px #000000'
//             border: '1px solid #00000061'
//           }
//         },

//         '& .MuiFilledInput-underline:before': {
//           borderBottom: 'none !important'
//         },
//         '& .MuiFilledInput-underline:after': {
//           borderBottom: 'none !important'
//         },

//         '&.MuiFormControl-root': {
//           input: {
//             // backgroundColor: '#f9fafc',
//             color: '#515151',
//             fontSize: '16px',
//             borderRadius: '12px'
//           },
//           label: {
//             color: '#1B1B1B',
//             opacity: '.5',
//             fontSize: '16px'
//           }
//         }
//       }}
//       component={TextField}
//     />
//   );
// };

// TextFieldComponent.propTypes = {
//   field: PropTypes.any,
//   name: PropTypes.any,
//   style: PropTypes.any,
//   label: PropTypes.any,
//   inputMode: PropTypes.string
// };

// export default TextFieldComponent;


import React from 'react';
import { useField } from 'formik';
import { Field } from 'formik';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

const TextFieldComponent = ({ label, style, ...props }) => {
  const theme = useTheme();
  const [field] = useField(props.name);

  return (
    <Field
      {...field}
      {...props}
      style={style}
      label={label}
      fullWidth
      variant="filled"
      sx={{
        ...theme.typography.customInput,
        backgroundColor: 'white',
        borderBottom: 'none !important',
        borderRadius:'8px',
        width:'100%',
        
        '& .MuiFilledInput-root': {
          backgroundColor: 'transparent',
          border: '1px solid #E6E6E6',
          borderRadius: '8px',
        },
        '& .MuiInputBase-root-MuiFilledInput-root:hover' :{
          background: 'transparent !importent',
      },

        '& .MuiFilledInput-underline:before': {
          borderBottom: 'none !important',
          background:'transparent'
        },
        '& .MuiFilledInput-underline:after': {
          borderBottom: '1px solid #000000 '
        },

        '&.MuiFormControl-root': {
          input: {
            // backgroundColor: '#F1F1F1',
            color: '#515151',
            fontSize: '16px',
            borderRadius: '8px',
            height :'0.542rem',
            padding: '22px 15px 19px !important'
          },
          label: {
            color: '#1B1B1B',
            opacity: '.5',
            fontSize: '16px',
            
          }
        }
      }}
      component={TextField}
    />
  );
};

TextFieldComponent.propTypes = {
  field: PropTypes.any,
  name: PropTypes.any,
  style: PropTypes.any,
  label: PropTypes.any,
  inputMode: PropTypes.string
};

export default TextFieldComponent;