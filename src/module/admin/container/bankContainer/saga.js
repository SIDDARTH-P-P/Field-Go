// import { takeEvery, call } from 'redux-saga/effects';
import 'react-toastify/dist/ReactToastify.css';
import { put, call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import config from 'config';
import auth from 'container/auth';

import * as actionType from './slice';

function* fetchBank() {
  try {
    // const filter = action.payload;
    // console.log("===========Customerdataaa=====",actionType.payload);
    //  let page = (filter && filter.page) || 1;
    //  console.log("pageeeeeeeeeeeee",page);
    //   let searchVal = (filter?.searchVal && filter?.searchVal) || '';
    //   let limit = (filter?.limit && filter?.limit) || 10;

    // console.log('++++++++++++++filtervalues++++++++++++', filter);
    let params = {
      api: `${config.Ip}/bank`,
      method: 'GET',
      successAction: actionType.getBankSuccess(),
      failAction: actionType.getBankFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}


function* fetchBankById(action) {
  const filter = action.payload;
  console.log('=============filterId=======================', filter);
  try {
    let params = {
      api: `${config.Ip}/bank/${action.payload}`,
      method: 'GET',
      successAction: actionType.getBankByIdSuccess(),
      failAction: actionType.getBankByIdFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* addBank(action) {
  console.log('=========action.payload===========', action.payload);

  try {
    let params = {
      api: `${config.Ip}/bank`,
      method: 'POST',
      successAction: actionType.addBankSuccess(),
      failAction: actionType.addBankFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };

    let res = yield call(auth.basicApi, params);

    if (res) {
      // yield put(actionType.getCustomer());
      yield put({ type: actionType.getBank().type });
      // yield put({ type: actionType.getCustomer().type });
      yield call(() => toast.success('Add Bank  successful', { autoClose: 3000 }));
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateBankById(action) {
  console.log('================actin.paylad====================', action.payload);

  try {
    let params = {
      api: `${config.Ip}/bank/${action.payload.id}`,
      method: 'PUT',
      successAction: actionType.updateBankSuccess(),
      failAction: actionType.updateBankFail(),
      authourization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);
    
    yield call(() => toast.success('Edit successful', { autoClose: 2000 }));
    console.log('=================updateresponse===================', res);
    yield put(getBank());

  } catch (error) {
    console.log(error);
  }
}

function* deleteBank(action) {
  console.log(' payload============================', action.payload);
  try {
    let params = {
      api: `${config.Ip}/bank/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteBankSuccess(),
      failAction: actionType.deleteBankFail(),
      authourization: 'token',
      // body: JSON.stringify(action.payload),
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);
    yield call(() => toast.error(' Delete Successfully', { autoClose: 3000 }));

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

export default function* BankActionWatcher() {
  yield takeEvery('bank/getBank', fetchBank);
  yield takeEvery('bank/addBank', addBank);
  yield takeEvery('bank/getBankById', fetchBankById);
  yield takeEvery('bank/updateBank', updateBankById);
  yield takeEvery('bank/deleteBank', deleteBank)
}