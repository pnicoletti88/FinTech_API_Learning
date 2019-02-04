import React, { Component } from 'react';
import './App.css';
import { IEXClient } from 'iex-api'
import * as _fetch from 'isomorphic-fetch'
const iex = new IEXClient(_fetch);




class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      Name: null,
      Price: null
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
    alert(ticker);
    //var promise1 = new Promise(function(resolve, reject){resolve(App.getPrice(ticker))});
    //promise1.then((Price) => {return Price;});

    // @matt add the API stuff here!
    //set the variables StockName and Price equal to the data


    //Price = iex.stockQuote(`${ticker}`,false).latestPrice;
    var data = JSON.parse(iex.stockQuote(ticker.toString(),false));
    alert()
    StockName = data.companyName;
    //Price = data.latestPrice;
    //StockName = iex.stockQuote(ticker.toString(),false).companyName;
    Price = iex.stockPrice(ticker.toString());


    //iex.stockQuote(ticker.toString(),false).then(json, body)=>{return }

    //StockName = "Bob";
    //App.getPrice(ticker);



    var request = new XMLHttpRequest();

    request.open('GET', `https://api.iextrading.com/1.0/stock/${ticker}/quote`,false);
    request.onload = function(){
      var data = JSON.parse(this.response);
      StockName = data.companyName.toString();
      Price = data.latestPrice.toString();
      //data.forEach()
    };

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



    this.setState({
      Name: StockName,
      Price: Price
    });


  }

  render() {
    let stockData = "";
    if (this.state.Name !== null) {
      stockData = (
          <div>
            Name: {this.state.Name}
            <br/>
            Price: {this.state.Price}
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
      </div>
    );
  }

}

export default App;
