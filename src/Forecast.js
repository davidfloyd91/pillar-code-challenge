import React, { Component, Fragment } from 'react';
import Chart from 'chart.js';

let temperatureChart, pressureChart, humidityChart;

let temperatureData = [];
let temperatureChartData = {
  type: "line",
  data: {
    labels: null,
    datasets: [
      {
        label: null,
        fill: false,
        data: null,
        borderColor: "red",
        lineTension: 0.3,
        pointRadius: 1
      }
    ]
  },
  options: {
    animation: false,
    legend: {
      display: false
    },
    title: {
        display: true,
        text: "Temperature"
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 240,
          max: 320,
          stepSize: null
        },
        scaleLabel: {
          display: true,
          labelString: "Temperature (Kelvin)"
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Time"
        }
      }]
    }
  }
};

let pressureData = [];
let pressureChartData = {
  type: "line",
  data: {
    labels: null,
    datasets: [
      {
        label: null,
        fill: false,
        data: null,
        borderColor: "purple",
        lineTension: 0.3,
        pointRadius: 1
      }
    ]
  },
  options: {
    animation: false,
    legend: {
      display: false
    },
    title: {
        display: true,
        text: "Pressure"
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 950,
          max: 1050,
          stepSize: null
        },
        scaleLabel: {
          display: true,
          labelString: "Pressure (hectopascal)"
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Time"
        }
      }]
    }
  }
};

let humidityData = [];
let humidityChartData = {
  type: "line",
  data: {
    labels: null,
    datasets: [
      {
        label: null,
        fill: false,
        data: null,
        borderColor: "blue",
        lineTension: 0.3,
        pointRadius: 1
      }
    ]
  },
  options: {
    animation: false,
    legend: {
      display: false
    },
    title: {
        display: true,
        text: "Humidity"
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          max: 100,
          stepSize: null
        },
        scaleLabel: {
          display: true,
          labelString: "Humidity (percent)"
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Time"
        }
      }]
    }
  }
};

let timeData = [];

class Forecast extends Component {
  temperatureRef = React.createRef();
  pressureRef = React.createRef();
  humidityRef = React.createRef();

  componentDidMount() {
    if (this.props.forecast.list) {
      this.getData();
      this.buildCharts();
    };
  };

  componentDidUpdate() {
    if (this.props.forecast.list) {
      this.getData();
      this.buildCharts();
    };
  };

  getData = () => {
    if (this.props.forecast.list) {
      temperatureData = [];
      pressureData = [];
      humidityData = [];
      timeData = [];

      this.props.forecast.list.forEach(period => {
        temperatureData.push(period.main.temp);
        pressureData.push(period.main.pressure);
        humidityData.push(period.main.humidity);
        timeData.push(period.dt_txt);
      });
    };

    temperatureChartData.data.labels = timeData;
    pressureChartData.data.labels = timeData;
    humidityChartData.data.labels = timeData;

    temperatureChartData.data.datasets[0].data = temperatureData;
    pressureChartData.data.datasets[0].data = pressureData;
    humidityChartData.data.datasets[0].data = humidityData;
  };

  buildCharts = () => {
    const temperatureChartRef = this.temperatureRef.current.getContext("2d");
    const pressureChartRef = this.pressureRef.current.getContext("2d");
    const humidityChartRef = this.humidityRef.current.getContext("2d");


    if (typeof temperatureChart !== "undefined") {
      temperatureChart.destroy();
    };

    if (typeof pressureChart !== "undefined") {
      pressureChart.destroy();
    };

    if (typeof humidityChart !== "undefined") {
      humidityChart.destroy();
    };

    temperatureChart = new Chart(temperatureChartRef, temperatureChartData);
    pressureChart = new Chart(pressureChartRef, pressureChartData);
    humidityChart = new Chart(humidityChartRef, humidityChartData);
  };

  render() {
    return (
      <Fragment>
        <h1 style={{textAlign: "center"}}>
          {
            this.props.forecast.city && this.props.forecast.city.name ?
            `Weather in ${this.props.forecast.city.name}` :
            null
          }
        </h1>
        <canvas
          id="temperatureChart"
          ref={this.temperatureRef}
        />
      <canvas
        id="pressureChart"
        ref={this.pressureRef}
      />
      <canvas
        id="humidityChart"
        ref={this.humidityRef}
      />
      </Fragment>
    );
  };
}

export default Forecast;
