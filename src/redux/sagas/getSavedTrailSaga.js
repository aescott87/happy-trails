import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getSavedTrail() {
    console.log('in getSavedTrail saga');
    try { 
        const response = yield axios.get(`/api/savedTrail`);
        console.log('Getting response from server', response.data)
        //yield put({type: 'SEARCH_RESULT', payload: response.data })
    }
    catch(error){
        console.log('error in adding saved trail', error);
    }
}

function* getSavedTrailSaga() {
    yield takeLatest('GET_SAVED_TRAIL', getSavedTrail);
  }

export default getSavedTrailSaga;