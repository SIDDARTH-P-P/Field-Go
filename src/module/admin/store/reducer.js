import { combineReducers } from 'redux';

import stateReducer from "../container/stateContainer/slice";
import countryReducer from '../container/countryContainer/slice';

import bankReducer from '../container/bankContainer/slice';
import supportTypeReducer from '../container/supportTypeContainer/slice';

import districtReducer from '../container/districtContainer/slice';

import enqsourceReducer from "../container/enqSourceContainer/slice";
import enqmodeReducer from '../container/enqModeContainer/slice'
// ==============================|| COMBINE REDUCER ||============================== //

const adminReducer = combineReducers({
  
  bank:bankReducer,
  supportType:supportTypeReducer,

  enqmode: enqmodeReducer,
  enqsource: enqsourceReducer,
  district: districtReducer ,
  state: stateReducer,
  country: countryReducer,
});

export default adminReducer;
