import { all, call } from 'redux-saga/effects';
import UserActionWatcher from '../container/userContainer/saga';
import CustomerActionWatcher from '../container/customerContainer/saga';
 import SupportActionWatcher from '../container/supportContainer/saga';
import SupportTypeActionWatcher from '../container/supportTypeContainer/saga';
import ProfileActionWatcher from '../container/profile/profile/saga';
import TaskTypeActionWatcher from '../container/taskTypeContainer/saga';
import TaskCategoryActionWatcher from '../container/taskCategoryContainer/saga';
import ActivityActionWatcher from '../container/activityContainer/saga';
import ActivityTypeActionWatcher from '../container/activityTypeContainer/saga';
import ActivityCategoryActionWatcher from '../container/activityCategoryContainer/saga';
// import BankActionWatcher from '../container/bankContainer/saga';

function* vendorSaga() {
  yield all([
     call(CustomerActionWatcher),  
    call(UserActionWatcher),
    call(SupportActionWatcher),
    call(SupportTypeActionWatcher),
    call(ProfileActionWatcher),
    call(TaskTypeActionWatcher),
    call(TaskCategoryActionWatcher),
    call(ActivityActionWatcher),
    call(ActivityTypeActionWatcher),
    call(ActivityCategoryActionWatcher),
    // call(BankActionWatcher)
  ]);
    
 


}

export default vendorSaga;



