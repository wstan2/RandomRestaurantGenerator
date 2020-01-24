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
      offset: Math.floor(Math.random() * 5) + 1,
      rating: 0,
      price: ""
    };
  }

  onFormSubmit = e => {
    this.setState({
      searchLocation: e
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
          },
          params: {
            categories: "food"
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
          offset: Math.floor(Math.random() * 5) + 1
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
        <h1>{this.state.data.review_count}</h1>
        <h1>{this.state.data.rating}</h1>
        <h1>{this.state.data.price}</h1>
      </div>
    );
  }
}

export default App;
