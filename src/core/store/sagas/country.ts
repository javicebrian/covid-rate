import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { setCountries, setCountryData } from "../actions";
import { GET_COUNTRIES, GET_COUNTRY_DATA } from "../actionTypes";

function* getAllCountries(action: any) {
    try {
        const response = yield call(() => axios.get(
            `https://api.covid19api.com/countries`,
        ));
        yield put(setCountries(response.data));
    } catch (error) {
        //   yield put(setAlert(error.response.data.reason));
    }
}

function* getCountryData(action: any) {
    try {
        const response = yield call(() => axios.get(
            `https://api.covid19api.com/dayone/country/${action.payload}`,
        ));
        yield put(setCountryData(response.data));
    } catch (error) {
        //   yield put(setAlert(error.response.data.reason));
    }
}

function* countriesSaga() {
    yield takeLatest(GET_COUNTRIES, getAllCountries);
    yield takeLatest(GET_COUNTRY_DATA, getCountryData);
}


export default countriesSaga;
