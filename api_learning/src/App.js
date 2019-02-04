import React, { Component } from 'react';
import './App.css';
import { IEXClient } from 'iex-api'
import * as _fetch from 'isomorphic-fetch'
import Charts from "./Chart";
const iex = new IEXClient(_fetch);





class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      Name: null,
      Price: null,
      Status: null
    };
  }
  /*static getPrice(ticker) {
    return iex.stockPrice(ticker.toString()).then(res => {
      return res;
    })
  }*/

  StockIn(event, ticker){
    event.preventDefault();
    let StockName=null, Price=null;

    iex.stockQuote(ticker,false).then((item) => {

          if (item === "Unknown symbol") {
            this.setState({
                  Status: "Ticker Not Found",
                  Name: null,
                  Price: null,
                  Ticker: null
                }
            );
          } else {
            let price = item.latestPrice;
            let name = item.companyName;

            this.setState({
              Name: name,
              Price: price,
              Status: null,
              Ticker: ticker
            });
          }

        }
    );






    //var promise1 = new Promise(function(resolve, reject){resolve(App.getPrice(ticker))});
    //promise1.then((Price) => {return Price;});

    // @matt add the API stuff here!
    //set the variables StockName and Price equal to the data


    //Price = iex.stockQuote(`${ticker}`,false).latestPrice;
    //var data = JSON.parse(iex.stockQuote(ticker.toString(),false));
    //StockName = data.companyName;
    //Price = data.latestPrice;
    //StockName = iex.stockQuote(ticker.toString(),false).companyName;
    //Price = iex.stockPrice(ticker.toString());


    //iex.stockQuote(ticker.toString(),false).then(json, body)=>{return }

    //StockName = "Bob";
    //App.getPrice(ticker);



    /*var request = new XMLHttpRequest();

    request.open('GET', `https://api.iextrading.com/1.0/stock/${ticker}/quote`,true);
    request.onload = () => {
      alert(request.status);
      let data = JSON.parse(this.response);
      alert("in2");
      let StockName = data.companyName.toString();
      alert("in3");
      let Price = data.latestPrice.toString();
      alert("in4");
    };

    alert("1");*/

    //request.send();
    //iex.request('https://api.iextrading.com/1.0/stock/{aapl}/book').then()
    //JSON.parse(body);
    /*iex.request(`https://api.iextrading.com/1.0/stock/${ticker}/book`).then((json, body) => {
      new Quote({
        symbol: symbol,
        date: new Date(JSON.quote.latestUpdate),
        source: "IEX",
        price: {
          last: json.quote.latestPrice,
          open: json.quote.open,
          high: json.quote.high,
          low: json.quote.low,
          close: json.quote.close,
          volume: json.quote.latestVolume
        },
        dom: {
          bids: json.bids,
          asks: json.asks
        },
        original: body
      });
    })*/

    //Price = iex.(ticker.toString());
    //Price = json.quote.latestPrice;






  }

  render() {
    let stockData = "";
    if (this.state.Name !== null) {
      stockData = (
          <div>
          <div>
            Name: {this.state.Name}
            <br/>
            Price: {this.state.Price}
          </div>
          <div>
              <Charts ticker={this.state.Ticker}/>
          </div>
          </div>

      );
    }


    return (
      <div className="App">
        <form onSubmit={(e, input = document.getElementById("TickerBox").value) => { this.StockIn(e, input) }}>
          <label>
            Enter the Ticker of A Stock: &nbsp;
            <input type="text" id="TickerBox" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      <br/><br/>
        {stockData}
        {this.state.Status}

      </div>
    );
  }

}

export default App;
