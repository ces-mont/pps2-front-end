import { combineReducers } from 'redux';
import userReducer from './reducers/userreducer';

const rootReducer = combineReducers({ userReducer })

export default rootReducer;