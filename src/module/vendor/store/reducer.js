import { combineReducers } from 'redux';
import customerReducer from '../container/customerContainer/slice';
import userReducer from '../container/userContainer/slice';

import supportReducer from '../container/supportContainer/slice';
import supportTypeReducer from '../container/supportTypeContainer/slice';

import profileReducer from '../container/profile/profile/slice';

 // import bankReducer from '../container/bankContainer/slice'

// ==============================|| COMBINE REDUCER ||============================== //

const vendorReducer = combineReducers({
  user: userReducer,
  customers: customerReducer,
  support: supportReducer,
  supportType: supportTypeReducer,
  profile: profileReducer,
   // bank:bankReducer,
  
});

export default vendorReducer;
