import { combineReducers } from 'redux';
import customerReducer from '../container/customerContainer/slice';
import userReducer from '../container/userContainer/slice';

import supportReducer from '../container/supportContainer/slice';
import supportTypeReducer from '../container/supportTypeContainer/slice';

import profileReducer from '../container/profile/profile/slice';
import taskTypeReducer from "../container/taskTypeContainer/slice"
import taskCategoryReducer from "../container/taskCategoryContainer/slice"
import activityReducer from "../container/activityContainer/slice"
import activityTypeReducer from "../container/activityTypeContainer/slice"
import activityCategoryReducer from "../container/activityCategoryContainer/slice"

 // import bankReducer from '../container/bankContainer/slice'

// ==============================|| COMBINE REDUCER ||============================== //

const vendorReducer = combineReducers({
  user: userReducer,
  customers: customerReducer,
  support: supportReducer,
  supportType: supportTypeReducer,
  profile: profileReducer,
  taskType:taskTypeReducer,
  taskCategory:taskCategoryReducer,
  activity:activityReducer,
  activityType:activityTypeReducer,
  activityCategory:activityCategoryReducer,
   // bank:bankReducer,
  
});

export default vendorReducer;
