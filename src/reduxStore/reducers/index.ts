import counterReducer from '@reduxStore/reducers/counterReducer';
import { combineReducers } from 'redux';
import modalReducer from '@reduxStore/reducers/modalReducer';
import tutorialsSSReducer from '@reduxStore/reducers/tutorialsSSReducer';

const allReducers = combineReducers({
    modal: modalReducer,
    count: counterReducer,
    tutorial: tutorialsSSReducer,
});

export default allReducers;
export type RootState = ReturnType<typeof allReducers>;
