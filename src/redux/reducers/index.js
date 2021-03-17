import { combineReducers } from 'redux';
import themeReducer from './themeReducer';
import indexReducer from './indexReducer';

const reducer = combineReducers({
  theme: themeReducer,
  index: indexReducer,
});

export default reducer;
