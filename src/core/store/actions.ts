import Country from "../interfaces/country";
import DayData from "../interfaces/dayData";
import { GET_COUNTRIES, GET_COUNTRY_DATA, SET_COUNTRIES, SET_COUNTRY_DATA } from "./actionTypes";

export const getCountries = ()=> ({
    type: GET_COUNTRIES,
});

export const setCountries = (content: Array<Country>)=> ({
    type: SET_COUNTRIES,
    payload: content
});

export const getCountryData = (slug: string)=> ({
    type: GET_COUNTRY_DATA,
    payload: slug
});

export const setCountryData = (content: Array<DayData>)=> ({
    type: SET_COUNTRY_DATA,
    payload: content
});
