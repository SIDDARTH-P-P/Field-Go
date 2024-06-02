

import 'react-toastify/dist/ReactToastify.css';
import { put, call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import config from 'config';
import auth from 'container/auth';

import * as actionType from './slice';

function* fetchCategory() {
  try {

    let params = {
      api: `${config.Ip}/category`,
      method: 'GET',
      successAction: actionType.getCategorySuccess(),
      failAction: actionType.getCategoryFail(),
      authourization: 'token'
    };
    let cat = yield call(auth.basicApi, params);
    
    console.log("=========CategoryData=========",cat);
  } catch (error) {
    console.log(error);
  }
}

function* fetchCategoryCount(action) {
  const filter = action.payload;
  console.log('=============filter=======================', filter);

  try {
    let params = {
      api: `${config.Ip}/category/count?where=${JSON.stringify(filter)}`,
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

function* fetchCategoryById(action) {
  const filter = action.payload;
  console.log('=============filterId=======================', filter);
  try {
    let params = {
      api: `${config.Ip}/category/${action.payload}`,
      method: 'GET',
      successAction: actionType.getCategoryByIdSuccess(),
      failAction: actionType.getCategoryByIdFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}
function* addCategory(action) {
  console.log('=========action.payload===========', action.payload);

  try {
    let params = {
      api: `${config.Ip}/category`,
      method: 'POST',
      successAction: actionType.addCategorySuccess(),
      failAction: actionType.addCategoryFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };

    let res = yield call(auth.basicApi, params);

    if (res) {
      // yield put(actionType.getCustomer());
      yield put({ type: actionType.getCategory().type });
      // yield put({ type: actionType.getCustomer().type });
      yield call(() => toast.success('Add Category  successful', { autoClose: 3000 }));
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateCategoryById(action) {
  console.log('================actin.up====================', action.payload);

  try {
    let params = {
      
      api:` ${config.Ip}/category/${action.payload.id}`,
      method: 'PATCH',
      successAction: actionType.updateCategorySuccess(),
      failAction: actionType.updateCategoryFail(),
      authourization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };

     yield call(auth.basicApi, params);
    yield call(() => toast.success('Category Update successfully', { autoClose: 3000 }));

  } catch (error) {
    console.log(error);
  }
}

function* deleteCategory(action) {
  console.log(' payload============================', action.payload);
  try {
    let params = {
      api: `${config.Ip}/category/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteCategorySuccess(),
      failAction: actionType.deleteCategoryFail(),
      authourization: 'token',
      // body: JSON.stringify(action.payload),
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);
    yield call(() => toast.error(' Delete  Category Successfully', { autoClose: 3000 }));
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


export default function* CategoryActionWatcher() {
  yield takeEvery('category/getCategory', fetchCategory);
  yield takeEvery('category/totalCount', fetchCategoryCount);
  yield takeEvery('category/addCategory', addCategory);
  yield takeEvery('category/getCategoryById', fetchCategoryById);
  yield takeEvery('category/updateCategory', updateCategoryById);
  yield takeEvery('category/deleteCategory', deleteCategory);
}
