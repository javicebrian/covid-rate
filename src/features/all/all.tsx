import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import { connect } from "react-redux";
import { countriesSelector } from "../../core/store/selector";

const useStyles = makeStyles(theme => ({}));


const mapStateToProps = (state: any) => {
    const countries = countriesSelector(state);
    return {countries};
};

type Props = ReturnType<typeof mapStateToProps>

const All: React.FC<Props> = ({countries}) => {
    const classes = useStyles();

    function countryToFlag(isoCode: string) {
        return typeof String.fromCodePoint !== "undefined"
            ? isoCode
                .toUpperCase()
                .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
            : isoCode;
    }

    const handleCountryChange = (event: any, value: any) => {
        //TODO save to state
        //TODO trigger sagas
        const {name} = event;
        console.log(event);
    };

    return (
        <div>
            <Autocomplete
                multiple
                selectOnFocus
                id="combo-box-demo"
                options={countries}
                onChange={handleCountryChange}
                getOptionLabel={(option: any) => option.Country}
                renderOption={(option) => (
                    <React.Fragment>
                        <span>{countryToFlag(option.ISO2)}</span>
                        {option.Country}
                    </React.Fragment>
                )}
                style={{width: 300}}
                renderInput={(params) =>
                    <TextField {...params}
                               label="Country"
                               variant="outlined"/>}
            />
        </div>
    );
};

export default connect(
    mapStateToProps,
)(All);
