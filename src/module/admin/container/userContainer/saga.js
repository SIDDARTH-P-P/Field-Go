// import { takeEvery, call } from 'redux-saga/effects';
// import 'react-toastify/dist/ReactToastify.css';
// import config from 'config';
// import auth from 'container/auth';

// import * as actionType from './slice';


// function* fetchUser(action) {
//     try {
//       const filter = action.payload;
  
//      let page = (filter && filter.page) || 1;
//      console.log("pageeeeeeeeeeeee",page);
//       let searchVal = (filter?.searchVal && filter?.searchVal) || '';
//       let limit = (filter?.limit && filter?.limit) || 10;
  
//       console.log('++++++++++++++filtervalues++++++++++++', filter);
//       let params = {
//         api: `${config.Ip}/users?&limit=${limit}&page=${page}&q=${searchVal}`,
//         method: 'GET',
//         successAction: actionType.getUserSuccess(),
//         failAction: actionType.getUserFail(),
//         authourization: 'token'
//       };
//       let res =yield call(auth.basicApi, params);
  
//       console.log("finshi", res);
//     } catch (error) {
//       console.log(error);
//     }
  
//   }

//   export default function* UserActionWatcher() {
//     yield takeEvery('user/getUser', fetchUser);
//   }
  