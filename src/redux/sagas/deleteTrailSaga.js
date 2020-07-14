import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteTrail( action ) {
    console.log('in deleteTrail saga', action.payload);
    try { 
        yield axios.delete(`/api/savedTrail/${action.payload}`);
        yield put({type: 'GET_SAVED_TRAIL'})
    }
    catch(error){
        console.log('error in deleting saved trail', error);
    }
}

function* deleteTrailSaga() {
    yield takeLatest('DELETE_TRAIL', deleteTrail);
  }

export default deleteTrailSaga;