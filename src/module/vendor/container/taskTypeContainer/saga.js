import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from 'config';
import auth from 'container/auth';
import * as actionType from './slice';

function* fetchtaskType() {
  try {
    let params = {
      api: `${config.Ip}/taskType`,
      method: 'GET',
      successAction: actionType.gettaskTypeSuccess(),
      failAction: actionType.gettaskTypeFail(),
      authourization: 'token'
    };
  yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* fetchtaskTypeCount(action) {
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

function* fetchtaskTypeById(action) {
  console.log("====filter=====",action.payload);
  try {
    let params = {
      api: `${config.Ip}/taskType/${action.payload}`,
      method: 'GET',
      successAction: actionType.gettaskTypeByIdSuccess(),
      failAction: actionType.gettaskTypeById(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* addtaskType(action) {
  try {
    let params = {
      api: `${config.Ip}/taskType`,
      method: 'POST',
      successAction: actionType.addtaskTypeSuccess(),
      failAction: actionType.addtaskTypeFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };
    let res = yield call(auth.basicApi, params);
    if (res) {
      yield put({ type: actionType.gettaskType().type });
     yield call(() => toast.success('Add State successful', { autoClose: 3000 }));
    }
  } catch (error) {
    console.log(error);
  }
}

function* updatetaskTypeById(action) {
  try {
    let params = {
      api: `${config.Ip}/taskType/${action.payload.id}`,
      method: 'PUT',
      successAction: actionType.updatetaskTypeSuccess(),
      failAction: actionType.updatetaskTypeFail(),
      authourization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };
    let res = yield call(auth.basicApi, params);
    if (res && res.status === 200) {
     yield call(() => toast.success('Update is successful', { autoClose: 3000 }));
      yield put({ type: actionType.gettaskType().type });
    }
  } catch (error) {
    console.log(error);
  }
}

function* deletetaskType(action) {
  try {
    let params = {
      api: `${config.Ip}/taskType/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deletetaskTypeSuccess(),
      failAction: actionType.deletetaskTypeFail(),
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


export default function* TaskTypeActionWatcher() {
  yield takeEvery('taskType/gettaskType', fetchtaskType);
  yield takeEvery('taskType/addtaskType', addtaskType);
  yield takeEvery('taskType/updatetaskType', updatetaskTypeById);
  yield takeEvery('taskType/deletetaskType', deletetaskType);
  yield takeEvery('taskType/totalCount', fetchtaskTypeCount);
  yield takeEvery('taskType/gettaskTypeById', fetchtaskTypeById);
}
