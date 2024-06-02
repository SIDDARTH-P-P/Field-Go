import { all, call } from 'redux-saga/effects';


import mainCategoryActionWatcher from '../container/mainCategoryContainer/saga'
import categoryActionWatcher from '../container/category/saga'
// import subCategoryActionWatcher from '../container/subCategoryContainer/saga'
// import UserActionWatcher from '../container/userContainer/saga'


function* licenseeSaga() {
  yield all([

    call(mainCategoryActionWatcher),
    call(categoryActionWatcher),
    // call(subCategoryActionWatcher),
    // call(UserActionWatcher),


  ]);
}

export default licenseeSaga;
