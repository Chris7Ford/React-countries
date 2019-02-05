import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Countryinfo from "./components/Countryinfo"
import Sidebar from './components/Sidebar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      country: null,
      data: [],
      filtered_data: [],
      listLoaded: false
    }
    this.handleFilter = this.handleFilter.bind(this);
    this.select_country = this.select_country.bind(this);
  }

  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/all")
      .then(res => res.json())
      .then(data => {
              this.setState({
          listLoaded: true,
          data: data,
          filtered_data: data
        })
      });
    }

    handleFilter = (e) => {
      if (e.target.value == "") {
        this.setState({
          search: "",
          filtered_data: this.state.data
        })
        return ;
      }
      this.setState({
        search: e.target.value,
      }, () => {
        this.setState({
          filtered_data: this.state.data.filter(
            country => country.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1
          )
        })
      })
      console.log(this.state);
    }

    select_country = (data) => {
      this.setState({
        country: data
      })
    }

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row">
              <Sidebar select_country={this.select_country} data={this.state.filtered_data} listLoaded={this.state.listLoaded} handleFilter={this.handleFilter}/>
              {this.state.country && <Countryinfo data={this.state.country} />}
          </div>
        </div>
      </div>
    );
  }
}

export default App;