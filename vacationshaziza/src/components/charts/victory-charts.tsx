import { Component } from "react";
import axios from "axios";

import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import "./victory-charts.css"
import AdminNavbar from "../admin-navbar/admin-navbar";

interface ChartState {
    chartData: any
}

export default class Chart extends Component<any, ChartState>{
    public constructor(props: any) {
        super(props);
        this.state = {
            chartData: null
        };
    }

    componentDidMount() {
        this.getDataForChart();
    };

    private getDataForChart = async () => {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

        try {
            const response = await axios.get("http://localhost:3001/vacations/charts");
            const { data } = response;
            this.setState({ chartData: data });
        }
        catch (error) {
            console.log(error.response.data.error);
        }
    }

    public render() {
        const { chartData } = this.state;
        return (
            chartData &&
            <>
                <AdminNavbar />
                <div className="chart">
                    <VictoryChart
                        domainPadding={30}
                    >
                        <VictoryAxis

                        />
                        <VictoryAxis
                            dependentAxis

                        />
                        <VictoryBar
                            data={chartData}

                            barRatio={0.0}

                            x="destination"
                            y="followersAmount"
                        />
                    </VictoryChart>
                </div>
            </>
        );
    }
}