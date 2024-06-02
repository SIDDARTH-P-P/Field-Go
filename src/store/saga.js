import { all, call } from 'redux-saga/effects';

import LoginActionWatcher from 'container/LoginContainer/saga';
import CountryActionWatcher from 'module/admin/store/saga';
  // import userActionWatcher from 'module/vendor/store/saga';
//-- import CustomerActionWatcher from 'module/vendor/store/saga'
 import vendorSaga from 'module/vendor/store/saga'
 import licenseeSaga from 'module/licensee/store/saga'
//  import SupportActionWatcher from 'module/vendor/container/supportContainer/saga';
//  import SupportTypeActionWatcher from 'module/vendor/container/supportTypeContainer/saga';
//  import ProfileActionWatcher from 'module/vendor/container/profile/saga'; 

function* rootSaga() {
  yield all([call(LoginActionWatcher), call(CountryActionWatcher), call(vendorSaga), call(licenseeSaga)
    //  call(userActionWatcher), 
    //  call(CustomerActionWatcher), 
    //  call(SupportActionWatcher),
    //  call(SupportTypeActionWatcher),
    //  call(ProfileActionWatcher)
    ]);
}

export default rootSaga;
