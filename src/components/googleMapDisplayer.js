import React, { useContext } from "react";
import { GoogleMapContext } from "../contex";
import GoogleMapReact from "google-map-react";
import { googleMapActions } from "../actions";
import { googleMapService } from "../services";

const GoogleMapDisplayer = props => {
  const contex = useContext(GoogleMapContext);
  const { googleMapDispatch, googleMapState } = contex;
  const { defaultCenter, center, mapInfo } = googleMapState;
  return (
    <div className="google-map-displayer">
      {defaultCenter && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_KEY }}
          defaultCenter={defaultCenter}
          center={center}
          defaultZoom={googleMapService.defaultZoom}
          onChange={newMapInfo => {
            googleMapDispatch(googleMapActions.setMapInfo(newMapInfo));
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => {
            // save ref
            googleMapDispatch(googleMapActions.setGoogleMapRef(map));
            // first load restaurant
            googleMapService.queryNearbyRestaurant(mapInfo, map).then(data => {
              googleMapDispatch(googleMapActions.pushRestaurant2List(data));
            });
          }}
        >
          {props.children}
        </GoogleMapReact>
      )}
    </div>
  );
};

export default GoogleMapDisplayer;
