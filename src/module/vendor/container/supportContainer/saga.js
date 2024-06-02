import { put, call, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import config from 'config';
import auth from 'container/auth';
 
import * as actionType from './slice';

function* fetchSupport() {
  try {
    // const filter = action.payload;
    // console.log("===========Customerdataaa=====",actionType.payload);
    //  let page = (filter && filter.page) || 1;
    //  console.log("pageeeeeeeeeeeee",page);
    //   let searchVal = (filter?.searchVal && filter?.searchVal) || '';
    //   let limit = (filter?.limit && filter?.limit) || 10;

    // console.log('++++++++++++++filtervalues++++++++++++', filter);
    let params = {
      api:`${config.Ip}/support`,
      method: 'GET',
      successAction: actionType.getSupportSuccess(),
      failAction: actionType.getSupportFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* fetchSupportCount(action) {
  const filter = action.payload;
  console.log('=============filter=======================', filter);

  try {
    let params = {
      api: `${config.Ip}/support/count?where=${JSON.stringify(filter)}`,
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



function* fetchSupportById(action) {
  const filter = action.payload;
  console.log('=============filterId=======================', filter);
  try {
    let params = {
      api: `${config.Ip}/support/${action.payload}`,
      method: 'GET',
      successAction: actionType.getSupportByIdSuccess(),
      failAction: actionType.getSupportByIdFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* addSupport(action) {
  console.log('=========action.payload===========', action.payload);

  try {
    let params = {
      api: `${config.Ip}/support`,
      method: 'POST',
      successAction: actionType.addSupportSuccess(),
      failAction: actionType.addSupportFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };

    let res = yield call(auth.basicApi, params);

    if (res) {
      // yield put(actionType.getCustomer());
      yield put({ type: actionType.getSupport().type });
      // yield put({ type: actionType.getCustomer().type });
      yield call(() => toast.success('Support Added  Successfully', { autoClose: 3000 }));
    }
  } catch (error) {
    console.log(error);
  }
}

// updateSupportById saga


function* updateSupportById(action) {
  try {
    const id = action.payload.id;
    console.log('===id==', id);

    let params = {
      api: `${config.Ip}/support/${id}`,
      method: 'PUT',
      successAction: actionType.updateSupportSuccess(),
      failAction: actionType.updateSupportFail(),
      authorization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };

    yield call(auth.basicApi, params);
    yield put({ type: actionType.getSupport().type });
    yield call(() => toast.success('Support Update successful', { autoClose: 3000 }));

  } catch (error) {
    console.log(error);
  }
}



// function* updateSupportById(action) {
//   console.log('actionaction',action);
//   try {
//     const { id, ...data } = action.payload; // Extract id and other data from payload
//     console.log('actionwwwwwwwwwpayload',...data);
   
//     let params = {
//       api: ${config.Ip}/support/${id}, // Use extracted id
//       method: 'PUT',
//       successAction: { type: actionType.updateSupportSuccess.type, payload: action.payload }, // Pass type and payload to successAction
//       failAction: actionType.updateSupportFail(),
//       authourization: 'token',
//       body: JSON.stringify(data), // Use only data, not the entire payload
//       payload: action.payload
//     };
//     yield call(auth.basicApi, params);
//     yield call(() => toast.success('Support Edited successfully', { autoClose: 2000 }));
//     yield put(getSupport());
//   } catch (error) {
//     console.log(error);
//   }
// }

// function* updateSupportById(action) {
//   console.log('================actin.up====================', action.payload);

//   try {
//     let params = {
      
//       api:` ${config.Ip}/support/${action.payload.id}`,
//       method: 'PUT',
//       successAction: actionType.updateSupportSuccess(),
//       failAction: actionType.updateSupportFail(),
//       authourization: 'token',
//       body: JSON.stringify({ ...action.payload, id: undefined }),
//       payload: action.payload
//     };

//      yield call(auth.basicApi, params);
//     yield call(() => toast.success('Customers Update successful', { autoClose: 3000 }));

//   } catch (error) {
//     console.log(error);
//   }
// }
function* deleteSupport(action) {
  console.log(' payload============================', action.payload);
  try {
    let params = {
      api: `${config.Ip}/support/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteSupportSuccess(),
      failAction: actionType.deleteSupportFail(),
      authourization: 'token',
       payload: action.payload
    };

    yield call(auth.basicApi, params);
    yield put({ type: actionType.getSupport().type });
    yield call(() => toast.error('Support Deleted  Successfully', { autoClose: 3000 }));

    
  } catch (error) {
    yield call(() => toast.error('Support Deleted  Error', { autoClose: 3000 }));

    console.log(error);
  }
}

export default function* SupportActionWatcher() {
  yield takeEvery('support/getSupport', fetchSupport);
  yield takeEvery('support/totalCount', fetchSupportCount)
  yield takeEvery('support/addSupport', addSupport);
  yield takeEvery('support/getSupportById', fetchSupportById);
  yield takeEvery('support/updateSupport', updateSupportById);
  yield takeEvery('support/deleteSupport', deleteSupport)
}