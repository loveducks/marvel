import React, { Component } from 'react';
import './App.css';
import Marvel from './Marvel';
import 'whatwg-fetch';

//todo: add a response for no results => done

const API_KEY =  '5cfc93e764d55e91485d5d8c0ee42543';
const PRI_KEY = "54dcd782fbcb84ddb6fcd218679b78e7c59f82e7";
const URL = "https://cors-anywhere.herokuapp.com/http://gateway.marvel.com/v1/public/characters";

class App extends Component {


  render() {
    return (
      <div className="App container-fluid">
        <Marvel API_KEY={API_KEY} PRI_KEY={PRI_KEY} URL={URL} />    
      </div>
    );
  }
}

export default App;
