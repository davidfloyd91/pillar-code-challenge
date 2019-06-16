import React, { Component, Fragment } from 'react';
import * as api from './apiCreds';

let zipQuery, cityQuery, lat, lon, coordsQuery;

class LocationForm extends Component {
  state = {
    input: "zip"
  };

  componentDidUpdate() {
    if (this.props.lat && this.props.lon && !this.props.forecast.list) {
      coordsQuery = "lat=" + this.props.lat + "&lon=" + this.props.lon;
      this.getWeather(coordsQuery);
    };
  };

  handleChange = e => {
    this.props.error("");

    if (e.target.id === "zip") {
      if (!/^[0-9]{5}$/.test(e.target.value)) {
        this.props.error("Please enter a valid five-digit zip code");
      };
      zipQuery = "zip=" + e.target.value + ",us";
    } else if (e.target.id === "city") {
      cityQuery = "q=" + e.target.value + ",us";
    } else if (e.target.id === "lat") {
      lat = e.target.value;
    } else if (e.target.id === "lng") {
      lon = e.target.value;
    };

    if (lat && lon) {
      coordsQuery = "lat=" + lat + "&lon=" + lon;
    };
  };

  handleRadio = e => {
    if (e.target.value === "zip") {
      this.setState({input: "zip"});
    } else if (e.target.value === "city") {
      this.setState({input: "city"});
    } else if (e.target.value === "coords") {
      this.setState({input: "coords"});
    };
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.input === "zip" && zipQuery) {
      this.getWeather(zipQuery);
    } else if (this.state.input === "city" && cityQuery) {
      this.getWeather(cityQuery);
    } else if (this.state.input === "coords" && coordsQuery) {
      this.getWeather(coordsQuery);
    };
  };

  getWeather = (query) => {
    fetch(api.urlBase + query + api.key)
    .then(res => res.json())
    .then(parsed => {
      console.log(parsed)
      if (parsed.cod != 200) {
        this.props.error('Error: ' + parsed.message);
      } else {
        this.props.handleResponse(parsed);
      };
    })
  };

  render() {
    return (
      <Fragment>
        <p>How would you like to input your location?</p>
        <input type="radio" name="queryType" onChange={this.handleRadio} value="zip" checked={this.state.input === "zip"} /> Zip code<br/>
        <input type="radio" name="queryType" onChange={this.handleRadio} value="city" checked={this.state.input === "city"} /> City name<br/>
        <input type="radio" name="queryType" onChange={this.handleRadio} value="coords" checked={this.state.input === "coords"} /> Latitude and longitude<br/><br/>
        <form onSubmit={this.handleSubmit}>
          {
            this.state.input === "zip" ?
            <input type="text" id="zip" placeholder="Zip code" onInput={this.handleChange} /> :
            null
          } {
            this.state.input === "city" ?
            <input type="text" id="city" placeholder="City name" onInput={this.handleChange} /> :
            null
          } {
            this.state.input === "coords"
              ?
            <Fragment>
              <input type="text" id="lat" placeholder="Latitude" onInput={this.handleChange} />
              <input type="text" id="lng" placeholder="Longitude" onInput={this.handleChange} />
            </Fragment>
              :
            null
          }
          <button type="submit">Search</button>
        </form>
      </Fragment>
    );
  };
}

export default LocationForm;
