import React, { Component, Fragment } from 'react';
import LocationForm from './LocationForm';
import Forecast from './Forecast';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    forecast: {}
  };

  handleResponse = res => {
    this.setState({ forecast: res });
  };

  render() {
    return (
      <Fragment>
        <LocationForm handleResponse={this.handleResponse} />
        <Forecast forecast={this.state.forecast} />
      </Fragment>
    );

  };
}

export default App;
