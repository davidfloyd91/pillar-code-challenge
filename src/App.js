import React, { Component, Fragment } from 'react';
import LocationForm from './LocationForm';
import Forecast from './Forecast';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    forecast: {},
    error: "",
    lat: "",
    lon: ""
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(location => {
      this.setState({ lat: location.coords.latitude });
      this.setState({ lon: location.coords.longitude });
    }, err => {
      this.setState({ error: err.message });
    });
  };

  handleResponse = res => {
    this.setState({ forecast: res });
  };

  error = err => {
    this.setState({ error: err });
  };

  render() {
    return (
      <Fragment>
        <p style={{color: "red"}}>{this.state.error}</p>
        <LocationForm
          error={this.error}
          lat={this.state.lat}
          lon={this.state.lon}
          handleResponse={this.handleResponse}
          forecast={this.state.forecast}
        />
        <Forecast forecast={this.state.forecast} />
      </Fragment>
    );

  };
}

export default App;
