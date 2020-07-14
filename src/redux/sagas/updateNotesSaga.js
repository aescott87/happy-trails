import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* updateNotes( action ) {
    console.log('in addSavedTrail saga', action.payload);
    try { 
        const response = yield axios.put(`/api/savedTrail/`, {id: action.payload.id, notes: action.payload.notes});
        yield put({type: 'GET_SAVED_TRAIL'})
    }
    catch(error){
        console.log('error in updating notes for saved trail', error);
    }
}

function* updateNotesSaga() {
    yield takeLatest('UPDATE_NOTES', updateNotes);
  }

export default updateNotesSaga;