import { takeEvery, call, put } from 'redux-saga/effects';

// thirdparty
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import auth from 'container/auth';
import config from '../../config';
import { loginSuccess, loginFail, loginUserSuccess, loginUser, loginUserFail } from './slice';

function* login(action) {
  console.log('======action======', action.payload);

  try {
    // console.log('======authHeader======', authHeader);
    const response = yield fetch(`${config.Ip}/auth`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(`${action.payload.mobileNo}:${action.payload.password}`)
      }
    });

    if (!response.ok) {
      throw response;
    } else {
   
      const resJSON = yield response.json();
      console.log('===============resJSON=====================', resJSON);

      yield localStorage.setItem(process.env.REACT_APP_TOKEN, resJSON.token);
      yield put({
        type: `${loginSuccess().type}`,
        payload: resJSON
      });
      yield put({
        type: loginUser().type,
        payload: action.payload
      });

    }
  } catch (error) {
    console.error('error', error);
    yield put(loginFail('Login failed. Please try again.'));
  }
}

function* loginUserDetail(action) {
  try {
    let params = {
      api: `${config.Ip}/users/me`,
      method: 'GET',
      successAction: loginUserSuccess(),
      failAction: loginUserFail('Login failed. Please try again.'),
      authourization: 'token'
    };

    let res = yield call(auth.basicApi, params);

    if ((res && res.role === 'customer') || res.role === 'vendor' || res.role === 'licensee' || res.role === 'admin') {
      let user = {
        user: res
      };
      console.log('======res.role==========', res.role);
      yield localStorage.setItem(process.env.REACT_APP_LOGINUSER, JSON.stringify(user));
      yield action.payload.navigate('/dashboard');

      yield toast.success('Login successfully', {
        autoClose: 3000
      });
    } else {
      yield toast.error('Invalid User', {
        autoClose: 3000
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* LoginActionWatcher() {
  yield takeEvery('login/userLogin', login);
  yield takeEvery('login/loginUser', loginUserDetail);
}
