import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      rating: 0.0,
      address: "",
      city: "",
      state: ""
    };
  }

  componentDidMount() {
    axios
      .get(
        `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3/businesses/WavvLdfdP6g8aZTtbBQHTw`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_YELP_KEY}`
          }
        }
      )
      .then(res => {
        console.log(res);
        this.setState({
          name: res.data.name,
          rating: res.data.rating,
          address: res.data.location.address1,
          city: res.data.location.city,
          state: res.data.location.state
        });
      })

      .catch(err => {
        console.log("error");
      });
  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <span>{this.state.rating}</span>
        <span>{this.state.address}</span>
        <span>{this.state.city}</span>
        <span>{this.state.state}</span>
      </div>
    );
  }
}

export default App;
