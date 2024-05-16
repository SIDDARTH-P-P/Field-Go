import React, { useEffect } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Select from '@mui/material/Select'
import { Button, MenuItem, } from '@mui/material';
import commonStyles from 'assets/style/Style';
import Textfield from 'ui-component/common/TextField';
// import { Field } from 'formik';
import { getSupportType } from 'module/vendor/container/supportTypeContainer/slice';
import { addSupport, updateSupport, getSupportById ,getSupport} from 'module/vendor/container/supportContainer/slice';

const AddEditModal = ({ formtype, data, handleClose }) => {
  const supportTypeGet = useSelector((state) => state.data.supportType.supportTypeData);
  const theme = useTheme();
  const style = commonStyles(theme);
  const dispatch = useDispatch();
  const supportById = useSelector((state) => state.data.support.supportByIdData);

  useEffect(() => {
    dispatch(getSupportType());
    if (data && data.id && formtype === 'editform') {
      dispatch(getSupportById(data.id));
    }
  }, [dispatch, data, formtype]);

  let initialValues = {};
  if (formtype === 'editform') {
    initialValues = {
      sprtType: supportById?.sprtType?.id || '',
      priority: supportById?.priority || '',
      desc: supportById?.desc || '',
      imgUrls: supportById?.imgUrls || ''
    };
  } else {
    initialValues = {
      sprtType: '',
      desc: '',
      imgUrls: '' // Set initial value as empty for add form
    };
  }

  const validationSchema = Yup.object({
    sprtType: Yup.string().required('Support is required'),
    priority: Yup.string().required('Support is required'),
    desc: Yup.string().required('Support is required'),
    // imgUrls: Yup.mixed()
    // .test(
    //   'fileSize',
    //   'Image size must be less than 500KB',
    //   (value) => !value || (value && value.size <= 500000) // 500KB in bytes
    // )
    // .test('fileType', 'Image must be either JPEG or PNG', (value) => !value || (value && ['image/jpeg', 'image/png'].includes(value.type)))
    // .nullable()
  });


  
  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const onSubmit = async (values, { resetForm }) => {
    try {
      let imgUrls = values.imgUrls; // Assume it's already a URL
      if (values.imgUrls instanceof File) {
        // If it's a file, convert it to Base64
        imgUrls = await convertFileToBase64(values.imgUrls);
      }

      if (formtype && formtype === 'addform') {
        await dispatch(addSupport({ ...values, imgUrls }));
      } else {
        values.id = data.id;
        await dispatch(updateSupport({ ...values, imgUrls }));
        dispatch(getSupport());

      }
      handleClose(formtype);
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  return (
    <Box onClose={handleClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
        {({ values, setFieldValue }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormLabel>Support Type</FormLabel>
                <Select
                  name="sprtType"
                  id="sprtType"
                  label="Support Type"
                  value={values.sprtType}
                  onChange={(e) => {
                    setFieldValue('sprtType', e.target.value);
                  }}
                  variant="outlined"
                  fullWidth
                  style={{ height: '56px', width: '100%', border: 'none', borderBottom: '1px solid black' }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Support Type
                  </MenuItem>
                  {supportTypeGet &&
                    supportTypeGet.rows &&
                    supportTypeGet.rows.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.supportType}
                      </MenuItem>
                    ))}
                </Select>
                <ErrorMessage name="sprtType" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Priority</FormLabel>
                <Select
                  name="priority"
                  id="priority"
                  label="Priority"
                  value={values.priority}
                  onChange={(e) => {
                    setFieldValue('priority', e.target.value);
                  }}
                  variant="outlined"
                  fullWidth
                  style={{ height: '56px', width: '100%', border: 'none', borderBottom: '1px solid black' }}
                  displayEmpty
                >
                  <MenuItem disabled>Select Priority</MenuItem>
                  {priorityOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <ErrorMessage name="priority" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <FormLabel>Description</FormLabel>
                <Field
                  as="textarea"
                  name="desc"
                  id="desc"
                  placeholder="Enter Description"
                  rows={4}
                  style={{ width: '100%', height: '100px', border: '1px solid black', padding: '8px', resize: 'vertical' }}
                />
                <ErrorMessage name="desc" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
              </Grid> */}
               <Grid item xs={12} sm={6}>
                  <FormLabel>Description</FormLabel>

                  <Textfield
                    multiline
                    minRows={4}
                    maxRows={6}

                    aria-label="maximum height"
                    name="desc"
                    id="desc"
                    placeholder="Description"
                    component={Textfield}
                  />
                  <ErrorMessage name="desc" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
                </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel>Upload Image</FormLabel>
                <input
                  accept="image/*"
                  id="imgUrls"
                  name="imgUrls"
                  type="file"
                  onChange={(event) => {
                    setFieldValue('imgUrls', event.currentTarget.files[0]);
                  }}
                  style={{ display: 'none' }}
                />
                <label htmlFor="imgUrls">
                  <Button variant="outlined" component="span">
                    Choose Image
                  </Button>
                </label>
                {values.imgUrls && values.imgUrls instanceof File && (
                  <img
                    src={URL.createObjectURL(values.imgUrls)}
                    alt="Selected"
                    style={{ cursor:'pointer', maxWidth: '250px', maxHeight: '250px', marginRight: '10px' }}
                  />
                )}
                {values.imgUrls &&
                  typeof values.imgUrls === 'string' && ( // Check if imgUrls is a string (URL)
                    <img
                      src={values.imgUrls} // Display the image URL
                      alt="Selected"
                      style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }}
                    />
                  )}
              </Grid>
            </Grid>
            <Button type="submit" sx={style.changeBtn}>
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddEditModal;