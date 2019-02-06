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
      listLoaded: false,
      render_neighbor: true
    }
    this.handleFilter = this.handleFilter.bind(this);
    this.select_country = this.select_country.bind(this);
    this.toggle_render_true = this.toggle_render_true.bind(this);
    this.toggle_render_false = this.toggle_render_false.bind(this);
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

    toggle_render_true = () => {
      this.setState({
        render_neighbor: true
      })
    }

    toggle_render_false = () => {
      this.setState({
        render_neighbor: false
      })
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
              <Sidebar select_country={this.select_country} handleFilter={this.handleFilter} {...this.state} toggle_render_true={this.toggle_render_true}/>
              {this.state.country && <Countryinfo data={this.state.country} render_neighbor={this.state.render_neighbor} toggle_render_false={this.toggle_render_false} toggle_render_true={this.toggle_render_true}/>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;