import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Sidebar from './components/Sidebar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      country: "",
      loaded: false
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
              <Sidebar changeCountry={this.changeCountry} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
