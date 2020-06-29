import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* searchTrailName( action ) {
    console.log('in searchTrailName saga', action.payload);
    try { 
        //response holds the search results we got from the server
        const response = yield axios.get(`/api/trail`, { params: {q: action.payload} });
        console.log('Response coming from server', response.data)
        //yield put({type: 'LIST_TRAIL', payload: response.data })
    }
    catch(error){
        console.log('error in search trail', error);
    }
}

function* searchSaga() {
    yield takeLatest('SEARCH_TRAIL', searchTrailName);
  }

export default searchSaga;