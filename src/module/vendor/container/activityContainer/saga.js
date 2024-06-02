// import { takeEvery, call } from 'redux-saga/effects';
import 'react-toastify/dist/ReactToastify.css';
import {put,  call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify'; 
import config from 'config';
import auth from 'container/auth';

import * as actionType from './slice';


// function* fetchactivity() {
//     try {

//       let params = {
//         api:` ${config.Ip}/activityProf`,
//         method: 'GET',
//         successAction: actionType.getactivitySuccess(),
//         failAction: actionType.getactivityFail(),
//         authourization: 'token'
       
//       };
//       let res =yield call(auth.basicApi, params);
  
//       console.log("========activitydata=====", res);
//     } catch (error) {
//       console.log(error);
//     }
  
//   }

function* fetchactivity() {
  try {
    const userString = localStorage.getItem('user');

    if (userString) {
      const userObject = JSON.parse(userString);
      const orgId = userObject.user.orgId;

      if (orgId) {
        let params = {
          api: `${config.Ip}/activity`,
          method: 'GET',
          successAction: actionType.getactivitySuccess(),
          failAction: actionType.getactivityFail(),
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



  function* fetchactivityById(action) {
    const filter = action.payload;
    console.log('=============filterId=======================', filter);
    try {
      let params = {
        api: `${config.Ip}/activity/${action.payload}`,
        method: 'GET',
        successAction: actionType.getactivityByIdSuccess(),
        failAction: actionType.getactivityByIdFail(),
        authourization: 'token'
      };
      yield call(auth.basicApi, params);
    } catch (error) {
      console.log(error);
    }
  }


  
  function* addactivity(action) {
    const userString = localStorage.getItem('user');
      const userObject = JSON.parse(userString);
      const orgId = userObject.user.orgId;
      const payloadWithtaskOwnerID = {
        ...action.payload,
        activityOwnerID: orgId
      };
      console.log('=========action.payload===========', payloadWithtaskOwnerID);
    try {
      let params = {
        api: `${config.Ip}/activity`,
        method: 'POST',
        successAction: actionType.addactivitySuccess(),
        failAction: actionType.addactivityFail(),
        authourization: 'token',
        body: JSON.stringify(payloadWithtaskOwnerID)
      };
      let res = yield call(auth.basicApi, params);
      console.log('=========res activity===========', res);
      if(res){
        yield put({type:actionType.getactivity().type});
        yield call(() => toast.success('Activity Add successful', { autoClose: 3000 }));
        yield put ({
          type: actionType.activityCount().type,
          payload: {'where':{}}
        })
      }
    } catch (error) {
      console.log(error);
    }
  }



function* updateactivityById(action) {
  const userString = localStorage.getItem('user');
  const userObject = JSON.parse(userString);
  const orgId = userObject.user.orgId;
  const payloadWithtaskOwnerID = {
    ...action.payload,
    activityOwnerID: orgId
  };
  try {
    let params = {
      api:` ${config.Ip}/activity/${action.payload.id}`,
      method: 'PUT',
      successAction: actionType.updateactivitySuccess(),
      failAction: actionType.updateactivityFail(),
      authourization: 'token',
      body: JSON.stringify({ ...payloadWithtaskOwnerID, id: undefined }),
      payload: action.payload
    };

     yield call(auth.basicApi, params);
     yield put({type:actionType.getactivity().type});
    yield call(() => toast.success('activity Update successful', { autoClose: 3000 }));
  } catch (error) {
    console.log(error);
  }
}

function* fetchactivityCount(action) {
  const filter = action.payload;

  try {
    let params = {
      api:` ${config.ip}/activityProf/count?where=${JSON.stringify(filter)}`,      
      method: 'GET',
      successAction: actionType.activityCountSuccess(),
      failAction: actionType.activityCountFail(),
      authourization: 'token'
    };

    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}



function* deleteactivity(action) {
   try {
    let params = {
      api:` ${config.Ip}/activity/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteactivitySuccess(),
      failAction: actionType.deleteactivityFail(),
      authourization: 'token',
       payload: action.payload
    };

    yield call(auth.basicApi, params);
    yield put({ type: actionType.getactivity().type });
    yield call(() => toast.error('activity Deleted  Successfully', { autoClose: 3000 }));
  } catch (error) {
    yield call(() => toast.error('activity Support Deleted  Error', { autoClose: 3000 }));

    console.log(error);
  }
}

  export default function* ActivityActionWatcher() {
    yield takeEvery('activity/getactivity', fetchactivity);
     yield takeEvery('activity/addactivity', addactivity);
    yield takeEvery('activity/getactivityById', fetchactivityById);
    yield takeEvery('activity/updateactivity', updateactivityById);
    yield takeEvery('activity/activityCount', fetchactivityCount);
    yield takeEvery('activity/deleteactivity', deleteactivity);
  }
  
