import React from "react";
import {
	withGoogleMap,
	withScriptjs,
	GoogleMap,
	Marker
} from "react-google-maps";
import { compose, withProps } from "recompose";

import App from "./App";

const MyMapComponent = withScriptjs(
	withGoogleMap(props => (
		<GoogleMap
			defaultZoom={12}
			defaultCenter={{
				lat: parseFloat(props.lat),
				lng: parseFloat(props.lng)
			}}
		>
			{props.isMarkerShown && (
				<Marker position={{ lat: props.lat, lng: props.lng }} />
			)}
		</GoogleMap>
	))
);

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isMarkerShown: false
		};
	}
	componentDidMount() {
		this.delayedShowMarker();
	}
	delayedShowMarker = () => {
		setTimeout(() => {
			this.setState({ isMarkerShown: true });
		}, 3000);
	};
	handleMarkerClick = () => {
		this.setState({ isMarkerShown: false });
		this.delayedShowMarker();
	};
	render() {
		let { App } = this.props;
		let lat = this.props.lat;
		let lng = this.props.lng;
		return (
			<MyMapComponent
				isMarkerShown
				googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `300px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
				lat={lat}
				lng={lng}
			/>
		);
	}
}
