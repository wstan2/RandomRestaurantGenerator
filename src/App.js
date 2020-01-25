import React, { Component } from "react";
import axios from "axios";

import SearchForm from "./SearchForm";

const API_KEY = process.env.REACT_APP_API_WEATHER_KEY;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: null,
      review_count: 0,
      data: [],
      searchLocation: null,
      offset: Math.floor(Math.random() * 5) + 1,
      rating: 0,
      price: "",
      temperature: null,
      errorState: null,
      id: null,
      review1: null,
      review2: null,
      review3: null
    };
  }

  onFormSubmit = e => {
    this.setState({
      searchLocation: e
    });

    if (this.state.searchLocation != null) {
      this.getRandRestaurant(this.state.offset, this.state.searchLocation);
    }
  };

  // nested yelp fusion api call to retreive random restaurant & review information
  getRandRestaurant = (offset, searchLocation) => {
    axios
      .get(
        `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search?offset=${offset}&location=${searchLocation}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_YELP_KEY}`
          },
          params: {
            categories: "restaurants"
          }
        }
      )
      .then(res => {
        console.log(res);
        this.setState({
          //data: this.state.data.concat(res.data.businesses)
          data:
            res.data.businesses[
              Math.floor(Math.random() * (res.data.businesses.length - 1) + 1)
            ],
          id: this.state.data.id,
          offset: Math.floor(Math.random() * 5) + 1
        });
        this.getWeather(this.state.searchLocation);
        axios
          .get(
            `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/${
              this.state.data.id
            }/reviews`,
            {
              headers: {
                Authorization: `Bearer ${process.env.REACT_APP_API_YELP_KEY}`
              }
            }
          )
          .then(res => {
            console.log(res);
            this.setState({
              review1: res.data.reviews[0].text,
              review2: res.data.reviews[1].text,
              review3: res.data.reviews[2].text
            });
          })
          .catch(err => {
            console.log("error");
          });
      })
      .catch(err => {
        console.log("error");
      });
  };

  // openweather api call to retrieve location temperature
  getWeather = city => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      .then(res => {
        console.log(res);

        this.setState({
          temperature:
            (res.data.main.temp * (9 / 5) + 32).toFixed(0) + "\u00b0 F"
        });
        console.log(this.state.temperature);
        this.getReviews(this.state.id);
      })
      .catch(err => {
        this.setState({
          errorState: "Error! We could not retrieve weather information."
        });
      });
  };

  render() {
    return (
      <div>
        <SearchForm onFormSubmit={this.onFormSubmit} />
        <h1>Restaurant: {this.state.data.name}</h1>
        <h1>Review count: {this.state.data.review_count}</h1>
        <h1>Rating: {this.state.data.rating}</h1>
        <h1>Price: {this.state.data.price}</h1>
        <h1>Todays Temperature: {this.state.temperature}</h1>
        <h1>Reviews: {this.state.review1}</h1>
        <h1>{this.state.review2}</h1>
        <h1>{this.state.review3}</h1>
      </div>
    );
  }
}

export default App;
