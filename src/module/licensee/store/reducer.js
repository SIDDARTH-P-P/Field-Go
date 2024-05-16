import { combineReducers } from 'redux';


import mainCategoryReducer from '../container/mainCategoryContainer/slice';
import categoryReducer from '../container/category/slice';
// import subCategoryReducer from '../container/subCategoryContainer/slice';
// import userReducer from '../container/userContainer/slice';

// ==============================|| COMBINE REDUCER ||============================== //

const licenseeReducer = combineReducers({
  

  mainCategory:mainCategoryReducer,
  category:categoryReducer,
  // subCategory:subCategoryReducer,
  // user:userReducer,

 
});

export default licenseeReducer;
