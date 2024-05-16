import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from 'config';
import auth from 'container/auth';

import * as actionType from './slice';

function* fetchState() {
  try {
    
    let params = {
      api: `${config.Ip}/state`,
      method: 'GET',
      successAction: actionType.getStateSuccess(),
      failAction: actionType.getStateFail(),
      authourization: 'token'
    };
  yield call(auth.basicApi, params);


  } catch (error) {
    console.log(error);
  }

}



function* fetchStateCount(action) {
  const filter = action.payload;

  try {
    let params = {
      api: `${config.Ip}/state/count?where=${JSON.stringify(filter)}`,
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

function* fetchStateById(action) {
  const filter = action.payload;
  console.log('=============filterId=======================', filter);
  try {
    let params = {
      api: `${config.Ip}/state/${action.payload}`,
      method: 'GET',
      successAction: actionType.getStateByIdSuccess(),
      failAction: actionType.getStateByIdFail(),
      authourization: 'token'
    };
   yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* addState(action) {
  console.log('=========action.payload user===========', action.payload);

  try {
    let params = {
      api: `${config.Ip}/state`,
      method: 'POST',
      successAction: actionType.addStateSuccess(),
      failAction: actionType.addStateFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };
    let res = yield call(auth.basicApi, params);

    console.log('=========res user===========', res);

    if (res) {
      yield put({ type: actionType.getState().type });
     yield call(() => toast.success('Add State successful', { autoClose: 3000 }));

      // yield put({
      //   type: actionType.totalCount().type,
      //   payload: { 'where=': {} }
      // });
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateStateById(action) {
  console.log('================actin.paylad====================', action.payload);

  try {
    let params = {
      api: `${config.Ip}/state/${action.payload.id}`,
      method: 'PUT',
      successAction: actionType.updateStateSuccess(),
      failAction: actionType.updateStateFail(),
      authourization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);

    console.log('=================updateresponse===================', res);

    if (res && res.status === 200) {
     yield call(() => toast.success('Update is successful', { autoClose: 3000 }));
      yield put({ type: actionType.getState().type });

    }
  } catch (error) {
    console.log(error);
  }
}

function* deleteState(action) {
  console.log(' payload============================', action.payload);
  try {
    let params = {
      api: `${config.Ip}/state/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteStateSuccess(),
      failAction: actionType.deleteStateFail(),
      authourization: 'token',
      // body: JSON.stringify(action.payload),
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);
    yield call(() => toast.success('Delete successful', { autoClose: 3000 }));


    console.log("====delted=======",res);

    if (res && res.status === 204) {
      //  yield put({ type: actionType.getState().type });

      // yield put({
      //   type: actionType.totalCount().type,
      //   payload: { 'where=': {} }
      // });
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* StateActionWatcher() {
  yield takeEvery('state/getState', fetchState);
  yield takeEvery('state/totalCount', fetchStateCount);
  yield takeEvery('state/addState', addState);
  yield takeEvery('state/getStateById', fetchStateById);
  yield takeEvery('state/updateState', updateStateById);
  yield takeEvery('state/deleteState', deleteState);
}
