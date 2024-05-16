// import { takeEvery, call } from 'redux-saga/effects';
// import 'react-toastify/dist/ReactToastify.css';
import {  call, takeEvery } from 'redux-saga/effects';
 
import config from 'config';
import auth from 'container/auth';

import * as actionType from './slice';

function* fetchSupportType() {
  try {
 
    let params = {
      api: `${config.Ip}/supportType`,
      method: 'GET',
      successAction: actionType.getSupportTypeSuccess(),
      failAction: actionType.getSupportTypeFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

export default function* SupportTypeActionWatcher(){
    yield takeEvery('supportType/getSupportType', fetchSupportType)
}