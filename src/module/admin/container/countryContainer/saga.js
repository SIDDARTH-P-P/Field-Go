import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from 'config';
import auth from 'container/auth';

import * as actionType from './slice';
// import { ConstructionOutlined } from '@mui/icons-material';

function* fetchCountry(action) {
  try {
    const filter = action.payload;
    console.log("========filter=======", filter)

   let page = (filter && filter.page) || 1;
   console.log("page",page);
    let searchVal = (filter?.searchVal && filter?.searchVal) || '';
    let limit = (filter?.limit && filter?.limit) || 10;

    console.log('++++++++++++++filtervakues++++++++++++', filter);
    let params = {
      api: `${config.Ip}/country?&limit=${limit}&page=${page}&q=${searchVal}`,
      method: 'GET',
      successAction: actionType.getCountrySuccess(),
      failAction: actionType.getCountryFail(),
      authourization: 'token'
    };
  yield call(auth.basicApi, params);


  } catch (error) {
    console.log(error);
  }

}



function* fetchCountryCount(action) {
  const filter = action.payload;
  console.log('=============filter=======================', filter);

  try {
    let params = {
      api: `${config.Ip}/country/count?where=${JSON.stringify(filter)}`,
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

function* fetchCountryById(action) {
  const filter = action.payload;
  console.log('=============filterId=======================', filter);
  try {
    let params = {
      api: `${config.Ip}/country/${action.payload}`,
      method: 'GET',
      successAction: actionType.getCountryByIdSuccess(),
      failAction: actionType.getCountryByIdFail(),
      authourization: 'token'
    };
   yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* addCountry(action) {
  console.log('=========action.payload user===========', action.payload);
   console.log("========jsonpayload=========",JSON.stringify(action.payload))

  try {
    let params = {
      api: `${config.Ip}/country`,
      method: 'POST',
      successAction: actionType.addCountrySuccess(),
      failAction: actionType.addCountryFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };
    let res = yield call(auth.basicApi, params);

    console.log('=========res user===========', res);

    if (res) {
      yield put({ type: actionType.getCountry().type });
      yield call(() => toast.success('Add Country  successful', { autoClose: 3000 }));

      // yield put({
      //   type: actionType.totalCount().type,
      //   payload: { 'where=': {} }
      // });
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateCountryById(action) {
  console.log('================actin.paylad====================', action.payload);

  try {
    let params = {
      api: `${config.Ip}/country/${action.payload.id}`,
      method: 'PATCH',
      successAction: actionType.updateCountrySuccess(),
      failAction: actionType.updateCountryFail(),
      authourization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);

    console.log('=================updateresponse===================', res);

    if (res && res.status === 204) {
     //    yield put({ type: actionType.getCountry().type });
    //  yield call(() => toast.success('Update is successful', { autoClose: 3000 }));
    }
  } catch (error) {
    console.log(error);
  }
}

function* deleteCountry(action) {
  console.log(' payload============================', action.payload);
  try {
    let params = {
      api: `${config.Ip}/country/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteCountrySuccess(),
      failAction: actionType.deleteCountryFail(),
      authourization: 'token',
      // body: JSON.stringify(action.payload),
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);

    console.log("====delted=======",res);

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

export default function* CountryActionWatcher() {
  yield takeEvery('country/getCountry', fetchCountry);
  yield takeEvery('country/totalCount', fetchCountryCount);
  yield takeEvery('country/addCountry', addCountry);
  yield takeEvery('country/getCountryById', fetchCountryById);
  yield takeEvery('country/updateCountry', updateCountryById);
  yield takeEvery('country/deleteCountry', deleteCountry);
}
