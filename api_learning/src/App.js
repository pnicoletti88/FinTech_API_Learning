import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      Name: null,
      Price: null
    };
  }

  StockIn(event, ticker){
    event.preventDefault();
    let StockName=null, Price=null;

    // @matt add the API stuff here!
    //set the variables StockName and Price equal to the data


    this.setState({
      Name: StockName,
      Price: Price
    });


  }

  render() {
    let stockData = "";
    if(this.state.Name !== null){
      stockData = (
        <div>
          Name: {this.props.Name}
          <br/>
          Price: {this.props.Price}
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
