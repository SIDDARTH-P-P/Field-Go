import {put,  call, takeEvery } from 'redux-saga/effects';
import config from 'config';
import auth from 'container/auth';

import * as actionType from './slice';


function* fetchDistrict() {


    try {
      

      let params = {
        api: `${config.Ip}/districts`,
        method: 'GET',
        successAction: actionType.getDistrictSuccess(),
        failAction: actionType.getDistrictFail(),
        authourization: 'token'
       
      };
      let res =yield call(auth.basicApi, params);
  
      console.log("========Districtdata=====", res);
    } catch (error) {
      console.log(error);
    }
  
  }



  function* fetchDistrictById(action) {
    const filter = action.payload;
    console.log('=============filterId=======================', filter);
    try {
      let params = {
        api:`${config.Ip}/districts/${action.payload}`,
        method: 'GET',
        successAction: actionType.getDistrictByIdSuccess(),
        failAction: actionType.getDistrictByIdFail(),
        authourization: 'token'
      };
      yield call(auth.basicApi, params);
    } catch (error) {
      console.log(error);
    }
  }


  
function* addDistrict(action) {
 

    console.log('=========action.payload===========', action.payload);


  try {
    let params = {
      api: `${config.Ip}/districts`,
      method: 'POST',
      successAction: actionType.addDistrictSuccess(),
      failAction: actionType.addDistrictFail(),
      authourization: 'token',
      body: JSON.stringify(action.payload)
    };

    let res = yield call(auth.basicApi, params);

 
    if(res){
      yield put({type:actionType.getDistrict().type});
      yield put ({
        type: actionType.districtCount().type,
        payload: {'where':{}}
      })
    }
  } catch (error) {
    console.log(error);
  }
}



function* updateDistrictById(action) {
  console.log('================actin.paylad====================', action.payload);

  try {
    let params = {
      api: `${config.Ip}/districts/${action.payload.id}`,
      method: 'PUT',
      successAction: actionType.updateDistrictSuccess(),
      failAction: actionType.updateDistrictFail(),
      authourization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);

    console.log('=================updateresponse===================', res);

  } catch (error) {
    console.log(error);
  }
}

function* fetchDistrictCount(action) {
  const filter = action.payload;
  try {
    let params = {
      api: `${config.ip}/districts/count?where=${JSON.stringify(filter)}`,      
      method: 'GET',
      successAction: actionType.districtCountSuccess(),
      failAction: actionType.districtCountFail(),
      authourization: 'token'
    };

    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}



function* deleteDistrict(action) {
  console.log(' payload============================', action.payload);
  try {
    let params = {
      api: `${config.Ip}/districts/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteDistrictSuccess(),
      failAction: actionType.deleteDistrictFail(),
      authourization: 'token',
      payload: action.payload
    };

    let res = yield call(auth.basicApi, params);
    console.log('====================================',res);

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

  export default function* DistrictActionWatcher() {
    yield takeEvery('districts/getDistrict', fetchDistrict);
     yield takeEvery('districts/addDistrict', addDistrict);
    yield takeEvery('districts/getDistrictById', fetchDistrictById);
    yield takeEvery('districts/updateDistrict', updateDistrictById);
    yield takeEvery('districts/districtCount', fetchDistrictCount);
    yield takeEvery('districts/deleteDistrict', deleteDistrict);
  }