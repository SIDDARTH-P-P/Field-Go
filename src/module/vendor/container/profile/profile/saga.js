import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import config from 'config';
import auth from 'container/auth';
import * as actionType from './slice';

// GET
function* fetchProf() {
  try {
    let params = {
      api: `${config.Ip}/userProf`,
      method: 'GET',
      successAction: actionType.getProfileSuccess,
      failAction: actionType.getProfileFail,
      authorization: 'token' // Fix typo: 'authourization' -> 'authorization'
    };

    let res = yield call(auth.basicApi, params);
    yield put(actionType.getProfileSuccess(res.data)); // Pass data to getProfileSuccess
  } catch (error) {
    yield put(actionType.getProfileFail(error.message)); // Pass error message to getProfileFail
  }
}

// Add Profile
function* addProfile(action) {
  try {
    let params = {
      api: `${config.Ip}/userProf`,
      method: 'POST',
      successAction: actionType.addProfileSuccess,
      failAction: actionType.addProfileFail,
      authorization: 'token',
      body: JSON.stringify(action.payload)
    };
    let res = yield call(auth.basicApi, params);
    if (res) {
      yield put(actionType.getProfile()); // Trigger fetching profile after adding
      yield call(() => toast.success('Add Profile successful', { autoClose: 3000 }));
    }
  } catch (error) {
    yield put(actionType.addProfileFail(error.message));
  }
}

// Get Profile by ID
function* fetchProfById(action) {
  const { userId } = action.payload;
  try {
    let params = {
      api: `${config.Ip}/userProf/${userId}`,
      method: 'GET',
      successAction: actionType.getProfileByIdSuccess,
      failAction: actionType.getProfileByIdFail,
      authorization: 'token'
    };
    const res = yield call(auth.basicApi, params);
    yield put(actionType.getProfileByIdSuccess(res.data)); // Pass data to getProfileByIdSuccess
  } catch (error) {
    yield put(actionType.getProfileByIdFail(error.message));
  }
}

// Update profile
function* updateProfileById(action) {
  const { userId, profileData } = action.payload;
  try {
    let params = {
      api: `${config.Ip}/userProf/${userId}`,
      method: 'PUT',
      successAction: actionType.updateProfileSuccess,
      failAction: actionType.updateProfileFail,
      authorization: 'token',
      body: JSON.stringify(profileData)
    };
    let res = yield call(auth.basicApi, params);
    if (res.success) {
      yield put(actionType.updateProfileSuccess(res.data));
    } else {
      yield put(actionType.updateProfileFail(res.error));
    }
  } catch (error) {
    yield put(actionType.updateProfileFail(error.message));
  }
}

export default function* ProfileActionWatcher() {
  yield takeEvery(actionType.getProfile, fetchProf);
  yield takeEvery(actionType.addProfile, addProfile);
  yield takeEvery(actionType.getProfileById, fetchProfById);
  yield takeEvery(actionType.updateProfile, updateProfileById);
}
