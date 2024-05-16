 // material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

//==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
  <MainCard title="ORDERS">
    <Typography variant="body2">
     <h1>UNDER WORKING ON............</h1>
    </Typography>
  </MainCard>
);

export default SamplePage;



// // export default AddEditFormModal;

// // import React ,{useEffect} from 'react';
// import { Formik, Form, ErrorMessage } from 'formik';
// // import { useDispatch, useSelector} from 'react-redux';
// import * as Yup from 'yup';
// // import PropTypes from 'prop-types';
// import Box from '@mui/system/Box';
// import Grid from '@mui/material/Grid';
//  import { useTheme } from '@mui/material/styles';
// import Textfield from 'ui-component/common/TextField';
// import { Button } from '@mui/material';
// import commonStyles from 'assets/style/Style';
// import { addUser} from 'module/vendor/container/userContainer/slice';


// const AddEditModal = ({ formtype, data, handleClose }) => {
//      const theme = useTheme();
//      const style = commonStyles(theme);
//   const dispatch = useDispatch();
//   const userById = useSelector((state) => state.user.user.userByIdData);


//   // useEffect(() => {
//   //   if (data && data.id) {
//   //     dispatch(getCountryById(data.id));
//   //   }
//   // }, [dispatch, data]);

//   console.log('==================data check==================', data);

//   const initialValues = {
//     fName: formtype === 'editform' ? userById?.fName || '' : '',
//     lName: formtype === 'editform' ? userById?.lName || '' : '',
//     email: formtype === 'editform' ? userById?.email || '' : '',
//     mobileNo: formtype === 'editform' ? userById?.mobileNo || '' : '',
//     callingCode: formtype === 'editform' ? userById?.callingCode || '' : ''

//   };

//   const validationSchema = Yup.object({
//     fName: Yup.string().required('First Name is Required'),
//     lName: Yup.string().required('Last Name is Required'),
//     email: Yup.string().required('Email is Required'),
//     mobileNo: Yup.string().required('Mobile is Required'),
//     callingCode: Yup.string().required('Password is Required')

//   });

//   const onSubmit = (values, { resetForm }) => {
//     console.log(values, '=====valuess======');
 

//     console.log(values, '=======updatedValues========');
//     if (formtype && formtype === 'addform') {
//       dispatch(addUser(values));
 
//     } else {
    
//       values.id = data.id;
    

//       // dispatch(updateCountry(values));
//     }

//     handleClose(formtype);
//     resetForm();
//   };

//   return (
//     <Box onClose={handleClose}>
//       <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
//         <Form>
//           <Grid container spacing={2}></Grid>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <Textfield name="fName" id="fName" placeholder="First Name" component={Textfield} />
//               <ErrorMessage name="fName" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Textfield name="lName" id="lName" placeholder="Last Name " component={Textfield} />
//               <ErrorMessage name="lName" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//             </Grid>
//             <Grid item xs={12} sm={6} >
//               <Textfield name="email" id="email" placeholder="Email" component={Textfield} />
//               <ErrorMessage name="email" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Textfield name="mobileNo" id="mobileNo" placeholder="Mobile" component={Textfield} />
//               <ErrorMessage name="mobileNo" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Textfield name="callingCode" id="callingCode" placeholder="Password" component={Textfield} />
//               <ErrorMessage name="callingCode" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//             </Grid>
//             <Grid item xs={12} sm={6} >
//               <Textfield name="callingCode" id="callingCode" placeholder="Confirm Password" component={Textfield} />
//               <ErrorMessage name="callingCode" component="div" style={{ color: '#f54d4f', fontSize: 12 }} />
//             </Grid>
//           </Grid>
//           <Button type="submit"  sx={style.changeBtn}>Save</Button>
//         </Form>
//       </Formik>
//     </Box>
//   );
// };

// // AddEditModal.propTypes = {
// //   formtype: PropTypes.string.isRequired,
// //   data: PropTypes.any.isRequired,
// //   handleClose: PropTypes.func.isRequired
// // };

// export default AddEditModal;






         
        {/* <Button  color="info" startIcon={<VisibilityIcon/>}></Button> */}
        {/* <Button  color="primary" startIcon={<EditIcon />}></Button> */}
        {/* <Button  color="secondary" startIcon={<DeleteIcon />}></Button> */}


          // import Button from '@mui/material/Button'; 
  // import DeleteIcon from '@mui/icons-material/Delete'; 
  // import EditIcon from '@mui/icons-material/Edit';
  // import VisibilityIcon from '@mui/icons-material/Visibility';




  // index////////////////////////////////////////////////

    // Index.js
// import DataTable from 'react-data-table-component';
// import React, { useState } from 'react';
// import OpenModal from 'ui-component/common/OpenModal';
// import AddEditModal from './addEditModal';
// import TableRows from 'ui-component/Table/TableRows';
// import CardHead from 'ui-component/common/CardHead';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import DeleteModal from 'ui-component/Modals/DeleteModal';
// import ViewModal from './viewModal'

// import { getUser, deleteUser } from 'module/vendor/container/userContainer/slice';

// export default function Index() {
//   const [openModal, setOpenModal] = useState(false);
//   const [modalComponent, setModalComponent] = useState(null);
//   const [modalHeading, setModalHeading] = useState('');
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   // const [selectedRow, setSelectedRow] = useState(null);
//   const [selectedId, setSelectedId] = useState();
//   const modalStyle = { width: '60%' };
//   const dispatch = useDispatch();
//   const userDetails = useSelector((state) => state.user.user.userData);

//   useEffect(() => {
//     dispatch(getUser());
//   }, [dispatch]);

//   const handleOpenModal = (whichOpen, item) => {
//     setOpenModal(true);
//     // setSelectedRow(item); // Store selected row
//     let ComponentToRender;
//     switch (whichOpen) {
//       case 'addform':
//         setModalHeading('Add MyTeam');
//         ComponentToRender = <AddEditModal formtype="addform" data={item} handleClose={handleCloseModal} />; // Fix
//         break;
//         case 'editform':
//           setModalHeading('Edit MyTeam');
//           ComponentToRender = <AddEditModal formtype="editform" data={item} handleClose={handleCloseModal} />;
//           break;
//         case 'viewform':
//           setModalHeading('View MyTeam');
//           ComponentToRender = <ViewModal data={item} />;
//           break;
//         default:
//           ComponentToRender = null;
//       }
//       setModalComponent(ComponentToRender);
//   };

//   const handleCloseModal = (formtype) => {
//     setOpenModal(false);
//     setShowDeleteModal(false);
//     if (formtype === 'addform') setPage(1);
//   };

//   const handleDeleteModal = (item) => {
//     setShowDeleteModal(true);
//     setSelectedId(item.id);
//   };

//   const deleteReferenceConfirm = () => {
//     dispatch(deleteUser(selectedId));
//     setShowDeleteModal(false);
//   };

//   const columns = [
//     {
//       name: 'NAME',
//       selector: row => row.fName,
//     },
//     {
//       name: 'EMAIL',
//       selector: row => row.email,
//     },
//     {
//       name: 'MOBILE',
//       selector: row => row.mobileNo,
//     },
//     {
//       name: 'USER ROLE',
//       selector: row => row.role,
//     },
//     {
//       name: 'ACTIONS',
//       cell: row => <TableRows rowData={row} handleOpenModal={handleOpenModal}   handleDelete={handleDeleteModal}  data={userDetails.rows} />,
//     },
//   ];

//   return (
//     <DataTable
//       columns={columns}
//       data={userDetails.rows}
//       striped
//       highlightOnHover
//       pointerOnHover
//       subHeader
//       subHeaderComponent={
//         <div>
//           <CardHead handleAddModal={() => handleOpenModal('addform')} />
//           {openModal && (
//             <OpenModal
//               open={openModal}
//               handleClose={handleCloseModal}
//               component={modalComponent}
//               mdlwidth={modalStyle.width}
//               mdlHeading={modalHeading}
//             />
//           )}

//         {showDeleteModal && (
//           <DeleteModal 
//           open={showDeleteModal} 
//           handleClose={handleCloseModal}
//           id={selectedId} 
//           onDeleteConfirm={deleteReferenceConfirm} />
//         )}
//         </div>
//       }
//     />
//   );
// }












// saga///////////////////////////////////

// import { takeEvery, call,put } from 'redux-saga/effects';
// import 'react-toastify/dist/ReactToastify.css';
// import config from 'config';
// import auth from 'container/auth';

// import * as actionType from './slice';


// function* fetchUser(action) {
//     try {
//       const filter = action.payload;
//       console.log("===========uderdataaa=====",action.payload);
//      let page = (filter && filter.page) || 1;
//      console.log("pageeeeeeeeeeeee",page);
//       let searchVal = (filter?.searchVal && filter?.searchVal) || '';
//       let limit = (filter?.limit && filter?.limit) || 10;
  
//       console.log('++++++++++++++filtervalues++++++++++++', filter);
//       let params = {
//         api: `${config.Ip}/users?&limit=${limit}&page=${page}&q=${searchVal}`,
//         method: 'GET',
//         successAction: actionType.getUserSuccess(),
//         failAction: actionType.getUserFail(),
//         authourization: 'token'
//       };
//       let res =yield call(auth.basicApi, params);
  
//       console.log("finshi", res);
//     } catch (error) {
//       console.log(error);
//     }
  
//   }


//   function* fetchUserById(action) {
//     try {
//       let params = {
//         api: `${config.Ip}/users/${action.payload}`,
//         method: 'GET',
//         successAction: actionType.getUserByIdSuccess(),
//         failAction: actionType.getUserByIdFail(),
//         authourization: 'token'
//       };
//       yield call(auth.basicApi, params);
//     } catch (error) {
//       console.log(error);
//     }
//   }


  
// function* addUser(action) {
 

//     // const data =  {
//     //   "fName": "ajsal",
//     //   "lName": "s",
//     //   "email": "ajsall@example.com",
//     //   "mobileNo": "6747564565",
//     //   "password" : "aju123"
  
//     // }
//     console.log('=========action.payload===========', action.payload);
//     // console.log("========jsonpayload=========",JSON.stringify(action.payload))

//   try {
//     let params = {
//       api: `${config.Ip}/users`,
//       method: 'POST',
//       successAction: actionType.addUserSuccess(),
//       failAction: actionType.addUserFail(),
//       authourization: 'token',
//       body: JSON.stringify(action.payload)
//     };
//     let res = yield call(auth.basicApi, params);

//     console.log('=========res===========', res);

//     if (res) {
//       yield put({ type: actionType.getUser().type });
//      yield call(() => toast.success('Add User  successful', { autoClose: 3000 }));

//       // yield put({
//       //   type: actionType.totalCount().type,
//       //   payload: { 'where=': {} }
//       // });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }



// function* updateUserById(action) {
//   console.log('================actin.paylad====================', action.payload);

//   try {
//     let params = {
//       api: `${config.Ip}/users/${action.payload.id}`,
//       method: 'PATCH',
//       successAction: actionType.updateUserSuccess(),
//       failAction: actionType.updateUserFail(),
//       authourization: 'token',
//       body: JSON.stringify({ ...action.payload, id: undefined }),
//       payload: action.payload
//     };

//     let res = yield call(auth.basicApi, params);

//     console.log('=================updateresponse===================', res);

//     // if (res && res.status === 204) {
   
//     // }
//   } catch (error) {
//     console.log(error);
//   }
// }




// function* deleteUser(action) {
//   console.log(' payload============================', action.payload);
//   try {
//     let params = {
//       api: `${config.Ip}/users/${action.payload}`,
//       method: 'DELETE',
//       successAction: actionType.deleteUserSuccess(),
//       failAction: actionType.deleteUserFail(),
//       authourization: 'token',
//       // body: JSON.stringify(action.payload),
//       payload: action.payload
//     };

//     let res = yield call(auth.basicApi, params);

//     if (res && res.status === 204) {
//       //  yield put({ type: actionType.getCountry().type });
//     //  yield call(() => toast.success('Delete successful', { autoClose: 3000 }));

//       // yield put({
//       //   type: actionType.totalCount().type,
//       //   payload: { 'where=': {} }
//       // });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

//   export default function* UserActionWatcher() {
//     yield takeEvery('user/getUser', fetchUser);
//     yield takeEvery('user/addUser', addUser);
//     yield takeEvery('user/getUserById', fetchUserById);
//     yield takeEvery('user/updateUser', updateUserById);
//     yield takeEvery('user/deleteUser', deleteUser);
//   }
  











// slice/////////////////////////

// import { createSlice } from '@reduxjs/toolkit';


// const userSlice = createSlice({
//     name: 'user',
//     initialState: {
//       userData: [],
//       loading: false,
//       error: null,
//       userByIdData: {}
//     },
//     reducers: {
//       addUser: (state) => {
//         state.loading = true;
//         state.error = null;
//       },
//       addUserSuccess: (state, action) => {
//         state.loading = false;
//         state.userData = action.payload;
//       },
//       addUserFail: (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       },
//         getUser: (state) => {
//             state.loading = true;
//             state.error = null;
//           },
//         getUserSuccess: (state, action) => {
//             state.loading = false;
//             state.userData = action.payload;
//           },
      
//         getUserFail: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//           },
//           getUserById: (state) => {
//             state.loading = true;
//             state.error = null;
//           },
//           getUserByIdSuccess: (state, action) => {
//             state.loading = false;
//             state.userByIdData = action.payload;
//           },
//           getUserByIdFail: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//           },
//           updateUser: (state) => {
//             state.loading = true;
//             state.error = null;
//           },
      
//           updateUserSuccess: (state, action) => {
//             console.log('================action.payload====================', action.payload);
//             alert('hey i am here');
//             state.loading = false;
//             state.userData =
//               action.payload === undefined
//                 ? current(state).userData
//                 : current(state).userData.map((Data) => (Data.id === action.payload.id ? action.payload : Data));
//             console.log('================userData====================', state.userData);

//           },
//           updateUserFail: (state, action) => {
//             alert('hey i am not here', action.payload);
      
//             state.loading = false;
//             state.error = action.payload;
//           },

//           deleteUser: (state) => {
//             state.loading = true;
//             state.error = null;
//           },
//           deleteUserSuccess: (state, action) => {
//             state.loading = false;
//             state.userData =
//               action.payload === undefined
//                 ? current(state.userData)
//                 : current(state.userData).filter((option) => option.id !== action.payload);
   
//           },
//           deleteUserFail: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//           }
      
//     }
// });

//   export const{
//       addUser,
//       addUserSuccess,
//       addUserFail,
//       getUser,
//       getUserSuccess,
//       getUserFail,
//       getUserById,
//       getUserByIdSuccess,
//       getUserByIdFail,
//       updateUser,
//       updateUserSuccess,
//       updateUserFail,
//       deleteUser,
//       deleteUserSuccess,
//       deleteUserFail
//   } = userSlice.actions;

//   export default userSlice.reducer;



// child reducer//////////////////////////////

// import { combineReducers } from 'redux';


// import userReducer from '../container/userContainer/slice';
// import customerReducer from '../container/customerContainer/slice'

// // ==============================|| COMBINE REDUCER ||============================== //

// const vendorReducer = combineReducers({
//   user: userReducer,
//   customer: customerReducer
// });

// export default vendorReducer;









// str sga//////////////////
// import { all, call } from 'redux-saga/effects';

// import UserActionWatcher from '../container/userContainer/saga';
// import CustomerActionWatcher from '../container/customerContainer/saga'

// function* vendorSaga() {
//   yield all([  call[CustomerActionWatcher], call[UserActionWatcher]]);
// }

// export default vendorSaga;
