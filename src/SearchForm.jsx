import React, { Component } from "react";

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
			<div class="search">
				<form onSubmit={e => this.handleFormSubmit(e)}>
					<div>
						<label>Location</label>
						<input
							type="text"
							value={this.state.searchLocation}
							onChange={this.handleLocationChange}
						/>
					</div>
					<br></br>
					<button class="button">Submit</button>
				</form>
			</div>
		);
	}
}
export default SearchForm;
