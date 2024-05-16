import { all, call } from 'redux-saga/effects';

import CountryActionWatcher from '../container/countryContainer/saga';
import BankActionWatcher from '../container/bankContainer/saga';
import SupportTypeActionWatcher from '../container/supportTypeContainer/saga'
import StateActionWatcher from '../container/stateContainer/saga';
import EnqsourceActionWatcher from '../container/enqSourceContainer/saga';
import EnqmodeActionWatcher from '../container/enqModeContainer/saga';
import DistrictActionWatcher from '../container/districtContainer/saga';

function* adminSaga() {
  yield all([
    call(CountryActionWatcher),
    call(StateActionWatcher),

    
    call(BankActionWatcher),
    call(SupportTypeActionWatcher),

    call(DistrictActionWatcher),
   
    call(EnqsourceActionWatcher),
    call(EnqmodeActionWatcher)
  
  ]);
}

export default adminSaga;
