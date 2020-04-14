import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { green, purple } from "@material-ui/core/colors";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import * as serviceWorker from "./serviceWorker";

const theme = createMuiTheme({
    palette: {
        primary: green,
        secondary: purple,
    },
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App/>
    </ThemeProvider>
    , document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
