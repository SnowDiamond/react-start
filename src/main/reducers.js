import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

function sampleReducer(state = {}) {
  return state;
}

const rootReducers = combineReducers({
  sample: sampleReducer,
  routing: routerReducer,
  form: formReducer
});

export default rootReducers;
