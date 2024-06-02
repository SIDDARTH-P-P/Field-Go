

import 'react-toastify/dist/ReactToastify.css';
import { put, call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import config from 'config';
import auth from 'container/auth';

import * as actionType from './slice';

function* fetchMainCategory() {
  try {

    let params = {
      api: `${config.Ip}/mainCategory`,
      method: 'GET',
      successAction: actionType.getMainCategorySuccess(),
      failAction: actionType.getMainCategoryFail(),
      authourization: 'token'
    };
    let maincat = yield call(auth.basicApi, params);
    
    console.log("=========mainCategoryData=========",maincat);
  } catch (error) {
    console.log(error);
  }
}

function* fetchMainCategoryCount(action) {
  const filter = action.payload;
  console.log('=============filter=======================', filter);

  try {
    let params = {
      api: `${config.Ip}/mainCategory/count?where=${JSON.stringify(filter)}`,
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

function* fetchMainCategoryById(action) {
  const filter = action.payload;
  console.log('=============filterId=======================', filter);
  try {
    let params = {
      api: `${config.Ip}/mainCategory/${action.payload}`,
      method: 'GET',
      successAction: actionType.getMainCategoryByIdSuccess(),
      failAction: actionType.getMainCategoryByIdFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}
function* addMainCategory(action) {
  console.log('=========action.payload===========', action.payload);

  try {
    let params = {
      api: `${config.Ip}/mainCategory`,
      method: 'POST',
      successAction: actionType.addMainCategorySuccess(),
      failAction: actionType.addMainCategoryFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };

    let res = yield call(auth.basicApi, params);

    if (res) {
      // yield put(actionType.getCustomer());
      yield put({ type: actionType.getMainCategory().type });
      // yield put({ type: actionType.getCustomer().type });
      yield call(() => toast.success('Add Main Category  successful', { autoClose: 3000 }));
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateMainCategoryById(action) {
  console.log('================actin.up====================', action.payload);

  try {
    let params = {
      
      api:` ${config.Ip}/mainCategory/${action.payload.id}`,
      method: 'PATCH',
      successAction: actionType.updateMainCategorySuccess(),
      failAction: actionType.updateMainCategoryFail(),
      authourization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };

     yield call(auth.basicApi, params);
    yield call(() => toast.success('mainCategory Update successfully', { autoClose: 3000 }));

  } catch (error) {
    console.log(error);
  }
}

 


function* deleteMainCategory(action) {
  console.log(' payload============================', action.payload);
  try {
    let params = {
      api: `${config.Ip}/mainCategory/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteMainCategorySuccess(),
      failAction: actionType.deleteMainCategoryFail(),
      authourization: 'token',
      // body: JSON.stringify(action.payload),
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);
    yield call(() => toast.error(' Delete Main Category Successfully', { autoClose: 3000 }));
    if (res && res.status === 204) {
      // yield put({ type: actionType.getCountry().type });
       
      // yield put({
      //   type: actionType.totalCount().type,
      //   payload: { 'where=': {} }
      // });
    }
  } catch (error) {
    console.log(error);
  }
}


export default function* MainCategoryActionWatcher() {
  yield takeEvery('mainCategory/getMainCategory', fetchMainCategory);
  yield takeEvery('mainCategory/totalCount', fetchMainCategoryCount);
  yield takeEvery('mainCategory/addMainCategory', addMainCategory);
  yield takeEvery('mainCategory/getMainCategoryById', fetchMainCategoryById);
  yield takeEvery('mainCategory/updateMainCategory', updateMainCategoryById);
  yield takeEvery('mainCategory/deleteMainCategory', deleteMainCategory);
}
