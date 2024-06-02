import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from 'config';
import auth from 'container/auth';
import * as actionType from './slice';

function* fetchtaskCategory() {
  try {
    let params = {
      api: `${config.Ip}/taskCategory`,
      method: 'GET',
      successAction: actionType.gettaskCategorySuccess(),
      failAction: actionType.gettaskCategoryFail(),
      authourization: 'token'
    };
  yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* fetchtaskCategoryCount(action) {
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

function* fetchtaskCategoryById(action) {
  console.log("====filter=====",action.payload);
  try {
    let params = {
      api: `${config.Ip}/taskCategory/${action.payload}`,
      method: 'GET',
      successAction: actionType.gettaskCategoryByIdSuccess(),
      failAction: actionType.gettaskCategoryByIdFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* addtaskCategory(action) {
  try {
    let params = {
      api: `${config.Ip}/taskCategory`,
      method: 'POST',
      successAction: actionType.addtaskCategorySuccess(),
      failAction: actionType.addtaskCategoryFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };
    let res = yield call(auth.basicApi, params);
    if (res) {
      yield put({ type: actionType.gettaskCategory().type });
     yield call(() => toast.success('Add Task successful', { autoClose: 3000 }));
    }
  } catch (error) {
    console.log(error);
  }
}

function* updatetaskCategory(action) {
  try {
    let params = {
      api: `${config.Ip}/taskCategory/${action.payload.id}`,
      method: 'PUT',
      successAction: actionType.updatetaskCategorySuccess(),
      failAction: actionType.updatetaskCategoryFail(),
      authourization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };
    let res = yield call(auth.basicApi, params);
    if (res && res.status === 200) {
     yield call(() => toast.success('Update is successful', { autoClose: 3000 }));
      yield put({ type: actionType.gettaskCategory().type });
    }
  } catch (error) {
    console.log(error);
  }
}

function* deletetaskCategory(action) {
  try {
    let params = {
      api: `${config.Ip}/taskCategory/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deletetaskCategorySuccess(),
      failAction: actionType.deletetaskCategoryFail(),
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


export default function* TaskCategoryActionWatcher() {
  yield takeEvery('taskCategory/gettaskCategory', fetchtaskCategory);
  yield takeEvery('taskCategory/addtaskCategory', addtaskCategory);
  yield takeEvery('taskCategory/updatetaskCategory', updatetaskCategory);
  yield takeEvery('taskCategory/deletetaskCategory', deletetaskCategory);
  yield takeEvery('taskCategory/totalCount', fetchtaskCategoryCount);
  yield takeEvery('taskCategory/gettaskCategoryById', fetchtaskCategoryById);
}
