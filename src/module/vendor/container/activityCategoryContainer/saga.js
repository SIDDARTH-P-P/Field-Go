import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from 'config';
import auth from 'container/auth';
import * as actionType from './slice';

function* fetchactivityCategory() {
  try {
    let params = {
      api: `${config.Ip}/activityCategory`,
      method: 'GET',
      successAction: actionType.getactivityCategorySuccess(),
      failAction: actionType.getactivityCategoryFail(),
      authourization: 'token'
    };
  yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}


function* fetchactivityCategoryCount(action) {
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

function* fetchactivityCategoryById(action) {
  console.log("====filter=====",action.payload);
  try {
    let params = {
      api: `${config.Ip}/activityCategory/${action.payload}`,
      method: 'GET',
      successAction: actionType.getactivityCategoryByIdSuccess(),
      failAction: actionType.getactivityCategoryByIdFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* addactivityCategory(action) {
  try {
    let params = {
      api: `${config.Ip}/activityCategory`,
      method: 'POST',
      successAction: actionType.addactivityCategorySuccess(),
      failAction: actionType.addactivityCategoryFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };
    let res = yield call(auth.basicApi, params);
    if (res) {
      yield put({ type: actionType.getactivityCategory().type });
     yield call(() => toast.success('Add Task successful', { autoClose: 3000 }));
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateactivityCategory(action) {
  try {
    let params = {
      api: `${config.Ip}/activityCategory/${action.payload.id}`,
      method: 'PUT',
      successAction: actionType.updateactivityCategorySuccess(),
      failAction: actionType.updateactivityCategoryFail(),
      authourization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };
    let res = yield call(auth.basicApi, params);
    if (res && res.status === 200) {
     yield call(() => toast.success('Update is successful', { autoClose: 3000 }));
      yield put({ type: actionType.getactivityCategory().type });
    }
  } catch (error) {
    console.log(error);
  }
}

function* deleteactivityCategory(action) {
  try {
    let params = {
      api: `${config.Ip}/activityCategory/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteactivityCategorySuccess(),
      failAction: actionType.deleteactivityCategoryFail(),
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


export default function* ActivityCategoryActionWatcher() {
  yield takeEvery('activityCategory/getactivityCategory', fetchactivityCategory);
  yield takeEvery('activityCategory/addactivityCategory', addactivityCategory);
  yield takeEvery('activityCategory/updateactivityCategory', updateactivityCategory);
  yield takeEvery('activityCategory/deleteactivityCategory', deleteactivityCategory);
  yield takeEvery('activityCategory/totalCount', fetchactivityCategoryCount);
  yield takeEvery('activityCategory/getactivityCategoryById', fetchactivityCategoryById);
}
