import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import config from 'config';
import auth from 'container/auth';

import * as actionType from './slice';


function* fetchEnqsource() {
    try {
 
      let params = {
        api: `${config.Ip}/enqSource`,
        method: 'GET',
        successAction: actionType.getEnqSourceSuccess(),
        failAction: actionType.getEnqSourceFail(),
        authourization: 'token'
       
      };
      let res =yield call(auth.basicApi, params);
  
      console.log("========Enqsourcedata=====", res);
    } catch (error) {
      console.log(error);
    }
  
  }

  function* fetchEnqSourceCount(action) {
    const filter = action.payload;
    console.log('=============filter=======================', filter);
  
    try {
      let params = {
        api: `${config.Ip}/enqSource/count?where=${JSON.stringify(filter)}`,
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

  function* addEnqSource(action) {
console.log('=========action.payload===========', action.payload);

  try {
    let params = {
      api: `${config.Ip}/enqSource`,
      method: 'POST',
      successAction: actionType.addEnqSourceSuccess(),
      failAction: actionType.addEnqSourceFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };

    let res = yield call(auth.basicApi, params);

    if(res){
      yield put({type:actionType.getEnqSource().type});
      yield call(() => toast.success('Add EnquiryType successful', { autoClose: 3000 }));

    //   yield put ({
    //     type: actionType.custCount().type,
    //     payload: {'where':{}}
    //   })
    }
  } catch (error) {
    console.log(error);
  }
}

function* fetchEnqsourceById(action) {
  const filter = action.payload;
  console.log('=============filterId=======================', filter);
  try {
    let params = {
      api: `${config.Ip}/enqSource/${action.payload}`,
      method: 'GET',
      successAction: actionType.getEnqSourceByIdSuccess(),
      failAction: actionType.getEnqSourceByIdFail(),
      authourization: 'token'
    };
   yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}


function* updateEnqSourceById(action) {
  console.log('================actin.paylad====================', action.payload);

  try {
    let params = {
      api: `${config.Ip}/enqSource/${action.payload.id}`,
      method: 'PATCH',
      successAction: actionType.updateEnqSourceSuccess(),
      failAction: actionType.updateEnqSourceFail(),
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
function* deleteEnqSource(action) {
  console.log(' payload============================', action.payload);
  try {
    let params = {
      api: `${config.Ip}/enqSource/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteEnqSourceSuccess(),
      failAction: actionType.deleteEnqSourceFail(),
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



  export default function* EnqsourceActionWatcher() {
    yield takeEvery('/enqSource/getEnqSource', fetchEnqsource);
    yield takeEvery('/enqSource/addEnqSource', addEnqSource);
    yield takeEvery('/enqSource/totalCount', fetchEnqSourceCount);
    yield takeEvery('/enqSource/getEnqSourceById', fetchEnqsourceById);
    yield takeEvery('/enqSource/updateEnqSource', updateEnqSourceById);
    yield takeEvery('/enqSource/deleteEnqSource', deleteEnqSource);

  }
  