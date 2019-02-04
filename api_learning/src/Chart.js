import Chart from 'react-google-charts';
import React, { Component } from 'react';
import { IEXClient } from 'iex-api'
import * as _fetch from 'isomorphic-fetch'
const iex = new IEXClient(_fetch);

class Charts extends Component {
    constructor(props){
        super(props);
        this.state = {Data:null}
        iex.stockChart(this.props.ticker,"1m").then((item) => {
                let data = [];
                if (item === "Unknown symbol") {
                    this.setState({
                            Data: null
                        }
                    );
                } else {
                    for (let x = 0; x < item.length; x++){

                        //data.push(item[x].date,item[x].close);
                        let temp = []
                        temp.push(x);
                        temp.push(item[x].close)
                        data.push(temp);
                    }
                    this.setState({
                        Data: data
                    });
                }

            }
        );
    }

    render() {
        //code to compile chart

        var out = this.state.Data

       var arr = [
                        [
                             {type: 'number', label: 'x'},
                             {type: 'number', label: 'values'}
                             ],
                        out
                     ];

        alert(arr[1]);

        return(
        <Chart
            width={300}
            height={300}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={{arr}}
            options={{
                intervals: {style: 'sticks'},
                legend: 'none',
            }}
        />
        );
    }
}

export default Charts;