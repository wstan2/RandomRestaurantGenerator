import React, { Component } from "react";

import axios from "axios";

import SearchForm from "./SearchForm";
import Maps from "./Maps";
import WrappedMap from "./Maps";
import "./App.css";

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
			review3: null,
			desc: null,
			lat: 41.878113,
			lng: -87.629799,
			address1: null,
			city: null,
			state: null
		};
	}

	onFormSubmit = e => {
		this.setState({
			searchLocation: e
		});

		if (this.state.searchLocation != null) {
			this.getRandRestaurant(
				this.state.offset,
				this.state.searchLocation
			);
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
							Math.floor(
								Math.random() *
									(res.data.businesses.length - 1) +
									1
							)
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
							review3: res.data.reviews[2].text,
							address1: this.state.data.location.address1,
							city: this.state.data.location.city,
							state: this.state.data.location.state,
							lat: this.state.data.coordinates.latitude,
							lng: this.state.data.coordinates.longitude
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
						(res.data.main.temp * (9 / 5) + 32).toFixed(0) +
						"\u00b0 F",
					desc: res.data.weather[0].description
				});
				console.log(this.state.temperature);
				this.getReviews(this.state.id);
			})
			.catch(err => {
				this.setState({
					errorState:
						"Error! We could not retrieve weather information."
				});
			});
	};

	render() {
		return (
			<div>
				<div class="Title-Container">
					<div class="Title">Random Restaurant Generator</div>
					<br></br>
					<div class="Test">
						<div class="Reviews">
							<div class="map">
								<Maps
									MyMapComponent
									lat={this.state.lat}
									lng={this.state.lng}
								/>
							</div>
							<br></br>
							<br></br>
							<SearchForm onFormSubmit={this.onFormSubmit} />
							<ul>
								Weather
								<br></br>
								<br></br>
								Current Temperature: {this.state.temperature}
								<br></br>
								<br></br>
								Current Conditions: {this.state.desc}
								<br></br>
								<br></br>
								<br></br>
								<li>Restaurant: {this.state.data.name}</li>
								<li>Address: {this.state.address1}</li>
								<li>City: {this.state.city}</li>
								<li>State: {this.state.state}</li>
								<li>
									Review Count: {this.state.data.review_count}
								</li>
								<li>Rating: {this.state.data.rating}</li>
								<li>Price: {this.state.data.price}</li>
								<br></br>
								<li>Reviews:</li>
								<br></br>
								{this.state.review1}
								<br></br>
								<br></br>
								{this.state.review2}
								<br></br>
								<br></br>
								{this.state.review3}
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
