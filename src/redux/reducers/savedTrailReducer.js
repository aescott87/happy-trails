import { combineReducers } from 'redux';

const savedTrail = (state = [], action) => {
    if (action.type === 'SAVED_TRAIL'){
        console.log('in savedTrail reducer', action.payload);
        console.log('state is', state);
        return action.payload;
    }
    return state
}

export default combineReducers({
    savedTrail,
});