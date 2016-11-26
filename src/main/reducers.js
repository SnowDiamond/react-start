import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import Immutable from 'immutable';

const defaultState = new Immutable.List();

function todoReducer(state = defaultState, action) {
  switch (action.type) {
    case 'GET_TODOS':
      return new Immutable.List(action.res.data);
    default:
      return state;
  }
}

const rootReducers = combineReducers({
  todos: todoReducer,
  routing: routerReducer,
  form: formReducer
});

export default rootReducers;
