import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from 'config';
import auth from 'container/auth';
import * as actionType from './slice';

function* fetchactivityType() {
  try {
    let params = {
      api: `${config.Ip}/activityType`,
      method: 'GET',
      successAction: actionType.getactivityTypeSuccess(),
      failAction: actionType.getactivityTypeFail(),
      authourization: 'token'
    };
  yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}


function* fetchactivityTypeCount(action) {
  const filter = action.payload;
  try {
    let params = {
      api: `${config.Ip}/taskTyp/count?where=${JSON.stringify(filter)}`,
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

function* fetchactivityTypeById(action) {
  console.log("====filter=====",action.payload);
  try {
    let params = {
      api: `${config.Ip}/activityType/${action.payload}`,
      method: 'GET',
      successAction: actionType.getactivityTypeByIdSuccess(),
      failAction: actionType.getactivityTypeByIdFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* addactivityType(action) {
  try {
    let params = {
      api: `${config.Ip}/activityType`,
      method: 'POST',
      successAction: actionType.addactivityTypeSuccess(),
      failAction: actionType.addactivityTypeFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };
    let res = yield call(auth.basicApi, params);
    if (res) {
      yield put({ type: actionType.getactivityType().type });
     yield call(() => toast.success('Add Task successful', { autoClose: 3000 }));
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateactivityType(action) {
  try {
    let params = {
      api: `${config.Ip}/activityType/${action.payload.id}`,
      method: 'PUT',
      successAction: actionType.updateactivityTypeSuccess(),
      failAction: actionType.updateactivityTypeFail(),
      authourization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };
    let res = yield call(auth.basicApi, params);
    if (res && res.status === 200) {
     yield call(() => toast.success('Update is successful', { autoClose: 3000 }));
      yield put({ type: actionType.getactivityType().type });
    }
  } catch (error) {
    console.log(error);
  }
}

function* deleteactivityType(action) {
  try {
    let params = {
      api: `${config.Ip}/activityType/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteactivityTypeSuccess(),
      failAction: actionType.deleteactivityTypeFail(),
      authourization: 'token',
      payload: action.payload
    };
    let res = yield call(auth.basicApi, params);
    console.log(res);
    yield call(() => toast.success('Delete successful', { autoClose: 3000 }));    
  } catch (error) {
    console.log(error);
  }
}


export default function* ActivityTypeActionWatcher() {
  yield takeEvery('activityType/getactivityType', fetchactivityType);
  yield takeEvery('activityType/addactivityType', addactivityType);
  yield takeEvery('activityType/updateactivityType', updateactivityType);
  yield takeEvery('activityType/deleteactivityType', deleteactivityType);
  yield takeEvery('activityType/totalCount', fetchactivityTypeCount);
  yield takeEvery('activityType/getactivityTypeById', fetchactivityTypeById);
}
