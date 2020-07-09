import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addSavedTrail( action ) {
    console.log('in addSavedTrail saga', action.payload);
    try { 
        const response = yield axios.post(`/api/trail`, {place_id: action.payload});
        //yield put({type: 'SEARCH_RESULT', payload: response.data })
    }
    catch(error){
        console.log('error in adding saved trail', error);
    }
}

function* addSavedTrailSaga() {
    yield takeLatest('ADD_SAVED_TRAIL', addSavedTrail);
  }

export default addSavedTrailSaga;