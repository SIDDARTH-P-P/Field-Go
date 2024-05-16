// import { takeEvery, call } from 'redux-saga/effects';
import 'react-toastify/dist/ReactToastify.css';
import {put,  call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify'; 
import config from 'config';
import auth from 'container/auth';

import * as actionType from './slice';


// function* fetchCustomer() {
//     try {

//       let params = {
//         api:` ${config.Ip}/customerProf`,
//         method: 'GET',
//         successAction: actionType.getCustomerSuccess(),
//         failAction: actionType.getCustomerFail(),
//         authourization: 'token'
       
//       };
//       let res =yield call(auth.basicApi, params);
  
//       console.log("========Customerdata=====", res);
//     } catch (error) {
//       console.log(error);
//     }
  
//   }

function* fetchCustomer() {
  try {
    const userString = localStorage.getItem('user');

    if (userString) {
      const userObject = JSON.parse(userString);
      const orgId = userObject.user.orgId;

      if (orgId) {
        let params = {
          api: `${config.Ip}/customerProf?ownerId=${orgId}`,
          method: 'GET',
          successAction: actionType.getCustomerSuccess(),
          failAction: actionType.getCustomerFail(),
          authourization: 'token'
        };
        yield call(auth.basicApi, params);
      } else {
        yield call(() => toast.error('orgId not found in user object', { autoClose: 3000 }));

        throw new Error('orgId not found in user object');
      }
    } else {
      throw new Error('User object not found in localStorage');
    }
  } catch (error) {
    console.log('Error fetching user:', error);
  }
}



  function* fetchCustomerById(action) {
    const filter = action.payload;
    console.log('=============filterId=======================', filter);
    try {
      let params = {
        api: `${config.Ip}/customerProf/${action.payload}`,
        method: 'GET',
        successAction: actionType.getCustomerByIdSuccess(),
        failAction: actionType.getCustomerByIdFail(),
        authourization: 'token'
      };
      yield call(auth.basicApi, params);
    } catch (error) {
      console.log(error);
    }
  }


  
function* addCustomer(action) {

    console.log('=========action.payload===========', action.payload);
  try {
    let params = {
      api: `${config.Ip}/customerProf`,
      method: 'POST',
      successAction: actionType.addCustomerSuccess(),
      failAction: actionType.addCustomerFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };

    let res = yield call(auth.basicApi, params);
    console.log('=========res customer===========', res);
    if(res){
      yield put({type:actionType.getCustomer().type});
      yield call(() => toast.success('Customer Add successful', { autoClose: 3000 }));

      yield put ({
        type: actionType.custCount().type,
        payload: {'where':{}}
      })
    }
  } catch (error) {
    console.log(error);
  }
}



function* updateCustomerById(action) {
  console.log('================actin.up====================', action.payload);

  try {
    let params = {
      
      api:` ${config.Ip}/customerProf/${action.payload.id}`,
      method: 'PUT',
      successAction: actionType.updateCustomerSuccess(),
      failAction: actionType.updateCustomerFail(),
      authourization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };

     yield call(auth.basicApi, params);
    yield call(() => toast.success('Customers Update successful', { autoClose: 3000 }));

  } catch (error) {
    console.log(error);
  }
}

function* fetchCustomerCount(action) {
  const filter = action.payload;

  try {
    let params = {
      api:` ${config.ip}/customerProf/count?where=${JSON.stringify(filter)}`,      
      method: 'GET',
      successAction: actionType.custCountSuccess(),
      failAction: actionType.custCountFail(),
      authourization: 'token'
    };

    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}



function* deleteCustomer(action) {
   try {
    let params = {
      api:` ${config.Ip}/customerProf/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteCustomerSuccess(),
      failAction: actionType.deleteCustomerFail(),
      authourization: 'token',
       payload: action.payload
    };

    yield call(auth.basicApi, params);
    yield put({ type: actionType.getCustomer().type });
    yield call(() => toast.error('Customer Deleted  Successfully', { autoClose: 3000 }));

  
  } catch (error) {
    yield call(() => toast.error('Customer Support Deleted  Error', { autoClose: 3000 }));

    console.log(error);
  }
}

  export default function* CustomerActionWatcher() {
    yield takeEvery('customer/getCustomer', fetchCustomer);
     yield takeEvery('customer/addCustomer', addCustomer);
    yield takeEvery('customer/getCustomerById', fetchCustomerById);
    yield takeEvery('customer/updateCustomer', updateCustomerById);
    yield takeEvery('customer/custCount', fetchCustomerCount);
    yield takeEvery('customer/deleteCustomer', deleteCustomer);
  }
  
