import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import BarChart from "../../core/components/charts/BarChart";
import PieChart from "../../core/components/charts/PieChart";
import CountryVO from "../../core/interfaces/country";
import DayData from "../../core/interfaces/dayData";
import { getCountryData } from "../../core/store/actions";
import { countriesSelector } from "../../core/store/selector";
import Deposits from "../dashboard/Deposits";
import Title from "../dashboard/Title";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    fixedHeight: {
        height: 240,
    },
}));


const mapStateToProps = (state: any) => {
    const countries = countriesSelector(state);
    return {countries};
};

type Props = ReturnType<typeof mapStateToProps>

const Country: React.FC<Props> = ({countries}) => {
    const classes = useStyles();
    const [country, setCountry] = useState<CountryVO | undefined>(undefined);
    const [data, setData] = useState<DayData[]>([]);
    const [today, setToday] = useState<number[] | undefined>(undefined);
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const dispatch = useDispatch();

    let {id} = useParams();

    useEffect(() => {
        const slug: any = id;
        setTimeout(() =>
                dispatch(getCountryData(slug))
            , 1000);
    }, [dispatch]);


    useEffect(() => {
        const c = countries && countries.find((element: any) => element.Slug === id);
        if (c) {
            setCountry(c);
            setData(c.data);
            if (c.data) {
                const todayData = c.data[c.data.length - 1];
                setToday(
                    [todayData.Confirmed, todayData.Deaths, todayData.Recovered, todayData.Active],
                );
                console.log(todayData, [todayData.Confirmed, todayData.Deaths, todayData.Recovered, todayData.Active]);
            }
        }
    }, [countries]);


    return (
        <div>
            <Grid container
                  spacing={3}>
                <Grid item
                      xs={12}>
                    <Paper className={classes.paper}>
                        <Typography gutterBottom
                                    variant="h5"
                                    component="h2">
                            {country?.Country}
                        </Typography>
                    </Paper>
                </Grid>
                {/* Chart */}
                <Grid item
                      xs={12}
                      md={8}
                      lg={9}>
                    <Paper className={fixedHeightPaper}>
                        <BarChart data={today ? today : []}
                                  width={200}
                                  height={200}/>
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item
                      xs={12}
                      md={4}
                      lg={3}>
                    <Paper className={fixedHeightPaper}>
                        <Title>Today</Title>
                        <PieChart data={today ? today : []}
                                  width={200}
                                  height={200}/>
                    </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item
                      xs={12}>
                    <Paper className={classes.paper}>
                        <Title>DataSet</Title>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell align="right">Confirmed</TableCell>
                                    <TableCell align="right">Deaths</TableCell>
                                    <TableCell align="right">Recovered</TableCell>
                                    <TableCell align="right">Active</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.map((row: DayData) => (
                                    <TableRow key={row.Date}>
                                        <TableCell>{row.Date}</TableCell>
                                        <TableCell align="right">{row.Confirmed}</TableCell>
                                        <TableCell align="right">{row.Deaths}</TableCell>
                                        <TableCell align="right">{row.Recovered}</TableCell>
                                        <TableCell align="right">{row.Active}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </div>

    );
};

export default connect(
    mapStateToProps,
)(Country);
