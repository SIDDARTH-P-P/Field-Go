// // import { takeEvery, call } from 'redux-saga/effects';
// // import 'react-toastify/dist/ReactToastify.css';
// import {  call, takeEvery } from 'redux-saga/effects';
 
// import config from 'config';
// import auth from 'container/auth';

// import * as actionType from './slice';

// function* fetchSupportType() {
//   try {
 
//     let params = {
//       api: `${config.Ip}/supportType`,
//       method: 'GET',
//       successAction: actionType.getSupportTypeSuccess(),
//       failAction: actionType.getSupportTypeFail(),
//       authourization: 'token'
//     };
//     yield call(auth.basicApi, params);
//   } catch (error) {
//     console.log(error);
//   }
// }

// export default function* SupportTypeActionWatcher(){
//     yield takeEvery('supportType/getSupportType', fetchSupportType)
// }


import 'react-toastify/dist/ReactToastify.css';
import { put, call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import config from 'config';
import auth from 'container/auth';

import * as actionType from './slice';

function* fetchSupportType() {
  try {
    // const filter = action.payload;
    // console.log("===========Customerdataaa=====",actionType.payload);
    //  let page = (filter && filter.page) || 1;
    //  console.log("pageeeeeeeeeeeee",page);
    //   let searchVal = (filter?.searchVal && filter?.searchVal) || '';
    //   let limit = (filter?.limit && filter?.limit) || 10;

    // console.log('++++++++++++++filtervalues++++++++++++', filter);
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

function* fetchSupportTypeCount(action) {
  const filter = action.payload;
  console.log('=============filter=======================', filter);

  try {
    let params = {
      api: `${config.Ip}/supportType/count?where=${JSON.stringify(filter)}`,
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

function* fetchSupportTypeById(action) {
  const filter = action.payload;
  console.log('=============filterId=======================', filter);
  try {
    let params = {
      api: `${config.Ip}/supportType/${action.payload}`,
      method: 'GET',
      successAction: actionType.getSupportTypeByIdSuccess(),
      failAction: actionType.getSupportTypeByIdFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}
function* addSupportType(action) {
  console.log('=========action.payload===========', action.payload);

  try {
    let params = {
      api: `${config.Ip}/supportType`,
      method: 'POST',
      successAction: actionType.addSupportTypeSuccess(),
      failAction: actionType.addSupportTypeFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };

    let res = yield call(auth.basicApi, params);

    if (res) {
      // yield put(actionType.getCustomer());
      yield put({ type: actionType.getSupportType().type });
      // yield put({ type: actionType.getCustomer().type });
      yield call(() => toast.success('Add Supporttype  successful', { autoClose: 3000 }));
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateSupportTypeById(action) {
  console.log('================actin.paylad====================', action.payload);

  try {
    let params = {
      api: `${config.Ip}/supportType/${action.payload.id}`,
      method: 'PUT',
      successAction: actionType.updateSupportTypeSuccess(),
      failAction: actionType.updateSupportTypeFail(),
      authourization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);
 
  yield call(() => toast.success('Edit Supporttypeeeeeee  successful', { autoClose: 2000 }));
    console.log('=================updateresponse===================', res);
    yield put(getSupportType());

  } catch (error) {
    console.log(error);
  }
}

// function* updateSupportTypeById(action) {
//   console.log('================actin.paylad====================', action.payload);

//   try {
//     let params = {
//       api: `${config.Ip}/supportType/${action.payload.id}`,
//       method: 'PUT',
//       successAction: actionType.updateSupportTypeSuccess(),
//       failAction: actionType.updateSupportTypeFail(),
//       authourization: 'token',
//       body: JSON.stringify({ ...action.payload, id: undefined }),
//       payload: action.payload
//     };

//     let res = yield call(auth.basicApi, params);
//     if (res && res.status === 200) {
//       yield call(() => toast.success('Edited supporttype successful', { autoClose: 3000 }));
//       // Dispatch success action
//       yield put({ type: 'UPDATE_SUPPORT_TYPE_SUCCESS' });
//     } else {
//       // Dispatch failure action
//       yield put({ type: 'UPDATE_SUPPORT_TYPE_FAIL' });
//     }
//     console.log('=================updateresponse===================', res);
//   } catch (error) {
//     console.log(error);
//     // Dispatch failure action
//     yield put({ type: 'UPDATE_SUPPORT_TYPE_FAIL' });
//   }
// }



function* deleteSupportType(action) {
  console.log(' payload============================', action.payload);
  try {
    let params = {
      api: `${config.Ip}/supportType/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteSupportTypeSuccess(),
      failAction: actionType.deleteSupportTypeFail(),
      authourization: 'token',
      // body: JSON.stringify(action.payload),
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);
    yield call(() => toast.error(' Delete SupportType Successfully', { autoClose: 3000 }));
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


export default function* SupportTypeActionWatcher() {
  yield takeEvery('supportType/getSupportType', fetchSupportType);
  yield takeEvery('supportType/totalCount', fetchSupportTypeCount);
  yield takeEvery('supportType/addSupportType', addSupportType);
  yield takeEvery('supportType/getSupportTypeById', fetchSupportTypeById);
  yield takeEvery('supportType/updateSupportType', updateSupportTypeById);
  yield takeEvery('supportType/deleteSupportType', deleteSupportType);
}
