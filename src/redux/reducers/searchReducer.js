import { combineReducers } from 'redux';

const searchResult = (state = [], action) => {
    if (action.type === 'SEARCH_RESULT'){
        console.log('in searchResult reducer', action.payload);
        console.log('state is', state);
        return action.payload;
    }
    return state
}

export default combineReducers({
    searchResult,
});