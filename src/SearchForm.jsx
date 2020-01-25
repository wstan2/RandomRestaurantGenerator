import React, { Component } from "react";

import Weather from "./Weather";

class SearchForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchLocation: ""
		};
	}

	handleLocationChange = e => {
		this.setState({
			searchLocation: e.target.value
		});
	};

	handleFormSubmit = e => {
		e.preventDefault();

		this.props.onFormSubmit(this.state.searchLocation);
	};

	render() {
		return (
			<form onSubmit={e => this.handleFormSubmit(e)}>
				<div>
					<label>Location</label>
					<input
						type="text"
						value={this.state.searchLocation}
						onChange={this.handleLocationChange}
					/>
				</div>
				<button type="submit">Submit</button>
			</form>
		);
	}
}
export default SearchForm;
