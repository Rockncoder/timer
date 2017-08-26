import React from 'react';
import {applyMiddleware, createStore, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import * as timer from './timer';
import {watchRequest, userReducer, UserProfilePage} from './github';

const sagaMiddleware = createSagaMiddleware();
const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);
const store = createStoreWithMiddleware(combineReducers({timer: timer.reducer, userReducer}));


class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <timer.View/>
          <UserProfilePage/>
        </div>
      </Provider>
    );
  }
}

sagaMiddleware.run(timer.saga);
sagaMiddleware.run(watchRequest);
export default App;
