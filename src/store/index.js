// import reducer from './reducer';
// import saga from './saga';
// import { configureStore } from '@reduxjs/toolkit';
// import createSagaMiddleware from 'redux-saga';
// import logger from 'redux-logger';

// // create the saga middleware
// const sagaMiddleware = createSagaMiddleware();
// // ==============================|| REDUX - MAIN STORE ||============================== //

// const store = configureStore({
//     reducer,
//     middleware: [logger, sagaMiddleware]
//   });
//   sagaMiddleware.run(saga);
  

// const persister = 'Free';

// export { store, persister };



import reducer from './reducer';
import saga from './saga';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, sagaMiddleware) // Wrap middleware array with a callback function
});
sagaMiddleware.run(saga);

const persister = 'Free';

export { store, persister };
