import Chart from 'react-google-charts';
import React, { Component } from 'react';
import { IEXClient } from 'iex-api'
import * as _fetch from 'isomorphic-fetch'
const iex = new IEXClient(_fetch);

class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {Data: null,
        Name: null};
    }

    render() {
        //code to compile chart
            let data = [];
            iex.stockChart(this.props.ticker,"1m").then((item) => {
                    if (item === "Unknown symbol") {
                        this.setState({
                                Data: null,
                                //Name: null
                            }
                        );
                    } else {
                        data.push([{type: 'number', label: 'x'},{type: 'number', label: 'values'}]);
                    for (let x = 0; x < item.length; x++){
                        data.push([x,item[x].close]);
                    }
                    this.setState({
                        Data: data,
                        //Name: name
                    });
                    }
                }
            );
        return(
        <Chart
            width={500}
            height={500}
            chartType="AreaChart"
            loader={<div>Loading Chart</div>}
            data={this.state.Data}
            options={{
                title: {title: 'bitchass'},
                hAxis: {title: 'Day'},
                vAxis: {minValue: 0},
                intervals: {style: 'sticks'},
                legend: 'none',
            }}
        />

        );
    }
}

export default Charts;