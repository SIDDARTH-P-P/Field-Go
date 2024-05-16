import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import config from 'config';
import auth from 'container/auth';

import * as actionType from './slice';


function* fetchEnqmode() {
    try {
 
      let params = {
        api: `${config.Ip}/enqMode`,
        method: 'GET',
        successAction: actionType.getEnqModeSuccess(),
        failAction: actionType.getEnqModeFail(),
        authourization: 'token'
       
      };
      let res =yield call(auth.basicApi, params);
  
      console.log("========Enqmodedata=====", res);
    } catch (error) {
      console.log(error);
    }
  
  }

  function* fetchEnqmodeCount(action) {
    const filter = action.payload;
    console.log('=============filter=======================', filter);
  
    try {
      let params = {
        api: `${config.Ip}/enqMode/count?where=${JSON.stringify(filter)}`,
        method: 'GET',
        successAction: actionType.totalCountSuccess(),
        failAction: actionType.totalCountFail(),
        authourization: 'token'
      };
  
    yield call(auth.basicApi, params);
     
    } catch (error) {
      console.log(error);
    }
  }

  function* addEnqmode(action) {
console.log('=========action.payload===========', action.payload);

  try {
    let params = {
      api: `${config.Ip}/enqMode`,
      method: 'POST',
      successAction: actionType.addEnqModeSuccess(),
      failAction: actionType.addEnqModeFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };

    let res = yield call(auth.basicApi, params);

    if(res){
      yield put({type:actionType.getEnqMode().type});
      yield call(() => toast.success('Add EnquiryMode successful', { autoClose: 3000 }));

    //   yield put ({
    //     type: actionType.custCount().type,
    //     payload: {'where':{}}
    //   })
    }
  } catch (error) {
    console.log(error);
  }
}

function* fetchEnqmodeById(action) {
  const filter = action.payload;
  console.log('=============filterId=======================', filter);
  try {
    let params = {
      api: `${config.Ip}/enqMode/${action.payload}`,
      method: 'GET',
      successAction: actionType.getEnqModeByIdSuccess(),
      failAction: actionType.getEnqModeByIdFail(),
      authourization: 'token'
    };
   yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}


function* updateEnqModeById(action) {
  console.log('================actin.paylad====================', action.payload);

  try {
    let params = {
      api: `${config.Ip}/enqMode/${action.payload.id}`,
      method: 'PATCH',
      successAction: actionType.updateEnqModeSuccess(),
      failAction: actionType.updateEnqModeFail(),
      authourization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);

    console.log('=================updateresponse===================', res);

    if (res && res.status === 204) {
     //    yield put({ type: actionType.getCountry().type });
    //  yield call(() => toast.success('Update is successful', { autoClose: 3000 }));
    }
  } catch (error) {
    console.log(error);
  }
}
function* deleteEnqMode(action) {
  console.log(' payload============================', action.payload);
  try {
    let params = {
      api: `${config.Ip}/enqMode/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteEnqModeSuccess(),
      failAction: actionType.deleteEnqModeFail(),
      authourization: 'token',
      // body: JSON.stringify(action.payload),
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);

    console.log("====delted=======",res);

    if (res && res.status === 204) {
      //  yield put({ type: actionType.getCountry().type });
    //  yield call(() => toast.success('Delete successful', { autoClose: 3000 }));

      // yield put({
      //   type: actionType.totalCount().type,
      //   payload: { 'where=': {} }
      // });
    }
  } catch (error) {
    console.log(error);
  }
}



  export default function* EnqmodeActionWatcher() {
    yield takeEvery('/enqMode/getEnqMode', fetchEnqmode);
    yield takeEvery('/enqMode/addEnqMode', addEnqmode);
    yield takeEvery('/enqMode/totalCount', fetchEnqmodeCount);
    yield takeEvery('/enqMode/getEnqModeById', fetchEnqmodeById);
    yield takeEvery('/enqMode/updateEnqMode', updateEnqModeById);
    yield takeEvery('/enqMode/deleteEnqMode', deleteEnqMode);

  }
  