import { all, call } from 'redux-saga/effects';
import UserActionWatcher from '../container/userContainer/saga';
import CustomerActionWatcher from '../container/customerContainer/saga';
 import SupportActionWatcher from '../container/supportContainer/saga';
import SupportTypeActionWatcher from '../container/supportTypeContainer/saga';
import ProfileActionWatcher from '../container/profile/profile/saga';
// import BankActionWatcher from '../container/bankContainer/saga';

function* vendorSaga() {
  yield all([
     call(CustomerActionWatcher),  
    call(UserActionWatcher),
    call(SupportActionWatcher),
    call(SupportTypeActionWatcher),
    call(ProfileActionWatcher),
    // call(BankActionWatcher)
  ]);
    
 


}

export default vendorSaga;



