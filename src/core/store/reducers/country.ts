import Country from "../../interfaces/country";
import { SET_COUNTRIES, SET_COUNTRY_DATA } from "../actionTypes";

const initialState: Array<Country> = [];

export default function (state = initialState, action: any) {
    switch (action.type) {
        case SET_COUNTRIES: {
            return action.payload;
        }
        case SET_COUNTRY_DATA: {
            const newState: Array<Country> = [...state];
            const i = newState.findIndex( (element: Country) => element.ISO2 == action.payload[0].CountryCode );
            newState[i].data = action.payload;
            return newState;
        }
        default:
            return state;
    }
}
