import React, { Component } from "react";
import axios from "axios";

import SearchForm from "./SearchForm";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      review_count: 0,
      data: [],
      searchLocation: null,
      offset: 0
    };
  }

  onFormSubmit = e => {
    this.setState({
      searchLocation: e,
      offset: Math.floor(Math.random() * 20) + 1
    });
    this.getRandRestaurant(this.state.offset, this.state.searchLocation);
  };

  getRandRestaurant = (offset, searchLocation) => {
    axios
      .get(
        `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/search?offset=${offset}&location=${searchLocation}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_YELP_KEY}`
          }
        }
      )
      .then(res => {
        console.log(res);

        this.setState({
          //data: this.state.data.concat(res.data.businesses),
          data: res.data.businesses[Math.floor(Math.random() * 30) + 1],
          offset: offset + 20
        });
        console.log(`${this.state.data}`);
      })

      .catch(err => {
        console.log("error");
      });
  };

  render() {
    return (
      <div>
        <SearchForm onFormSubmit={this.onFormSubmit} />
        <h1>{this.state.data.name}</h1>
      </div>
    );
  }
}

export default App;
