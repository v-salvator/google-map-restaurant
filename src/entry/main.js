import React, { useContext, useEffect } from "react";
import { GoogleMapContext } from "../contex";
import {
  GoogleMapDisplayer,
  GoogleMapMarker,
  RestaurantList
} from "../components";
import { googleMapService } from "../services";
import { googleMapActions } from "../actions";
import { useMapInfoHasDiff } from "../hooks";
import { isNearByCurrenetCenter } from "../lib";

const MainPage = () => {
  const data = useContext(GoogleMapContext);
  const { googleMapDispatch, googleMapState } = data;
  const {
    restaurantsList,
    center,
    mapInfo,
    googleMapRef,
    nearbyRestaurantsList,
    defaultCenter
  } = googleMapState;
  const mapInfoHasDiff = useMapInfoHasDiff(mapInfo);
  useEffect(() => {
    if (mapInfoHasDiff && googleMapRef) {
      googleMapService
        .queryNearbyRestaurant(mapInfo, googleMapRef)
        .then(data => {
          googleMapDispatch(googleMapActions.pushRestaurant2List(data));
        });
    }
  });
  return (
    <div>
      <GoogleMapDisplayer>
        {restaurantsList.map(restaurant => (
          <GoogleMapMarker
            key={restaurant.id}
            lat={restaurant.geometry.location.lat()}
            lng={restaurant.geometry.location.lng()}
            data={restaurant}
            isNearByCurrenetCenter={isNearByCurrenetCenter(
              nearbyRestaurantsList,
              restaurant
            )}
          />
        ))}
        {center && (
          <GoogleMapMarker lat={center.lat} lng={center.lng} isCenter />
        )}
        {defaultCenter && (
          <GoogleMapMarker
            lat={defaultCenter.lat}
            lng={defaultCenter.lng}
            isOwnPosition
          />
        )}
      </GoogleMapDisplayer>
      <RestaurantList></RestaurantList>
    </div>
  );
};

export default MainPage;
