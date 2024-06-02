import { takeEvery, call, put } from 'redux-saga/effects';
import 'react-toastify/dist/ReactToastify.css';
import config from 'config';
import auth from 'container/auth';
import * as actionType from './slice';
import { toast } from 'react-toastify';

 

function* fetchUser() {
  try {
    const userString = localStorage.getItem('user');

    if (userString) {
      const userObject = JSON.parse(userString);
      const orgId = userObject.user.orgId;

      if (orgId) {
        let params = {
          api: `${config.Ip}/users?orgId=${orgId}`,
          method: 'GET',
          successAction: actionType.getUserSuccess(),
          failAction: actionType.getUserFail(),
          authourization: 'token'
        };
        yield call(auth.basicApi, params);
      } else {
        yield call(() => toast.error('orgId not found in user object', { autoClose: 3000 }));

        throw new Error('orgId not found in user object');
      }
    } else {
      throw new Error('User object not found in localStorage');
    }
  } catch (error) {
    console.log('Error fetching user:', error);
  }
}
 

function* fetchUserCount() {
  try {
    let params = {
      api: `${config.Ip}/users/count`,
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

function* fetchUserById(action) {
  const filter = action.payload;
  console.log('=============filterId=======================', filter);
  try {
    let params = {
      api: `${config.Ip}/users/${action.payload}`,
      method: 'GET',
      successAction: actionType.getUserByIdSuccess(),
      failAction: actionType.getUserByIdFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

function* addUser(action) {
  try {
    const params = {
      api:` ${config.Ip}/users/createUser`,
      method: 'POST',
      successAction: actionType.addUserSuccess(),
      failAction: actionType.addUserFail(),
      authorization: 'token',
      body: JSON.stringify(action.payload)
    };
    let res = yield call(auth.basicApi, params);
     if(res){
      yield put({type:actionType.getUser().type});
      yield call(() => toast.success('Add successful', { autoClose: 3000 }));
      yield put ({
        type: actionType.totalCount().type,
        payload: {'where':{}}
      })
    }
  } catch (error) {
    console.log(error);
  }
}
 
function* updateUserById(action) {
  console.log('================actin.up====================', action.payload);

  try {
    let params = {
      api: `${config.Ip}/users/${action.payload.id}`,
      method: 'PUT',  
      successAction: actionType.updateUserSuccess(),
      failAction: actionType.updateUserFail(),
      authourization: 'token',
      body: JSON.stringify({ ...action.payload, id: undefined }),
      payload: action.payload
    };

    yield call(auth.basicApi, params);
    yield call(() => toast.success('MyTeam Update successful', { autoClose: 3000 }));
  } catch (error) {
    console.log(error);
  }
}

// function* updateUserById(action) {
 
//   try {
//     let params = {
//       api: ${config.Ip}/users/${action.payload.id},
//       method: 'PATCH',
//       successAction: actionType.updateUserSuccess(),
//       failAction: actionType.updateUserFail(),
//       authourization: 'token',
//       body: JSON.stringify({ ...action.payload, id: undefined }),
//       payload: action.payload
//     };

//     yield call(auth.basicApi, params);

 
   
//   } catch (error) {
//     console.log(error);
//   }
// }





function* deleteUser(action) {
  console.log(' payload kuttan============================', action.payload);
  try {
    let params = {
      api:` ${config.Ip}/users/${action.payload}`,
      method: 'DELETE',
      successAction: actionType.deleteUserSuccess(action.payload), 
      failAction: actionType.deleteUserFail(action.payload.message),
      authourization: 'token',
      payload: action.payload
    };

    yield call(auth.basicApi, params);
    yield put({ type: actionType.getUser().type });
    yield call(() => toast.error('Deleted Successfully', { autoClose: 3000 }));  

  } catch (error) {
    // Handle error if deletion fails
    console.log(error);
  }
}


// function* deleteUser(action) {
//   console.log(' payload kuttan============================', action.payload);
//   try {
//     let params = {
//       api: ${config.Ip}/users/${action.payload},
//       method: 'DELETE',
//       successAction: actionType.deleteUserSuccess(),
//       failAction: actionType.deleteUserFail(),
//       authourization: 'token',
//        payload: action.payload
//     };

//     yield call(auth.basicApi, params);
//     yield put({ type: actionType.getUser().type });
//     yield call(() => toast.error(' Deleted  Successfully', { autoClose: 3000 }));

    
//   } catch (error) {
//     // yield call(() => toast.error(' Deleted  Error', { autoClose: 3000 }));

//     console.log(error);
//   }
// }

// function* deleteUser(action) {
//    try {
//     const params = {
//       api: ${config.Ip}/users/${action.payload},
//       method: 'DELETE',
//       successAction: actionType.deleteUserSuccess(action.payload),  
//       failAction: actionType.deleteUserFail(),
//       authorization: 'token',
//     };
//     const res = yield call(auth.basicApi, params);

//     if (res && res.status === 204) {
//       yield put(actionType.getUser()); 
//       yield call(() => toast.success('User deleted successfully', { autoClose: 3000 }));
//       yield put(actionType.totalCount()); 
//     }
//   } catch (error) {
//     toast.error('Failed to delete user', { autoClose: 3000 });
//     console.log(error);
//   }
// }

// function* deleteUser(action) {
//   try {
//     console.log("===user action delete ===", action.payload);

//     const params = {
//       api: ${config.Ip}/users/${action.payload},
//       method: 'DELETE',
//       successAction: actionType.deleteUserSuccess(), 
//       failAction:actionType.deleteUserFail(),
//       authorization: 'token',
//     };
//     const res = yield call(auth.basicApi, params);

//     if (res && res.status === 204) {
//       yield put(getUser()); c
//       toast.success('User deleted successfully', { autoClose: 3000 }); c
//       yield put(totalCount()); 
//     }
//   } catch (error) {
//     toast.error('Failed to delete user', { autoClose: 3000 });  
//     console.log(error);
//   }
// }


function* fetchUserMe() {
  try {
    let params = {
      api: `${config.Ip}/users/me`,
      method: 'GET',
      successAction: actionType.getUserMeSuccess(),
      failAction: actionType.getUserMeFail(),
      authourization: 'token'
    };
    yield call(auth.basicApi, params);
  } catch (error) {
    console.log(error);
  }
}

export default function* UserActionWatcher() {
  yield takeEvery('user/getUser', fetchUser);
  yield takeEvery('user/addUser', addUser);
  yield takeEvery('user/totalCount', fetchUserCount);
  yield takeEvery('user/getUserById', fetchUserById);
  yield takeEvery('user/updateUser', updateUserById);
  yield takeEvery('user/deleteUser', deleteUser);
   yield takeEvery('user/getUserMe', fetchUserMe);
}