import React, { useContext } from "react";
import { googleMapActions } from "../actions";
import { GoogleMapContext } from "../contex";
import classNames from "classnames";

const GoogleMapMarker = props => {
  const contex = useContext(GoogleMapContext);
  const { googleMapDispatch } = contex;
  const {
    lat,
    lng,
    data,
    isCenter,
    isOwnPosition,
    isNearByCurrenetCenter
  } = props;
  return (
    <div>
      <div
        className={classNames({
          "google-map-marker__title": true,
          "google-map-marker__title--me": isOwnPosition
        })}
      >
        {isOwnPosition ? "Me" : data && data.name}
      </div>
      <div
        className={classNames({
          "google-map-marker": true,
          "google-map-marker--self": isOwnPosition,
          "google-map-marker--near": isNearByCurrenetCenter,
          "google-map-marker--center": isCenter
        })}
        onClick={() => {
          googleMapDispatch(googleMapActions.setCenter({ lat, lng }));
        }}
      ></div>
    </div>
  );
};

export default GoogleMapMarker;
