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

function* fetchTask() {
  try {
    const userString = localStorage.getItem('user');

    if (userString) {
      const userObject = JSON.parse(userString);
      const orgId = userObject.user.orgId;

      if (orgId) {
        let params = {
          api: `${config.Ip}/task`,
          method: 'GET',
          successAction: actionType.gettaskSuccess(),
          failAction: actionType.gettaskFail(),
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



  function* fetchTaskById(action) {
    const filter = action.payload;
    console.log('=============filterId=======================', filter);
    try {
      let params = {
        api: `${config.Ip}/task/${action.payload}`,
        method: 'GET',
        successAction: actionType.gettaskByIdSuccess(),
        failAction: actionType.gettaskByIdFail(),
        authourization: 'token'
      };
      yield call(auth.basicApi, params);
    } catch (error) {
      console.log(error);
    }
  }


  
function* addTask(action) {
  const userString = localStorage.getItem('user');
    const userObject = JSON.parse(userString);
    const orgId = userObject.user.orgId;
    const payloadWithtaskOwnerID = {
      ...action.payload,
      taskOwnerID: orgId
    };
    console.log('=========action.payload===========', action.payload);
  try {
    let params = {
      api: `${config.Ip}/task`,
      method: 'POST',
      successAction: actionType.addtaskSuccess(),
      failAction: actionType.addtaskFail(),
      authourization: 'token',
      body: JSON.stringify(payloadWithtaskOwnerID)
    };
    let res = yield call(auth.basicApi, params);
    console.log('=========res customer===========', res);
    if(res){
      yield put({type:actionType.gettask().type});
      yield call(() => toast.success('Task Add successful', { autoClose: 3000 }));
      yield put ({
        type: actionType.custCount().type,
        payload: {'where':{}}
      })
    }
  } catch (error) {
    console.log(error);
  }
}



function* updateTaskById(action) {
  console.log('================actin.up====================', action.payload);

  try {
    let params = {
      api:` ${config.Ip}/task/${action.payload.id}`,
      method: 'PUT',
      successAction: actionType.updateTaskSuccess(),
      failAction: actionType.updateTaskFail(),
      authourization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };

     yield call(auth.basicApi, params);
    yield call(() => toast.success('Task Update successful', { autoClose: 3000 }));

  } catch (error) {
    console.log(error);
  }
}

function* fetchTaskCount(action) {
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



function* deletetask(action) {
   try {
    let params = {
      api:` ${config.Ip}/task/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deletetaskSuccess(),
      failAction: actionType.deletetaskFail(),
      authourization: 'token',
       payload: action.payload
    };

    yield call(auth.basicApi, params);
    yield put({ type: actionType.gettask().type });
    yield call(() => toast.error('Task Deleted  Successfully', { autoClose: 3000 }));

  
  } catch (error) {
    yield call(() => toast.error('Customer Support Deleted  Error', { autoClose: 3000 }));

    console.log(error);
  }
}

  export default function* CustomerActionWatcher() {
    yield takeEvery('task/gettask', fetchTask);
     yield takeEvery('task/addtask', addTask);
    yield takeEvery('task/getTaskById', fetchTaskById);
    yield takeEvery('task/updateTask', updateTaskById);
    yield takeEvery('task/custCount', fetchTaskCount);
    yield takeEvery('task/deletetask', deletetask);
  }
  
